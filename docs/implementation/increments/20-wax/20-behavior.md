# 20-behavior: Finished wax — connect behavior

## Outcome

Finished wax, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 20-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 20-behavior`.
Decisions: quality. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/materials.ts` — commitTransformation
- `src/domain/products.ts` — relevant exports only

## Implementation

1. Extend the existing material model for raw residue and finished wax without parallel lineage rules.
2. Consume partial eligible raw-wax quantities from multiple sources and account for recovered wax, retained outputs, waste and loss.
3. Create labelled finished/retained stock with independent quality and source history.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Transform two partial raw-wax inputs and inspect remaining stock and output ancestry.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/20-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/20-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
