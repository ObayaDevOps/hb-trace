# 23-behavior: Infusion monitoring and completion — connect behavior

## Outcome

Infusion monitoring and completion, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 23-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 23-behavior`.
Decisions: quality. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/quality.ts` — transitionQualityDisposition
- `src/domain/materials.ts` — commitTransformation

## Implementation

1. Create server-owned day-7/14/21/28 tasks from committed start and preserve scheduled versus actual observation times.
2. Append inspection, stirring, fermentation and moisture/instrument records; deduplicate retries and surface unresolved concerns.
3. Record actual completion, ingredient fate, product/retained outputs/waste/loss; missing due checks and concerns block release.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Record and retry one check, then verify completion cannot bypass a due unresolved check.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/23-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/23-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
