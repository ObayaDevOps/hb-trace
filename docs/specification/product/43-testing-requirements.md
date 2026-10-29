# Testing requirements

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Testing requirements](../../../HB-TRACE-V1-PLAN.md#testing-requirements)

<a id="prd-43-01"></a>
<!-- requirement:PRD-43-01 -->
- PWA installation tests validate manifest discovery, stable identity/scope/start URL, actual icon dimensions,
  standalone navigation and HTTPS. Check supported browser installation flows on real phones; a browser audit or
  desktop emulation alone is not proof of installed iOS/Android behavior.
<!-- /requirement:PRD-43-01 -->

<a id="prd-43-02"></a>
<!-- requirement:PRD-43-02 -->
- Offline-startup tests close the installed app after preparation, disable the network, relaunch it and recover
  saved drafts, commands and queued photos. Exercise storage denial/full quota, expired offline sessions, device
  restarts and separate browser/installed contexts without claiming a local save is a server backup.
<!-- /requirement:PRD-43-02 -->

<a id="prd-43-03"></a>
<!-- requirement:PRD-43-03 -->
- PWA upgrade and privacy tests cover pending work across compatible updates, blocked incompatible activation,
  interrupted database migrations, multiple tabs, sign-out/account switching and cache cleanup. Verify zero loss,
  zero cross-account disclosure and no cached auth/private response used as authority.
<!-- /requirement:PRD-43-03 -->

<a id="prd-43-04"></a>
<!-- requirement:PRD-43-04 -->
- Reminder tests cover day-7/14/21/28 timezone boundaries, server scheduling, retry deduplication, subscription
  expiry/revocation and denied push permission. Task status and actual inspection history remain correct without
  notifications. Public-cache tests prove stale PWA data cannot conceal the current withdrawal/recall response.
<!-- /requirement:PRD-43-04 -->

<a id="prd-43-05"></a>
<!-- requirement:PRD-43-05 -->
- Unit tests cover state transitions, available-quantity calculations, allocations, yield flags, permissions and
  quality-rule evaluation.
<!-- /requirement:PRD-43-05 -->

<a id="prd-43-06"></a>
<!-- requirement:PRD-43-06 -->
- Property/model-based tests generate transformation graphs, partial allocations, reversals, holds and concurrent
  commands and prove non-negative stock, exact direct lineage, no cycles and deterministic trace results.
<!-- /requirement:PRD-43-06 -->

<a id="prd-43-07"></a>
<!-- requirement:PRD-43-07 -->
- Honey-module compatibility tests prove that accepted historical schemas/rules remain readable, without requiring
  a runtime plugin framework.
<!-- /requirement:PRD-43-07 -->

<a id="prd-43-08"></a>
<!-- requirement:PRD-43-08 -->
- Integration tests use isolated managed Supabase and Supabase Storage test resources and cover standard SQL migrations,
  transactions/locking, recursive lineage, asset upload/verification, idempotency, jobs and the outbox worker.
<!-- /requirement:PRD-43-08 -->

<a id="prd-43-09"></a>
<!-- requirement:PRD-43-09 -->
- End-to-end tests cover offline capture/reconnect, fallback code/later QR assignment, multi-output extraction,
  partial consumption, blending, holds, release, recall/withdrawal, packaging, immutable public revisions, form
  printing/upload and SOP supersession.
<!-- /requirement:PRD-43-09 -->

<a id="prd-43-10"></a>
<!-- requirement:PRD-43-10 -->
- Sync tests cover duplicate and reordered delivery, dependency ordering, transport success with partial command
  failure, payload-hash mismatch, two-device conflicts, client/database schema upgrades, N-1 clients, quota errors,
  expired sessions and interrupted attachment uploads.
<!-- /requirement:PRD-43-10 -->

<a id="prd-43-11"></a>
<!-- requirement:PRD-43-11 -->
- Import tests cover fixed template/version validation, row errors, duplicates, partial rejection, idempotent
  resubmission and retention of the original import audit evidence.
<!-- /requirement:PRD-43-11 -->

<a id="prd-43-12"></a>
<!-- requirement:PRD-43-12 -->
- Receipt/dispute tests prove that farmer acknowledgement remains linked to the original purchase, offline retries
  do not issue a second transaction and correction does not overwrite either party's history.
<!-- /requirement:PRD-43-12 -->

<a id="prd-43-13"></a>
<!-- requirement:PRD-43-13 -->
- Public-content tests prove that only approved claim versions, profiles, approximate locations and editorial
  sections appear from an exact approved editorial revision, and that every displayed factual stage and claim resolves
  to its supporting record/evidence in the publication snapshot.
<!-- /requirement:PRD-43-13 -->

<a id="prd-43-14"></a>
<!-- requirement:PRD-43-14 -->
- Security tests cover server authorization, Supabase role separation, public/private fields, Supabase Storage token absence
  from browser bundles, private asset signed-URL expiry, malicious/invalid files, MFA assurance, session expiry,
  audit logging, rate limits, security headers and absence of staff analytics.
<!-- /requirement:PRD-43-14 -->

<a id="prd-43-15"></a>
<!-- requirement:PRD-43-15 -->
- Provider contract tests run against the Supabase database/Auth/Storage adapters and provider-neutral fakes. They prove domain
  services use application IDs rather than provider IDs and produce a complete database/asset migration manifest.
<!-- /requirement:PRD-43-15 -->

<a id="prd-43-16"></a>
<!-- requirement:PRD-43-16 -->
- Documentation checks validate links and repository paths, test maintained commands and verify generated
  OpenAPI/schema references against source artifacts; public/staff output is scanned for secrets, licensed material,
  private evidence and real personal data.
<!-- /requirement:PRD-43-16 -->

<a id="prd-43-17"></a>
<!-- requirement:PRD-43-17 -->
- Restore tests recover a Supabase database export plus original asset bytes and their manifest into an isolated environment
  and prove record/evidence counts, page order, relationships and SHA-256 hashes reconcile.
<!-- /requirement:PRD-43-17 -->
