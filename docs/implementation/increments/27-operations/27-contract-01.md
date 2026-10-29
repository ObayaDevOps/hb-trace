# 27-contract-01: Operational queues and support — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by operational queues and support.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 14-behavior, 17-behavior, 19-behavior, 24-behavior, 25-behavior. Read their handoff **interface section only**.
Decision records: platform. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-18-01](../../../specification/product/18-operations-dashboard.md#prd-18-01)
- [PRD-18-02](../../../specification/product/18-operations-dashboard.md#prd-18-02)
- [PRD-18-03](../../../specification/product/18-operations-dashboard.md#prd-18-03)
- [PRD-18-04](../../../specification/product/18-operations-dashboard.md#prd-18-04)
- [PRD-18-05](../../../specification/product/18-operations-dashboard.md#prd-18-05)
- [PRD-18-06](../../../specification/product/18-operations-dashboard.md#prd-18-06)
- [PRD-18-07](../../../specification/product/18-operations-dashboard.md#prd-18-07)
- [PRD-18-08](../../../specification/product/18-operations-dashboard.md#prd-18-08)
- [PRD-18-09](../../../specification/product/18-operations-dashboard.md#prd-18-09)
- [WF-33-08](../../../specification/workflows/33-accepted-integrity-and-usability-refinement--2026-10-28.md#wf-33-08)

- `src/app/api/v1/dashboard/route.ts` — inspect only the relevant exported boundary
- `src/components/v1/StaffDashboard.jsx` — inspect only the relevant exported boundary

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Follow one dashboard count to its records and verify the count reconciles.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/27-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/27-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
