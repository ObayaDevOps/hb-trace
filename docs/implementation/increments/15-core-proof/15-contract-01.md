# 15-contract-01: Core operational integration — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by core operational integration.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 14-behavior. Read their handoff **interface section only**.
Decision records: platform, recovery. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-33-01](../../../specification/product/33-deployment-and-operations.md#prd-33-01)
- [PRD-33-02](../../../specification/product/33-deployment-and-operations.md#prd-33-02)
- [PRD-33-03](../../../specification/product/33-deployment-and-operations.md#prd-33-03)
- [PRD-33-04](../../../specification/product/33-deployment-and-operations.md#prd-33-04)
- [PRD-33-05](../../../specification/product/33-deployment-and-operations.md#prd-33-05)
- [PRD-33-06](../../../specification/product/33-deployment-and-operations.md#prd-33-06)
- [PRD-33-07](../../../specification/product/33-deployment-and-operations.md#prd-33-07)
- [PRD-33-08](../../../specification/product/33-deployment-and-operations.md#prd-33-08)
- [PRD-33-09](../../../specification/product/33-deployment-and-operations.md#prd-33-09)
- [PRD-39-01](../../../specification/product/39-phase-1--online-end-to-end-walking-skeleton.md#prd-39-01)
- [PRD-39-02](../../../specification/product/39-phase-1--online-end-to-end-walking-skeleton.md#prd-39-02)
- [PRD-39-03](../../../specification/product/39-phase-1--online-end-to-end-walking-skeleton.md#prd-39-03)
- [PRD-39-04](../../../specification/product/39-phase-1--online-end-to-end-walking-skeleton.md#prd-39-04)
- [PRD-39-05](../../../specification/product/39-phase-1--online-end-to-end-walking-skeleton.md#prd-39-05)
- [PRD-52-01](../../../specification/product/52-recovery-delivery-and-usability-gates.md#prd-52-01)
- [PRD-52-02](../../../specification/product/52-recovery-delivery-and-usability-gates.md#prd-52-02)
- [PRD-52-03](../../../specification/product/52-recovery-delivery-and-usability-gates.md#prd-52-03)
- [ARC-06-03](../../../specification/architecture/06-publication-jobs-and-recovery.md#arc-06-03)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)

- `src/lib/runtime-config.ts` — runtimeConfig
- `src/server/persistence/contracts.ts` — PersistenceAdapter

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Smoke the complete online journey once; record restore proof still missing rather than running a broad suite now.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/15-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/15-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
