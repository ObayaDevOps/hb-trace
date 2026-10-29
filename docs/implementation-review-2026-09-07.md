# HB-TRACE implementation and plan review

Review date: 2026-09-07. Audience: product, quality and engineering owners.

Reviewed the current working tree, including uncommitted work, against
[V1](../HB-TRACE-V1-PLAN.md), [V2](../HB-TRACE-V2-PLAN.md),
[AGENTS.md](../AGENTS.md), the implementation, migrations, tests and supporting
documentation. Source line references describe this review snapshot.

The initial questions concerned the review priority, delivery constraints and
whether to challenge the plans. No answers were available when this document
was written. The working assumption is **V1 readiness for a real pilot**, with
V2 assessed as a conditional roadmap. Recommendations to change scope or
providers are proposals; they do not amend the approved plans. No deadline,
staffing level, budget or deployment configuration is assumed.

## Assessment

The repository has useful, tested foundations, but it is not yet an end-to-end
traceability pilot. The most valuable next step is to reconcile the domain and
database contracts, fix command/retry correctness, and complete one durable
online journey from purchase to public batch verification and withdrawal.

Keep the modular monolith, application-owned IDs, exact decimal arithmetic,
server command boundaries, separate public projections and restricted offline
scope. The plans generally make sound distinctions between operational facts,
editorial content, evidence and approval. They also acknowledge most missing
provider work. The main planning weakness is the distance between the breadth
of the acceptance criteria and the small number of complete application flows.

The largest newly identified concerns are:

- SQL cannot preserve the domain model's exact source-to-output contributions.
- Transformation rules require perfect mass balance despite the plan allowing
  reviewed yield differences.
- Client sync can permanently reject retryable failures or acknowledge the wrong
  operation; server replay does not bind the operation to its original scope.
- Import retries, file limits, receipt follow-up and capture timestamps have
  concrete correctness gaps despite the passing unit suite.

## What is implemented versus planned

| Capability | Current evidence | Assessment and next requirement |
| --- | --- | --- |
| Routing and module boundaries | App Router; TypeScript domain/server/API files; provider-aware auth files | Useful foundation. Maintained JSX is outside TypeScript checking; dependency boundaries have no automated check. |
| Exact values and material rules | `src/domain/decimal.ts`, `materials.ts`, `lineage.ts`; unit tests | Exact arithmetic and graph validation exist. Yield semantics, persistence representation and packaging consumption need reconciliation. |
| Database and transactions | Three SQL migrations; in-memory transaction adapter | No PostgreSQL adapter, migration runner/seeds or real database tests. Memory transactions do not prove SQL constraints or concurrent allocation safety. |
| Purchase and receipt capture | Local command service, purchase API and IndexedDB purchase form | A submitted purchase and receipt are stored in process memory. Acceptance, source-lot/ledger creation and receipt retrieval/follow-up are not a complete operational flow. |
| Offline workflows | Eight command names; purchase queuing; explicit sync and network recovery hooks | Only `purchase.submit` has a local handler. Farmer/apiary creation, receipt follow-up, fallback labels and attachments return `COMMAND_NOT_IMPLEMENTED`. |
| Offline application and device policy | Dexie operations table and a manifest file | No service worker registration/app-shell cache, durable attachment queue, quota controls or offline session policy found. A running tab with IndexedDB is not evidence of offline restart support. |
| Imports | Fixed CSV/XLSX parsing, local preview/decisions/commit, original bytes in memory | Substantial local slice. Durable assets, consent records, reliable UI retries and stronger duplicate/file-error handling remain. |
| Quality, extraction and packaging | Domain functions and fixture-based forms | No transactional application services or API routes for the complete workflows; no executable versioned honey quality-rule set. |
| Hold, withdrawal and recall | Domain impact planner and role-checking preparation function | Explicitly a no-write seam. Durable incident scope, concurrent graph locking and active public response changes remain. |
| Public verification | Local fixture API and a separate UI fixture | Public fields are synthetic and privacy-conscious. No live projection reader/builder, approval workflow, public-code issuance or claim/profile invalidation path. |
| Forms, SOPs and compliance | SQL tables and sample UI metadata | No bundled controlled PDFs, durable evidence ingestion/review, acknowledgements, evidence packs or worker. |
| Deployment and assurance | Setup/handoff docs; typecheck, unit tests and build scripts | No repository CI pipeline, browser/provider/concurrency/restore evidence or operational job/export implementation found. |

The hosted API paths deliberately fail closed. Keep that behavior until each
capability has a durable implementation and the corresponding acceptance checks.

## Prioritized implementation findings

**P1** means fix before the affected capability handles real pilot records or
before implementing a dependent adapter. **P2** means schedule a focused
correctness or usability improvement. These priorities do not assert that a
hosted production vulnerability was exercised; hosted resources were not tested.

### F01 — P1: Preserve exact contribution edges in SQL

**Evidence:** [MaterialAllocation](../src/domain/materials.ts#L205) stores source
lot, target lot and exact quantity. The migration's
[transformation_allocations](../supabase/migrations/20260903000000_v1_persistence_foundation.sql#L480)
stores source-to-transformation quantities, while
[transformation_outputs](../supabase/migrations/20260903000000_v1_persistence_foundation.sql#L503)
stores output quantities. There is no table carrying the source-to-output
contribution matrix. The [persistence port](../src/server/persistence/contracts.ts#L291)
also lacks contribution, lot-origin, material-ledger and packaging-input repositories.

**Impact:** Inputs A=60 kg and B=40 kg with outputs X=50 kg and Y=50 kg can have
several different contribution matrices. The SQL totals cannot distinguish
them. Joining every input to every output would invent relationships and cannot
recover exact quantities. This affects traceability and recall scope.

**Recommendation:** Add a relational contribution record linking a transformation
input allocation to an output, with exact quantity and stable ID. Define its
meaning together with F02. Add transaction ports for contributions, origins,
ledger movements and packaging inputs. Verify that a two-input/two-output
transformation round-trips through PostgreSQL with the same edges, quantities
and backward/forward traces, including a source that contributes to only one output.

### F02 — P1: Model processing losses and yield explicitly

**Evidence:** [commitTransformation](../src/domain/materials.ts#L661) requires both
input totals and output totals to equal the same allocation quantities. The
[V1 invariants](../HB-TRACE-V1-PLAN.md#identifiers-quantities-and-invariants)
explicitly allow reviewed yield differences. A diagnostic using 100 kg of input,
80 kg of honey and 10 kg of raw beeswax is rejected.

**Impact:** Staff must represent the missing 10 kg as an output or understate
consumption. Understating consumption leaves stock available that was actually
used. There is no tolerance evaluation or recorded yield variance in this flow.

**Recommendation:** Define input consumption, measured outputs, recorded residue,
process loss and yield variance separately. Agree how source contributions are
allocated after loss and retain the rule version. Keep exact stock accounting
without forcing invented physical outputs. Test an accepted reviewed loss, an
out-of-tolerance variance, multiple co-products, remaining stock and reversal.

### F03 — P1: Require a valid, matching sync result before changing command outcome

**Evidence:** [syncOfflineOperations](../src/lib/offline/outbox.ts#L104) retries
only selected HTTP statuses, uses the first response item without checking its
operation ID, and synthesizes a terminal rejection when that item is missing.

**Confirmed behavior:** A 502 response and a 200 response with `data: []` both
produce `rejected`; an acknowledgement for a different operation marks the
queued command `acknowledged`. Rejected commands are excluded from subsequent
automatic sync. The acknowledgement-clearing function could later delete a
command that was never individually acknowledged.

**Recommendation:** Validate response shape, status and operation ID. Keep
unconfirmed transport outcomes retryable; distinguish transport/auth/service
unavailability from explicit domain rejection. Apply bounded backoff and expose
remediation. Add client tests for malformed JSON, empty/partial responses,
mismatched IDs, 501/502/504, timeouts and interrupted sending. Gate any local
cleanup on a valid acknowledgement from the intended durable server.

### F04 — P1: Bind idempotency to command identity and authorization scope

**Evidence:** [syncOperations.put](../src/server/persistence/in-memory.ts#L215)
compares only operation ID and payload hash. [processSyncEnvelope](../src/server/commands/local.ts#L305)
can return an existing result before validating the stored operation's ownership.
Command type, target, deployment, expected version and timestamps sit outside the
payload hash.

**Confirmed behavior:** Reusing an operation ID and payload with another actor,
organization, deployment and target returned the original purchase ID as an
acknowledgement in a direct local service diagnostic. The current local HTTP
identity is fixed; this demonstrates an adapter/service defect, not an exercised
cross-organization hosted endpoint.

**Recommendation:** Authorize replay against the stored scope, validate deployment
identity, and bind all immutable command-defining fields through a versioned
fingerprint or explicit equality checks. Apply capability checks at the shared
application use-case boundary so API, imports and workers use the same policy.
Test altered command type, target, actor, scope and expected version independently.

### F05 — P1: Bound import expansion before allocating the expanded content

**Evidence:** [XLSX parsing](../src/server/imports/xlsx.ts#L118) trusts the archive's
declared uncompressed size, then calls `inflateRawSync` without an output limit.
The actual size is checked after inflation. A 9,311-byte synthetic archive that
declared one byte expanded to 9 MiB before rejection, exceeding the 8 MiB entry cap.
The [preview route](../src/app/api/v1/imports/preview/route.ts) also reads the full
request before enforcing actual size when Content-Length is absent or inaccurate.

**Recommendation:** Enforce streaming request limits and actual decompression
limits, cap rows/cells/text and concurrent parsing work, and handle malformed
multipart bodies consistently. Node supports `maxOutputLength` for the relevant
zlib convenience methods. [Node 24 documentation](https://nodejs.org/docs/latest-v24.x/api/zlib.html#class-options)
Test deceptive size metadata and interrupted/oversized uploads with small bounded
fixtures. Evaluate a maintained parser against the fixed-template requirements;
retain strict rejection of unsupported content whichever parser is selected.

### F06 — P1: Reconcile domain types and database storage before adapter implementation

| Contract mismatch | Evidence | Required decision or check |
| --- | --- | --- |
| Quality states | Domain uses `pending_review` and `quarantined`; SQL and `QualityReviewRecord` use `pending` and omit `quarantined`. | Choose canonical semantics and lossless mappings; round-trip every disposition. |
| Material categories | Domain has `waste_residue`; SQL separates `waste` and `residue`. | Preserve the required operational distinction and historical interpretation. |
| Numeric precision | Decimal accepts much greater precision than SQL quantities `numeric(20,6)` and money `numeric(20,4)`. | Specify maximum magnitude, entered/canonical scale, currency rules and explicit rounding/rejection at command validation. |
| Packaging sources | Domain `PackagingRun` has one `sourceLotId`; SQL allows multiple `packaging_batch_inputs`. | Either enforce a single-source/pre-blended V1 workflow or support every input in packaging and recall planning. |
| Historical rules | SQL transformations have `rule_version`; domain committed transformations do not retain it. | Persist and reconstruct the rule/schema version used to accept each governed record. |

Sources: [quality](../src/domain/quality.ts), [products](../src/domain/products.ts),
[decimal](../src/domain/decimal.ts), [packaging](../src/domain/packaging.ts),
[contracts](../src/server/persistence/contracts.ts),
[foundation migration](../supabase/migrations/20260903000000_v1_persistence_foundation.sql).

This is more than a naming cleanup: PostgreSQL rounds values that exceed a
declared numeric scale. A locally accepted value such as `1.0000004 kg` cannot
round-trip unchanged through a six-decimal quantity column.
[PostgreSQL numeric documentation](https://www.postgresql.org/docs/current/datatype-numeric.html)
Run one shared acceptance/rejection contract suite against memory and PostgreSQL,
including precision boundaries, uniqueness and foreign-key failures.

### F07 — P1: Preserve capture facts and each business transition in audit history

**Evidence:** [purchase normalization](../src/server/commands/local.ts#L318)
uses the payload without passing the envelope's event/capture times. Defaults
replace event time with collection-date midnight and capture time with server
processing time. The [audit helper](../src/server/commands/local.ts#L725) uses
`now()` for both occurrence and capture. Confirmation changes the receipt state
but persistence appends only a `receipt.issued` event for the receipt.

**Confirmed behavior:** An envelope captured on September 1 at 08:01Z produced
a purchase whose `capturedAt` was September 7, when the diagnostic ran; its
08:00Z event became 00:00Z.

**Recommendation:** Pass a validated command context through normalization,
domain transitions and persistence. Distinguish collection date, actual event
instant, device capture, server receipt and commit time. Preserve each receipt
issue/confirmation/dispute transition, reason, method and evidence reference.
Test delayed sync and conflicting payload/envelope times without overwriting facts.

### F08 — P2: Support the promised later receipt confirmation and dispute path

**Evidence:** The form offers “Paper receipt supplied; confirm later,” but
[the command](../src/server/commands/local.ts#L533) creates
`confirmation_unavailable`. [Receipt transitions](../src/domain/purchases.ts#L148)
allow that state only to close. A confirmed receipt also cannot become disputed.
Those transition failures were reproduced directly.

**Recommendation:** Agree when confirmation/dispute is allowed, then model
acknowledgement history and linked disputes so later events do not overwrite an
issued receipt. Implement receipt retrieval/printing and the follow-up command
handlers. Test paper-now/confirm-later, delayed dispute, resolution by linked
amendment and repeated delivery. The owner decision affects rules; the current
“confirm later” promise already contradicts the implementation.

### F09 — P2: Reuse the import commit operation ID across uncertain retries

**Evidence:** [ImportPanel.commit](../src/components/v1/ImportPanel.jsx#L138)
generates a fresh UUID on every click.
[commitImport](../src/server/imports/local.ts#L730) correctly rejects a different
operation ID after the batch has committed.

**Impact:** If the server commits and the response is lost, retrying from the
panel sends a new ID and returns an idempotency conflict. Backend replay support
therefore does not deliver the promised retry experience through the UI.

**Recommendation:** Create and persist one commit ID for the intended batch
commit before sending; reuse it after timeout, navigation and reload. Provide an
authorized import-status read and refresh row outcomes after commit. Test a lost
success response followed by UI retry and reload. Apply the same stable-draft
principle to purchase submission, which currently queues a new command on each save.

### F10 — P2: Separate whole-file import failures from rejectable rows

**Evidence:** [commitImport](../src/server/imports/local.ts#L741) lets
`allowPartialReject` bypass `correction_required` without distinguishing a bad
header/parser failure. With zero parsed rows it records `completed`, zero created
and zero rejected. This was reproduced with a file containing the wrong header.

**Recommendation:** Persist file-level validation errors and prohibit committing
an invalid file structure. Partial rejection should apply only to identifiable
rows in a valid template. Reject or explicitly classify empty files. Show a
summary that accounts for every source row.

Additional import improvements follow from
[duplicate detection and commit](../src/server/imports/local.ts) and
[fixed-template validation](../src/server/imports/fixed-template.ts):

- Compare likely duplicates within the uploaded file as well as against stored
  records; distinct references with the same name/contact currently escape that
  within-file comparison. Recheck candidates at commit when stored data changed.
- Preserve an approved external-reference alias when matching a row to an existing
  farmer, or require an explicit source correction. Otherwise later apiary imports
  using the matched row's reference cannot resolve that farmer.
- Present candidate names, references and permitted matching details; truncated
  UUIDs alone are insufficient for an informed staff decision. Hide impossible
  “create” choices for already-used references.
- Persist purpose-specific consent/lawful-basis records through a shared onboarding
  use case. `consent_status` in import audit metadata is not an `actor_consents`
  record. This remains a real-data activation gate already acknowledged in the plan.
- Make repeated previews use stored review state consistently, preserve useful
  physical source-row locations, and retain/map farmer region data explicitly.

### F11 — P1: Make deployment mode and readiness truthful

**Evidence:** [runtime configuration](../src/lib/runtime-config.ts#L5) treats every
value other than exact `hosted` as local mode. Local mode grants a demo identity.
`liveWritesEnabled` becomes true from hosted mode plus Supabase URL/key presence,
although hosted write routes still return 501. The
[health route](../src/app/api/v1/health/route.ts) always reports `ok`.

**Recommendation:** Validate mode values, require explicit demo selection for a
deployed demo, and make missing/mistyped hosted deployment configuration fail
closed. Preserve credential-free local development and local production-build
testing. Separate liveness from readiness and report individual capabilities
based on functioning adapters, migrations and workers, not environment-variable
presence. Test unset/invalid modes and configured auth with unavailable persistence.

### F12 — P1: Complete hosted authorization and database exposure controls

**Evidence:** [identity lookup](../src/server/auth/identity.ts#L47) reloads roles,
but does not return organization ID, check actor/organization active status, or
represent/enforce MFA assurance. Role-query errors become an empty role list;
[StaffLayout](../src/app/staff/layout.js) accepts any mapped identity. Migrations
do not establish grants/RLS, and shared local services can create their own demo
organization/actor. These are gaps before hosted activation.

**Recommendation:** Derive an active organization-scoped identity on the server,
enforce capabilities and required MFA in application use cases, distinguish role
lookup failure from a valid empty assignment, and test revocation. Keep demo
bootstrapping outside hosted command services. Use least-privilege application,
migration, worker and audit-access roles with database enforcement against audit
updates/deletes.

The [purchase form](../src/components/v1/PurchaseEntryForm.jsx#L30) always queues
the demo actor, and [the outbox](../src/lib/offline/outbox.ts#L75) hardcodes
`deploymentId: "local-demo"`. Supply validated actor/deployment context for hosted
capture and partition local data by that context. Test account switching and
re-entry on a shared device; enabling a database adapter alone will not make
these queued commands valid for a real staff identity.

Choose a deliberate Supabase Data API exposure policy. Exposed tables without
RLS are reachable by roles with matching grants; a browser not using those APIs
is not an access control. If disabling the Data API, first move the existing
identity/role lookups off `.from(...)`; otherwise expose only the required
protected relations. Actual project grants were not inspected.
[Supabase API security guidance](https://supabase.com/docs/guides/api/securing-your-api)
Verify denied direct reads/writes, organization isolation, disabled actors and
privileged actions without the required assurance before live records are admitted.

### F13 — P2: Make staff screens reflect actual data and durability

**Evidence:** Most staff pages render `mock-data.js`, even when the shell is in
hosted mode. Quality, packaging and evidence forms change React state and display
“staged locally” without writing the entered record to durable storage. The
[staff shell](../src/components/v1/StaffShell.jsx#L149) refreshes its queue count
on mount but does not sync on app open or subscribe to new queue entries.

**Recommendation:** Feed both local and hosted screens through the same typed
read-model interfaces, with explicit unavailable states until a provider exists.
Use a “this session only” label for volatile prototypes or implement an authorized
durable draft. Keep privileged commits online. Add a visible queue showing sending,
pending, rejected and conflicted records with safe recovery actions; refresh it
when a command is queued. Add app-open/foreground sync and serialize overlapping
sync attempts. Wire or disable receipt/label preview and document actions.

Acceptance should include saving, navigating away/reloading, seeing the same
record, reconciling dashboard counts, identifying a failed command and completing
a workflow on a representative phone. Source inspection is not accessibility or
device acceptance evidence.

### F14 — P2: Make the repository checks cover the maintained product

**Evidence:** [package.json](../package.json) has typecheck/test/build scripts but
no CI, lint, integration, browser, migration or documentation checks. With
`allowJs: false`, [tsconfig.json](../tsconfig.json) excludes maintained JSX from
type checking. `.env.example` exists locally but is untracked and ignored by the
[`.env*` rule](../.gitignore#L34), so the documented clean-checkout setup cannot
depend on it being included. The V1 checklist mentions two migrations; there are three.

**Recommendation:** Include the sanitized example environment file explicitly,
pin the package-manager/runtime policy, and add CI using `npm ci` plus required
checks. Migrate active JSX incrementally or deliberately enable JS checking.
Enforce browser/server import boundaries. Align
[OpenAPI](openapi.yaml) with actual request/response schemas: purchase-required
fields differ, several error responses are missing, and command payloads are
untyped objects. Remove the unused `LocalSyncLedger` after its useful tests cover
the real service, so there is one behavioral reference. Record dated test evidence
instead of relying on an earlier session's completion claim.

## Improvements to the V1 plan

1. **Track complete user journeys and evidence.** Give each capability an owner,
   dependency, implementation status and acceptance evidence. Use distinct states
   such as domain-tested, local-connected, provider-integrated and pilot-accepted.
   The present application is a set of foundations; the plan's complete online
   walking-skeleton gate is still open. Avoid deriving a completion percentage
   from checked foundation items.
2. **Resolve the data contract before expanding commands.** Produce a concise data
   dictionary/ADR for F01, F02 and F06: quantity precision, loss attribution,
   quality states, packaging source rules, rule versions and correction semantics.
   Specify how corrections/reversals affect downstream stock, claims and evidence.
   A generic repository `update` should not become the correction mechanism for
   committed ledger facts or approved snapshots.
3. **Make Phase 0 smaller and actionable.** Identify the decisions that block the
   next slice, their owner and the proof needed. Separate synthetic development
   work from decisions required before real data. Define a must/later/manual
   matrix with an explicitly accepted manual process where appropriate. Do not
   silently defer an existing V1 acceptance requirement.
4. **Finish one durable online path before broad offline support.** Connect
   farmer/apiary selection, purchase acceptance/receipt, extraction and lots,
   measurement/release, packaging and immutable publication. Include an early
   withdrawal/recall exercise. UI samples, SQL tables and unit functions should
   not independently count as completion of that path.
5. **Turn offline scope into an executable capability table.** For every offered
   command specify handler, identity policy, dependencies, conflicts, attachment
   behavior and retry compatibility. Do not offer unsupported command types to
   a deployed client. Specify app-shell/reference caching, attachment persistence,
   queue/quota limits, shared-device handling and an N-1 upgrade policy. Test cold
   offline reopening as well as keeping an existing page open.
6. **Define active publication and incident behavior precisely.** Store an explicit
   active revision pointer or an equivalently unambiguous selection rule alongside
   immutable snapshots/history. The current withdrawal helper inserts a new
   withdrawn revision; that alone does not retire a reader that selects the old
   `published` row. Decide whether an upstream hold removes a public response or
   creates a reviewed notice; the planner currently forces holds to leave it
   unchanged. Define withdrawal/recall visibility timing: the fixture API permits
   60 seconds of freshness plus 300 seconds of stale revalidation. Test caches,
   source corrections, expired claims and public-profile consent withdrawal.
7. **Make the asset-provider proof concrete.** Test private-from-upload images/PDFs,
   signed retrieval/expiry, original-byte hashes, retention, export and coordinated
   restore using synthetic assets. Add the actual Media Library identifier and
   signing-key configuration to activation guidance when the provider is selected.
   Sanity documents public-by-default uploads and potentially long CDN propagation
   after making an asset private; the current plan's private-first requirement
   should remain an early proof. [Sanity asset visibility](https://www.sanity.io/docs/media-library/asset-visibility)
8. **Write measurable acceptance thresholds and runbooks.** Supply owner-approved
   offline duration, supported devices, queue volumes, sync recovery time, trace
   query latency, public withdrawal propagation, RPO/RTO and evidence retrieval
   targets. Add the worker's job types, retries, idempotency, reconciliation and
   monitoring. Keep the server job outbox separate from the browser command queue
   and the audit log. Clarify the Drizzle/Zod choices in the plan: neither is
   currently in the dependency manifest; decide through a short ADR rather than
   adding dependencies solely to match prose.

## Improvements to the V2 plan

| Topic | Suggested change | Reason or evidence needed |
| --- | --- | --- |
| Mandatory first infrastructure migration | Make the move to self-operated PostgreSQL/Compose conditional on a funded need, total operating cost, recovery objectives and a named capable operator. Retain a managed deployment option. | Portability can be demonstrated without immediately taking on database/object-store operations. Current V2 principles already require evidence for other infrastructure expansion. |
| Migration execution | Divide database, assets and identity into independently rehearsed cutovers with checkpoints, rollback ownership and rules for writes accepted after cutover. | The plan correctly warns against a combined migration; turn that principle into executable gates, including outstanding offline commands. |
| Capability sequencing | Choose the next release from measured pilot friction and a funded customer need; use the release numbers as examples. | Reporting, receipt recovery or device reliability may have more immediate value than governed claims, OCR or platform modules. |
| Commodity and scheme contracts | Retain the requirement to learn from a real second commodity before freezing an SDK. Keep certification/rule packs separately versioned and preserve historical interpretation. | Several domain/SQL mappings are unresolved even within honey and beeswax; building a broad SDK now would freeze assumptions prematurely. |
| Scope overlap | Clarify that V2 expansions do not postpone V1's applicable beeswax decision, basic evidence exports, private assets, reliable offline collection or batch recall. | These already appear in V1 acceptance. V2 should expand accepted capabilities, not become their default destination. |
| Optional advanced features | Keep serialization, native apps, service extraction, fleet management and integrity anchoring conditional on explicit triggers. Give each selected item an owner, cost hypothesis, dependency and measurable outcome. | V2 is a useful option catalogue. It should not turn into a simultaneous delivery commitment. |

This review assesses how compliance decisions are represented and governed. It
does not validate licensed standards, certification eligibility or legal
applicability. Those remain the qualified owners' decisions described in the plans.

## Suggested delivery sequence

No calendar estimates are assigned without team capacity and pilot constraints.

| Step | Concrete deliverable | Exit evidence | Suggested accountable owner |
| --- | --- | --- | --- |
| 1. Correctness and contract baseline | Resolve F01/F02/F06; repair sync, import bounds/retries, timestamps and receipt rules; truthful capability flags | Regression cases below; approved data dictionary; local workflow status is accurate | Technical owner, with quality/product decisions |
| 2. Durable online traceability | PostgreSQL adapter and reviewed migrations/seeds; scoped auth/MFA; purchase-to-publication path; transactional recall/withdrawal; basic worker/export | Restart durability, exact SQL round trips, concurrent allocation/recall tests, access-denial tests and public/private projection checks | Technical owner and quality owner |
| 3. Field and evidence workflows | Supported offline commands/app shell, stable device/session context, queue recovery, private evidence, controlled forms/SOPs and consent/profile handling | Target-phone reconnect/reload/quota exercises, actual printer output, authorized retrieval and signed-URL expiry, reviewer evidence-pack acceptance | Production, quality and privacy owners |
| 4. Supervised pilot acceptance | Complete remaining V1 acceptance items, parallel operating cycle, reconciled imports, runbooks and support ownership | Restore within agreed RPO/RTO, complete recall drill, staff UAT, accepted exceptions with owner/deadline | Product owner and named go-live approvers |

Start the private-storage and device/printer proofs during step 1 so an unsuitable
provider or device does not surface only after dependent workflows are built.
Keep broader V2 implementation behind the existing pilot entry criteria.

## Verification and regression priorities

Executed in this review environment: Node `v24.15.0`, npm `11.12.1`.

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed. |
| `npm test` | Passed: 41 tests in 13 files. |
| `npm run build` | Passed; Next.js production build completed. |
| `git diff --check` | Passed for the existing tracked diff. New document whitespace/links checked separately. |
| Targeted temporary diagnostics | Confirmed the behaviors below using synthetic data. Domain/server functions used the existing memory adapter; client response handling used a minimal storage double. |
| PostgreSQL/Supabase/Sanity integration, browser E2E, physical devices/printers, restore | Not run. No provider project, real database, device or recovery readiness is established by these checks. |

| Regression scenario | Observed behavior or required assertion |
| --- | --- |
| 100 kg consumed, 90 kg measured outputs | Existing domain rejects; introduce explicit loss/variance semantics and prove exact remaining stock. |
| Two inputs and two outputs with unequal contributions | SQL round trip must preserve the exact contribution matrix; currently missing schema representation. |
| 502 or 200 without per-command result | Client becomes terminally rejected; it should retain an actionable, retryable unconfirmed command. |
| Response acknowledges another operation ID | Client marks the queued command acknowledged; reject the mismatched response without losing the pending command. |
| Replay with changed actor/organization/deployment/target | Direct service diagnostic returned the original result; enforce ownership and immutable-command identity. |
| Delayed purchase synchronization | Event time became midnight and device capture became server processing time; preserve the supplied capture facts. |
| Receipt unavailable, then confirmed; confirmed, then disputed | Current transition table rejects both; implement the agreed follow-up policy and linked history. |
| Invalid import header plus partial-rejection option | Import becomes completed with zero rejected rows; block whole-file failures. |
| Lost import success response | UI constructs a new commit UUID on retry; preserve the original ID and recover the stored result. |
| XLSX false expansion-size metadata | A 9,311-byte fixture inflated to 9 MiB before rejection; enforce the cap during decompression. |
| Numeric boundaries and every persisted enum | SQL must accept/reject consistently with the command contract and round-trip without silent value/state loss. |
| Concurrent allocation and recall | Two committed commands must not overdraw a source; a new descendant cannot escape an incident's locked/rechecked scope. |
| Offline reload, shared device and expired session | Commands remain durable and attributable, privileged work stays blocked, and all unfinished operations remain visible. |
| Claim/profile withdrawal and cache invalidation | Active public output changes within the agreed window while permitted historical audit evidence remains retrievable. |

The diagnostics support the findings; they are not a new committed test suite.
Add permanent regression tests with the corresponding fixes, prioritizing API,
database and browser boundaries that the present Node-only tests do not exercise.

## Decisions to resolve with the owners

| Question | Why it affects implementation |
| --- | --- |
| Is the next milestone a synthetic demonstration or a real operational pilot, and what team/timebox is available? | Determines the delivery boundary and which manual processes can be explicitly accepted. |
| How are consumed honeycomb, measured honey/beeswax, residue and handling losses recorded today? Who reviews yield tolerance? | Resolves F01/F02 and the quantity model before persistence is expanded. |
| Can a packaging batch draw directly from multiple lots, or must it consume one previously blended lot? | Determines packaging inputs, stock accounting and recall traversal. |
| How do farmers receive receipts, confirm later and dispute an earlier confirmation? | Defines acknowledgement methods, evidence and allowed transitions. |
| Which phones/browsers are shared, how long must they work offline, and what photo volume is typical? | Defines local access, storage, migration, recovery and device tests. |
| Which managed host and private-asset capability are funded, and who owns recovery and alerts? | Resolves connection/worker limits, private storage feasibility, costs and numeric RPO/RTO. |
| What should a customer see after a hold, withdrawal or recall, and how quickly must it change? | Resolves active revision policy, notices, public caching and incident acceptance. |
| Who approves lawful-basis/consent fields, public profiles/claims and retention for database, assets and paper? | Defines onboarding, publication withdrawal, access and correction/deletion behavior. |
| Are the controlled forms, approved SOP versions and applicable licensed standards available to the quality owner? | Establishes the actual evidence/release rules and avoids treating UI fixtures as approved operational documents. |
