# 14-contract-01: Trace, evidence and recall — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by trace, evidence and recall.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 13-behavior. Read their handoff **interface section only**.
Decision records: quality, public-status. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-51-01](../../../specification/product/51-recall-and-current-public-status.md#prd-51-01)
- [PRD-51-02](../../../specification/product/51-recall-and-current-public-status.md#prd-51-02)
- [PRD-51-03](../../../specification/product/51-recall-and-current-public-status.md#prd-51-03)
- [WF-33-06](../../../specification/workflows/33-accepted-integrity-and-usability-refinement--2026-10-28.md#wf-33-06)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)
- [ARC-04-10](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-10)

- `src/domain/lineage.ts` — traceForward
- `src/domain/batch-impact.ts` — planBatchImpact
- `src/server/commands/batch-impact.ts` — prepareBatchAction

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Trace one packaged batch to all inputs and execute a small recipient-based recall with reconciled quantities.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/14-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/14-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
