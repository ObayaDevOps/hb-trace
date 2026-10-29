# Decisions required before implementation

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Decisions required before implementation](../../../HB-TRACE-V1-PLAN.md#decisions-required-before-implementation)

<a id="prd-45-01"></a>
<!-- requirement:PRD-45-01 -->
- Select the managed Node.js host for the Next.js web/API and worker/scheduled jobs; confirm region, execution
  limits, connection behavior, expected concurrent users, rollback and operational owner. V1 does not use Docker.
<!-- /requirement:PRD-45-01 -->

<a id="prd-45-02"></a>
<!-- requirement:PRD-45-02 -->
- Select the Supabase organization, project plan/regions and separate development, test/staging and production
  projects. Confirm pooled/direct connection modes, backups/PITR, independent export, support and cost limits.
<!-- /requirement:PRD-45-02 -->

<a id="prd-45-03"></a>
<!-- requirement:PRD-45-03 -->
- Configure Supabase Auth sign-in, recovery, invitation, session limits, device revocation and MFA policy. Confirm
  the application actor/external-subject mapping and which roles require AAL2.
<!-- /requirement:PRD-45-03 -->

<a id="prd-45-04"></a>
<!-- requirement:PRD-45-04 -->
- Select private/public Supabase Storage buckets, S3 credentials and access policies. Demonstrate private asset
  visibility, signed URLs, server-side upload, export, deletion/retention and contractual suitability before private
  evidence is accepted.
<!-- /requirement:PRD-45-04 -->

<a id="prd-45-05"></a>
<!-- requirement:PRD-45-05 -->
- Complete the Uganda PDPO registration/governance, processor agreements, provider region/subprocessor and
  cross-border transfer assessment for Supabase, hosting, messaging and any analytics.
<!-- /requirement:PRD-45-05 -->

<a id="prd-45-06"></a>
<!-- requirement:PRD-45-06 -->
- Confirm numeric RPO/RTO, backup/export intervals, restore-test frequency and the person who receives provider and
  application alerts.
<!-- /requirement:PRD-45-06 -->

<a id="prd-45-07"></a>
<!-- requirement:PRD-45-07 -->
- Confirm the maximum offline duration, command/photo queue limits, N-1 compatibility window and supported staff
  phones/browsers from Phase 0 evidence.
<!-- /requirement:PRD-45-07 -->

<a id="prd-45-08"></a>
<!-- requirement:PRD-45-08 -->
- Confirm the PWA app name/ID, staff launch route, hosting origin/scope, icon assets and installation/support
  instructions. PWA delivery is settled; these choices specify its implementation.
<!-- /requirement:PRD-45-08 -->

<a id="prd-45-09"></a>
<!-- requirement:PRD-45-09 -->
- Define field preparation, offline re-entry/session expiry, account switching, quota/recovery behavior and safe
  application/database-update policy. Approve the cache allowlist and public verification freshness policy together.
<!-- /requirement:PRD-45-09 -->

<a id="prd-45-10"></a>
<!-- requirement:PRD-45-10 -->
- Assign the server reminder owner, intended staff recipients, escalation behavior and optional push subscription
  lifecycle. Define what appears in notifications and retain an in-app fallback without promising exact delivery.
<!-- /requirement:PRD-45-10 -->

<a id="prd-45-11"></a>
<!-- requirement:PRD-45-11 -->
- Confirm the QR/label printer, label dimensions and required human-readable code format.
<!-- /requirement:PRD-45-11 -->

<a id="prd-45-12"></a>
<!-- requirement:PRD-45-12 -->
- Confirm paper-original storage/retention and digital-evidence retention periods.
<!-- /requirement:PRD-45-12 -->

<a id="prd-45-13"></a>
<!-- requirement:PRD-45-13 -->
- Confirm public provenance fields and the approval owner for publication.
<!-- /requirement:PRD-45-13 -->

<a id="prd-45-14"></a>
<!-- requirement:PRD-45-14 -->
- Confirm the public-claim vocabulary, evidence rules, expiry/review periods and approved consumer-page structure.
<!-- /requirement:PRD-45-14 -->

<a id="prd-45-15"></a>
<!-- requirement:PRD-45-15 -->
- Confirm farmer public-profile consent, identity/location aggregation rules and editorial approval workflow.
<!-- /requirement:PRD-45-15 -->

<a id="prd-45-16"></a>
<!-- requirement:PRD-45-16 -->
- Confirm how farmers receive and confirm purchase receipts, raise disputes and access staff-assisted history;
  record NFC Farmer Cards as a compatible future option rather than a V1 dependency.
<!-- /requirement:PRD-45-16 -->

<a id="prd-45-17"></a>
<!-- requirement:PRD-45-17 -->
- Confirm fixed CSV/XLSX templates, matching keys and who may resolve likely duplicates; identify exceptional files
  that need a reviewed one-time converter.
<!-- /requirement:PRD-45-17 -->

<a id="prd-45-18"></a>
<!-- requirement:PRD-45-18 -->
- Assign owners/review dates to the minimal staff/developer/AI documentation, approve the root `AGENTS.md` and
  choose which staff help pages are cached offline.
<!-- /requirement:PRD-45-18 -->

<a id="prd-45-19"></a>
<!-- requirement:PRD-45-19 -->
- Approve the versioned internal pilot export contract. Add FCI4Africa mapping only after its authoritative schema
  and validation process are supplied.
<!-- /requirement:PRD-45-19 -->

<a id="prd-45-20"></a>
<!-- requirement:PRD-45-20 -->
- Confirm which laboratory tests are performed, by whom, at what frequency and under which current limits.
<!-- /requirement:PRD-45-20 -->

<a id="prd-45-21"></a>
<!-- requirement:PRD-45-21 -->
- Obtain and review US EAS 992:2020 and record whether/how it applies before making beeswax compliance claims.
<!-- /requirement:PRD-45-21 -->

<a id="prd-45-22"></a>
<!-- requirement:PRD-45-22 -->
- Approve the funded migration target assumptions—standard PostgreSQL, S3-compatible storage, Docker/Compose and
  identity-provider treatment—without implementing them in V1.
<!-- /requirement:PRD-45-22 -->
