# V1 portability contract

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — V1 portability contract](../../../HB-TRACE-V1-PLAN.md#v1-portability-contract)

<a id="prd-11-01"></a>
<!-- requirement:PRD-11-01 -->
- Domain and application services depend on an `AssetStore`, `IdentityProvider`, job runner and database
  configuration boundary, not on Supabase Storage or Supabase SDK objects.
<!-- /requirement:PRD-11-01 -->

<a id="prd-11-02"></a>
<!-- requirement:PRD-11-02 -->
- Operational browser clients call HB-TRACE API commands. They do not write traceability records directly through
  the Supabase Data API, and Supabase service-role credentials never enter a browser bundle.
<!-- /requirement:PRD-11-02 -->

<a id="prd-11-03"></a>
<!-- requirement:PRD-11-03 -->
- Supabase Auth establishes identity; the server reloads application roles and permissions for each command.
  PostgreSQL row-level security may provide defence in depth but is not the only authorization control.
<!-- /requirement:PRD-11-03 -->

<a id="prd-11-04"></a>
<!-- requirement:PRD-11-04 -->
- Every domain record uses an application-generated UUID. External auth subjects, storage bucket/object keys, public codes
  and external storage mappings are replaceable.
<!-- /requirement:PRD-11-04 -->

<a id="prd-11-05"></a>
<!-- requirement:PRD-11-05 -->
- All database schema changes live in reviewed SQL migrations. Avoid Supabase-only extensions, triggers or Edge
  Function dependencies unless an ADR documents a portable replacement.
<!-- /requirement:PRD-11-05 -->

<a id="prd-11-06"></a>
<!-- requirement:PRD-11-06 -->
- Every stored asset has an application asset ID, provider, provider asset ID, SHA-256 hash, media type, byte size,
  visibility, ingestion state and retention class. Domain records reference only the application asset ID.
<!-- /requirement:PRD-11-06 -->

<a id="prd-11-07"></a>
<!-- requirement:PRD-11-07 -->
- An export manifest can map each Supabase Storage asset to its evidence links, hash and intended future S3 key. A migration
  verifies bytes by hash before changing the active provider mapping.
<!-- /requirement:PRD-11-07 -->

<a id="prd-11-08"></a>
<!-- requirement:PRD-11-08 -->
- Public batch URLs and internal record IDs survive database, identity, hosting and asset-provider changes.
<!-- /requirement:PRD-11-08 -->

<a id="prd-11-09"></a>
<!-- requirement:PRD-11-09 -->
Provider behavior must be verified against current official [PostgreSQL connection guidance](https://supabase.com/docs/guides/database/connecting-to-postgres),
[S3 compatibility](https://supabase.com/docs/guides/storage/s3/compatibility) and
[private asset delivery](https://supabase.com/docs/guides/storage/serving/downloads).
S3 compatibility does not imply object versioning or object lock. Use application revisions and independent byte backups.
<!-- /requirement:PRD-11-09 -->
