import { createHash, randomUUID } from "node:crypto";
import { offlineCommandTypes, SYNC_PROTOCOL_VERSION, type SyncEnvelope, type OfflineCommandType, type SyncResult } from "@/lib/sync-types";
import { canonicalJson } from "@/lib/canonical-json";

export { offlineCommandTypes, SYNC_PROTOCOL_VERSION } from "@/lib/sync-types";
export type { SyncEnvelope, OfflineCommandType, SyncResult, SyncResultStatus } from "@/lib/sync-types";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const hashPattern = /^[a-f0-9]{64}$/i;

export function payloadHash(payload: Record<string, unknown>) {
  return createHash("sha256").update(canonicalJson(payload)).digest("hex");
}

const UTC_INSTANT_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z$/;

function isUtcInstant(value: unknown): value is string {
  return typeof value === "string" && UTC_INSTANT_PATTERN.test(value) && !Number.isNaN(Date.parse(value));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateSyncEnvelope(value: unknown): { ok: true; envelope: SyncEnvelope } | { ok: false; message: string } {
  if (!value || typeof value !== "object") return { ok: false, message: "Command envelope must be an object." };
  const input = value as Partial<SyncEnvelope>;
  if (!uuidPattern.test(String(input.operationId ?? ""))) return { ok: false, message: "operationId must be a UUIDv4." };
  if (!uuidPattern.test(String(input.deviceId ?? ""))) return { ok: false, message: "deviceId must be a UUIDv4." };
  if (!uuidPattern.test(String(input.actorId ?? ""))) return { ok: false, message: "actorId must be a UUIDv4." };
  if (!uuidPattern.test(String(input.targetAggregateId ?? ""))) return { ok: false, message: "targetAggregateId must be a UUIDv4." };
  if (!hashPattern.test(String(input.payloadHash ?? ""))) return { ok: false, message: "payloadHash must be a SHA-256 hex digest." };
  if (!isNonEmptyString(input.deploymentId)) return { ok: false, message: "deploymentId is required." };
  if (!isUtcInstant(input.occurredAt)) return { ok: false, message: "occurredAt must be a UTC ISO-8601 instant." };
  if (!isUtcInstant(input.capturedAt)) return { ok: false, message: "capturedAt must be a UTC ISO-8601 instant." };
  if (!isNonEmptyString(input.timezone)) return { ok: false, message: "timezone is required." };
  if (!isNonEmptyString(input.clientVersion)) return { ok: false, message: "clientVersion is required." };
  if (input.expectedVersion !== undefined && (!Number.isInteger(input.expectedVersion) || input.expectedVersion < 0)) {
    return { ok: false, message: "expectedVersion must be a non-negative integer when supplied." };
  }
  if (!Array.isArray(input.dependencyOperationIds) || input.dependencyOperationIds.some((id) => !uuidPattern.test(String(id)))) {
    return { ok: false, message: "dependencyOperationIds must contain UUIDv4 values." };
  }
  if (new Set(input.dependencyOperationIds).size !== input.dependencyOperationIds.length) {
    return { ok: false, message: "dependencyOperationIds must not contain duplicates." };
  }
  if (!offlineCommandTypes.includes(input.commandType as OfflineCommandType)) return { ok: false, message: "Command type is not approved for offline capture." };
  if (input.commandSchemaVersion !== SYNC_PROTOCOL_VERSION) return { ok: false, message: "Unsupported command schema version." };
  if (!input.payload || typeof input.payload !== "object" || Array.isArray(input.payload)) return { ok: false, message: "payload must be an object." };
  try {
    if (payloadHash(input.payload as Record<string, unknown>) !== input.payloadHash) return { ok: false, message: "payloadHash does not match payload." };
  } catch {
    return { ok: false, message: "payload must contain only JSON-serializable values." };
  }
  if (input.localAttachmentReferences !== undefined && (!Array.isArray(input.localAttachmentReferences) || input.localAttachmentReferences.some((reference) => !isNonEmptyString(reference)))) {
    return { ok: false, message: "localAttachmentReferences must contain non-empty strings." };
  }

  return {
    ok: true,
    envelope: {
      operationId: String(input.operationId),
      deviceId: String(input.deviceId),
      actorId: String(input.actorId),
      deploymentId: input.deploymentId,
      commandType: input.commandType as OfflineCommandType,
      commandSchemaVersion: input.commandSchemaVersion,
      targetAggregateId: String(input.targetAggregateId),
      expectedVersion: input.expectedVersion,
      occurredAt: input.occurredAt,
      capturedAt: input.capturedAt,
      timezone: input.timezone,
      clientVersion: input.clientVersion,
      dependencyOperationIds: input.dependencyOperationIds as string[],
      payload: input.payload as Record<string, unknown>,
      payloadHash: String(input.payloadHash),
      localAttachmentReferences: input.localAttachmentReferences,
    },
  };
}

export class LocalSyncLedger {
  private readonly operations = new Map<string, { hash: string; result: SyncResult }>();

  apply(envelope: SyncEnvelope): SyncResult {
    const previous = this.operations.get(envelope.operationId);
    if (previous && previous.result.status !== "dependency pending") {
      if (previous.hash !== envelope.payloadHash) {
        return {
          operationId: envelope.operationId,
          status: "rejected",
          errorType: "IDEMPOTENCY_KEY_REUSE",
          message: "The operation ID was already used with a different payload.",
        };
      }
      return previous.result;
    }
    if (previous && previous.hash !== envelope.payloadHash) {
      return {
        operationId: envelope.operationId,
        status: "rejected",
        errorType: "IDEMPOTENCY_KEY_REUSE",
        message: "The operation ID was already used with a different payload.",
      };
    }

    for (const dependencyId of envelope.dependencyOperationIds) {
      const dependency = this.operations.get(dependencyId);
      if (!dependency) {
        const result: SyncResult = {
          operationId: envelope.operationId,
          status: "dependency pending",
          errorType: "DEPENDENCY_PENDING",
          message: `Waiting for dependency operation ${dependencyId}.`,
        };
        this.operations.set(envelope.operationId, { hash: envelope.payloadHash, result });
        return result;
      }
      if (dependency.result.status !== "acknowledged") {
        const result: SyncResult = {
          operationId: envelope.operationId,
          status: "rejected",
          errorType: "DEPENDENCY_REJECTED",
          message: `Dependency operation ${dependencyId} did not succeed.`,
        };
        this.operations.set(envelope.operationId, { hash: envelope.payloadHash, result });
        return result;
      }
    }

    const result: SyncResult = {
      operationId: envelope.operationId,
      status: "acknowledged",
      serverRecordId: envelope.targetAggregateId || randomUUID(),
      message: "Accepted by the local demo ledger.",
    };
    this.operations.set(envelope.operationId, { hash: envelope.payloadHash, result });
    return result;
  }
}

const globalLedger = globalThis as typeof globalThis & { __hbTraceSyncLedger?: LocalSyncLedger };
export const localSyncLedger = globalLedger.__hbTraceSyncLedger ?? new LocalSyncLedger();
globalLedger.__hbTraceSyncLedger = localSyncLedger;
