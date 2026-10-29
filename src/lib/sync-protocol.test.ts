import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { LocalSyncLedger, localSyncLedger, payloadHash, validateSyncEnvelope } from "@/lib/sync-protocol";

function command(overrides: Record<string, unknown> = {}) {
  const payload = { farmerName: "Demo farmer", ...((overrides.payload as Record<string, unknown> | undefined) ?? {}) };
  return {
    operationId: randomUUID(),
    deviceId: randomUUID(),
    actorId: randomUUID(),
    deploymentId: "local-demo",
    commandType: "purchase.submit",
    commandSchemaVersion: 1,
    targetAggregateId: randomUUID(),
    occurredAt: new Date().toISOString(),
    capturedAt: new Date().toISOString(),
    timezone: "Africa/Kampala",
    clientVersion: "v1-test",
    dependencyOperationIds: [],
    payload,
    payloadHash: payloadHash(payload),
    ...overrides,
  };
}

describe("HB-TRACE sync envelope", () => {
  it("accepts a valid command and rejects a tampered payload", () => {
    const valid = validateSyncEnvelope(command());
    expect(valid.ok).toBe(true);

    const tampered = validateSyncEnvelope(command({ payloadHash: "0".repeat(64) }));
    expect(tampered).toEqual({ ok: false, message: "payloadHash does not match payload." });
  });

  it("hashes nested payloads independently of object insertion order", () => {
    expect(payloadHash({ outer: { second: 2, first: 1 } })).toBe(
      payloadHash({ outer: { first: 1, second: 2 } }),
    );
  });

  it("returns the same result for an idempotent retry", () => {
    const input = command();
    const parsed = validateSyncEnvelope(input);
    if (!parsed.ok) throw new Error(parsed.message);
    const first = localSyncLedger.apply(parsed.envelope);
    const second = localSyncLedger.apply(parsed.envelope);
    expect(second).toEqual(first);
  });

  it("does not process a command before its dependency", () => {
    const dependency = randomUUID();
    const input = command({ dependencyOperationIds: [dependency] });
    const parsed = validateSyncEnvelope(input);
    if (!parsed.ok) throw new Error(parsed.message);
    expect(localSyncLedger.apply(parsed.envelope).status).toBe("dependency pending");
  });

  it("re-evaluates a dependency-pending retry after the prerequisite succeeds", () => {
    const ledger = new LocalSyncLedger();
    const dependency = command({ operationId: "00000000-0000-4000-8000-000000000031" });
    const dependent = command({
      operationId: "00000000-0000-4000-8000-000000000032",
      dependencyOperationIds: [dependency.operationId as string],
    });
    const parsedDependency = validateSyncEnvelope(dependency);
    const parsedDependent = validateSyncEnvelope(dependent);
    if (!parsedDependency.ok || !parsedDependent.ok) throw new Error("Test commands should validate.");

    expect(ledger.apply(parsedDependent.envelope).status).toBe("dependency pending");
    expect(ledger.apply(parsedDependency.envelope).status).toBe("acknowledged");
    expect(ledger.apply(parsedDependent.envelope).status).toBe("acknowledged");
  });
});
