# 19-behavior: Controlled operations evidence — connect behavior

## Outcome

Controlled operations evidence, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 19-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 19-behavior`.
Decisions: quality, privacy. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/components/v1/OperationsPage.jsx` — relevant exports only
- `src/server/persistence/contracts.ts` — AssetMetadataRecord

## Implementation

1. Implement controlled form/SOP metadata, approval, effective/superseded versions and read acknowledgements.
2. Link original multi-page evidence, page order, review and supersession to exact form/batch records.
3. Maintain versioned requirements/HACCP/deviation links without inferring certification or practical competence.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Retrieve a current document and a reviewed two-page form in original order; defer full printer/standards validation.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/19-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/19-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
