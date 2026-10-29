# 23-contract-01: Infusion monitoring and completion — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by infusion monitoring and completion.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 05-behavior, 12-behavior, 22-behavior. Read their handoff **interface section only**.
Decision records: quality. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-02-03](../../../specification/product/02-accepted-mobile-design-extension--2026-10-27.md#prd-02-03)
- [WF-18-06](../../../specification/workflows/18-ingredient-purchase-lots-and-bulk-infusion.md#wf-18-06)
- [WF-18-07](../../../specification/workflows/18-ingredient-purchase-lots-and-bulk-infusion.md#wf-18-07)
- [WF-18-08](../../../specification/workflows/18-ingredient-purchase-lots-and-bulk-infusion.md#wf-18-08)
- [WF-18-09](../../../specification/workflows/18-ingredient-purchase-lots-and-bulk-infusion.md#wf-18-09)
- [WF-30-05](../../../specification/workflows/30-additional-implementation-records-and-boundaries.md#wf-30-05)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)
- [ARC-04-10](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-10)

- `src/domain/quality.ts` — transitionQualityDisposition
- `src/domain/materials.ts` — commitTransformation

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Record and retry one check, then verify completion cannot bypass a due unresolved check.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/23-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/23-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
