# 11-contract-01: Material and processing — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by material and processing.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 03-behavior, 10-behavior. Read their handoff **interface section only**.
Decision records: quality. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-48-01](../../../specification/product/48-evidence-and-quantity-meaning.md#prd-48-01)
- [PRD-48-02](../../../specification/product/48-evidence-and-quantity-meaning.md#prd-48-02)
- [PRD-49-01](../../../specification/product/49-physical-identity-and-reconciliation.md#prd-49-01)
- [PRD-49-02](../../../specification/product/49-physical-identity-and-reconciliation.md#prd-49-02)
- [WF-16-01](../../../specification/workflows/16-normal-production.md#wf-16-01)
- [WF-16-02](../../../specification/workflows/16-normal-production.md#wf-16-02)
- [WF-16-03](../../../specification/workflows/16-normal-production.md#wf-16-03)
- [WF-16-04](../../../specification/workflows/16-normal-production.md#wf-16-04)
- [WF-16-05](../../../specification/workflows/16-normal-production.md#wf-16-05)
- [WF-16-06](../../../specification/workflows/16-normal-production.md#wf-16-06)
- [WF-33-02](../../../specification/workflows/33-accepted-integrity-and-usability-refinement--2026-10-28.md#wf-33-02)
- [WF-33-03](../../../specification/workflows/33-accepted-integrity-and-usability-refinement--2026-10-28.md#wf-33-03)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)
- [ARC-04-10](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-10)

- `src/domain/materials.ts` — commitTransformation
- `src/domain/lineage.ts` — traceBackward
- `src/domain/decimal.ts` — Quantity

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Process a partial mixed input and reject a competing over-allocation; inspect resulting lineage.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/11-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/11-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
