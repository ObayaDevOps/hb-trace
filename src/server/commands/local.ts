import {
  asApplicationUuid,
  asEntityId,
  createPurchase,
  createReceiptForPurchase,
  issueReceipt,
  markReceiptConfirmationUnavailable,
  Money,
  submitPurchase,
  confirmReceipt,
  type DomainRole,
} from "@/domain";
import { createHash, randomUUID } from "node:crypto";
import { canonicalJson } from "@/lib/canonical-json";
import {
  SYNC_PROTOCOL_VERSION,
  type SyncEnvelope,
  type SyncResult,
} from "@/lib/sync-types";
import {
  createInMemoryPersistence,
  PersistenceError,
  type JsonObject,
  type PersistenceAdapter,
  type PersistenceTransaction,
  type SyncOperationInput,
  type SyncOperationRecord,
} from "@/server/persistence";

export const LOCAL_DEMO_ORGANIZATION_ID = "00000000-0000-4000-8000-000000000002";

export type CommandActor = {
  readonly actorId: string;
  readonly roles: readonly string[];
  readonly organizationId?: string;
  readonly displayName?: string;
};

export type PurchaseCommandResult = {
  readonly operationId: string;
  readonly purchaseId: string;
  readonly receiptId: string;
  readonly receiptCode: string;
  readonly purchaseStatus: string;
  readonly receiptStatus: string;
  readonly persistence: "local-in-memory";
  readonly serverConfirmed: false;
};

type NormalizedPurchase = {
  readonly operationId: string;
  readonly purchaseId: string;
  readonly farmerReference: string;
  readonly farmerName: string;
  readonly apiaryReference: string;
  readonly apiaryName: string;
  readonly collectionDate: string;
  readonly quantityValue: string;
  readonly quantityUnit: "mg" | "g" | "kg" | "t";
  readonly grade: string;
  readonly sourceType: "purchase" | "harvest";
  readonly agreedAmount?: string;
  readonly currencyCode?: string;
  readonly paymentReference?: string;
  readonly receiptMode: "issue" | "confirmed" | "paper";
  readonly occurredAt: string;
  readonly capturedAt: string;
};

type PersistedPurchase = {
  readonly result: PurchaseCommandResult;
  readonly resultPayload: JsonObject;
};

const TERMINAL_SYNC_STATUSES = new Set(["acknowledged", "rejected", "conflicted"]);

function now(): string {
  return new Date().toISOString();
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required.`);
  }
  return value.trim();
}

function optionalText(value: unknown, field: string): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") throw new Error(`${field} must be supplied as exact text.`);
  const normalized = value.trim();
  if (normalized.length === 0) return undefined;
  return normalized;
}

function uuidText(value: string, field: string): string {
  try {
    return asApplicationUuid(value);
  } catch {
    throw new Error(`${field} must be an application UUIDv4.`);
  }
}

function dateOnly(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("collectionDate must be an ISO date.");
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error("collectionDate must be a valid calendar date.");
  }
  return value;
}

function instant(value: string, field: string): string {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z$/.test(value) || Number.isNaN(Date.parse(value))) {
    throw new Error(`${field} must be a valid UTC ISO instant.`);
  }
  return value;
}

function generatedReference(prefix: string, operationId: string): string {
  return `${prefix}-${createHash("sha256").update(operationId).digest("hex").slice(0, 12).toUpperCase()}`;
}

function jsonObject(value: Record<string, string | null | boolean>): JsonObject {
  return value;
}

function asJsonObject(value: Record<string, unknown>): JsonObject {
  return value as JsonObject;
}

function payloadHash(payload: Record<string, unknown>): string {
  return createHash("sha256").update(canonicalJson(payload)).digest("hex");
}

function safePayload(payload: NormalizedPurchase): JsonObject {
  return {
    farmerReference: payload.farmerReference,
    farmerName: payload.farmerName,
    apiaryReference: payload.apiaryReference,
    apiaryName: payload.apiaryName,
    collectionDate: payload.collectionDate,
    quantityValue: payload.quantityValue,
    quantityUnit: payload.quantityUnit,
    grade: payload.grade,
    sourceType: payload.sourceType,
    agreedAmount: payload.agreedAmount ?? null,
    currencyCode: payload.currencyCode ?? null,
    paymentReference: payload.paymentReference ?? null,
    receiptMode: payload.receiptMode,
  };
}

function roleFor(actor: CommandActor): DomainRole | undefined {
  if (actor.roles.includes("collection_procurement")) return "collection_staff";
  if (actor.roles.includes("supervisor")) return "supervisor";
  if (actor.roles.includes("administrator")) return "administrator";
  if (actor.roles.includes("production_staff")) return "production_staff";
  return undefined;
}

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message;
  return "The command could not be accepted.";
}

function errorType(error: unknown): string {
  if (error instanceof PersistenceError) return error.code.toUpperCase();
  return "VALIDATION_ERROR";
}

function resultStatusForError(error: unknown): "rejected" | "conflicted" {
  return error instanceof PersistenceError && error.code === "version_conflict" ? "conflicted" : "rejected";
}

function resultFromRecord(record: SyncOperationRecord): SyncResult {
  const resultPayload = record.resultPayload;
  const serverRecordId = typeof resultPayload?.purchaseId === "string" ? resultPayload.purchaseId : record.aggregateId ?? undefined;
  if (record.resultStatus === "dependency_pending" || record.resultStatus === "pending") {
    return {
      operationId: record.operationId,
      status: "dependency pending",
      errorType: record.errorType ?? "DEPENDENCY_PENDING",
      message: record.errorMessage ?? "A prerequisite operation has not completed.",
    };
  }
  return {
    operationId: record.operationId,
    status: record.resultStatus,
    serverRecordId,
    errorType: record.errorType ?? undefined,
    message: record.errorMessage ?? (record.resultStatus === "acknowledged" ? "Purchase and receipt committed in local mode." : undefined),
  };
}

function purchaseResultFromRecord(record: SyncOperationRecord): PurchaseCommandResult | null {
  if (record.resultStatus !== "acknowledged" || !record.resultPayload) return null;
  const payload = record.resultPayload;
  if (
    typeof payload.purchaseId !== "string" ||
    typeof payload.receiptId !== "string" ||
    typeof payload.receiptCode !== "string" ||
    typeof payload.purchaseStatus !== "string" ||
    typeof payload.receiptStatus !== "string"
  ) return null;
  return {
    operationId: record.operationId,
    purchaseId: payload.purchaseId,
    receiptId: payload.receiptId,
    receiptCode: payload.receiptCode,
    purchaseStatus: payload.purchaseStatus,
    receiptStatus: payload.receiptStatus,
    persistence: "local-in-memory",
    serverConfirmed: false,
  };
}

function normalizePurchasePayload(
  raw: Record<string, unknown>,
  ids: { readonly operationId: string; readonly purchaseId: string },
): NormalizedPurchase {
  const farmerReference = optionalText(raw.farmerReference, "farmerReference") ?? generatedReference("FARMER", ids.operationId);
  const farmerName = optionalText(raw.farmerName, "farmerName") ?? farmerReference;
  const apiaryReference = optionalText(raw.apiaryReference, "apiaryReference") ?? generatedReference("APIARY", ids.operationId);
  const apiaryName = optionalText(raw.apiaryName, "apiaryName") ?? apiaryReference;
  const collectionDate = dateOnly(requiredText(raw.collectionDate, "collectionDate"));
  const quantityValue = requiredText(raw.quantityValue ?? raw.quantityKg, "quantityValue");
  const quantityUnitValue = optionalText(raw.quantityUnit, "quantityUnit") ?? "kg";
  if (!["mg", "g", "kg", "t"].includes(quantityUnitValue)) throw new Error("quantityUnit must be a supported mass unit.");
  const grade = requiredText(raw.grade, "grade");
  const sourceType = optionalText(raw.sourceType ?? raw.purchaseType, "sourceType") ?? "purchase";
  if (sourceType !== "purchase" && sourceType !== "harvest") throw new Error("sourceType must be purchase or harvest.");
  const agreedAmount = optionalText(raw.agreedAmount ?? raw.agreedPrice, "agreedAmount");
  const currencyCode = optionalText(raw.currencyCode ?? raw.currency, "currencyCode")?.toUpperCase();
  if (agreedAmount && !currencyCode) throw new Error("currencyCode is required when an agreed amount is supplied.");
  if (!agreedAmount && currencyCode) throw new Error("currencyCode cannot be supplied without an agreed amount.");
  const receiptMode = optionalText(raw.receiptMode ?? raw.receiptState, "receiptMode") ?? "issue";
  if (!["issue", "confirmed", "paper"].includes(receiptMode)) throw new Error("receiptMode must be issue, confirmed or paper.");
  const occurredAt = instant(optionalText(raw.occurredAt, "occurredAt") ?? `${collectionDate}T00:00:00Z`, "occurredAt");
  const capturedAt = instant(optionalText(raw.capturedAt, "capturedAt") ?? now(), "capturedAt");

  return {
    operationId: ids.operationId,
    purchaseId: ids.purchaseId,
    farmerReference,
    farmerName,
    apiaryReference,
    apiaryName,
    collectionDate,
    quantityValue,
    quantityUnit: quantityUnitValue as NormalizedPurchase["quantityUnit"],
    grade,
    sourceType: sourceType as NormalizedPurchase["sourceType"],
    agreedAmount,
    currencyCode,
    paymentReference: optionalText(raw.paymentReference, "paymentReference"),
    receiptMode: receiptMode as NormalizedPurchase["receiptMode"],
    occurredAt,
    capturedAt,
  };
}

export class LocalCommandService {
  constructor(
    private readonly persistence: PersistenceAdapter,
    private readonly defaultOrganizationId = LOCAL_DEMO_ORGANIZATION_ID,
  ) {}

  async submitPurchase(raw: Record<string, unknown>, actor: CommandActor): Promise<PurchaseCommandResult> {
    const operationId = uuidText(
      typeof raw.operationId === "string" ? raw.operationId : asApplicationUuid(newEntityIdForCommand()),
      "operationId",
    );
    const purchaseId = uuidText(
      typeof raw.purchaseId === "string" ? raw.purchaseId : asApplicationUuid(newEntityIdForCommand()),
      "purchaseId",
    );
    const normalized = normalizePurchasePayload(raw, { operationId, purchaseId });
    const syncInput = this.createSyncInput(
      normalized,
      actor,
      typeof raw.deviceId === "string" ? raw.deviceId : newEntityIdForCommand(),
      typeof raw.deploymentId === "string" ? raw.deploymentId : "local-demo",
      typeof raw.timezone === "string" ? raw.timezone : "Africa/Kampala",
      typeof raw.clientVersion === "string" ? raw.clientVersion : "server-direct",
      [],
    );

    return this.persistence.withTransaction(async (transaction) => {
      const existing = await transaction.syncOperations.put(syncInput);
      if (existing.replayed && TERMINAL_SYNC_STATUSES.has(existing.record.resultStatus)) {
        const replay = purchaseResultFromRecord(existing.record);
        if (replay) return replay;
      }
      const persisted = await this.persistPurchase(transaction, normalized, actor);
      await transaction.syncOperations.complete(operationId, {
        resultStatus: "acknowledged",
        resultPayload: persisted.resultPayload,
      });
      return persisted.result;
    });
  }

  async processSyncEnvelope(envelope: SyncEnvelope, actor: CommandActor): Promise<SyncResult> {
    if (envelope.actorId !== actor.actorId) {
      return {
        operationId: envelope.operationId,
        status: "rejected",
        errorType: "ACTOR_MISMATCH",
        message: "The command actor does not match the authenticated staff session.",
      };
    }

    const organizationId = this.organizationId(actor);
    const operationInput = this.operationInput(envelope, organizationId);
    try {
      const normalized = envelope.commandType === "purchase.submit"
        ? normalizePurchasePayload(envelope.payload, {
            operationId: envelope.operationId,
            purchaseId: envelope.targetAggregateId,
          })
        : null;
      return await this.persistence.withTransaction(async (transaction) => {
        const existing = await transaction.syncOperations.put(operationInput);
        if (existing.replayed && TERMINAL_SYNC_STATUSES.has(existing.record.resultStatus)) {
          return resultFromRecord(existing.record);
        }

        const dependencyResult = await this.resolveDependencies(transaction, envelope.dependencyOperationIds, organizationId);
        if (dependencyResult) {
          const completed = await transaction.syncOperations.complete(envelope.operationId, dependencyResult);
          return resultFromRecord(completed);
        }

        if (!normalized) {
          const completed = await transaction.syncOperations.complete(envelope.operationId, {
            resultStatus: "rejected",
            errorType: "COMMAND_NOT_IMPLEMENTED",
            errorMessage: "This approved offline command has no local server handler yet.",
          });
          return resultFromRecord(completed);
        }

        const persisted = await this.persistPurchase(transaction, normalized, actor);
        const completed = await transaction.syncOperations.complete(envelope.operationId, {
          resultStatus: "acknowledged",
          resultPayload: persisted.resultPayload,
        });
        return resultFromRecord(completed);
      });
    } catch (error) {
      return this.persistRejectedOperation(operationInput, error);
    }
  }

  private organizationId(actor: CommandActor): string {
    return uuidText(actor.organizationId ?? this.defaultOrganizationId, "organizationId");
  }

  private operationInput(envelope: SyncEnvelope, organizationId: string): SyncOperationInput {
    return {
      operationId: uuidText(envelope.operationId, "operationId"),
      organizationId,
      actorId: uuidText(envelope.actorId, "actorId"),
      deviceId: envelope.deviceId,
      deploymentId: envelope.deploymentId,
      commandType: envelope.commandType,
      commandSchemaVersion: envelope.commandSchemaVersion,
      aggregateType: envelope.commandType === "purchase.submit" ? "purchase" : envelope.commandType.split(".")[0],
      aggregateId: uuidText(envelope.targetAggregateId, "targetAggregateId"),
      expectedVersion: envelope.expectedVersion ?? null,
      eventOccurrenceAt: envelope.occurredAt,
      clientCapturedAt: envelope.capturedAt,
      clientTimezone: envelope.timezone,
      clientVersion: envelope.clientVersion,
      dependencyOperationIds: envelope.dependencyOperationIds,
      payload: asJsonObject(envelope.payload),
      payloadHashSha256: envelope.payloadHash,
    };
  }

  private createSyncInput(
    normalized: NormalizedPurchase,
    actor: CommandActor,
    deviceId: string,
    deploymentId: string,
    timezone: string,
    clientVersion: string,
    dependencies: readonly string[],
  ): SyncOperationInput {
    const payload = safePayload(normalized);
    return {
      operationId: normalized.operationId,
      organizationId: this.organizationId(actor),
      actorId: uuidText(actor.actorId, "actorId"),
      deviceId: uuidText(deviceId, "deviceId"),
      deploymentId: requiredText(deploymentId, "deploymentId"),
      commandType: "purchase.submit",
      commandSchemaVersion: SYNC_PROTOCOL_VERSION,
      aggregateType: "purchase",
      aggregateId: normalized.purchaseId,
      expectedVersion: null,
      eventOccurrenceAt: normalized.occurredAt,
      clientCapturedAt: normalized.capturedAt,
      clientTimezone: requiredText(timezone, "timezone"),
      clientVersion: requiredText(clientVersion, "clientVersion"),
      dependencyOperationIds: [...dependencies],
      payload,
      payloadHashSha256: payloadHash(payload),
    };
  }

  private async resolveDependencies(
    transaction: PersistenceTransaction,
    dependencyIds: readonly string[],
    organizationId: string,
  ) {
    for (const dependencyId of dependencyIds) {
      const dependency = await transaction.syncOperations.get(dependencyId);
      if (!dependency) {
        return {
          resultStatus: "dependency_pending" as const,
          errorType: "DEPENDENCY_PENDING",
          errorMessage: `Waiting for dependency operation ${dependencyId}.`,
        };
      }
      if (dependency.organizationId !== organizationId) {
        return {
          resultStatus: "rejected" as const,
          errorType: "DEPENDENCY_SCOPE",
          errorMessage: "A dependency belongs to a different organization.",
        };
      }
      if (dependency.resultStatus === "pending" || dependency.resultStatus === "dependency_pending") {
        return {
          resultStatus: "dependency_pending" as const,
          errorType: "DEPENDENCY_PENDING",
          errorMessage: `Waiting for dependency operation ${dependencyId}.`,
        };
      }
      if (dependency.resultStatus !== "acknowledged") {
        return {
          resultStatus: "rejected" as const,
          errorType: "DEPENDENCY_REJECTED",
          errorMessage: `Dependency operation ${dependencyId} did not succeed.`,
        };
      }
    }
    return null;
  }

  private async persistRejectedOperation(operationInput: SyncOperationInput, error: unknown): Promise<SyncResult> {
    try {
      return await this.persistence.withTransaction(async (transaction) => {
        const existing = await transaction.syncOperations.put(operationInput);
        if (existing.replayed && TERMINAL_SYNC_STATUSES.has(existing.record.resultStatus)) {
          return resultFromRecord(existing.record);
        }
        const completed = await transaction.syncOperations.complete(operationInput.operationId, {
          resultStatus: resultStatusForError(error),
          errorType: errorType(error),
          errorMessage: errorMessage(error),
        });
        return resultFromRecord(completed);
      });
    } catch (recordingError) {
      return {
        operationId: operationInput.operationId,
        status: "rejected",
        errorType: errorType(recordingError),
        message: errorMessage(error),
      };
    }
  }

  private async persistPurchase(
    transaction: PersistenceTransaction,
    input: NormalizedPurchase,
    actor: CommandActor,
  ): Promise<PersistedPurchase> {
    const organizationId = this.organizationId(actor);
    await this.ensureOrganization(transaction, organizationId);
    await this.ensureActor(transaction, organizationId, actor);
    const farmer = await this.resolveFarmer(transaction, organizationId, input, actor);
    const apiary = await this.resolveApiary(transaction, organizationId, input, farmer.id, actor);
    const purchaseId = asEntityId("purchase", input.purchaseId);
    const agreedPrice = input.agreedAmount ? Money.from(input.agreedAmount, input.currencyCode as string, "agreed") : undefined;
    const purchase = submitPurchase(
      createPurchase({
        id: purchaseId,
        sourceType: input.sourceType,
        farmerId: asEntityId("farmer", farmer.id),
        apiaryId: asEntityId("apiary", apiary.id),
        collectionDate: input.collectionDate,
        quantity: { value: input.quantityValue, unit: input.quantityUnit },
        grade: input.grade,
        agreedPrice,
        paymentReference: input.paymentReference,
      }),
      {
        actorId: asApplicationUuid(actor.actorId),
        actorRole: roleFor(actor),
        occurredAt: input.occurredAt,
        deviceCapturedAt: input.capturedAt,
        serverCommittedAt: now(),
        reason: "Purchase/harvest submitted through the V1 command service.",
      },
    );
    const receiptId = asEntityId("receipt", newEntityIdForCommand());
    let receipt = issueReceipt(
      createReceiptForPurchase(purchase, {
        id: receiptId,
        farmerReference: input.farmerReference,
        transactionCode: `RCPT-${new Date(input.occurredAt).getUTCFullYear()}-${purchase.id.slice(0, 8).toUpperCase()}`,
      }),
      {
        actorId: asApplicationUuid(actor.actorId),
        actorRole: roleFor(actor),
        occurredAt: input.occurredAt,
        deviceCapturedAt: input.capturedAt,
        serverCommittedAt: now(),
        reason: "Receipt issued from the submitted purchase.",
      },
    );
    if (input.receiptMode === "confirmed") {
      receipt = confirmReceipt(receipt, {
        actorId: asApplicationUuid(actor.actorId),
        actorRole: roleFor(actor),
        occurredAt: input.occurredAt,
        serverCommittedAt: now(),
        reason: "Farmer confirmation recorded at capture.",
      });
    } else if (input.receiptMode === "paper") {
      receipt = markReceiptConfirmationUnavailable(receipt, {
        actorId: asApplicationUuid(actor.actorId),
        actorRole: roleFor(actor),
        occurredAt: input.occurredAt,
        serverCommittedAt: now(),
        reason: "Paper receipt supplied; confirmation remains unavailable.",
      });
    }

    const receivedAt = now();
    await transaction.records.insert("purchases", {
      id: purchase.id,
      organizationId,
      purchaseType: purchase.sourceType,
      farmerId: farmer.id,
      apiaryId: apiary.id,
      collectionLocationId: null,
      productKind: "honeycomb",
      grade: purchase.grade,
      quantityValue: purchase.quantity.value.toString(),
      quantityUnit: purchase.quantity.unit,
      canonicalQuantityValue: purchase.quantity.canonicalValue.toString(),
      canonicalQuantityUnit: purchase.quantity.canonicalUnit,
      agreedAmount: purchase.agreedPrice?.amount.toString() ?? null,
      paidAmount: null,
      currencyCode: purchase.agreedPrice?.currency ?? null,
      paymentStatus: purchase.agreedPrice ? "pending" : "not_applicable",
      paymentReference: purchase.paymentReference ?? null,
      status: purchase.state,
      occurredAt: input.occurredAt,
      capturedAt: input.capturedAt,
      receivedAt,
      committedAt: now(),
    });
    await transaction.records.insert("receipts", {
      id: receipt.id,
      organizationId,
      purchaseId: purchase.id,
      receiptCode: receipt.transactionCode,
      receiptStatus: receipt.state,
      receiptSnapshot: jsonObject({
        farmerReference: receipt.farmerReference,
        transactionCode: receipt.transactionCode,
        material: receipt.material,
        quantity: receipt.quantity.toString(),
        grade: receipt.grade,
        collectionDate: input.collectionDate,
        agreedAmount: purchase.agreedPrice?.amount.toString() ?? null,
        currencyCode: purchase.agreedPrice?.currency ?? null,
        paymentStatus: purchase.agreedPrice ? "pending" : "not_applicable",
      }),
      issuedAt: input.occurredAt,
      confirmedAt: receipt.state === "farmer_confirmed" ? input.occurredAt : null,
      disputedAt: null,
      closedAt: null,
    });

    await this.audit(transaction, organizationId, actor.actorId, input.operationId, "purchase.submitted", "purchase", purchase.id, {
      status: purchase.state,
      quantity: purchase.quantity.toString(),
      farmerReference: input.farmerReference,
      apiaryReference: input.apiaryReference,
    });
    await this.audit(transaction, organizationId, actor.actorId, input.operationId, "receipt.issued", "receipt", receipt.id, {
      status: receipt.state,
      receiptCode: receipt.transactionCode,
      purchaseId: purchase.id,
    });

    const result: PurchaseCommandResult = {
      operationId: input.operationId,
      purchaseId: purchase.id,
      receiptId: receipt.id,
      receiptCode: receipt.transactionCode,
      purchaseStatus: purchase.state,
      receiptStatus: receipt.state,
      persistence: "local-in-memory",
      serverConfirmed: false,
    };
    return {
      result,
      resultPayload: {
        operationId: result.operationId,
        purchaseId: result.purchaseId,
        receiptId: result.receiptId,
        receiptCode: result.receiptCode,
        purchaseStatus: result.purchaseStatus,
        receiptStatus: result.receiptStatus,
        persistence: result.persistence,
        serverConfirmed: result.serverConfirmed,
      },
    };
  }

  private async ensureOrganization(transaction: PersistenceTransaction, organizationId: string): Promise<void> {
    if (await transaction.records.get("organizations", organizationId)) return;
    await transaction.records.insert("organizations", {
      id: organizationId,
      organizationId,
      legalName: "Humble Beeing Honey",
      displayName: "Humble Beeing",
      status: "active",
    });
  }

  private async ensureActor(transaction: PersistenceTransaction, organizationId: string, actor: CommandActor): Promise<void> {
    const actorId = uuidText(actor.actorId, "actorId");
    const existing = await transaction.records.get("actors", actorId);
    if (existing) {
      if (existing.organizationId !== organizationId) throw new PersistenceError("invalid_state", "Actor is outside the command organization.");
      return;
    }
    await transaction.records.insert("actors", {
      id: actorId,
      organizationId,
      actorKind: "person",
      status: "active",
      displayName: actor.displayName ?? "Authenticated staff member",
      legalName: null,
      phone: null,
      email: null,
      timezone: "Africa/Kampala",
    });
  }

  private async resolveFarmer(
    transaction: PersistenceTransaction,
    organizationId: string,
    input: NormalizedPurchase,
    actor: CommandActor,
  ) {
    const farmers = await transaction.records.list("farmers", { organizationId });
    const existing = farmers.find((farmer) => farmer.farmerReference.toLowerCase() === input.farmerReference.toLowerCase());
    if (existing) return existing;
    const farmerActorId = newEntityIdForCommand();
    const farmerId = newEntityIdForCommand();
    await transaction.records.insert("actors", {
      id: farmerActorId,
      organizationId,
      actorKind: "person",
      status: "active",
      displayName: input.farmerName,
      legalName: null,
      phone: null,
      email: null,
      timezone: "Africa/Kampala",
    });
    const farmer = await transaction.records.insert("farmers", {
      id: farmerId,
      organizationId,
      actorId: farmerActorId,
      farmerReference: input.farmerReference,
      status: "active",
      notes: null,
    });
    await this.audit(transaction, organizationId, actor.actorId, input.operationId, "farmer.created", "farmer", farmer.id, {
      farmerReference: farmer.farmerReference,
    });
    return farmer;
  }

  private async resolveApiary(
    transaction: PersistenceTransaction,
    organizationId: string,
    input: NormalizedPurchase,
    farmerId: string,
    actor: CommandActor,
  ) {
    const apiaries = await transaction.records.list("apiaries", { organizationId });
    const existing = apiaries.find((apiary) => apiary.apiaryReference.toLowerCase() === input.apiaryReference.toLowerCase());
    if (existing) {
      if (existing.farmerId !== farmerId) throw new PersistenceError("invalid_state", "Apiary reference is already linked to another farmer.");
      return existing;
    }
    const apiary = await transaction.records.insert("apiaries", {
      id: newEntityIdForCommand(),
      organizationId,
      farmerId,
      locationId: null,
      apiaryReference: input.apiaryReference,
      name: input.apiaryName,
      status: "active",
      hiveCount: null,
      notes: null,
    });
    await this.audit(transaction, organizationId, actor.actorId, input.operationId, "apiary.created", "apiary", apiary.id, {
      apiaryReference: apiary.apiaryReference,
      farmerId,
    });
    return apiary;
  }

  private async audit(
    transaction: PersistenceTransaction,
    organizationId: string,
    actorId: string,
    operationId: string,
    eventType: string,
    subjectType: string,
    subjectId: string,
    afterState: Record<string, string | null | boolean>,
  ): Promise<void> {
    await transaction.auditEvents.append({
      id: newEntityIdForCommand(),
      organizationId,
      eventType,
      actorId,
      subjectType,
      subjectId,
      operationId,
      correlationId: operationId,
      occurrenceAt: now(),
      capturedAt: now(),
      reason: "V1 local command service",
      beforeState: null,
      afterState: jsonObject(afterState),
      metadata: {},
    });
  }
}

function newEntityIdForCommand(): string {
  return randomUUID();
}

const globalState = globalThis as typeof globalThis & {
  __hbTraceLocalCommandService?: LocalCommandService;
  __hbTraceLocalPersistence?: PersistenceAdapter;
};

export function getLocalPersistenceAdapter(): PersistenceAdapter {
  if (!globalState.__hbTraceLocalPersistence) {
    globalState.__hbTraceLocalPersistence = createInMemoryPersistence();
  }
  return globalState.__hbTraceLocalPersistence;
}

export function getLocalCommandService(): LocalCommandService {
  if (!globalState.__hbTraceLocalCommandService) {
    globalState.__hbTraceLocalCommandService = new LocalCommandService(getLocalPersistenceAdapter());
  }
  return globalState.__hbTraceLocalCommandService;
}
