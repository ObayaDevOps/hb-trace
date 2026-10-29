# 21-behavior: Ingredient purchase lots — connect behavior

## Outcome

Ingredient purchase lots, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 21-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 21-behavior`.
Decisions: quality. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/products.ts` — relevant exports only
- `src/domain/materials.ts` — createMaterialLot

## Implementation

1. Define distinct ingredient lots with seller, purchase date, original units, normalized mass and internal reference.
2. Preserve optional supplier batch/evidence and ledger-derived balances; seller is not growing origin.
3. Require applicable eligibility before allocations; do not assume conversions from pieces or volume.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Create a purchase without supplier batch and allocate part of its exact mass without losing the balance.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/21-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/21-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
