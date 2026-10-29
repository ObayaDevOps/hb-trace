# 04-behavior: Identity and permissions — connect behavior

## Outcome

Identity and permissions, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 04-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 04-behavior`.
Decisions: privacy, platform. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/server/auth/identity.ts` — getApplicationIdentity
- `src/server/auth/authorization.ts` — relevant exports only

## Implementation

1. Validate hosted sessions and map external subjects to application actor IDs.
2. Reload current role/organization access for every command/query and enforce privileged assurance.
3. Preserve local mode and safe authorization failures; avoid introducing a separate publisher permission from prototype role labels.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Check one authorized action and one wrong-role/organization denial.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/04-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/04-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
