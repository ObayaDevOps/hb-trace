"use client";

import Dexie, { type Table } from "dexie";
import {
  offlineCommandTypes,
  SYNC_PROTOCOL_VERSION,
  type OfflineCommandType,
  type SyncEnvelope,
  type SyncResult,
} from "@/lib/sync-types";
import { canonicalJson } from "@/lib/canonical-json";

export type LocalOperationStatus =
  | "pending locally"
  | "sending"
  | "acknowledged"
  | "rejected"
  | "conflicted"
  | "dependency pending";

export type StoredOperation = SyncEnvelope & {
  localStatus: LocalOperationStatus;
  createdAt: string;
  result?: SyncResult;
};

class OutboxDatabase extends Dexie {
  operations!: Table<StoredOperation, string>;

  constructor() {
    super("hb-trace-offline");
    this.version(1).stores({
      operations: "operationId, localStatus, createdAt, commandType",
    });
  }
}

const database = new OutboxDatabase();

function browserUuid() {
  return crypto.randomUUID();
}

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getDeviceId() {
  const key = "hb-trace-device-id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const created = browserUuid();
  window.localStorage.setItem(key, created);
  return created;
}

export async function queueOfflineCommand(
  commandType: OfflineCommandType,
  payload: Record<string, unknown>,
  options: {
    actorId: string;
    targetAggregateId?: string;
    dependencyOperationIds?: string[];
    localAttachmentReferences?: string[];
  },
) {
  if (!offlineCommandTypes.includes(commandType)) throw new Error("Command is not approved for offline capture.");
  const now = new Date().toISOString();
  const envelope: SyncEnvelope = {
    operationId: browserUuid(),
    deviceId: getDeviceId(),
    actorId: options.actorId,
    deploymentId: "local-demo",
    commandType,
    commandSchemaVersion: SYNC_PROTOCOL_VERSION,
    targetAggregateId: options.targetAggregateId ?? browserUuid(),
    occurredAt: now,
    capturedAt: now,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Kampala",
    clientVersion: "v1-local",
    dependencyOperationIds: options.dependencyOperationIds ?? [],
    payload,
    payloadHash: await digest(canonicalJson(payload)),
    localAttachmentReferences: options.localAttachmentReferences,
  };
  const stored: StoredOperation = { ...envelope, localStatus: "pending locally", createdAt: now };
  await database.operations.add(stored);
  return stored;
}

export async function listOfflineOperations() {
  return database.operations.orderBy("createdAt").toArray();
}

export async function pendingOfflineOperations() {
  return database.operations
    .where("localStatus")
    .anyOf(["pending locally", "rejected", "conflicted", "dependency pending"])
    .sortBy("createdAt");
}

export async function syncOfflineOperations() {
  const operations = await database.operations
    .where("localStatus")
    .anyOf(["pending locally", "sending", "dependency pending"])
    .sortBy("createdAt");
  if (operations.length === 0) return [];

  const results: SyncResult[] = [];
  for (const operation of operations) {
    await database.operations.update(operation.operationId, { localStatus: "sending" });
    try {
      const response = await fetch("/api/v1/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operation),
      });
      const body = (await response.json().catch(() => ({}))) as { data?: SyncResult[] };
      if (!response.ok && [401, 403, 429, 500, 503].includes(response.status)) {
        await database.operations.update(operation.operationId, { localStatus: "pending locally" });
        break;
      }
      const result = body.data?.[0] ?? {
        operationId: operation.operationId,
        status: "rejected" as const,
        errorType: "INVALID_SERVER_RESPONSE",
        message: "The server returned no operation result.",
      };
      results.push(result);
      await database.operations.update(operation.operationId, {
        localStatus: result.status,
        result,
      });
    } catch {
      await database.operations.update(operation.operationId, { localStatus: "pending locally" });
      break;
    }
  }
  return results;
}

export async function clearAcknowledgedOfflineOperations() {
  await database.operations.where("localStatus").equals("acknowledged").delete();
}
