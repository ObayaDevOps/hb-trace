# HB-TRACE V1 AI handoff

> Historical implementation guidance. Provider/next-work instructions may be superseded. Use [the current implementation entry point](implementation/START-HERE.md) and its authoritative fragments. Sanity is not the selected target provider; Supabase Storage and application-owned editorial revisions govern new work. Do not treat historical checkboxes as current acceptance.

Updated: 2026-09-03

This note is for the next implementation session. The repository is still a
shared, intentionally dirty worktree from the App Router/V1 transition; keep
unrelated legacy component edits and deletions intact. The source of truth is
`HB-TRACE-V1-PLAN.md`, and an unchecked plan item is not a hosted-pilot claim.

## Completed in the current session

- [x] Added a provider-neutral local command service for purchase/harvest and
  receipt capture. It creates source records, persists exact domain values,
  appends audit events, records sync results and safely replays the same
  operation UUID.
- [x] Connected the local sync route to that command service. Dependencies are
  processed in order; missing or unfinished prerequisites remain dependency
  pending, and invalid commands are rejected without leaking domain records.
- [x] Added fixed-template local CSV/XLSX import staging and commit. It keeps
  the original bytes private, hashes the source, reports row/header errors,
  stores likely duplicate candidates, requires explicit decisions, supports
  opt-in partial rejection and commits once by operation UUID.
- [x] Added import API boundaries at
  `/api/v1/imports/preview`, `/api/v1/imports/resolve` and
  `/api/v1/imports/commit`, plus a staff sourcing review panel.
- [x] Added batch-impact planning for transitive downstream hold/withdraw/
  recall scope and immutable withdrawn public revisions. This is a no-write
  planning seam; the live command transaction is still open.
- [x] Added migration `20260903000002_v1_import_controls.sql` for explicit
  duplicate decisions and idempotent import commit operation IDs.
- [x] Updated the V1 plan, OpenAPI contract and staff/provider/persistence
  documentation in this session.

## Required next work

1. Add the real PostgreSQL persistence adapter and migration/seed procedure.
   Map the application-owned record ports to standard PostgreSQL, use row
   locks or serializable retries for committed commands, enforce organization
   scope, seed roles/actor mappings, and deny audit update/delete privileges.
2. Add consent persistence to the importer. The current validator retains
   `consent_status` and `consent_policy_version` in source/audit metadata but
   does not write `actor_consents`.
3. Add the Sanity public/editorial and private-evidence adapters, upload
   intents, original-byte verification, signed retrieval, reconciliation and
   export/restore. Never treat a public Content Lake dataset as private asset
   storage.
4. Turn `src/server/commands/batch-impact.ts` into a transactional batch
   action service and add its API route. Load/lock the graph, re-check versions
   and organization ownership, append quality/recall/audit rows, and create a
   matching immutable public revision. Keep public output privacy-safe.
5. Implement durable forms/compliance/SOP acknowledgement and evidence
   command services, then add provider, restore, phone/offline, printer and
   Playwright acceptance evidence.
6. Finish Phase 0 owner decisions: lawful basis/consent map, claims, retention,
   offline limits, deployment, backup/RPO/RTO and go-live acceptance.

## Known local-slice limits

- `getLocalPersistenceAdapter()` is process-global in-memory state. Restarting
  the process loses records and private source bytes.
- Hosted write routes intentionally fail with `501` until a real adapter is
  wired. Do not change that to a success response backed by fixtures.
- The local XLSX reader is intentionally bounded: first worksheet, fixed
  template, no formulas/external relationships/ZIP64, and a 2 MiB source cap.
- The local import creates farmer actors and records but does not yet create
  their `actor_consents` rows. Exact apiary coordinates are operational fields
  and must never enter public projections.
- The import UI is a local workflow surface, not evidence that hosted imports,
  browser/E2E flows or private provider storage are accepted.
- Do not promise per-jar serialization. Use batch/lot terminology.

## Verification at handoff

Run from `/home/obi/dev/hb-trace`:

```bash
npm run typecheck
npm test
npm run build
git diff --check
```

The last completed sub-agent report said typecheck, test and build passed for
the importer; rerun all four after integrating the UI, docs and OpenAPI edits.
