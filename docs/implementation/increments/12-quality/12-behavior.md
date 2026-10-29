# 12-behavior: Quality and corrections — connect behavior

## Outcome

Quality and corrections, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 12-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 12-behavior`.
Decisions: quality. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/quality.ts` — transitionQualityDisposition
- `src/server/commands/batch-impact.ts` — prepareBatchAction

## Implementation

1. Persist stage-specific measurements, rule versions, evidence, reviews and authorized disposition changes.
2. Keep retests append-only and serialize source holds with allocation/packaging; preserve unrelated blockers.
3. Implement explained before/after amendments and downstream review; prohibit simple reversal after consumption and enforce paper reconciliation.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Hold a source and demonstrate blocked descendant use; verify a consumed-input correction cannot recreate stock.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/12-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/12-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
