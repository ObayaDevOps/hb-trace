import { describe, expect, it } from 'vitest';
import { createInMemoryPersistence, PersistenceError } from './index';

const organization = {
  id: '00000000-0000-4000-8000-000000000201',
  organizationId: '00000000-0000-4000-8000-000000000201',
  legalName: 'Humble Beeing Honey Ltd',
  displayName: 'Humble Beeing Honey',
  status: 'active',
};

describe('in-memory persistence contract', () => {
  it('serializes transactions and rolls back failed work', async () => {
    const persistence = createInMemoryPersistence();
    await persistence.withTransaction(async (transaction) => {
      await transaction.records.insert('organizations', organization);
    });

    await expect(persistence.withTransaction(async (transaction) => {
      await transaction.records.insert('organizations', {
        ...organization,
        id: '00000000-0000-4000-8000-000000000202',
      });
      throw new Error('rollback');
    })).rejects.toThrow('rollback');

    const records = await persistence.withTransaction((transaction) => transaction.records.list('organizations'));
    expect(records.map((record) => record.id)).toEqual([organization.id]);
  });

  it('enforces optimistic versions and sync idempotency', async () => {
    const persistence = createInMemoryPersistence();
    await persistence.withTransaction(async (transaction) => {
      await transaction.records.insert('organizations', organization);
    });
    const input = {
      operationId: '00000000-0000-4000-8000-000000000203',
      organizationId: organization.organizationId,
      actorId: null,
      deviceId: 'device-1',
      deploymentId: 'local-demo',
      commandType: 'purchase.submit',
      commandSchemaVersion: 1,
      aggregateType: 'purchase',
      aggregateId: null,
      expectedVersion: null,
      eventOccurrenceAt: '2026-01-01T00:00:00.000Z',
      clientCapturedAt: '2026-01-01T00:00:00.000Z',
      clientTimezone: 'Africa/Kampala',
      clientVersion: 'v1-test',
      dependencyOperationIds: [],
      payload: { quantityKg: '1.5' },
      payloadHashSha256: 'a'.repeat(64),
    } as const;

    await persistence.withTransaction(async (transaction) => {
      const first = await transaction.syncOperations.put(input);
      const replay = await transaction.syncOperations.put(input);
      expect(first.replayed).toBe(false);
      expect(replay.replayed).toBe(true);
      await expect(transaction.syncOperations.put({ ...input, payloadHashSha256: 'b'.repeat(64) })).rejects.toMatchObject({ code: 'idempotency_mismatch' });
    });

    await expect(persistence.withTransaction(async (transaction) => {
      await transaction.records.update('organizations', organization.id, { displayName: 'Updated' }, 99);
    })).rejects.toMatchObject({ code: 'version_conflict' } satisfies Partial<PersistenceError>);
  });
});
