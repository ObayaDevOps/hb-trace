# 18-behavior: Imports and optional profiles — connect behavior

## Outcome

Imports and optional profiles, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 18-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 18-behavior`.
Decisions: privacy. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/server/imports/local.ts` — relevant exports only
- `src/server/imports/fixed-template.ts` — relevant exports only
- `src/components/v1/ImportPanel.jsx` — relevant exports only

## Implementation

1. Connect fixed CSV/XLSX preview, explicit duplicate resolution, idempotent commit and consent persistence to durable adapters.
2. Retain original import evidence and visible per-row outcomes without silent partial mutation.
3. Implement optional profile sections independently; require holder name when payment number exists and keep private/approved-public fields distinct.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Preview and commit a tiny import with one invalid/duplicate row; verify optional profile omission does not block collection.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/18-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/18-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
