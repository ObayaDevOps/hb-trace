# 22-behavior: Infusion start — connect behavior

## Outcome

Infusion start, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 22-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 22-behavior`.
Decisions: quality. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/materials.ts` — commitTransformation
- `src/domain/lineage.ts` — traceBackward

## Implementation

1. Select one honey and one ingredient lot initially, with explicit optional additional rows and no hidden removed allocations.
2. Commit selected quantities atomically with actual start, operator, facility, storage and stable infusion/container references.
3. Save the suggested honey/ingredient/date label and expose infusing stock/history.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Start a two-honey infusion, remove an extra selection and verify only retained rows allocate stock.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/22-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/22-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
