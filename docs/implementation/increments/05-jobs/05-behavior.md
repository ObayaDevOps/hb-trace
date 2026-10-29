# 05-behavior: Durable jobs — connect behavior

## Outcome

Durable jobs, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 05-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 05-behavior`.
Decisions: platform. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/server/persistence/contracts.ts` — PersistenceAdapter

## Implementation

1. Add the maintained PostgreSQL-backed runner behind a typed job port and transactional enqueue boundary.
2. Claim jobs with leases, preserve attempts/results, deduplicate outcomes and recover expired leases.
3. Expose failed work to an owner; select worker invocation from the approved hosting decision.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Enqueue/claim one job and replay it without duplicating its effect.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/05-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/05-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
