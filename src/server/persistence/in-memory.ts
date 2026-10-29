import { createHash } from 'node:crypto';
import {
  AssetLinkInput,
  AssetLinkRecord,
  AssetMetadataInput,
  AssetMetadataRecord,
  AssetRepository,
  AuditEventInput,
  AuditEventQuery,
  AuditEventRecord,
  AuditEventRepository,
  JsonObject,
  ImportBatchInput,
  ImportBatchPatch,
  ImportBatchRecord,
  ImportRepository,
  ImportRowInput,
  ImportRowPatch,
  ImportRowRecord,
  NewRecord,
  PersistenceAdapter,
  PersistenceEntityMap,
  PersistenceEntityName,
  PersistenceError,
  PersistenceTransaction,
  PrivateAssetContentRepository,
  RecordPatch,
  RecordQuery,
  RecordRepository,
  StoredRecord,
  SyncOperationCompletion,
  SyncOperationInput,
  SyncOperationRecord,
  SyncOperationRepository,
} from './contracts';

const ENTITY_NAMES: readonly PersistenceEntityName[] = [
  'organizations',
  'locations',
  'facilities',
  'actors',
  'roles',
  'farmers',
  'apiaries',
  'purchases',
  'receipts',
  'traceableLots',
  'containers',
  'transformations',
  'measurements',
  'qualityReviews',
  'packagingBatches',
  'publicBatchCodes',
  'publicationRevisions',
];

type AnyStoredRecord = StoredRecord;

interface MemoryState {
  readonly records: Map<PersistenceEntityName, Map<string, AnyStoredRecord>>;
  readonly syncOperations: Map<string, SyncOperationRecord>;
  readonly auditEvents: AuditEventRecord[];
  readonly assets: Map<string, AssetMetadataRecord>;
  readonly assetLinks: AssetLinkRecord[];
  readonly importBatches: Map<string, ImportBatchRecord>;
  readonly importRows: Map<string, ImportRowRecord>;
  readonly privateAssetBytes: Map<string, Uint8Array>;
}

function now(): string {
  return new Date().toISOString();
}

function createState(): MemoryState {
  const records = new Map<PersistenceEntityName, Map<string, AnyStoredRecord>>();
  for (const entity of ENTITY_NAMES) {
    records.set(entity, new Map<string, AnyStoredRecord>());
  }

  return {
    records,
    syncOperations: new Map<string, SyncOperationRecord>(),
    auditEvents: [],
    assets: new Map<string, AssetMetadataRecord>(),
    assetLinks: [],
    importBatches: new Map<string, ImportBatchRecord>(),
    importRows: new Map<string, ImportRowRecord>(),
    privateAssetBytes: new Map<string, Uint8Array>(),
  };
}

function cloneState(state: MemoryState): MemoryState {
  const records = new Map<PersistenceEntityName, Map<string, AnyStoredRecord>>();
  for (const [entity, collection] of state.records) {
    records.set(entity, new Map(collection));
  }

  return {
    records,
    syncOperations: new Map(state.syncOperations),
    auditEvents: [...state.auditEvents],
    assets: new Map(state.assets),
    assetLinks: [...state.assetLinks],
    importBatches: new Map(state.importBatches),
    importRows: new Map(state.importRows),
    privateAssetBytes: new Map([...state.privateAssetBytes].map(([assetId, bytes]) => [assetId, new Uint8Array(bytes)])),
  };
}

function requireNonEmpty(value: string, field: string): void {
  if (value.trim().length === 0) {
    throw new PersistenceError('invalid_state', `${field} must not be empty`);
  }
}

function limit<T>(values: readonly T[], requestedLimit: number | undefined): readonly T[] {
  if (requestedLimit === undefined) {
    return values;
  }

  if (!Number.isInteger(requestedLimit) || requestedLimit < 0) {
    throw new PersistenceError('invalid_state', 'limit must be a non-negative integer');
  }

  return values.slice(0, requestedLimit);
}

class InMemoryRecordRepository implements RecordRepository {
  constructor(private readonly state: MemoryState) {}

  private collection(entity: PersistenceEntityName): Map<string, AnyStoredRecord> {
    const collection = this.state.records.get(entity);
    if (!collection) {
      throw new PersistenceError('invalid_state', `Unknown persistence entity: ${entity}`);
    }
    return collection;
  }

  async get<K extends PersistenceEntityName>(
    entity: K,
    id: string,
  ): Promise<PersistenceEntityMap[K] | null> {
    return (this.collection(entity).get(id) as PersistenceEntityMap[K] | undefined) ?? null;
  }

  async list<K extends PersistenceEntityName>(
    entity: K,
    query?: RecordQuery,
  ): Promise<readonly PersistenceEntityMap[K][]> {
    const values = [...this.collection(entity).values()]
      .filter((record) => query?.organizationId === undefined || record.organizationId === query.organizationId)
      .sort((left, right) => left.createdAt.localeCompare(right.createdAt)) as PersistenceEntityMap[K][];

    return limit(values, query?.limit);
  }

  async insert<K extends PersistenceEntityName>(
    entity: K,
    input: NewRecord<PersistenceEntityMap[K]>,
  ): Promise<PersistenceEntityMap[K]> {
    requireNonEmpty(input.id, 'id');
    requireNonEmpty(input.organizationId, 'organizationId');

    const collection = this.collection(entity);
    if (collection.has(input.id)) {
      throw new PersistenceError('already_exists', `${entity} ${input.id} already exists`);
    }

    const createdAt = input.createdAt ?? now();
    const record = {
      ...input,
      createdAt,
      updatedAt: input.updatedAt ?? createdAt,
      version: input.version ?? 0,
    } as PersistenceEntityMap[K];

    collection.set(input.id, record);
    return record;
  }

  async update<K extends PersistenceEntityName>(
    entity: K,
    id: string,
    patch: RecordPatch<PersistenceEntityMap[K]>,
    expectedVersion?: number,
  ): Promise<PersistenceEntityMap[K]> {
    const collection = this.collection(entity);
    const current = collection.get(id) as PersistenceEntityMap[K] | undefined;
    if (!current) {
      throw new PersistenceError('not_found', `${entity} ${id} was not found`);
    }

    if (expectedVersion !== undefined && current.version !== expectedVersion) {
      throw new PersistenceError('version_conflict', `${entity} ${id} has changed`, {
        expectedVersion,
        actualVersion: current.version,
      });
    }

    const updated = {
      ...current,
      ...patch,
      updatedAt: now(),
      version: current.version + 1,
    } as PersistenceEntityMap[K];

    collection.set(id, updated);
    return updated;
  }
}

class InMemorySyncOperationRepository implements SyncOperationRepository {
  constructor(private readonly state: MemoryState) {}

  async put(input: SyncOperationInput): Promise<{ readonly record: SyncOperationRecord; readonly replayed: boolean }> {
    requireNonEmpty(input.operationId, 'operationId');
    requireNonEmpty(input.organizationId, 'organizationId');
    requireNonEmpty(input.payloadHashSha256, 'payloadHashSha256');

    if (!/^[0-9a-f]{64}$/i.test(input.payloadHashSha256)) {
      throw new PersistenceError('invalid_state', 'payloadHashSha256 must be a 64-character hexadecimal SHA-256 value');
    }

    const existing = this.state.syncOperations.get(input.operationId);
    if (existing) {
      if (existing.payloadHashSha256.toLowerCase() !== input.payloadHashSha256.toLowerCase()) {
        throw new PersistenceError('idempotency_mismatch', `operation ${input.operationId} was reused with a different payload hash`, {
          operationId: input.operationId,
        });
      }
      return { record: existing, replayed: true };
    }

    const createdAt = now();
    const record: SyncOperationRecord = {
      ...input,
      id: input.operationId,
      dependencyOperationIds: [...input.dependencyOperationIds],
      resultStatus: 'pending',
      resultPayload: null,
      errorType: null,
      errorMessage: null,
      completedAt: null,
      receivedAt: createdAt,
      createdAt,
      updatedAt: createdAt,
      version: 0,
    };

    this.state.syncOperations.set(input.operationId, record);
    return { record, replayed: false };
  }

  async get(operationId: string): Promise<SyncOperationRecord | null> {
    return this.state.syncOperations.get(operationId) ?? null;
  }

  async complete(operationId: string, completion: SyncOperationCompletion): Promise<SyncOperationRecord> {
    const current = this.state.syncOperations.get(operationId);
    if (!current) {
      throw new PersistenceError('not_found', `operation ${operationId} was not found`);
    }

    if (current.resultStatus === 'acknowledged' || current.resultStatus === 'rejected' || current.resultStatus === 'conflicted') {
      return current;
    }

    const completedAt = completion.resultStatus === 'dependency_pending' ? null : now();
    const updated: SyncOperationRecord = {
      ...current,
      resultStatus: completion.resultStatus,
      resultPayload: completion.resultPayload ?? null,
      errorType: completion.errorType ?? null,
      errorMessage: completion.errorMessage ?? null,
      completedAt,
      updatedAt: now(),
      version: current.version + 1,
    };

    this.state.syncOperations.set(operationId, updated);
    return updated;
  }
}

class InMemoryAuditEventRepository implements AuditEventRepository {
  constructor(private readonly state: MemoryState) {}

  async append(input: AuditEventInput): Promise<AuditEventRecord> {
    requireNonEmpty(input.id, 'audit event id');
    requireNonEmpty(input.organizationId, 'organizationId');
    requireNonEmpty(input.eventType, 'eventType');
    requireNonEmpty(input.subjectType, 'subjectType');

    if (this.state.auditEvents.some((event) => event.id === input.id)) {
      throw new PersistenceError('already_exists', `audit event ${input.id} already exists`);
    }

    const record: AuditEventRecord = { ...input, recordedAt: now() };
    this.state.auditEvents.push(record);
    return record;
  }

  async list(query?: AuditEventQuery): Promise<readonly AuditEventRecord[]> {
    const values = this.state.auditEvents
      .filter((event) => query?.organizationId === undefined || event.organizationId === query.organizationId)
      .filter((event) => query?.subjectType === undefined || event.subjectType === query.subjectType)
      .filter((event) => query?.subjectId === undefined || event.subjectId === query.subjectId)
      .sort((left, right) => right.recordedAt.localeCompare(left.recordedAt));

    return limit(values, query?.limit);
  }
}

class InMemoryAssetRepository implements AssetRepository {
  constructor(private readonly state: MemoryState) {}

  async create(input: AssetMetadataInput): Promise<AssetMetadataRecord> {
    requireNonEmpty(input.id, 'asset id');
    requireNonEmpty(input.organizationId, 'organizationId');
    requireNonEmpty(input.provider, 'provider');
    requireNonEmpty(input.sha256, 'sha256');
    requireNonEmpty(input.mediaType, 'mediaType');
    requireNonEmpty(input.retentionClass, 'retentionClass');

    if (!/^[0-9a-f]{64}$/i.test(input.sha256)) {
      throw new PersistenceError('invalid_state', 'sha256 must be a 64-character hexadecimal value');
    }
    if (this.state.assets.has(input.id)) {
      throw new PersistenceError('already_exists', `asset ${input.id} already exists`);
    }

    const createdAt = input.createdAt ?? now();
    const asset: AssetMetadataRecord = {
      ...input,
      providerMetadata: input.providerMetadata ?? {},
      createdAt,
      updatedAt: input.updatedAt ?? createdAt,
      version: input.version ?? 0,
    };

    this.state.assets.set(input.id, asset);
    return asset;
  }

  async get(assetId: string): Promise<AssetMetadataRecord | null> {
    return this.state.assets.get(assetId) ?? null;
  }

  async list(query?: RecordQuery): Promise<readonly AssetMetadataRecord[]> {
    const values = [...this.state.assets.values()]
      .filter((asset) => query?.organizationId === undefined || asset.organizationId === query.organizationId)
      .sort((left, right) => left.createdAt.localeCompare(right.createdAt));

    return limit(values, query?.limit);
  }

  async updateIngestionState(
    assetId: string,
    ingestionState: AssetMetadataRecord['ingestionState'],
    verifiedAt?: string | null,
  ): Promise<AssetMetadataRecord> {
    const current = this.state.assets.get(assetId);
    if (!current) {
      throw new PersistenceError('not_found', `asset ${assetId} was not found`);
    }

    const updated: AssetMetadataRecord = {
      ...current,
      ingestionState,
      verifiedAt: verifiedAt === undefined ? current.verifiedAt : verifiedAt,
      updatedAt: now(),
      version: current.version + 1,
    };
    this.state.assets.set(assetId, updated);
    return updated;
  }

  async link(input: AssetLinkInput): Promise<AssetLinkRecord> {
    requireNonEmpty(input.id, 'asset link id');
    if (!this.state.assets.has(input.assetId)) {
      throw new PersistenceError('not_found', `asset ${input.assetId} was not found`);
    }

    const duplicate = this.state.assetLinks.some(
      (link) =>
        link.assetId === input.assetId &&
        link.subjectType === input.subjectType &&
        link.subjectId === input.subjectId &&
        link.linkType === input.linkType &&
        link.displayOrder === (input.displayOrder ?? 0),
    );
    if (duplicate || this.state.assetLinks.some((link) => link.id === input.id)) {
      throw new PersistenceError('already_exists', `asset link ${input.id} already exists`);
    }

    const record: AssetLinkRecord = {
      ...input,
      pageNumber: input.pageNumber ?? null,
      displayOrder: input.displayOrder ?? 0,
      createdAt: now(),
    };
    this.state.assetLinks.push(record);
    return record;
  }

  async listLinks(assetId: string): Promise<readonly AssetLinkRecord[]> {
    return this.state.assetLinks
      .filter((link) => link.assetId === assetId)
      .sort((left, right) => left.displayOrder - right.displayOrder);
  }
}

class InMemoryImportRepository implements ImportRepository {
  constructor(private readonly state: MemoryState) {}

  async createBatch(input: ImportBatchInput): Promise<{ readonly record: ImportBatchRecord; readonly replayed: boolean }> {
    requireNonEmpty(input.id, 'import batch id');
    requireNonEmpty(input.organizationId, 'organizationId');
    requireNonEmpty(input.templateVersion, 'templateVersion');
    requireNonEmpty(input.sourceSha256, 'sourceSha256');
    if (!/^[0-9a-f]{64}$/i.test(input.sourceSha256)) {
      throw new PersistenceError('invalid_state', 'sourceSha256 must be a 64-character hexadecimal value');
    }
    if (this.state.importBatches.has(input.id)) {
      throw new PersistenceError('already_exists', `import batch ${input.id} already exists`);
    }

    const existing = [...this.state.importBatches.values()].find(
      (batch) =>
        batch.organizationId === input.organizationId &&
        batch.sourceSha256.toLowerCase() === input.sourceSha256.toLowerCase() &&
        batch.templateVersion === input.templateVersion,
    );
    if (existing) return { record: existing, replayed: true };

    const createdAt = input.createdAt ?? now();
    const record: ImportBatchRecord = {
      ...input,
      sourceSha256: input.sourceSha256.toLowerCase(),
      createdAt,
      updatedAt: input.updatedAt ?? createdAt,
      version: input.version ?? 0,
    };
    this.state.importBatches.set(record.id, record);
    return { record, replayed: false };
  }

  async getBatch(batchId: string): Promise<ImportBatchRecord | null> {
    return this.state.importBatches.get(batchId) ?? null;
  }

  async getBatchBySource(
    organizationId: string,
    sourceSha256: string,
    templateVersion: string,
  ): Promise<ImportBatchRecord | null> {
    return (
      [...this.state.importBatches.values()].find(
        (batch) =>
          batch.organizationId === organizationId &&
          batch.sourceSha256.toLowerCase() === sourceSha256.toLowerCase() &&
          batch.templateVersion === templateVersion,
      ) ?? null
    );
  }

  async getBatchByCommitOperation(operationId: string): Promise<ImportBatchRecord | null> {
    return [...this.state.importBatches.values()].find((batch) => batch.commitOperationId === operationId) ?? null;
  }

  async updateBatch(
    batchId: string,
    patch: ImportBatchPatch,
    expectedVersion?: number,
  ): Promise<ImportBatchRecord> {
    const current = this.state.importBatches.get(batchId);
    if (!current) throw new PersistenceError('not_found', `import batch ${batchId} was not found`);
    if (expectedVersion !== undefined && current.version !== expectedVersion) {
      throw new PersistenceError('version_conflict', `import batch ${batchId} has changed`, {
        expectedVersion,
        actualVersion: current.version,
      });
    }

    if (patch.commitOperationId !== undefined) {
      if (current.commitOperationId !== null && current.commitOperationId !== patch.commitOperationId) {
        throw new PersistenceError('idempotency_mismatch', `import batch ${batchId} was committed with a different operation`);
      }
      if (patch.commitOperationId !== null) {
        const other = await this.getBatchByCommitOperation(patch.commitOperationId);
        if (other && other.id !== batchId) {
          throw new PersistenceError('idempotency_mismatch', `commit operation ${patch.commitOperationId} was already used`);
        }
      }
    }

    const updated: ImportBatchRecord = {
      ...current,
      ...patch,
      updatedAt: now(),
      version: current.version + 1,
    };
    this.state.importBatches.set(batchId, updated);
    return updated;
  }

  async insertRow(input: ImportRowInput): Promise<ImportRowRecord> {
    requireNonEmpty(input.id, 'import row id');
    requireNonEmpty(input.organizationId, 'organizationId');
    requireNonEmpty(input.importBatchId, 'importBatchId');
    if (!Number.isInteger(input.rowNumber) || input.rowNumber < 1) {
      throw new PersistenceError('invalid_state', 'import row number must be a positive integer');
    }

    const batch = this.state.importBatches.get(input.importBatchId);
    if (!batch) throw new PersistenceError('not_found', `import batch ${input.importBatchId} was not found`);
    if (batch.organizationId !== input.organizationId) {
      throw new PersistenceError('invalid_state', 'import row and batch organizations must match');
    }
    if (
      [...this.state.importRows.values()].some(
        (row) => row.importBatchId === input.importBatchId && row.rowNumber === input.rowNumber,
      ) || this.state.importRows.has(input.id)
    ) {
      throw new PersistenceError('already_exists', `import row ${input.id} already exists`);
    }

    const createdAt = input.createdAt ?? now();
    const record: ImportRowRecord = {
      ...input,
      duplicateCandidateIds: [...input.duplicateCandidateIds],
      createdAt,
    };
    this.state.importRows.set(record.id, record);
    return record;
  }

  async getRow(rowId: string): Promise<ImportRowRecord | null> {
    return this.state.importRows.get(rowId) ?? null;
  }

  async listRows(batchId: string): Promise<readonly ImportRowRecord[]> {
    return [...this.state.importRows.values()]
      .filter((row) => row.importBatchId === batchId)
      .sort((left, right) => left.rowNumber - right.rowNumber);
  }

  async updateRow(rowId: string, patch: ImportRowPatch): Promise<ImportRowRecord> {
    const current = this.state.importRows.get(rowId);
    if (!current) throw new PersistenceError('not_found', `import row ${rowId} was not found`);
    if (patch.duplicateDecision !== undefined && patch.duplicateDecision !== null && !['create', 'match', 'skip'].includes(patch.duplicateDecision)) {
      throw new PersistenceError('invalid_state', `unknown import duplicate decision ${String(patch.duplicateDecision)}`);
    }

    const updated: ImportRowRecord = {
      ...current,
      ...patch,
      duplicateCandidateIds: patch.duplicateCandidateIds
        ? [...patch.duplicateCandidateIds]
        : [...current.duplicateCandidateIds],
    };
    this.state.importRows.set(rowId, updated);
    return updated;
  }
}

class InMemoryPrivateAssetContentRepository implements PrivateAssetContentRepository {
  constructor(private readonly state: MemoryState) {}

  async putPrivateBytes(assetId: string, bytes: Uint8Array): Promise<void> {
    const asset = this.state.assets.get(assetId);
    if (!asset) throw new PersistenceError('not_found', `asset ${assetId} was not found`);
    if (asset.visibility !== 'private') {
      throw new PersistenceError('invalid_state', `asset ${assetId} is not private evidence`);
    }
    if (asset.byteSize !== bytes.byteLength) {
      throw new PersistenceError('invalid_state', `asset ${assetId} byte size does not match its metadata`);
    }
    const hash = createHash('sha256').update(bytes).digest('hex');
    if (hash.toLowerCase() !== asset.sha256.toLowerCase()) {
      throw new PersistenceError('invalid_state', `asset ${assetId} SHA-256 does not match its metadata`);
    }
    this.state.privateAssetBytes.set(assetId, new Uint8Array(bytes));
  }

  async getPrivateBytes(assetId: string): Promise<Uint8Array | null> {
    const asset = this.state.assets.get(assetId);
    if (!asset || asset.visibility !== 'private') return null;
    const bytes = this.state.privateAssetBytes.get(assetId);
    return bytes ? new Uint8Array(bytes) : null;
  }
}

function createTransaction(state: MemoryState): PersistenceTransaction {
  return {
    records: new InMemoryRecordRepository(state),
    syncOperations: new InMemorySyncOperationRepository(state),
    auditEvents: new InMemoryAuditEventRepository(state),
    assets: new InMemoryAssetRepository(state),
    imports: new InMemoryImportRepository(state),
    assetContent: new InMemoryPrivateAssetContentRepository(state),
  };
}

/**
 * Dependency-free adapter for local development and contract tests.
 * Transactions are serialized and rolled back on callback failure.
 */
export class InMemoryPersistenceAdapter implements PersistenceAdapter {
  private state: MemoryState = createState();
  private transactionQueue: Promise<void> = Promise.resolve();

  withTransaction<T>(work: (transaction: PersistenceTransaction) => Promise<T>): Promise<T> {
    const run = this.transactionQueue.then(async () => {
      const snapshot = cloneState(this.state);
      try {
        return await work(createTransaction(this.state));
      } catch (error) {
        this.state = snapshot;
        throw error;
      }
    });

    this.transactionQueue = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }
}

export function createInMemoryPersistence(): PersistenceAdapter {
  return new InMemoryPersistenceAdapter();
}
