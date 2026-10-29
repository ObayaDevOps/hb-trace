# HB-TRACE contribution guide

## Source of truth

- Start implementation at `docs/implementation/START-HERE.md`; one coordinator dispatches one fresh worker with a bounded task packet.
- `HB-TRACE-V1-PLAN.md` indexes authoritative product fragments; workflow and architecture indexes link to their own fragments. Do not preload every plan or screen.
- `src/domain/` owns framework-independent business rules.
- `src/server/` owns persistence and provider adapters; browser code must not import them.
- `src/app/` owns App Router pages and route handlers.
- `supabase/migrations/` contains reviewed standard PostgreSQL schema changes.

## Safe development

- Copy `.env.example` to `.env.local` for local configuration; never commit credentials or production data.
- Local mode must remain usable without provider credentials.
- Use focused main-functionality checks after coherent tasks, not after every edit. The coordinator runs `npm run typecheck`, `npm test`, and `npm run build` at meaningful application milestones and final code handoff, not per worker. Comprehensive testing is deferred to increment 28.
- Documentation-only work uses `npm run plan:check`; see `docs/implementation/testing-policy.md`.
- Use batch/lot terminology. Do not promise per-jar serialization or publish private farmer/staff fields.
- Committed traceability, quantity, quality, publication, and sync rules are server-side concerns.
