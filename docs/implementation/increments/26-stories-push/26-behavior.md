# 26-behavior: Approved stories — connect behavior

## Outcome

Approved stories, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 26-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 26-behavior`.
Decisions: privacy, messaging. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/app/api/v1/public/batches/[code]/route.ts` — relevant exports only
- `src/server/auth/identity.ts` — ApplicationIdentity

## Implementation

1. Implement approved editorial/profile revisions and claim-evidence links separately from operational facts.
2. Withdraw active profile permission through the approved publication policy while retaining internal audit history.
3. Keep editorial publication independent of optional notification delivery; that work belongs to 26-push.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Check one approved story revision excludes private fields.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/26-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/26-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
