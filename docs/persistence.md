# HB-TRACE V1 persistence foundation

> Historical implementation guidance. Provider/next-work instructions may be superseded. Use [the current implementation entry point](implementation/START-HERE.md) and its authoritative fragments. Sanity is not the selected target provider; Supabase Storage and application-owned editorial revisions govern new work. Do not treat historical checkboxes as current acceptance.

The checked-in migrations at
`supabase/migrations/20260903000000_v1_persistence_foundation.sql`,
`supabase/migrations/20260903000001_v1_compliance_imports.sql` and
`supabase/migrations/20260903000002_v1_import_controls.sql` are the
provider-neutral PostgreSQL foundation for the V1 walking skeleton. The
directory name follows the repository's planned Supabase migration layout;
the SQL does not reference Supabase Auth, Storage, RLS, extensions, triggers,
or provider SDKs.

## Design rules

- Every application record receives its UUID from the application. The
  database intentionally has no UUID-generation default, so offline-created
  IDs can be retained across providers.
- Event time, client capture time, server receipt time, and server record time
  are separate where the workflow needs them. Timestamps are `timestamptz` and
  are stored in UTC; the operational display timezone defaults to
  `Africa/Kampala` on actors.
- Quantities and money are PostgreSQL `numeric` values with an entered value,
  unit, and canonical value/unit. JavaScript adapters should expose these as
  decimal strings rather than binary floating-point numbers.
- Human, QR, and fallback labels are replaceable rows in `identifiers` and
  `identifier_assignments`; they never become permanent record identities.
- `material_ledger_entries` is the signed quantity source for availability.
  Direct transformation and packaging allocation rows remain the lineage
  source of truth. The schema stores both; it does not maintain a speculative
  recursive closure.
- `publication_revisions.snapshot` is a whitelisted, denormalized public
  projection. It must be created from approved facts and editorial references,
  then treated as immutable once approved or published.

The migrations include actors and role assignments, sourcing records and
receipts/disputes, lots and containers, transformations and direct allocation
edges, measurements and quality decisions, packaging/public codes and
publication revisions, synchronization operations/dependencies, audit events,
asset metadata/provider mappings/record links, controlled documents/forms,
requirements, HACCP controls/deviations, non-conformances/corrective actions,
recall scope, fixed-template import batches/rows, public claims and approved
profiles.

## Provider port

`src/server/persistence/contracts.ts` defines the small application-facing
port. `PersistenceAdapter.withTransaction` is the boundary for atomic work;
the transaction exposes generic versioned records plus dedicated sync, audit,
asset and import repositories. `src/server/persistence/in-memory.ts` provides a
dependency-free implementation for local workflows and contract tests:

```ts
import { createInMemoryPersistence } from './src/server/persistence';

const persistence = createInMemoryPersistence();

await persistence.withTransaction(async (transaction) => {
  await transaction.records.insert('farmers', farmerRecord);
  await transaction.syncOperations.put(commandEnvelope);
  await transaction.auditEvents.append(auditEvent);
});
```

The in-memory adapter requires caller-supplied application IDs, preserves
decimal values supplied as strings, serializes transactions, and rolls back a
transaction when its callback fails. It also exposes import batch/row ports and
a private source-byte port used by the local fixed-template importer. It is not
a replacement for PostgreSQL concurrency or durability; source bytes are lost
when the local process is discarded.

Repeated `syncOperations.put` calls with the same `operationId` and payload
hash return the original record. Reusing an operation ID with a different
SHA-256 payload hash raises `idempotency_mismatch`. The SQL adapter must apply
the same rule with a unique operation ID and a transaction.

## Deliberate application responsibilities

The database checks row-local states, units, positive quantities, code
uniqueness, one active label assignment, one current quality review, one
published revision per packaging batch, and basic temporal relationships. A
command service still must:

- lock affected lot/ledger rows (or use serializable retry) before committing
  allocations, packaging inputs, or ledger movements;
- reject over-allocation, negative available stock, held/rejected/recalled
  material, and lineage cycles;
- verify that all related records belong to the same organization;
- perform valid state transitions and append an audit event for each one;
- keep the latest `traceable_lots.quality_disposition` projection in sync with
  the authorised `quality_reviews` decision;
- enforce publication claim/evidence approval and privacy filtering; and
- protect `audit_events` with deployment privileges that deny application
  `UPDATE` and `DELETE`.

The local purchase command service and local importer are intentionally thin
application seams over these ports. They provide useful offline/demo behavior
without implying that an in-memory result is a hosted commit. Hosted routes
continue to return `501 PERSISTENCE_NOT_CONFIGURED` until a durable adapter is
connected.

These rules are intentionally not implemented with PostgreSQL triggers so the
logical contract can move to standard PostgreSQL or another adapter. The
`publication_revision_sources` and `asset_links` tables use typed subject IDs
because their subjects span several domain tables; the adapter must validate
the referenced subject and organization.

## Migration caveats

- These are schema foundations, not complete command services or a general
  public-claim methodology engine. The application still needs service-layer
  validation, workflow transitions, authorization, evidence ingestion and
  provider adapters before hosted records can be used.
- The migration creates tables and indexes only. It does not create database
  roles, grants, row-level policies, seed organization/role rows, connection
  configuration, or a provider client. No project ID, URL, key, or other
  credential is required to review or apply it.
- `asset_metadata` records the current provider mapping while
  `asset_provider_mappings` retains mapping history. Provider asset IDs may be
  null during an upload intent; original-byte SHA-256 and visibility remain
  application-owned.
- `jsonb` is limited to justified snapshots, hashes/results, and provider
  metadata. A canonical snapshot hash must be computed by the application;
  PostgreSQL does not assume a provider-specific digest function.
- Apply the migration as a separately authorised deployment step and test it
  against an isolated PostgreSQL database before production. Keep the
  migration immutable after it has been applied; repair forward with a new
  migration if a defect is found.
