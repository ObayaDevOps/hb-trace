import { describe, expect, it } from "vitest";
import { createInMemoryPersistence } from "@/server/persistence";
import { payloadHash } from "@/lib/sync-protocol";
import { LOCAL_DEMO_ACTOR_ID } from "@/lib/sync-types";
import { LocalCommandService, LOCAL_DEMO_ORGANIZATION_ID } from "./local";
import type { SyncEnvelope } from "@/lib/sync-types";

const ACTOR = {
  actorId: LOCAL_DEMO_ACTOR_ID,
  roles: ["collection_procurement"],
  displayName: "Amina M.",
};

const BASE_PAYLOAD = {
  farmerReference: "SUP-001",
  farmerName: "Mirembe Cooperative",
  apiaryReference: "API-001",
  apiaryName: "Apiary One",
  collectionDate: "2026-09-03",
  quantityValue: "2.500",
  quantityUnit: "kg",
  grade: "A",
  agreedAmount: "12000",
  currencyCode: "UGX",
  receiptMode: "confirmed",
};

function envelope(
  payload: Record<string, unknown>,
  operationId = "00000000-0000-4000-8000-000000000011",
  targetAggregateId = "00000000-0000-4000-8000-000000000012",
  dependencyOperationIds: string[] = [],
): SyncEnvelope {
  return {
    operationId,
    deviceId: "00000000-0000-4000-8000-000000000013",
    actorId: LOCAL_DEMO_ACTOR_ID,
    deploymentId: "local-demo",
    commandType: "purchase.submit",
    commandSchemaVersion: 1,
    targetAggregateId,
    occurredAt: "2026-09-03T08:00:00Z",
    capturedAt: "2026-09-03T08:01:00Z",
    timezone: "Africa/Kampala",
    clientVersion: "test",
    dependencyOperationIds,
    payload,
    payloadHash: payloadHash(payload),
  };
}

describe("local purchase command service", () => {
  it("commits a purchase, receipt, source records and audit events atomically", async () => {
    const persistence = createInMemoryPersistence();
    const service = new LocalCommandService(persistence);

    const result = await service.submitPurchase({ ...BASE_PAYLOAD, operationId: "00000000-0000-4000-8000-000000000014" }, ACTOR);

    expect(result).toMatchObject({
      operationId: "00000000-0000-4000-8000-000000000014",
      receiptStatus: "farmer_confirmed",
      purchaseStatus: "submitted",
      persistence: "local-in-memory",
      serverConfirmed: false,
    });
    await persistence.withTransaction(async (transaction) => {
      expect((await transaction.records.list("organizations", { organizationId: LOCAL_DEMO_ORGANIZATION_ID }))).toHaveLength(1);
      expect((await transaction.records.list("farmers", { organizationId: LOCAL_DEMO_ORGANIZATION_ID }))).toHaveLength(1);
      expect((await transaction.records.list("apiaries", { organizationId: LOCAL_DEMO_ORGANIZATION_ID }))).toHaveLength(1);
      expect((await transaction.records.list("purchases", { organizationId: LOCAL_DEMO_ORGANIZATION_ID }))).toHaveLength(1);
      expect((await transaction.records.list("receipts", { organizationId: LOCAL_DEMO_ORGANIZATION_ID }))).toHaveLength(1);
      expect((await transaction.auditEvents.list({ organizationId: LOCAL_DEMO_ORGANIZATION_ID }))).toHaveLength(4);
    });
  });

  it("replays an operation without creating a second purchase or receipt", async () => {
    const persistence = createInMemoryPersistence();
    const service = new LocalCommandService(persistence);
    const input = { ...BASE_PAYLOAD, operationId: "00000000-0000-4000-8000-000000000021" };

    const first = await service.submitPurchase(input, ACTOR);
    const replay = await service.submitPurchase(input, ACTOR);

    expect(replay).toEqual(first);
    await persistence.withTransaction(async (transaction) => {
      expect((await transaction.records.list("purchases"))).toHaveLength(1);
      expect((await transaction.records.list("receipts"))).toHaveLength(1);
      expect((await transaction.auditEvents.list())).toHaveLength(4);
    });
  });

  it("holds a dependent command until the prerequisite is acknowledged", async () => {
    const persistence = createInMemoryPersistence();
    const service = new LocalCommandService(persistence);
    const dependencyId = "00000000-0000-4000-8000-000000000031";
    const dependent = envelope(BASE_PAYLOAD, "00000000-0000-4000-8000-000000000032", "00000000-0000-4000-8000-000000000033", [dependencyId]);

    const pending = await service.processSyncEnvelope(dependent, ACTOR);
    expect(pending.status).toBe("dependency pending");

    await persistence.withTransaction(async (transaction) => {
      const inserted = await transaction.syncOperations.put({
        operationId: dependencyId,
        organizationId: LOCAL_DEMO_ORGANIZATION_ID,
        actorId: LOCAL_DEMO_ACTOR_ID,
        deviceId: "00000000-0000-4000-8000-000000000034",
        deploymentId: "local-demo",
        commandType: "farmer.create",
        commandSchemaVersion: 1,
        aggregateType: "farmer",
        aggregateId: "00000000-0000-4000-8000-000000000035",
        expectedVersion: null,
        eventOccurrenceAt: "2026-09-03T08:00:00Z",
        clientCapturedAt: "2026-09-03T08:00:00Z",
        clientTimezone: "Africa/Kampala",
        clientVersion: "test",
        dependencyOperationIds: [],
        payload: {},
        payloadHashSha256: "a".repeat(64),
      });
      expect(inserted.replayed).toBe(false);
      await transaction.syncOperations.complete(dependencyId, {
        resultStatus: "acknowledged",
        resultPayload: { farmerId: "00000000-0000-4000-8000-000000000035" },
      });
    });

    const acknowledged = await service.processSyncEnvelope(dependent, ACTOR);
    expect(acknowledged.status).toBe("acknowledged");
    await persistence.withTransaction(async (transaction) => {
      expect((await transaction.records.list("purchases"))).toHaveLength(1);
    });
  });

  it("records a rejected sync operation without leaking invalid domain data", async () => {
    const persistence = createInMemoryPersistence();
    const service = new LocalCommandService(persistence);
    const invalid = envelope({ ...BASE_PAYLOAD, quantityValue: "0" }, "00000000-0000-4000-8000-000000000041");

    const result = await service.processSyncEnvelope(invalid, ACTOR);

    expect(result.status).toBe("rejected");
    await persistence.withTransaction(async (transaction) => {
      expect((await transaction.records.list("farmers"))).toHaveLength(0);
      expect((await transaction.records.list("purchases"))).toHaveLength(0);
      expect(await transaction.syncOperations.get(invalid.operationId)).toMatchObject({ resultStatus: "rejected" });
    });
  });
});
