# HB-TRACE

Implementation agents: start with [the bounded-context implementation plan](docs/implementation/START-HERE.md). Development uses focused checks; comprehensive testing is deferred.

HB-TRACE is the V1 honey and beeswax traceability workspace for Humble Beeing
Honey. It gives customers a privacy-safe batch/lot lookup and gives staff a
workspace for sourcing, material lineage, quality, packaging and controlled
operations records.

The repository currently runs as a local-first walking skeleton. Local mode is
fully usable without provider credentials and is deliberately labelled as
demo data. Hosted mode fails closed until the Supabase persistence adapter and
Supabase Storage and application-owned publication services are implemented and enabled.
Follow [the target implementation plan](docs/implementation/START-HERE.md); older
provider-activation notes describe the historical foundation.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The sample public code is
`HB-26-0042`; the staff workspace uses a local demo identity.

Useful routes:

- `/` — product entry point
- `/verify` — public batch/lot lookup
- `/staff` — operations dashboard
- `/staff/sourcing` — purchase and receipt capture surface
- `/staff/material` — material and direct-lineage view
- `/staff/quality` — measurements and holds
- `/staff/packaging` — packaging and publication staging
- `/staff/operations` — forms, SOPs and requirements register
- `/auth/login` — hosted staff sign-in boundary
- `/api/v1/health` — provider-safe readiness response

## What is implemented

- App Router routes with strict TypeScript for the domain and server layers.
- Framework-independent exact decimal/money/quantity types; binary floating
  point values cannot enter domain calculations.
- Application-generated UUIDv4 identifiers, explicit state transitions, role
  guards, exact material allocations, cycle detection and deterministic
  backward/forward lineage traces.
- A standard PostgreSQL foundation migration plus a transactional in-memory
  adapter for local development and contract tests.
- Supabase SSR client/proxy boundaries, server-side identity-to-actor/role
  mapping and a protected staff layout. No service-role secret is imported by
  browser code.
- IndexedDB/Dexie outbox envelopes with protocol versioning, dependencies,
  deep canonical payload hashes, explicit local/server statuses and safe
  retry behavior.
- A whitelisted public batch projection, neutral not-found handling and an
  in-process lookup rate limit. Public pages never join private operational
  records at request time.
- Accessible staff/public surfaces with clear local-vs-server status language.
- Local purchase/receipt command handling and fixed CSV/XLSX farmer/apiary
  imports with private source retention, dry-run validation, duplicate review,
  atomic commit and idempotent replay. Hosted writes remain disabled.

The forms, SOPs, requirements and provider-backed asset controls are currently
UI and schema foundations. They do not claim to upload private evidence,
approve live documents, publish live batches or persist hosted writes until
the provider adapters and pilot decisions are in place.

## Validation

```bash
npm run typecheck
npm test
npm run build
```

The tests cover exact arithmetic, identifiers, workflow authorization,
material allocation/lineage, canonical sync hashing, dependency retries and
transactional in-memory persistence, local command handling and import preview/
commit behavior.

## Database

The files in `supabase/migrations/` are ordinary PostgreSQL and use
application-generated IDs. They are intentionally not applied on app startup.
Review and apply them through a separately authorized migration process after
selecting the development/test/production projects. See
[`docs/persistence.md`](docs/persistence.md).

## Project map

```text
src/domain/       provider-neutral business invariants
src/server/       auth, persistence ports and server-only boundaries
src/app/          App Router pages and API handlers
src/lib/          runtime config, demo projection and offline protocol
supabase/         reviewed SQL migrations
docs/             persistence, staff and hosted activation guidance
```

Keep farmer contact data, exact locations, staff signatures, health records,
internal investigations and unapproved claims out of public projections. V1
codes identify a batch/lot, not an individually serialized jar.
