export const SYNC_PROTOCOL_VERSION = 1;
export const LOCAL_DEMO_ACTOR_ID = "00000000-0000-4000-8000-000000000001";

export const offlineCommandTypes = [
  "farmer.create",
  "apiary.create",
  "purchase.submit",
  "receipt.create",
  "receipt.acknowledge",
  "receipt.dispute",
  "identifier.fallback.assign",
  "attachment.queue",
] as const;

export type OfflineCommandType = (typeof offlineCommandTypes)[number];
export type SyncResultStatus = "acknowledged" | "rejected" | "conflicted" | "dependency pending";

export type SyncEnvelope = {
  operationId: string;
  deviceId: string;
  actorId: string;
  deploymentId: string;
  commandType: OfflineCommandType;
  commandSchemaVersion: number;
  targetAggregateId: string;
  expectedVersion?: number;
  occurredAt: string;
  capturedAt: string;
  timezone: string;
  clientVersion: string;
  dependencyOperationIds: string[];
  payload: Record<string, unknown>;
  payloadHash: string;
  localAttachmentReferences?: string[];
};

export type SyncResult = {
  operationId: string;
  status: SyncResultStatus;
  serverRecordId?: string;
  errorType?: string;
  message?: string;
};
