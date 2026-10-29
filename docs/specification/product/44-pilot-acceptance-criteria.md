# Pilot acceptance criteria

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Pilot acceptance criteria](../../../HB-TRACE-V1-PLAN.md#pilot-acceptance-criteria)

<a id="prd-44-01"></a>
<!-- requirement:PRD-44-01 -->
- The named product, quality, privacy, technical and support owners approve scope, runbooks and go-live; all Phase 0
  provider, data-transfer and private-storage gates are satisfied.
<!-- /requirement:PRD-44-01 -->

<a id="prd-44-02"></a>
<!-- requirement:PRD-44-02 -->
- Representative staff can add HB-TRACE to supported Android and iPhone/iPad home screens, sign in and navigate the
  installed application without developer assistance. Ordinary browser access and public lookup remain available.
<!-- /requirement:PRD-44-02 -->

<a id="prd-44-03"></a>
<!-- requirement:PRD-44-03 -->
- After online preparation, the installed app reopens in airplane mode and restores permitted saved field work
  for the agreed offline period. Reconnection acknowledges each accepted operation once; rejected/conflicted work
  remains actionable. Online-only stock, quality and publication actions cannot be committed offline.
<!-- /requirement:PRD-44-03 -->

<a id="prd-44-04"></a>
<!-- requirement:PRD-44-04 -->
- Updates, restarts, expired sessions and full storage preserve saved pending commands/attachments or report an
  explicit failed save without silent loss. Account switching exposes none of another user's local work. The
  device matrix, queue limits, preparation instructions and recovery limits have named owners and test evidence.
<!-- /requirement:PRD-44-04 -->

<a id="prd-44-05"></a>
<!-- requirement:PRD-44-05 -->
- Infusion due tasks remain accurate when the app is closed or notifications are denied. Reminder receipt never
  marks a check complete, and missing evidence or unresolved quality concerns cannot be bypassed by installation.
<!-- /requirement:PRD-44-05 -->

<a id="prd-44-06"></a>
<!-- requirement:PRD-44-06 -->
- The selected A4/label printing path works on the actual devices. Public verification respects the approved
  freshness/recall policy in both browser and installed contexts, including an honest unavailable response offline.
<!-- /requirement:PRD-44-06 -->

<a id="prd-44-07"></a>
<!-- requirement:PRD-44-07 -->
- 100 farmers and 100 apiaries are registered with the approved lawful-basis/consent and access controls. The fixed
  import template identifies likely duplicates and reports invalid rows without silent drops or partial mutation.
<!-- /requirement:PRD-44-07 -->

<a id="prd-44-08"></a>
<!-- requirement:PRD-44-08 -->
- At least 600 valid purchase/harvest records pass through applicable derived batches over a complete operating
  cycle. These volume targets supplement rather than replace workflow and integrity criteria.
<!-- /requirement:PRD-44-08 -->

<a id="prd-44-09"></a>
<!-- requirement:PRD-44-09 -->
- Every purchase has a retrievable receipt and visible confirmation/dispute state; resolution uses a linked
  amendment and never overwrites the original transaction.
<!-- /requirement:PRD-44-09 -->

<a id="prd-44-10"></a>
<!-- requirement:PRD-44-10 -->
- Every command shown to a user as saved is durably present either in IndexedDB or on the server. Under the agreed
  reconnect test profile, the defined target percentage is acknowledged within the defined time window, all
  remaining rejected/conflicted operations are visible and actionable, and there is zero silent loss.
<!-- /requirement:PRD-44-10 -->

<a id="prd-44-11"></a>
<!-- requirement:PRD-44-11 -->
- Duplicate, reordered and retried delivery creates zero duplicate domain records. Two-device allocation tests
  produce zero over-allocation, negative stock or last-write-wins disposition changes.
<!-- /requirement:PRD-44-11 -->

<a id="prd-44-12"></a>
<!-- requirement:PRD-44-12 -->
- One purchase can produce multiple labelled honey/beeswax lots; partial allocation, blending and later QR
  assignment preserve permanent identities, direct allocation edges and exact remaining quantity.
<!-- /requirement:PRD-44-12 -->

<a id="prd-44-13"></a>
<!-- requirement:PRD-44-13 -->
- Every released batch has required processing, quality, disposition and packaging evidence. A superseded result or
  new upstream hold identifies every affected downstream lot and publication.
<!-- /requirement:PRD-44-13 -->

<a id="prd-44-14"></a>
<!-- requirement:PRD-44-14 -->
- A complete batch-level recall drill records affected scope/actions, blocks further allocation/publication and
  changes the active public response without deleting operational or publication history.
<!-- /requirement:PRD-44-14 -->

<a id="prd-44-15"></a>
<!-- requirement:PRD-44-15 -->
- Dashboard stock, hold, missing-evidence, pending-review and failed-sync counts reconcile with filtered source
  records. An authorised user completes backward or forward trace retrieval within the agreed percentile/time on
  the defined worst-case pilot graph.
<!-- /requirement:PRD-44-15 -->

<a id="prd-44-16"></a>
<!-- requirement:PRD-44-16 -->
- At least 50 reviewer-approved evidence packs validate against a documented, versioned pilot export contract. An
  FCI4Africa mapping is required only if an authoritative schema and validation process are supplied and approved.
<!-- /requirement:PRD-44-16 -->

<a id="prd-44-17"></a>
<!-- requirement:PRD-44-17 -->
- Every initial form prints on the actual A4 printer, can be captured on an actual production phone and is
  retrievable by record ID, date, form type and batch. Unreadable multi-page uploads can be rejected without
  overwriting originals, and page order remains intact.
<!-- /requirement:PRD-44-17 -->

<a id="prd-44-18"></a>
<!-- requirement:PRD-44-18 -->
- Private evidence is private from initial Supabase Storage upload, cannot be fetched without an unexpired authorised signed
  URL, and no Supabase Storage secret appears in built browser assets or logs. Asset hashes and evidence links reconcile with
  the PostgreSQL records and export manifest.
<!-- /requirement:PRD-44-18 -->

<a id="prd-44-19"></a>
<!-- requirement:PRD-44-19 -->
- Current/superseded SOP/template versions, approval and acknowledgement history are retrievable. A quality manager
  demonstrates applicable requirements/evidence without exposing licensed standards publicly.
<!-- /requirement:PRD-44-19 -->

<a id="prd-44-20"></a>
<!-- requirement:PRD-44-20 -->
- Every public response is generated from one immutable approved publication revision, contains no classified
  private field and uses batch/lot terminology rather than claiming per-jar serialization. Each factual stage and
  claim resolves internally to approved support.
<!-- /requirement:PRD-44-20 -->

<a id="prd-44-21"></a>
<!-- requirement:PRD-44-21 -->
- Withdrawing public-profile consent removes the profile from future/active publication as policy requires without
  breaking internal lineage or historic audit evidence.
<!-- /requirement:PRD-44-21 -->

<a id="prd-44-22"></a>
<!-- requirement:PRD-44-22 -->
- Staff guidance lets representative users complete common workflows and resolve an offline/sync problem while
  distinguishing guidance from a controlled SOP. A developer can use the clean-checkout documentation to locate a
  module, run migrations safely and execute its relevant tests; maintained links/commands and OpenAPI generation
  pass in CI.
<!-- /requirement:PRD-44-22 -->

<a id="prd-44-23"></a>
<!-- requirement:PRD-44-23 -->
- Supabase database restoration plus original-byte and asset-manifest reconciliation is demonstrated within numeric
  approved RPO/RTO values. The provider-neutral export contains all required IDs, hashes and mappings for the later
  PostgreSQL/S3 migration.
<!-- /requirement:PRD-44-23 -->

<a id="prd-44-24"></a>
<!-- requirement:PRD-44-24 -->
- Production staff complete their common workflows during supervised UAT without developer assistance, and no
  unresolved critical/high security issue, silent-loss defect, privacy leak or stock-integrity defect remains.
<!-- /requirement:PRD-44-24 -->
