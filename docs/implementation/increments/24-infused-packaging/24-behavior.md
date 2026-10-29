# 24-behavior: Infused packaging and trace — connect behavior

## Outcome

Infused packaging and trace, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 24-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 24-behavior`.
Decisions: quality, public-status. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/packaging.ts` — commitPackagingRun
- `src/domain/lineage.ts` — traceForward

## Implementation

1. Require recorded infusion completion and applicable release before bottling the distinct product.
2. Preserve all ingredient/honey exposure ancestors, including removed ingredients and retained outputs.
3. Publish approved actual ingredient descriptions while excluding seller, invoice and payment information.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Trace a bottled infusion back to a removed ingredient and confirm its private supplier fields are absent publicly.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/24-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/24-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
