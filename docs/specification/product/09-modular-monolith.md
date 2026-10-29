# Modular monolith

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Modular monolith](../../../HB-TRACE-V1-PLAN.md#modular-monolith)

<a id="prd-09-01"></a>
<!-- requirement:PRD-09-01 -->
Ship V1 as one TypeScript product with a web/API process and a separately invoked background worker from the same
codebase. Supabase hosts the PostgreSQL database; Supabase Storage hosts the approved asset classes described below. Maintain
strong internal boundaries for:
<!-- /requirement:PRD-09-01 -->

<a id="prd-09-02"></a>
<!-- requirement:PRD-09-02 -->
1. Identity, roles, privacy and consent
<!-- /requirement:PRD-09-02 -->

<a id="prd-09-03"></a>
<!-- requirement:PRD-09-03 -->
2. Sourcing: farmers, apiaries, locations, purchases and receipts
<!-- /requirement:PRD-09-03 -->

<a id="prd-09-04"></a>
<!-- requirement:PRD-09-04 -->
3. Material ledger: traceable lots, containers, allocations, transformations and packaging
<!-- /requirement:PRD-09-04 -->

<a id="prd-09-05"></a>
<!-- requirement:PRD-09-05 -->
4. Quality and evidence: measurements, disposition, controlled documents and attachments
<!-- /requirement:PRD-09-05 -->

<a id="prd-09-06"></a>
<!-- requirement:PRD-09-06 -->
5. Publication: approved public claims, profiles, story content and verification snapshots
<!-- /requirement:PRD-09-06 -->

<a id="prd-09-07"></a>
<!-- requirement:PRD-09-07 -->
6. Platform adapters: imports, asset storage, jobs, audit and exports
<!-- /requirement:PRD-09-07 -->

<a id="prd-09-08"></a>
<!-- requirement:PRD-09-08 -->
The dependency direction is inward toward application use cases and domain rules. Imports and workers invoke the
same use cases as the web API and never write domain tables directly. Publication consumes an approved projection
from traceability and quality; traceability never depends on publication. Modules use synchronous typed
application interfaces when an invariant must be committed atomically. Internal events and the transactional
outbox are reserved for asynchronous side effects, projections and integrations. An outbox is not the audit log,
and delivery is at least once, so every consumer is idempotent.
<!-- /requirement:PRD-09-08 -->
