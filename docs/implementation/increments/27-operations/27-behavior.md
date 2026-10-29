# 27-behavior: Operational queues and support — connect behavior

## Outcome

Operational queues and support, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 27-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 27-behavior`.
Decisions: platform. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/app/api/v1/dashboard/route.ts` — relevant exports only
- `src/components/v1/StaffDashboard.jsx` — relevant exports only

## Implementation

1. Connect role-scoped queue counts to filtered source records with last-updated status.
2. Show saved state, next action and escalation owner for blocked work; keep basic queues with their owning features.
3. Add privacy-safe alerts and concise staff/support runbooks, preserving the distinction from controlled SOPs.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Follow one dashboard count to its records and verify the count reconciles.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/27-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/27-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
