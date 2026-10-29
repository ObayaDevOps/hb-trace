# Historical implementation status — 2026-10-28

This snapshot predates the Supabase Storage decision. Provider references describe historical work, not the target architecture. No implementation completion is implied by the revised plans.

## Implementation progress — 2026-09-03

This checklist is maintained alongside implementation. A checked item means the
repository has a local, tested foundation for it; it does not mean the hosted
pilot gate is complete. Open items remain open until the corresponding provider,
policy and acceptance evidence exists.

### Completed foundations

- [x] Repository transition: App Router entry points, strict TypeScript domain/server layers, removed sample API/root routes, and browser-safe provider boundaries.
  - **Observations / notes:** UI surfaces remain JSX with JSDoc-style fixtures; the domain, server and API layers are strict TypeScript. Legacy marketing components remain in the tree but are no longer routed.
- [x] Domain invariants: application UUIDv4 IDs, exact decimal/money/quantity values, state transitions, role guards, exact direct allocations, cycle rejection and deterministic backward/forward lineage.
  - **Observations / notes:** Covered by unit tests. Database-level locking, organization-scope checks and command orchestration remain server responsibilities.
- [x] PostgreSQL persistence foundation and local transactional adapter.
  - **Observations / notes:** The two files in `supabase/migrations/` are standard PostgreSQL. The in-memory adapter covers optimistic versions, rollback, audit records, assets and sync idempotency. It is not durable hosted persistence.
- [x] Supabase SSR/authentication boundary and role-to-actor mapping seam.
  - **Observations / notes:** Login, cookie refresh, protected staff layout and API role checks are present. No project URL/key or actor-role seed is available in the workspace, so hosted authentication is not exercised.
- [x] Local public projection and staff workflow surface.
  - **Observations / notes:** `/verify`, `/staff/*`, local API fixtures, public field whitelist, neutral lookup failures and an in-process rate limit are implemented. Hosted public projection and live staff reads intentionally fail closed until adapters are connected; staff routes now redirect to hosted login when no mapped identity exists.
- [x] Restricted offline command envelope and IndexedDB outbox foundation.
  - **Observations / notes:** Only the approved collection/receipt/attachment command vocabulary is accepted. Purchase capture queues the envelope in IndexedDB, the staff shell exposes Sync now/network recovery, payload hashes are deep-canonical, dependencies are explicit, retries are safe, and privileged transformations/quality/publication actions remain online-only.
- [x] Repository documentation, OpenAPI boundary, tests, production build and local route smoke test.
  - **Observations / notes:** `npm run typecheck`, `npm test`, `npm run build` and local production-route checks pass. README, staff quick start, provider activation notes and OpenAPI are checked in. Provider integration, restore and real-device evidence are still open.

### Open implementation and pilot-gate tasks

- [ ] Deliver the installable staff PWA: linked manifest, stable app identity, correctly sized icons, staff launch
  route, HTTPS, standalone navigation and platform-appropriate installation guidance.
  - **2026-10-28 assessment:** `public/manifest.webmanifest` exists but is not linked from the application layout.
    Its declared 192 × 192 icon is actually 1019 × 593. No service worker registration or offline application-shell
    cache is implemented. The manifest and the clickable reference do not demonstrate offline restart support.
- [ ] Complete PWA field reliability: cached application shell, authorized offline startup, account-scoped local
  records/attachments, storage-capacity handling, foreground sync recovery and controlled app/database upgrades.
  - **Observations / notes:** Dexie and the command-envelope foundation are reusable. Installation alone does not
    complete these requirements or expand the approved offline command vocabulary. Actual phone tests are required.
- [ ] Connect server-owned infusion due tasks and reminder jobs, with optional permission-based Web Push and an
  in-app task list that remains usable when notification permission is declined or delivery fails.
  - **Observations / notes:** The day-7/14/21/28 reference screens are simulated. Company SMS/WhatsApp receipt
    delivery and staff push reminders need separate server integrations; neither depends on the phone staying open.
- [ ] Connect the Supabase persistence adapter, migration deployment, organization/role seeds, live command services and append-only audit enforcement.
  - **Observations / notes:** Requires separate dev/test/prod project URLs, publishable key, server-only service key, database connection strategy and role/actor mapping decisions. Do not paste secrets into chat.
  - [x] **2026-09-03 bounded local command slice:** `src/server/commands/local.ts` now commits a purchase/harvest, receipt state, source records, sync operation and audit events together through the transactional local adapter. Replays return the original result and dependency-pending envelopes remain safe to retry.
  - **Session handoff:** This does not close the hosted persistence gate. The next implementation must replace the in-memory adapter with PostgreSQL, seed the organization/roles/actor mapping, enforce organization scope and append-only audit privileges, then reuse these command boundaries.
- [ ] Connect Sanity public editorial and private evidence adapters, upload intents, original-byte verification, signed retrieval, asset reconciliation and export/restore.
  - **Observations / notes:** Requires Sanity project ID, public/private dataset or Media Library layout, plan capability confirmation, server-only tokens and retention/transfer decisions. Production evidence upload is blocked until private-asset proof passes.
- [ ] Implement fixed-version CSV/XLSX farmer/apiary import with preview, row errors, duplicate review, dry run, idempotent commit and private source-file audit evidence.
  - **Observations / notes:** CSV/XLSX templates, a bounded parser/validator, source SHA-256 and authenticated dry-run preview endpoint are implemented. The hosted/provider-backed gate remains open until durable duplicate resolution/commit, consent writes and private original-file storage are exercised.
  - [x] **2026-09-03 bounded local slice:** `src/server/imports/local.ts` stages fixed CSV/XLSX rows, keeps the original bytes private in the local adapter, records duplicate candidates, requires explicit create/match/skip decisions, supports optional partial rejection, commits atomically and replays by commit operation UUID. Malformed row widths now produce row errors instead of being truncated.
  - **Session handoff:** `src/app/api/v1/imports/{preview,resolve,commit}` and the staff sourcing import panel expose the local workflow. Consent status/policy is validated and carried in source/audit metadata but is not yet written to `actor_consents`; real PostgreSQL/Sanity adapters, provider private-asset proof, durable exports and browser/E2E coverage remain required.
- [ ] Implement durable forms, completed evidence review, SOP/HACCP versioning, acknowledgements, requirements register, non-conformances and corrective actions.
  - **Observations / notes:** The second SQL migration now defines these record types. Hosted command services, evidence assets, approval workflows and UI persistence remain open.
- [ ] Complete separation/blending/packaging command services, downstream hold/withdrawal/recall impact and immutable live publication revisions.
  - **Observations / notes:** Framework-independent material/packaging rules and a sample projection exist; the end-to-end server transaction is not connected.
  - [x] **2026-09-03 bounded foundation:** `src/domain/batch-impact.ts` now plans transitive downstream lot impact, packaging runs, affected active public revisions and executable state transitions for hold/withdraw/recall; it also constructs a new immutable withdrawn public revision without rewriting the published snapshot. `src/server/commands/batch-impact.ts` enforces the quality-manager boundary before a plan can be used.
  - **Session handoff:** This is intentionally a no-write planning seam. The remaining command must load and lock the same graph inside one transaction, re-check versions and organization ownership, append quality/recall scope and audit rows, and create a corresponding immutable public revision (withdrawn or approved notice per policy). No batch-action API route exists yet; `/api/v1/public/batches/[code]` remains demo-only locally and fails closed in hosted mode. Recommended next files are `src/server/persistence/contracts.ts` (recall/lineage/package-input ports), a provider adapter under `src/server/persistence/`, `src/server/commands/batch-actions.ts`, and `src/app/api/v1/batch-actions/route.ts`, followed by the live public projection adapter.
- [ ] Complete provider integration, concurrency, security, private-asset, offline-device, import, restore and end-to-end acceptance tests.
  - **Observations / notes:** Current tests are local unit/contract coverage only. Target-phone, printer, provider and restore evidence require Phase 0 decisions and credentials.
- [ ] Close Phase 0 decisions: owners, licensed standards/applicability, public claims, privacy/lawful basis, retention, offline limits, deployment, backup/RPO/RTO and go-live acceptance.
  - **Observations / notes:** These are product/privacy/quality-owner inputs, not safe assumptions for implementation.

