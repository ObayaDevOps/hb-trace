import { createHash, randomUUID } from 'node:crypto';
import { Decimal, isApplicationUuid } from '@/domain';
import {
  PersistenceError,
  type ApiaryRecord,
  type AssetMetadataRecord,
  type FarmerRecord,
  type ImportBatchRecord,
  type ImportDuplicateDecision,
  type ImportRowRecord,
  type JsonObject,
  type PersistenceAdapter,
  type PersistenceTransaction,
} from '@/server/persistence';
import {
  previewCsvImport,
  type ImportIssue,
  type ImportKind,
  type ImportPreview,
  type ImportPreviewOptions,
  type ImportRow,
} from './fixed-template';
import { MAX_XLSX_BYTES, previewXlsxImport, XLSX_MEDIA_TYPE } from './xlsx';

export type { ImportKind } from './fixed-template';

export const MAX_IMPORT_SOURCE_BYTES = 2 * 1024 * 1024;

export type ImportSource = {
  readonly bytes: Uint8Array;
  readonly filename: string;
  readonly mediaType?: string;
  readonly capturedAt?: string;
};

export type StageImportInput = {
  readonly organizationId: string;
  readonly actorId: string;
  readonly kind: ImportKind;
  readonly source: ImportSource;
};

export type ImportDuplicateCandidateReason =
  | 'external_reference'
  | 'name_phone'
  | 'name_email'
  | 'name_farmer_location';

export type ImportDuplicateCandidate = {
  readonly recordType: 'farmer' | 'apiary';
  readonly recordId: string;
  readonly reason: ImportDuplicateCandidateReason;
};

export type StageImportResult = {
  readonly batch: ImportBatchRecord;
  readonly asset: AssetMetadataRecord;
  readonly rows: readonly ImportRowRecord[];
  readonly preview: ImportPreview;
  readonly replayed: boolean;
};

export type ResolveDuplicateInput = {
  readonly organizationId: string;
  readonly actorId: string;
  readonly batchId: string;
  readonly rowId: string;
  readonly decision: ImportDuplicateDecision;
  readonly matchedRecordId?: string;
};

export type ResolveDuplicateResult = {
  readonly batch: ImportBatchRecord;
  readonly row: ImportRowRecord;
};

export type CommitImportInput = {
  readonly organizationId: string;
  readonly actorId: string;
  readonly batchId: string;
  readonly commitOperationId: string;
  /** Permit valid rows to commit while validation-error rows become rejected. */
  readonly allowPartialReject?: boolean;
};

export type ImportCommitResult = {
  readonly batch: ImportBatchRecord;
  readonly created: number;
  readonly matched: number;
  readonly rejected: number;
  readonly skipped: number;
  readonly replayed: boolean;
};

type ExistingData = {
  readonly farmers: readonly FarmerRecord[];
  readonly apiaries: readonly ApiaryRecord[];
  readonly actors: ReadonlyMap<string, { readonly displayName: string; readonly phone: string | null; readonly email: string | null }>;
  readonly locations: ReadonlyMap<string, { readonly regionName: string | null; readonly latitude: number | null; readonly longitude: number | null }>;
};

function now(): string {
  return new Date().toISOString();
}

function sourceSha256(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function normalizeText(value: string | null | undefined): string {
  return (value ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function normalizePhone(value: string | null | undefined): string {
  return (value ?? '').replace(/[\s().-]/g, '').toLowerCase();
}

function equalDecimal(left: string, right: number | null): boolean {
  if (right === null) return false;
  try {
    return Decimal.from(left).equals(String(right));
  } catch {
    return false;
  }
}

function safeFilename(filename: string, fallback: string): string {
  const sanitized = filename.replace(/[\\/\0]/g, '_').trim();
  return (sanitized || fallback).slice(0, 255);
}

function isXlsx(source: ImportSource): boolean {
  const mediaType = (source.mediaType ?? '').split(';', 1)[0].trim().toLowerCase();
  const bytes = source.bytes;
  const zipMagic = bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
  return mediaType === XLSX_MEDIA_TYPE || /\.xlsx$/i.test(source.filename) || zipMagic;
}

function previewSourceWithName(kind: ImportKind, source: ImportSource, options: ImportPreviewOptions = {}): ImportPreview {
  const bytes = new Uint8Array(source.bytes);
  const preview = isXlsx(source)
    ? previewXlsxImport(kind, bytes, options)
    : previewCsvImport(kind, new TextDecoder().decode(bytes), options);
  return { ...preview, sourceSha256: sourceSha256(bytes) };
}

function jsonObject(value: unknown): JsonObject {
  return value as JsonObject;
}

function issuesJson(issues: readonly ImportIssue[]): readonly JsonObject[] {
  return issues.map((issue) => ({
    rowNumber: issue.rowNumber,
    field: issue.field,
    code: issue.code,
    message: issue.message,
    severity: issue.severity,
  }));
}

function candidateJson(candidate: ImportDuplicateCandidate): JsonObject {
  return {
    recordType: candidate.recordType,
    recordId: candidate.recordId,
    reason: candidate.reason,
  };
}

function jsonArray(value: unknown): readonly unknown[] {
  return Array.isArray(value) ? value : [];
}

function jsonObjectValue(value: unknown): JsonObject | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as JsonObject) : null;
}

function hasValidationError(row: ImportRowRecord): boolean {
  return jsonArray(row.errorDetails.issues).some((issue) => jsonObjectValue(issue)?.severity === 'error');
}

function hasCandidateReason(row: ImportRowRecord, reason: ImportDuplicateCandidateReason): boolean {
  return jsonArray(row.errorDetails.duplicateCandidates).some((candidate) => jsonObjectValue(candidate)?.reason === reason);
}

function enrichDuplicatePreview(
  preview: ImportPreview,
  candidatesByRow: ReadonlyMap<number, readonly ImportDuplicateCandidate[]>,
): ImportPreview {
  const rows = preview.rows.map((row) => {
    const candidates = candidatesByRow.get(row.rowNumber) ?? [];
    if (candidates.length === 0 || row.outcome === 'correction_required') return row;
    const issues = row.issues.some((issue) => issue.code === 'duplicate_candidate')
      ? row.issues
      : [
          ...row.issues,
          {
            rowNumber: row.rowNumber,
            field: 'external_reference',
            code: 'duplicate_candidate',
            message: 'A likely existing record requires an explicit match, skip or create decision.',
            severity: 'warning' as const,
          },
        ];
    return { ...row, issues, outcome: 'duplicate_review' as const };
  });

  return {
    ...preview,
    rows,
    summary: {
      total: rows.length,
      valid: rows.filter((row) => row.outcome === 'valid').length,
      correctionRequired: rows.filter((row) => row.outcome === 'correction_required').length,
      duplicateReview: rows.filter((row) => row.outcome === 'duplicate_review').length,
    },
  };
}

async function existingData(transaction: PersistenceTransaction, organizationId: string): Promise<ExistingData> {
  const [farmers, apiaries, actors, locations] = await Promise.all([
    transaction.records.list('farmers', { organizationId }),
    transaction.records.list('apiaries', { organizationId }),
    transaction.records.list('actors', { organizationId }),
    transaction.records.list('locations', { organizationId }),
  ]);
  return {
    farmers,
    apiaries,
    actors: new Map(actors.map((actor) => [actor.id, actor])),
    locations: new Map(locations.map((location) => [location.id, location])),
  };
}

function farmerCandidates(row: ImportRow, data: ExistingData): ImportDuplicateCandidate[] {
  const reference = normalizeText(row.normalized.external_reference);
  const name = normalizeText(row.normalized.display_name);
  const phone = normalizePhone(row.normalized.phone);
  const email = normalizeText(row.normalized.email);
  const candidates: ImportDuplicateCandidate[] = [];

  for (const farmer of data.farmers) {
    const actor = data.actors.get(farmer.actorId);
    if (reference && normalizeText(farmer.farmerReference) === reference) {
      candidates.push({ recordType: 'farmer', recordId: farmer.id, reason: 'external_reference' });
      continue;
    }
    if (!actor || !name || normalizeText(actor.displayName) !== name) continue;
    if (phone && normalizePhone(actor.phone) === phone) {
      candidates.push({ recordType: 'farmer', recordId: farmer.id, reason: 'name_phone' });
    } else if (email && normalizeText(actor.email) === email) {
      candidates.push({ recordType: 'farmer', recordId: farmer.id, reason: 'name_email' });
    }
  }
  return candidates;
}

function sameApiaryLocation(row: ImportRow, location: ExistingData['locations'] extends ReadonlyMap<string, infer V> ? V : never): boolean {
  const region = normalizeText(row.normalized.region_name);
  const hasCoordinates = Boolean(row.normalized.latitude && row.normalized.longitude);
  if (hasCoordinates) {
    return equalDecimal(row.normalized.latitude, location.latitude) && equalDecimal(row.normalized.longitude, location.longitude);
  }
  if (region) return normalizeText(location.regionName) === region;
  return location.latitude === null && location.longitude === null && !location.regionName;
}

function apiaryCandidates(row: ImportRow, data: ExistingData): ImportDuplicateCandidate[] {
  const reference = normalizeText(row.normalized.external_reference);
  const name = normalizeText(row.normalized.name);
  const farmerReference = normalizeText(row.normalized.farmer_external_reference);
  const farmer = data.farmers.find((candidate) => normalizeText(candidate.farmerReference) === farmerReference);
  const candidates: ImportDuplicateCandidate[] = [];

  for (const apiary of data.apiaries) {
    if (reference && normalizeText(apiary.apiaryReference) === reference) {
      candidates.push({ recordType: 'apiary', recordId: apiary.id, reason: 'external_reference' });
      continue;
    }
    if (!farmer || apiary.farmerId !== farmer.id || !name || normalizeText(apiary.name) !== name) continue;
    const location = apiary.locationId ? data.locations.get(apiary.locationId) : null;
    if ((location && sameApiaryLocation(row, location)) || (!location && !row.normalized.region_name && !row.normalized.latitude && !row.normalized.longitude)) {
      candidates.push({ recordType: 'apiary', recordId: apiary.id, reason: 'name_farmer_location' });
    }
  }
  return candidates;
}

function duplicateCandidates(kind: ImportKind, preview: ImportPreview, data: ExistingData): ReadonlyMap<number, readonly ImportDuplicateCandidate[]> {
  const candidates = new Map<number, readonly ImportDuplicateCandidate[]>();
  for (const row of preview.rows) {
    const rowCandidates = kind === 'farmers' ? farmerCandidates(row, data) : apiaryCandidates(row, data);
    if (row.outcome !== 'correction_required' && rowCandidates.length > 0) candidates.set(row.rowNumber, rowCandidates);
  }
  return candidates;
}

function sourceAssetInput(input: StageImportInput, bytes: Uint8Array, preview: ImportPreview, capturedAt: string) {
  const xlsx = isXlsx(input.source);
  return {
    id: randomUUID(),
    organizationId: input.organizationId,
    provider: 'local-memory',
    providerAssetId: null,
    providerObjectKey: null,
    sha256: preview.sourceSha256,
    mediaType: input.source.mediaType ?? (xlsx ? XLSX_MEDIA_TYPE : 'text/csv'),
    byteSize: bytes.byteLength,
    originalFilename: safeFilename(input.source.filename, xlsx ? 'import.xlsx' : 'import.csv'),
    visibility: 'private' as const,
    ingestionState: 'available' as const,
    retentionClass: 'import-source' as const,
    pageCount: null,
    providerMetadata: { storage: 'in-memory-local', importKind: input.kind, templateVersion: preview.templateVersion },
    uploadedByActorId: input.actorId,
    capturedAt,
    uploadedAt: capturedAt,
    verifiedAt: capturedAt,
  };
}

function batchStatus(preview: ImportPreview): ImportBatchRecord['status'] {
  if (preview.headerIssues.length > 0 || preview.summary.correctionRequired > 0) return 'correction_required';
  return preview.summary.duplicateReview > 0 ? 'validated' : 'ready';
}

function rowDetails(row: ImportRow, candidates: readonly ImportDuplicateCandidate[]): JsonObject {
  return {
    validationOutcome: row.outcome,
    issues: issuesJson(row.issues),
    duplicateCandidates: candidates.map(candidateJson),
  };
}

function assertOrganization(actual: string, expected: string, subject: string): void {
  if (actual !== expected) throw new PersistenceError('not_found', `${subject} was not found`);
}

async function ensureImportScope(transaction: PersistenceTransaction, input: StageImportInput): Promise<void> {
  const organization = await transaction.records.get('organizations', input.organizationId);
  if (!organization) {
    await transaction.records.insert('organizations', {
      id: input.organizationId,
      organizationId: input.organizationId,
      legalName: 'Humble Beeing Honey',
      displayName: 'Humble Beeing',
      status: 'active',
    });
  }

  const actor = await transaction.records.get('actors', input.actorId);
  if (actor) {
    assertOrganization(actor.organizationId, input.organizationId, 'import actor');
    return;
  }
  await transaction.records.insert('actors', {
    id: input.actorId,
    organizationId: input.organizationId,
    actorKind: 'person',
    status: 'active',
    displayName: 'Authenticated staff member',
    legalName: null,
    phone: null,
    email: null,
    timezone: 'Africa/Kampala',
  });
}

async function assertActorOrganization(
  transaction: PersistenceTransaction,
  actorId: string,
  organizationId: string,
): Promise<void> {
  const actor = await transaction.records.get('actors', actorId);
  if (!actor || actor.organizationId !== organizationId) {
    throw new PersistenceError('not_found', 'The import actor was not found in this organization.');
  }
}

function auditInput(
  organizationId: string,
  actorId: string,
  eventType: string,
  subjectType: string,
  subjectId: string,
  correlationId: string,
  metadata: JsonObject,
) {
  const timestamp = now();
  return {
    id: randomUUID(),
    organizationId,
    eventType,
    actorId,
    subjectType,
    subjectId,
    operationId: null,
    correlationId,
    occurrenceAt: timestamp,
    capturedAt: timestamp,
    reason: null,
    beforeState: null,
    afterState: null,
    metadata,
  };
}

function stageResult(
  batch: ImportBatchRecord,
  asset: AssetMetadataRecord,
  rows: readonly ImportRowRecord[],
  preview: ImportPreview,
  replayed: boolean,
): StageImportResult {
  return { batch, asset, rows, preview, replayed };
}

/** Stage a CSV/XLSX source, preserving its original bytes as private local evidence. */
export async function stageImport(
  persistence: PersistenceAdapter,
  input: StageImportInput,
): Promise<StageImportResult> {
  const bytes = new Uint8Array(input.source.bytes);
  if (bytes.byteLength > MAX_IMPORT_SOURCE_BYTES) {
    throw new PersistenceError('invalid_state', 'Import source is limited to 2 MiB.');
  }
  if (isXlsx(input.source) && bytes.byteLength > MAX_XLSX_BYTES) {
    throw new PersistenceError('invalid_state', 'XLSX source is limited to 2 MiB.');
  }

  const basePreview = previewSourceWithName(input.kind, { ...input.source, bytes });
  return persistence.withTransaction(async (transaction) => {
    await ensureImportScope(transaction, input);
    const existing = await transaction.imports.getBatchBySource(input.organizationId, basePreview.sourceSha256, basePreview.templateVersion);
    if (existing) {
      assertOrganization(existing.organizationId, input.organizationId, 'import batch');
      const rows = await transaction.imports.listRows(existing.id);
      const asset = existing.originalAssetId ? await transaction.assets.get(existing.originalAssetId) : null;
      if (!asset) throw new PersistenceError('invalid_state', `import batch ${existing.id} has no source asset`);
      const preview = previewSourceWithName(input.kind, { ...input.source, bytes });
      return stageResult(existing, asset, rows, preview, true);
    }

    const data = await existingData(transaction, input.organizationId);
    const options: ImportPreviewOptions = {
      existingExternalReferences: input.kind === 'farmers'
        ? data.farmers.map((farmer) => farmer.farmerReference)
        : data.apiaries.map((apiary) => apiary.apiaryReference),
      existingFarmerReferences: input.kind === 'apiaries'
        ? data.farmers.map((farmer) => farmer.farmerReference)
        : undefined,
    };
    const validatedPreview = previewSourceWithName(input.kind, { ...input.source, bytes }, options);
    const candidatesByRow = duplicateCandidates(input.kind, validatedPreview, data);
    const preview = enrichDuplicatePreview(validatedPreview, candidatesByRow);
    const capturedAt = input.source.capturedAt ?? now();
    const assetInput = sourceAssetInput(input, bytes, preview, capturedAt);
    const asset = await transaction.assets.create(assetInput);
    await transaction.assetContent.putPrivateBytes(asset.id, bytes);

    const createdBatch = await transaction.imports.createBatch({
      id: randomUUID(),
      organizationId: input.organizationId,
      importType: input.kind,
      templateVersion: preview.templateVersion,
      originalAssetId: asset.id,
      sourceSha256: preview.sourceSha256,
      uploadedByActorId: input.actorId,
      status: batchStatus(preview),
      rowCount: preview.summary.total,
      createdCount: 0,
      matchedCount: 0,
      rejectedCount: 0,
      skippedCount: 0,
      commitOperationId: null,
    });
    const batch = createdBatch.record;
    for (const row of preview.rows) {
      const candidates = candidatesByRow.get(row.rowNumber) ?? [];
      await transaction.imports.insertRow({
        id: randomUUID(),
        organizationId: input.organizationId,
        importBatchId: batch.id,
        rowNumber: row.rowNumber,
        rawValues: jsonObject(row.raw),
        normalizedValues: jsonObject(row.normalized),
        outcome: 'pending',
        errorDetails: rowDetails(row, candidates),
        matchedRecordType: null,
        matchedRecordId: null,
        duplicateDecision: null,
        duplicateCandidateIds: candidates.map((candidate) => candidate.recordId),
      });
    }
    await transaction.auditEvents.append(auditInput(
      input.organizationId,
      input.actorId,
      'import.previewed',
      'import_batch',
      batch.id,
      batch.id,
      {
        kind: input.kind,
        templateVersion: batch.templateVersion,
        sourceSha256: batch.sourceSha256,
        originalAssetId: asset.id,
        rowCount: batch.rowCount,
        dryRun: true,
      },
    ));
    return stageResult(batch, asset, await transaction.imports.listRows(batch.id), preview, false);
  });
}

function updateStatusAfterDuplicateDecision(rows: readonly ImportRowRecord[]): ImportBatchRecord['status'] {
  const hasErrors = rows.some(hasValidationError);
  const unresolved = rows.some((candidate) => candidate.duplicateCandidateIds.length > 0 && candidate.duplicateDecision === null);
  return hasErrors ? 'correction_required' : unresolved ? 'validated' : 'ready';
}

/** Persist one explicit duplicate-review decision; this never merges automatically. */
export async function resolveImportDuplicate(
  persistence: PersistenceAdapter,
  input: ResolveDuplicateInput,
): Promise<ResolveDuplicateResult> {
  return persistence.withTransaction(async (transaction) => {
    const batch = await transaction.imports.getBatch(input.batchId);
    if (!batch) throw new PersistenceError('not_found', `import batch ${input.batchId} was not found`);
    assertOrganization(batch.organizationId, input.organizationId, 'import batch');
    await assertActorOrganization(transaction, input.actorId, input.organizationId);
    const row = await transaction.imports.getRow(input.rowId);
    if (!row || row.importBatchId !== batch.id) throw new PersistenceError('not_found', `import row ${input.rowId} was not found`);
    if (batch.commitOperationId || batch.status === 'completed' || batch.status === 'partially_rejected') {
      throw new PersistenceError('invalid_state', 'Duplicate review is closed after import commit.');
    }
    if (row.duplicateCandidateIds.length === 0) throw new PersistenceError('invalid_state', 'This row has no duplicate review pending.');
    if (row.outcome !== 'pending') throw new PersistenceError('invalid_state', 'This import row is no longer pending.');
    if (input.decision === 'match') {
      if (!input.matchedRecordId || !row.duplicateCandidateIds.includes(input.matchedRecordId)) {
        throw new PersistenceError('invalid_state', 'A match decision must select one of the presented candidates.');
      }
    } else if (input.matchedRecordId) {
      throw new PersistenceError('invalid_state', 'Only a match decision may include a record ID.');
    }

    const updatedRow = await transaction.imports.updateRow(row.id, {
      duplicateDecision: input.decision,
      matchedRecordId: input.decision === 'match' ? input.matchedRecordId ?? null : null,
      matchedRecordType: input.decision === 'match' ? (batch.importType === 'farmers' ? 'farmer' : 'apiary') : null,
      errorDetails: { ...row.errorDetails, duplicateDecision: input.decision },
    });
    const rows = (await transaction.imports.listRows(batch.id)).map((candidate) => candidate.id === updatedRow.id ? updatedRow : candidate);
    const updatedBatch = await transaction.imports.updateBatch(batch.id, { status: updateStatusAfterDuplicateDecision(rows) }, batch.version);
    await transaction.auditEvents.append(auditInput(
      input.organizationId,
      input.actorId,
      'import.duplicate_resolved',
      'import_row',
      row.id,
      batch.id,
      {
        batchId: batch.id,
        rowNumber: row.rowNumber,
        decision: input.decision,
        candidateIds: row.duplicateCandidateIds,
        matchedRecordId: input.matchedRecordId ?? null,
      },
    ));
    return { batch: updatedBatch, row: updatedRow };
  });
}

function requireCommitOperationId(value: string): string {
  if (!isApplicationUuid(value)) throw new PersistenceError('invalid_state', 'commitOperationId must be an application UUIDv4.');
  return value.toLowerCase();
}

function resultFromBatch(batch: ImportBatchRecord, replayed: boolean): ImportCommitResult {
  return {
    batch,
    created: batch.createdCount,
    matched: batch.matchedCount,
    rejected: batch.rejectedCount,
    skipped: batch.skippedCount,
    replayed,
  };
}

async function createFarmer(
  transaction: PersistenceTransaction,
  organizationId: string,
  row: ImportRowRecord,
): Promise<{ readonly farmerId: string; readonly actorId: string }> {
  const values = row.normalizedValues ?? {};
  const farmerReference = String(values.external_reference ?? '');
  const existing = await transaction.records.list('farmers', { organizationId });
  if (existing.some((farmer) => normalizeText(farmer.farmerReference) === normalizeText(farmerReference))) {
    throw new PersistenceError('already_exists', `Farmer ${farmerReference} already exists.`);
  }
  const actorId = randomUUID();
  const farmerId = randomUUID();
  await transaction.records.insert('actors', {
    id: actorId,
    organizationId,
    actorKind: 'person',
    status: 'active',
    displayName: String(values.display_name ?? ''),
    legalName: null,
    phone: values.phone ? String(values.phone) : null,
    email: values.email ? String(values.email) : null,
    timezone: 'Africa/Kampala',
  });
  await transaction.records.insert('farmers', {
    id: farmerId,
    organizationId,
    actorId,
    farmerReference,
    status: 'active',
    notes: null,
  });
  return { farmerId, actorId };
}

async function createApiary(
  transaction: PersistenceTransaction,
  organizationId: string,
  row: ImportRowRecord,
): Promise<{ readonly apiaryId: string; readonly locationId: string | null; readonly farmerId: string }> {
  const values = row.normalizedValues ?? {};
  const apiaryReference = String(values.external_reference ?? '');
  const existingApiaries = await transaction.records.list('apiaries', { organizationId });
  if (existingApiaries.some((apiary) => normalizeText(apiary.apiaryReference) === normalizeText(apiaryReference))) {
    throw new PersistenceError('already_exists', `Apiary ${apiaryReference} already exists.`);
  }
  const farmerReference = normalizeText(String(values.farmer_external_reference ?? ''));
  const farmers = await transaction.records.list('farmers', { organizationId });
  const farmer = farmers.find((candidate) => normalizeText(candidate.farmerReference) === farmerReference);
  if (!farmer) throw new PersistenceError('invalid_state', `Farmer ${String(values.farmer_external_reference ?? '')} was not found for apiary import.`);

  const region = String(values.region_name ?? '');
  const latitude = String(values.latitude ?? '');
  const longitude = String(values.longitude ?? '');
  const precision = String(values.coordinate_precision_m ?? '');
  const hasLocation = Boolean(region || latitude || longitude);
  let locationId: string | null = null;
  if (hasLocation) {
    locationId = randomUUID();
    await transaction.records.insert('locations', {
      id: locationId,
      organizationId,
      parentLocationId: null,
      locationKind: 'apiary',
      name: String(values.name ?? ''),
      countryCode: null,
      regionName: region || null,
      districtName: null,
      subcountyName: null,
      addressText: null,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      coordinatePrecisionM: precision ? Number(precision) : null,
      publicLabel: null,
    });
  }
  const apiaryId = randomUUID();
  await transaction.records.insert('apiaries', {
    id: apiaryId,
    organizationId,
    farmerId: farmer.id,
    locationId,
    apiaryReference,
    name: String(values.name ?? ''),
    status: 'active',
    hiveCount: null,
    notes: null,
  });
  return { apiaryId, locationId, farmerId: farmer.id };
}

async function commitRow(
  transaction: PersistenceTransaction,
  batch: ImportBatchRecord,
  row: ImportRowRecord,
): Promise<{ readonly outcome: 'created' | 'matched' | 'skipped'; readonly recordId: string | null }> {
  if (row.duplicateCandidateIds.length > 0) {
    if (!row.duplicateDecision) throw new PersistenceError('invalid_state', `Import row ${row.rowNumber} needs a duplicate decision.`);
    if (row.duplicateDecision === 'skip') return { outcome: 'skipped', recordId: null };
    if (row.duplicateDecision === 'create' && hasCandidateReason(row, 'external_reference')) {
      throw new PersistenceError('invalid_state', `Import row ${row.rowNumber} cannot create a second record for an existing external reference.`);
    }
    if (row.duplicateDecision === 'match') {
      const matchedRecordId = row.matchedRecordId;
      if (!matchedRecordId || !row.duplicateCandidateIds.includes(matchedRecordId)) {
        throw new PersistenceError('invalid_state', `Import row ${row.rowNumber} has an invalid match decision.`);
      }
      const entity = batch.importType === 'farmers' ? 'farmers' : 'apiaries';
      const matched = await transaction.records.get(entity, matchedRecordId);
      if (!matched || matched.organizationId !== batch.organizationId) {
        throw new PersistenceError('invalid_state', `Import row ${row.rowNumber} matched record is unavailable.`);
      }
      return { outcome: 'matched', recordId: matchedRecordId };
    }
  }

  const createdFarmer = batch.importType === 'farmers'
    ? await createFarmer(transaction, batch.organizationId, row)
    : null;
  const createdApiary = batch.importType === 'apiaries'
    ? await createApiary(transaction, batch.organizationId, row)
    : null;
  const recordId = createdFarmer?.farmerId ?? createdApiary?.apiaryId;
  if (!recordId) throw new PersistenceError('invalid_state', 'Import kind did not produce a record.');
  return {
    outcome: 'created',
    recordId,
  };
}

/** Commit a staged import exactly once; retrying the same operation returns the original summary. */
export async function commitImport(
  persistence: PersistenceAdapter,
  input: CommitImportInput,
): Promise<ImportCommitResult> {
  const commitOperationId = requireCommitOperationId(input.commitOperationId);
  return persistence.withTransaction(async (transaction) => {
    const batch = await transaction.imports.getBatch(input.batchId);
    if (!batch) throw new PersistenceError('not_found', `import batch ${input.batchId} was not found`);
    assertOrganization(batch.organizationId, input.organizationId, 'import batch');
    await assertActorOrganization(transaction, input.actorId, input.organizationId);

    if (batch.commitOperationId) {
      if (batch.commitOperationId !== commitOperationId) {
        throw new PersistenceError('idempotency_mismatch', `import batch ${batch.id} was committed with a different operation`);
      }
      return resultFromBatch(batch, true);
    }
    const operationOwner = await transaction.imports.getBatchByCommitOperation(commitOperationId);
    if (operationOwner && operationOwner.id !== batch.id) {
      throw new PersistenceError('idempotency_mismatch', `commit operation ${commitOperationId} was already used`);
    }

    const rows = await transaction.imports.listRows(batch.id);
    if (batch.status === 'correction_required' && !input.allowPartialReject) {
      throw new PersistenceError('invalid_state', 'Import has validation errors; correct the source or explicitly allow partial rejection.');
    }
    if (rows.some((row) => row.outcome !== 'pending')) {
      throw new PersistenceError('invalid_state', 'Import rows are not all pending.');
    }
    if (rows.some((row) => !hasValidationError(row) && row.duplicateCandidateIds.length > 0 && row.duplicateDecision === null)) {
      throw new PersistenceError('invalid_state', 'Every likely duplicate must have an explicit decision before commit.');
    }

    await transaction.imports.updateBatch(batch.id, { commitOperationId }, batch.version);
    let created = 0;
    let matched = 0;
    let rejected = 0;
    let skipped = 0;

    for (const row of rows) {
      if (hasValidationError(row)) {
        if (!input.allowPartialReject) throw new PersistenceError('invalid_state', `Import row ${row.rowNumber} has validation errors.`);
        await transaction.imports.updateRow(row.id, {
          outcome: 'rejected',
          errorDetails: { ...row.errorDetails, committedOutcome: 'rejected' },
        });
        rejected += 1;
        await transaction.auditEvents.append(auditInput(
          input.organizationId,
          input.actorId,
          'import.row_committed',
          'import_row',
          row.id,
          batch.id,
          { batchId: batch.id, rowNumber: row.rowNumber, outcome: 'rejected' },
        ));
        continue;
      }

      const committed = await commitRow(transaction, batch, row);
      await transaction.imports.updateRow(row.id, {
        outcome: committed.outcome,
        matchedRecordType: committed.outcome === 'matched' ? (batch.importType === 'farmers' ? 'farmer' : 'apiary') : null,
        matchedRecordId: committed.recordId,
        errorDetails: { ...row.errorDetails, committedOutcome: committed.outcome },
      });
      if (committed.outcome === 'created') created += 1;
      if (committed.outcome === 'matched') matched += 1;
      if (committed.outcome === 'skipped') skipped += 1;
      await transaction.auditEvents.append(auditInput(
        input.organizationId,
        input.actorId,
        'import.row_committed',
        'import_row',
        row.id,
        batch.id,
        {
          batchId: batch.id,
          rowNumber: row.rowNumber,
          outcome: committed.outcome,
          recordId: committed.recordId,
          consentStatus: batch.importType === 'farmers' ? String(row.normalizedValues?.consent_status ?? '') : null,
          consentPolicyVersion: batch.importType === 'farmers' ? String(row.normalizedValues?.consent_policy_version ?? '') : null,
        },
      ));
    }

    const status: ImportBatchRecord['status'] = rejected > 0 ? 'partially_rejected' : 'completed';
    const completedBatch = await transaction.imports.updateBatch(batch.id, {
      status,
      createdCount: created,
      matchedCount: matched,
      rejectedCount: rejected,
      skippedCount: skipped,
    });
    await transaction.auditEvents.append(auditInput(
      input.organizationId,
      input.actorId,
      'import.committed',
      'import_batch',
      batch.id,
      batch.id,
      {
        batchId: batch.id,
        commitOperationId,
        status,
        created,
        matched,
        rejected,
        skipped,
      },
    ));
    return resultFromBatch(completedBatch, false);
  });
}
