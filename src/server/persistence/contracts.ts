/**
 * Provider-neutral persistence ports for the V1 walking skeleton.
 *
 * These types intentionally contain application IDs and JSON data only. A
 * Supabase, PostgreSQL, test, or future provider adapter can implement the
 * same port without leaking provider IDs or SDK types into application code.
 */

export type PersistenceId = string;
export type PersistenceTimestamp = string;

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | readonly JsonValue[];
export interface JsonObject {
  readonly [key: string]: JsonValue;
}

export interface StoredRecord {
  readonly id: PersistenceId;
  readonly organizationId: PersistenceId;
  readonly createdAt: PersistenceTimestamp;
  readonly updatedAt: PersistenceTimestamp;
  readonly version: number;
}

export interface OrganizationRecord extends StoredRecord {
  readonly legalName: string;
  readonly displayName: string;
  readonly status: string;
}

export interface LocationRecord extends StoredRecord {
  readonly parentLocationId: PersistenceId | null;
  readonly locationKind: string;
  readonly name: string;
  readonly countryCode: string | null;
  readonly regionName: string | null;
  readonly districtName: string | null;
  readonly subcountyName: string | null;
  readonly addressText: string | null;
  readonly latitude: number | null;
  readonly longitude: number | null;
  readonly coordinatePrecisionM: number | null;
  readonly publicLabel: string | null;
}

export interface FacilityRecord extends StoredRecord {
  readonly locationId: PersistenceId | null;
  readonly facilityCode: string;
  readonly name: string;
  readonly status: string;
}

export interface ActorRecord extends StoredRecord {
  readonly actorKind: string;
  readonly status: string;
  readonly displayName: string;
  readonly legalName: string | null;
  readonly phone: string | null;
  readonly email: string | null;
  readonly timezone: string;
}

export interface RoleRecord extends StoredRecord {
  readonly code: string;
  readonly name: string;
  readonly description: string | null;
}

export interface FarmerRecord extends StoredRecord {
  readonly actorId: PersistenceId;
  readonly farmerReference: string;
  readonly status: string;
  readonly notes: string | null;
}

export interface ApiaryRecord extends StoredRecord {
  readonly farmerId: PersistenceId;
  readonly locationId: PersistenceId | null;
  readonly apiaryReference: string;
  readonly name: string | null;
  readonly status: string;
  readonly hiveCount: number | null;
  readonly notes: string | null;
}

export interface PurchaseRecord extends StoredRecord {
  readonly purchaseType: 'purchase' | 'harvest';
  readonly farmerId: PersistenceId;
  readonly apiaryId: PersistenceId | null;
  readonly collectionLocationId: PersistenceId | null;
  readonly productKind: string;
  readonly grade: string | null;
  readonly quantityValue: string;
  readonly quantityUnit: string;
  readonly canonicalQuantityValue: string;
  readonly canonicalQuantityUnit: string;
  readonly agreedAmount: string | null;
  readonly paidAmount: string | null;
  readonly currencyCode: string | null;
  readonly paymentStatus: string;
  readonly paymentReference: string | null;
  readonly status: string;
  readonly occurredAt: PersistenceTimestamp;
  readonly capturedAt: PersistenceTimestamp;
  readonly receivedAt: PersistenceTimestamp;
  readonly committedAt: PersistenceTimestamp | null;
}

export interface ReceiptRecord extends StoredRecord {
  readonly purchaseId: PersistenceId;
  readonly receiptCode: string;
  readonly receiptStatus: string;
  readonly receiptSnapshot: JsonObject;
  readonly issuedAt: PersistenceTimestamp | null;
  readonly confirmedAt: PersistenceTimestamp | null;
  readonly disputedAt: PersistenceTimestamp | null;
  readonly closedAt: PersistenceTimestamp | null;
}

export interface TraceableLotRecord extends StoredRecord {
  readonly lotReference: string | null;
  readonly materialKind: string;
  readonly lifecycleState: string;
  readonly qualityDisposition: string;
  readonly initialQuantityValue: string;
  readonly initialQuantityUnit: string;
  readonly canonicalQuantityValue: string;
  readonly canonicalQuantityUnit: string;
  readonly currentLocationId: PersistenceId | null;
  readonly occurredAt: PersistenceTimestamp;
  readonly committedAt: PersistenceTimestamp | null;
}

export interface ContainerRecord extends StoredRecord {
  readonly containerReference: string | null;
  readonly containerKind: string;
  readonly status: string;
  readonly capacityValue: string | null;
  readonly capacityUnit: string | null;
  readonly currentLocationId: PersistenceId | null;
}

export interface TransformationRecord extends StoredRecord {
  readonly transformationReference: string | null;
  readonly transformationType: string;
  readonly status: 'draft' | 'committed' | 'reversed';
  readonly facilityId: PersistenceId | null;
  readonly operatorActorId: PersistenceId | null;
  readonly ruleVersion: string;
  readonly occurredAt: PersistenceTimestamp;
  readonly capturedAt: PersistenceTimestamp;
  readonly receivedAt: PersistenceTimestamp;
  readonly committedAt: PersistenceTimestamp | null;
  readonly reversalOfTransformationId: PersistenceId | null;
  readonly notes: string | null;
}

export interface MeasurementRecord extends StoredRecord {
  readonly lotId: PersistenceId;
  readonly measurementType: string;
  readonly valueNumeric: string | null;
  readonly valueUnit: string | null;
  readonly normalizedValueNumeric: string | null;
  readonly normalizedValueUnit: string | null;
  readonly resultText: string | null;
  readonly method: string | null;
  readonly sourceType: 'manual' | 'device' | 'laboratory';
  readonly status: string;
  readonly instrumentReference: string | null;
  readonly laboratoryName: string | null;
  readonly externalReference: string | null;
  readonly measuredAt: PersistenceTimestamp;
  readonly capturedAt: PersistenceTimestamp;
  readonly receivedAt: PersistenceTimestamp;
}

export interface QualityReviewRecord extends StoredRecord {
  readonly lotId: PersistenceId;
  readonly reviewType: string;
  readonly disposition: 'pending' | 'held' | 'released' | 'rejected' | 'recalled';
  readonly decisionReason: string | null;
  readonly ruleSetVersion: string | null;
  readonly reviewedByActorId: PersistenceId | null;
  readonly reviewedAt: PersistenceTimestamp | null;
  readonly supersedesReviewId: PersistenceId | null;
  readonly isCurrent: boolean;
}

export interface PackagingBatchRecord extends StoredRecord {
  readonly internalBatchCode: string;
  readonly externalLotCode: string | null;
  readonly productMaterialKind: string;
  readonly packageSizeValue: string;
  readonly packageSizeUnit: string;
  readonly packageCount: number;
  readonly packedQuantityValue: string;
  readonly packedQuantityUnit: string;
  readonly status: string;
  readonly facilityId: PersistenceId | null;
  readonly packagingDate: string;
  readonly bestBeforeDate: string | null;
  readonly labelReference: string | null;
  readonly committedAt: PersistenceTimestamp | null;
}

export interface PublicBatchCodeRecord extends StoredRecord {
  readonly packagingBatchId: PersistenceId;
  readonly code: string;
  readonly status: 'active' | 'retired';
  readonly issuedAt: PersistenceTimestamp;
  readonly retiredAt: PersistenceTimestamp | null;
}

export interface PublicationRevisionRecord extends StoredRecord {
  readonly packagingBatchId: PersistenceId;
  readonly publicBatchCodeId: PersistenceId;
  readonly revisionNumber: number;
  readonly status: 'draft' | 'approved' | 'published' | 'withdrawn' | 'superseded';
  readonly snapshot: JsonObject;
  readonly snapshotSha256: string | null;
  readonly approvedByActorId: PersistenceId | null;
  readonly approvedAt: PersistenceTimestamp | null;
  readonly publishedAt: PersistenceTimestamp | null;
  readonly withdrawnAt: PersistenceTimestamp | null;
  readonly supersedesRevisionId: PersistenceId | null;
}

export type ImportBatchStatus =
  | 'uploaded'
  | 'validated'
  | 'correction_required'
  | 'ready'
  | 'committed'
  | 'completed'
  | 'partially_rejected';

export type ImportRowOutcome = 'pending' | 'created' | 'matched' | 'rejected' | 'skipped';
export type ImportDuplicateDecision = 'create' | 'match' | 'skip';

export interface ImportBatchRecord extends StoredRecord {
  readonly importType: 'farmers' | 'apiaries';
  readonly templateVersion: string;
  readonly originalAssetId: PersistenceId | null;
  readonly sourceSha256: string;
  readonly uploadedByActorId: PersistenceId | null;
  readonly status: ImportBatchStatus;
  readonly rowCount: number;
  readonly createdCount: number;
  readonly matchedCount: number;
  readonly rejectedCount: number;
  readonly skippedCount: number;
  readonly commitOperationId: PersistenceId | null;
}

export interface ImportRowRecord {
  readonly id: PersistenceId;
  readonly organizationId: PersistenceId;
  readonly importBatchId: PersistenceId;
  readonly rowNumber: number;
  readonly rawValues: JsonObject;
  readonly normalizedValues: JsonObject | null;
  readonly outcome: ImportRowOutcome;
  readonly errorDetails: JsonObject;
  readonly matchedRecordType: string | null;
  readonly matchedRecordId: PersistenceId | null;
  readonly duplicateDecision: ImportDuplicateDecision | null;
  readonly duplicateCandidateIds: readonly PersistenceId[];
  readonly createdAt: PersistenceTimestamp;
}

export interface AssetMetadataRecord extends StoredRecord {
  readonly provider: string;
  readonly providerAssetId: string | null;
  readonly providerObjectKey: string | null;
  readonly sha256: string;
  readonly mediaType: string;
  readonly byteSize: number;
  readonly originalFilename: string | null;
  readonly visibility: 'private' | 'public';
  readonly ingestionState: 'quarantined' | 'verifying' | 'available' | 'rejected' | 'deleted';
  readonly retentionClass: string;
  readonly pageCount: number | null;
  readonly providerMetadata: JsonObject;
  readonly uploadedByActorId: PersistenceId | null;
  readonly capturedAt: PersistenceTimestamp | null;
  readonly uploadedAt: PersistenceTimestamp | null;
  readonly verifiedAt: PersistenceTimestamp | null;
}

export interface PersistenceEntityMap {
  organizations: OrganizationRecord;
  locations: LocationRecord;
  facilities: FacilityRecord;
  actors: ActorRecord;
  roles: RoleRecord;
  farmers: FarmerRecord;
  apiaries: ApiaryRecord;
  purchases: PurchaseRecord;
  receipts: ReceiptRecord;
  traceableLots: TraceableLotRecord;
  containers: ContainerRecord;
  transformations: TransformationRecord;
  measurements: MeasurementRecord;
  qualityReviews: QualityReviewRecord;
  packagingBatches: PackagingBatchRecord;
  publicBatchCodes: PublicBatchCodeRecord;
  publicationRevisions: PublicationRevisionRecord;
}

export type PersistenceEntityName = keyof PersistenceEntityMap;

export type NewRecord<T extends StoredRecord> = Omit<T, 'createdAt' | 'updatedAt' | 'version'> &
  Partial<Pick<T, 'createdAt' | 'updatedAt' | 'version'>>;

export type RecordPatch<T extends StoredRecord> = Partial<
  Omit<T, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'version'>
>;

export interface RecordQuery {
  readonly organizationId?: PersistenceId;
  readonly limit?: number;
}

export interface RecordRepository {
  get<K extends PersistenceEntityName>(
    entity: K,
    id: PersistenceId,
  ): Promise<PersistenceEntityMap[K] | null>;
  list<K extends PersistenceEntityName>(
    entity: K,
    query?: RecordQuery,
  ): Promise<readonly PersistenceEntityMap[K][]>;
  insert<K extends PersistenceEntityName>(
    entity: K,
    record: NewRecord<PersistenceEntityMap[K]>,
  ): Promise<PersistenceEntityMap[K]>;
  update<K extends PersistenceEntityName>(
    entity: K,
    id: PersistenceId,
    patch: RecordPatch<PersistenceEntityMap[K]>,
    expectedVersion?: number,
  ): Promise<PersistenceEntityMap[K]>;
}

export type SyncOperationStatus =
  | 'pending'
  | 'acknowledged'
  | 'rejected'
  | 'conflicted'
  | 'dependency_pending';

export interface SyncOperationInput {
  readonly operationId: PersistenceId;
  readonly organizationId: PersistenceId;
  readonly actorId: PersistenceId | null;
  readonly deviceId: string;
  readonly deploymentId: string;
  readonly commandType: string;
  readonly commandSchemaVersion: number;
  readonly aggregateType: string;
  readonly aggregateId: PersistenceId | null;
  readonly expectedVersion: number | null;
  readonly eventOccurrenceAt: PersistenceTimestamp;
  readonly clientCapturedAt: PersistenceTimestamp;
  readonly clientTimezone: string;
  readonly clientVersion: string;
  readonly dependencyOperationIds: readonly PersistenceId[];
  readonly payload: JsonObject;
  readonly payloadHashSha256: string;
}

export interface SyncOperationRecord extends StoredRecord {
  readonly operationId: PersistenceId;
  readonly actorId: PersistenceId | null;
  readonly deviceId: string;
  readonly deploymentId: string;
  readonly commandType: string;
  readonly commandSchemaVersion: number;
  readonly aggregateType: string;
  readonly aggregateId: PersistenceId | null;
  readonly expectedVersion: number | null;
  readonly eventOccurrenceAt: PersistenceTimestamp;
  readonly clientCapturedAt: PersistenceTimestamp;
  readonly clientTimezone: string;
  readonly clientVersion: string;
  readonly dependencyOperationIds: readonly PersistenceId[];
  readonly payload: JsonObject;
  readonly payloadHashSha256: string;
  readonly resultStatus: SyncOperationStatus;
  readonly resultPayload: JsonObject | null;
  readonly errorType: string | null;
  readonly errorMessage: string | null;
  readonly completedAt: PersistenceTimestamp | null;
  readonly receivedAt: PersistenceTimestamp;
}

export interface SyncOperationCompletion {
  readonly resultStatus: Exclude<SyncOperationStatus, 'pending'>;
  readonly resultPayload?: JsonObject | null;
  readonly errorType?: string | null;
  readonly errorMessage?: string | null;
}

export interface SyncOperationRepository {
  /** Return the existing result for a repeated operation ID and matching hash. */
  put(input: SyncOperationInput): Promise<{ readonly record: SyncOperationRecord; readonly replayed: boolean }>;
  get(operationId: PersistenceId): Promise<SyncOperationRecord | null>;
  complete(operationId: PersistenceId, completion: SyncOperationCompletion): Promise<SyncOperationRecord>;
}

export interface AuditEventInput {
  readonly id: PersistenceId;
  readonly organizationId: PersistenceId;
  readonly eventType: string;
  readonly actorId: PersistenceId | null;
  readonly subjectType: string;
  readonly subjectId: PersistenceId | null;
  readonly operationId: PersistenceId | null;
  readonly correlationId: PersistenceId | null;
  readonly occurrenceAt: PersistenceTimestamp;
  readonly capturedAt: PersistenceTimestamp | null;
  readonly reason: string | null;
  readonly beforeState: JsonObject | null;
  readonly afterState: JsonObject | null;
  readonly metadata: JsonObject;
}

export interface AuditEventRecord extends AuditEventInput {
  readonly recordedAt: PersistenceTimestamp;
}

export interface AuditEventQuery {
  readonly organizationId?: PersistenceId;
  readonly subjectType?: string;
  readonly subjectId?: PersistenceId;
  readonly limit?: number;
}

export interface AuditEventRepository {
  append(event: AuditEventInput): Promise<AuditEventRecord>;
  list(query?: AuditEventQuery): Promise<readonly AuditEventRecord[]>;
}

export interface AssetLinkInput {
  readonly id: PersistenceId;
  readonly assetId: PersistenceId;
  readonly subjectType: string;
  readonly subjectId: PersistenceId;
  readonly linkType: string;
  readonly pageNumber?: number | null;
  readonly displayOrder?: number;
  readonly createdByActorId?: PersistenceId | null;
}

export interface AssetLinkRecord extends AssetLinkInput {
  readonly pageNumber: number | null;
  readonly displayOrder: number;
  readonly createdAt: PersistenceTimestamp;
}

export interface AssetMetadataInput
  extends Omit<AssetMetadataRecord, 'createdAt' | 'updatedAt' | 'version'> {
  readonly createdAt?: PersistenceTimestamp;
  readonly updatedAt?: PersistenceTimestamp;
  readonly version?: number;
}

export interface AssetRepository {
  create(asset: AssetMetadataInput): Promise<AssetMetadataRecord>;
  get(assetId: PersistenceId): Promise<AssetMetadataRecord | null>;
  list(query?: RecordQuery): Promise<readonly AssetMetadataRecord[]>;
  updateIngestionState(
    assetId: PersistenceId,
    ingestionState: AssetMetadataRecord['ingestionState'],
    verifiedAt?: PersistenceTimestamp | null,
  ): Promise<AssetMetadataRecord>;
  link(link: AssetLinkInput): Promise<AssetLinkRecord>;
  listLinks(assetId: PersistenceId): Promise<readonly AssetLinkRecord[]>;
}

export type ImportBatchInput = Omit<ImportBatchRecord, 'createdAt' | 'updatedAt' | 'version'> &
  Partial<Pick<ImportBatchRecord, 'createdAt' | 'updatedAt' | 'version'>>;

export type ImportBatchPatch = Partial<
  Omit<ImportBatchRecord, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'version'>
>;

export type ImportRowInput = Omit<ImportRowRecord, 'createdAt'> & { readonly createdAt?: PersistenceTimestamp };

export type ImportRowPatch = Partial<
  Omit<ImportRowRecord, 'id' | 'organizationId' | 'importBatchId' | 'rowNumber' | 'createdAt'>
>;

export interface ImportRepository {
  createBatch(input: ImportBatchInput): Promise<{ readonly record: ImportBatchRecord; readonly replayed: boolean }>;
  getBatch(batchId: PersistenceId): Promise<ImportBatchRecord | null>;
  getBatchBySource(
    organizationId: PersistenceId,
    sourceSha256: string,
    templateVersion: string,
  ): Promise<ImportBatchRecord | null>;
  getBatchByCommitOperation(operationId: PersistenceId): Promise<ImportBatchRecord | null>;
  updateBatch(
    batchId: PersistenceId,
    patch: ImportBatchPatch,
    expectedVersion?: number,
  ): Promise<ImportBatchRecord>;
  insertRow(input: ImportRowInput): Promise<ImportRowRecord>;
  getRow(rowId: PersistenceId): Promise<ImportRowRecord | null>;
  listRows(batchId: PersistenceId): Promise<readonly ImportRowRecord[]>;
  updateRow(rowId: PersistenceId, patch: ImportRowPatch): Promise<ImportRowRecord>;
}

/** Server-only content port for local private evidence and future asset adapters. */
export interface PrivateAssetContentRepository {
  putPrivateBytes(assetId: PersistenceId, bytes: Uint8Array): Promise<void>;
  getPrivateBytes(assetId: PersistenceId): Promise<Uint8Array | null>;
}

export interface PersistenceTransaction {
  readonly records: RecordRepository;
  readonly syncOperations: SyncOperationRepository;
  readonly auditEvents: AuditEventRepository;
  readonly assets: AssetRepository;
  readonly imports: ImportRepository;
  readonly assetContent: PrivateAssetContentRepository;
}

export interface PersistenceAdapter {
  /** Implementations must commit all work in the callback atomically. */
  withTransaction<T>(work: (transaction: PersistenceTransaction) => Promise<T>): Promise<T>;
}

export type PersistenceErrorCode =
  | 'already_exists'
  | 'not_found'
  | 'version_conflict'
  | 'idempotency_mismatch'
  | 'invalid_state';

export class PersistenceError extends Error {
  readonly code: PersistenceErrorCode;
  readonly details: JsonObject | undefined;

  constructor(code: PersistenceErrorCode, message: string, details?: JsonObject) {
    super(message);
    this.name = 'PersistenceError';
    this.code = code;
    this.details = details;
  }
}
