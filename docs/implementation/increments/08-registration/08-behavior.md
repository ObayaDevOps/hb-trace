# 08-behavior: Farmer and apiary capture — connect behavior

## Outcome

Farmer and apiary capture, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 08-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 08-behavior`.
Decisions: privacy. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/server/commands/local.ts` — LocalCommandService
- `src/domain/purchases.ts` — PurchaseInput

## Implementation

1. Persist farmer name, phone or explicit No phone, apiary name and location description with stable IDs.
2. Implement authorized source search and deliberate duplicate resolution without fuzzy automatic merge.
3. Expose minimum registration/readiness contracts; preserve optional fields and retain incomplete drafts.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Save minimum registration and choose it for collection; missing optional details must not block.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/08-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/08-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
