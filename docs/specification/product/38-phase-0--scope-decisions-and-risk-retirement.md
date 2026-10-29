# Phase 0 — Scope, decisions and risk retirement

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Phase 0 — Scope, decisions and risk retirement](../../../HB-TRACE-V1-PLAN.md#phase-0--scope-decisions-and-risk-retirement)

<a id="prd-38-01"></a>
<!-- requirement:PRD-38-01 -->
- Observe the actual buying, extraction, blending, storage, packaging, cleaning, recall and audit workflows; name a
  product owner, quality owner, privacy owner, technical owner and production support owner.
<!-- /requirement:PRD-38-01 -->

<a id="prd-38-02"></a>
<!-- requirement:PRD-38-02 -->
- Agree the available team, budget and pilot timebox; mark every capability **must**, **later** or explicitly
  accepted manual process. Maintain a risk/dependency register with owner, mitigation, trigger and go/no-go impact.
<!-- /requirement:PRD-38-02 -->

<a id="prd-38-03"></a>
<!-- requirement:PRD-38-03 -->
- Baseline capture time, reconciliation effort, audit-evidence retrieval and connectivity rather than selecting
  release metrics without operational evidence.
<!-- /requirement:PRD-38-03 -->

<a id="prd-38-04"></a>
<!-- requirement:PRD-38-04 -->
- Assign owners/versions to forms and SOPs, create the clause-level requirements register, obtain US EAS 992:2020
  and decide beeswax applicability.
<!-- /requirement:PRD-38-04 -->

<a id="prd-38-05"></a>
<!-- requirement:PRD-38-05 -->
- Confirm terminology, fixed import templates, identifier/code formats, units/rounding, labels, roles/capabilities,
  receipt/dispute procedure, retention, public fields/claims and paper authority.
<!-- /requirement:PRD-38-05 -->

<a id="prd-38-06"></a>
<!-- requirement:PRD-38-06 -->
- Approve a field-level data inventory, lawful-basis/consent map, threat model, provider/transfer assessment and
  access matrix before importing personal data.
<!-- /requirement:PRD-38-06 -->

<a id="prd-38-07"></a>
<!-- requirement:PRD-38-07 -->
- Record ADRs for managed application/worker hosting, Supabase connection/migration/backup strategy, Supabase Auth,
  Supabase Storage public/private asset layout, sync protocol and later provider migration.
<!-- /requirement:PRD-38-07 -->

<a id="prd-38-08"></a>
<!-- requirement:PRD-38-08 -->
- Define the supported installed-PWA device/browser matrix, app identity/origin/scope, offline session and storage
  limits, account-switching recovery, public cache freshness and update policy. Select service-worker tooling only
  after proving compatibility with the production build and the existing authentication/sync boundaries.
<!-- /requirement:PRD-38-08 -->

<a id="prd-38-09"></a>
<!-- requirement:PRD-38-09 -->
- Run time-boxed proofs on actual target phones and printers: multi-day offline storage and reconnect, concurrent
  allocation conflicts, label/fallback codes, private Supabase Storage upload/signed retrieval, worst-case lineage queries and
  coordinated database/asset restore.
<!-- /requirement:PRD-38-09 -->

<a id="prd-38-10"></a>
<!-- requirement:PRD-38-10 -->
- Stop or reduce scope if any proof cannot meet an agreed safety threshold; do not defer the finding to final
  hardening.
<!-- /requirement:PRD-38-10 -->
