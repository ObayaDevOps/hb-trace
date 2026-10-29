import { describe, expect, it } from 'vitest';
import { createInMemoryPersistence, PersistenceError } from '@/server/persistence';
import { commitImport, resolveImportDuplicate, stageImport } from './local';

const organizationId = '00000000-0000-4000-8000-000000000901';
const actorId = '00000000-0000-4000-8000-000000000902';
const firstCommitOperationId = '00000000-0000-4000-8000-000000000903';
const secondCommitOperationId = '00000000-0000-4000-8000-000000000904';
const thirdCommitOperationId = '00000000-0000-4000-8000-000000000905';

function farmerCsv(reference: string, name: string, phone: string, email = 'ops@example.com'): string {
  return [
    'external_reference,display_name,phone,email,region_name,consent_status,consent_policy_version',
    `${reference},${name},${phone},${email},Central,granted,privacy-v1`,
  ].join('\n');
}

function source(csv: string) {
  return { bytes: new TextEncoder().encode(csv), filename: 'farmers-v1.csv', mediaType: 'text/csv' };
}

function apiarySource(csv: string) {
  return { bytes: new TextEncoder().encode(csv), filename: 'apiaries-v1.csv', mediaType: 'text/csv' };
}

async function stageFarmers(persistence: ReturnType<typeof createInMemoryPersistence>, csv: string) {
  return stageImport(persistence, { organizationId, actorId, kind: 'farmers', source: source(csv) });
}

describe('local fixed-template import workflow', () => {
  it('retains private source bytes and commits exactly once by operation UUID', async () => {
    const persistence = createInMemoryPersistence();
    const csv = farmerCsv('SUP-LOCAL-001', 'Amina', '+256700123456');
    const staged = await stageFarmers(persistence, csv);
    const stagedAgain = await stageFarmers(persistence, csv);

    expect(staged.asset.visibility).toBe('private');
    expect(staged.asset.uploadedByActorId).toBe(actorId);
    expect(staged.asset.sha256).toBe(staged.batch.sourceSha256);
    const bytes = await persistence.withTransaction((transaction) => transaction.assetContent.getPrivateBytes(staged.asset.id));
    expect(bytes && new TextDecoder().decode(bytes)).toBe(csv);
    expect(stagedAgain).toMatchObject({ replayed: true, batch: { id: staged.batch.id }, asset: { id: staged.asset.id } });

    const committed = await commitImport(persistence, {
      organizationId,
      actorId,
      batchId: staged.batch.id,
      commitOperationId: firstCommitOperationId,
    });
    const replay = await commitImport(persistence, {
      organizationId,
      actorId,
      batchId: staged.batch.id,
      commitOperationId: firstCommitOperationId,
    });

    expect(committed).toMatchObject({ created: 1, matched: 0, rejected: 0, skipped: 0, replayed: false });
    expect(replay).toMatchObject({ created: 1, replayed: true });
    await expect(commitImport(persistence, {
      organizationId,
      actorId,
      batchId: staged.batch.id,
      commitOperationId: secondCommitOperationId,
    })).rejects.toMatchObject({ code: 'idempotency_mismatch' } satisfies Partial<PersistenceError>);

    const farmers = await persistence.withTransaction((transaction) => transaction.records.list('farmers', { organizationId }));
    expect(farmers).toHaveLength(1);
    const audit = await persistence.withTransaction((transaction) => transaction.auditEvents.list({ organizationId }));
    expect(audit.map((event) => event.eventType)).toEqual(expect.arrayContaining(['import.previewed', 'import.row_committed', 'import.committed']));
  });

  it('persists duplicate candidates and requires an explicit match decision', async () => {
    const persistence = createInMemoryPersistence();
    const original = await stageFarmers(persistence, farmerCsv('SUP-DUP-001', 'Amina', '+256700123456'));
    await commitImport(persistence, {
      organizationId,
      actorId,
      batchId: original.batch.id,
      commitOperationId: firstCommitOperationId,
    });
    const first = await stageFarmers(persistence, farmerCsv('SUP-DUP-001', 'Amina Updated', '+256700123456'));

    expect(first.preview.summary.duplicateReview).toBe(1);
    expect(first.rows[0].duplicateCandidateIds).toHaveLength(1);
    await expect(commitImport(persistence, {
      organizationId,
      actorId,
      batchId: first.batch.id,
      commitOperationId: secondCommitOperationId,
    })).rejects.toMatchObject({ code: 'invalid_state' } satisfies Partial<PersistenceError>);

    const candidateId = first.rows[0].duplicateCandidateIds[0];
    await resolveImportDuplicate(persistence, {
      organizationId,
      actorId,
      batchId: first.batch.id,
      rowId: first.rows[0].id,
      decision: 'match',
      matchedRecordId: candidateId,
    });
    const committed = await commitImport(persistence, {
      organizationId,
      actorId,
      batchId: first.batch.id,
      commitOperationId: secondCommitOperationId,
    });

    expect(committed).toMatchObject({ created: 0, matched: 1, rejected: 0, skipped: 0 });
    const farmers = await persistence.withTransaction((transaction) => transaction.records.list('farmers', { organizationId }));
    expect(farmers).toHaveLength(1);
    const rows = await persistence.withTransaction((transaction) => transaction.imports.listRows(first.batch.id));
    expect(rows[0]).toMatchObject({ duplicateDecision: 'match', outcome: 'matched', matchedRecordId: candidateId });
  });

  it('supports an explicit partial rejection without mutating the invalid row into a record', async () => {
    const persistence = createInMemoryPersistence();
    const csv = [
      'external_reference,display_name,phone,email,region_name,consent_status,consent_policy_version',
      'SUP-VALID-001,Valid,+256700123456,valid@example.com,Central,granted,privacy-v1',
      'SUP-INVALID-001,Invalid,bad,invalid@example.com,Central,granted,privacy-v1',
    ].join('\n');
    const staged = await stageFarmers(persistence, csv);

    expect(staged.batch.status).toBe('correction_required');
    await expect(commitImport(persistence, {
      organizationId,
      actorId,
      batchId: staged.batch.id,
      commitOperationId: firstCommitOperationId,
    })).rejects.toMatchObject({ code: 'invalid_state' } satisfies Partial<PersistenceError>);

    const committed = await commitImport(persistence, {
      organizationId,
      actorId,
      batchId: staged.batch.id,
      commitOperationId: firstCommitOperationId,
      allowPartialReject: true,
    });
    expect(committed).toMatchObject({ created: 1, rejected: 1, replayed: false });
    const rows = await persistence.withTransaction((transaction) => transaction.imports.listRows(staged.batch.id));
    expect(rows.map((row) => row.outcome)).toEqual(['created', 'rejected']);
    const farmers = await persistence.withTransaction((transaction) => transaction.records.list('farmers', { organizationId }));
    expect(farmers).toHaveLength(1);
  });

  it('reviews composite farmer matches and creates linked apiary locations', async () => {
    const persistence = createInMemoryPersistence();
    const original = await stageFarmers(persistence, farmerCsv('SUP-COMPOSITE-001', 'Amina', '+256700123456'));
    await commitImport(persistence, {
      organizationId,
      actorId,
      batchId: original.batch.id,
      commitOperationId: firstCommitOperationId,
    });

    const composite = await stageFarmers(persistence, farmerCsv('SUP-COMPOSITE-002', 'Amina', '+256700123456', 'other@example.com'));
    expect(composite.preview.summary.duplicateReview).toBe(1);
    expect(composite.rows[0].errorDetails).toMatchObject({
      duplicateCandidates: [{ reason: 'name_phone' }],
    });
    await resolveImportDuplicate(persistence, {
      organizationId,
      actorId,
      batchId: composite.batch.id,
      rowId: composite.rows[0].id,
      decision: 'skip',
    });
    const skipped = await commitImport(persistence, {
      organizationId,
      actorId,
      batchId: composite.batch.id,
      commitOperationId: secondCommitOperationId,
    });
    expect(skipped).toMatchObject({ created: 0, matched: 0, skipped: 1 });

    const apiaries = await stageImport(persistence, {
      organizationId,
      actorId,
      kind: 'apiaries',
      source: apiarySource([
        'external_reference,farmer_external_reference,name,region_name,latitude,longitude,coordinate_precision_m',
        'API-001,SUP-COMPOSITE-001,North Yard,Central,0.3476,32.5825,50',
      ].join('\n')),
    });
    const apiaryCommit = await commitImport(persistence, {
      organizationId,
      actorId,
      batchId: apiaries.batch.id,
      commitOperationId: thirdCommitOperationId,
    });

    expect(apiaryCommit).toMatchObject({ created: 1, rejected: 0 });
    const storedApiaries = await persistence.withTransaction((transaction) => transaction.records.list('apiaries', { organizationId }));
    const storedLocations = await persistence.withTransaction((transaction) => transaction.records.list('locations', { organizationId }));
    expect(storedApiaries).toHaveLength(1);
    expect(storedApiaries[0].locationId).toBe(storedLocations[0].id);
    expect(storedLocations[0]).toMatchObject({ regionName: 'Central', latitude: 0.3476, longitude: 32.5825 });
  });
});
