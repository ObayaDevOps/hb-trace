# First funded infrastructure iteration

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — First funded infrastructure iteration](../../../HB-TRACE-V1-PLAN.md#first-funded-infrastructure-iteration)

<a id="prd-34-01"></a>
<!-- requirement:PRD-34-01 -->
The next funded iteration containerizes the same web and worker entry points and introduces Docker Compose,
standard PostgreSQL and S3-compatible storage. The migration is a provider change, not a domain redesign:
<!-- /requirement:PRD-34-01 -->

<a id="prd-34-02"></a>
<!-- requirement:PRD-34-02 -->
1. Provision version-pinned application/worker images, PostgreSQL, S3-compatible storage and the required ingress,
   secrets, backup and monitoring configuration.
<!-- /requirement:PRD-34-02 -->

<a id="prd-34-03"></a>
<!-- requirement:PRD-34-03 -->
2. Freeze or explicitly reconcile writes, take a standard `pg_dump` from Supabase, restore it to the target
   PostgreSQL version and verify migration history, row counts, constraints, critical aggregates and lineage.
<!-- /requirement:PRD-34-03 -->

<a id="prd-34-04"></a>
<!-- requirement:PRD-34-04 -->
3. Export every application-managed Supabase Storage asset using the PostgreSQL asset manifest, write it under a stable S3
   key, verify SHA-256 and page/order metadata, and only then switch the provider mapping. Do not change evidence,
   batch or publication IDs.
<!-- /requirement:PRD-34-04 -->

<a id="prd-34-05"></a>
<!-- requirement:PRD-34-05 -->
4. Preserve public URLs through the existing public-code mapping. application-owned editorial revisions and asset identities remain unchanged across storage providers.
<!-- /requirement:PRD-34-05 -->

<a id="prd-34-06"></a>
<!-- requirement:PRD-34-06 -->
5. Keep Supabase Auth temporarily or migrate identities through the `IdentityProvider` mapping to a supported OIDC
   provider such as Keycloak. Authentication cutover must not create new actors or rewrite audit attribution.
<!-- /requirement:PRD-34-06 -->

<a id="prd-34-07"></a>
<!-- requirement:PRD-34-07 -->
6. Run sync compatibility, authorization, evidence retrieval, public verification, backup/restore and rollback
   tests before cutover. Retain a time-bounded rollback path and migration reconciliation report.
<!-- /requirement:PRD-34-07 -->

<a id="prd-34-08"></a>
<!-- requirement:PRD-34-08 -->
The detailed funded migration and later platform capabilities are maintained in `HB-TRACE-V2-PLAN.md`.
<!-- /requirement:PRD-34-08 -->
