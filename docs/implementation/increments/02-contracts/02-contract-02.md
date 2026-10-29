# 02-contract-02: Shared contracts — contract slice 2

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by shared contracts.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 02-contract-01. Read their handoff **interface section only**.
Decision records: quality. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-13-10](../../../specification/product/13-core-domain-model.md#prd-13-10)
- [PRD-13-11](../../../specification/product/13-core-domain-model.md#prd-13-11)
- [PRD-13-12](../../../specification/product/13-core-domain-model.md#prd-13-12)
- [PRD-13-13](../../../specification/product/13-core-domain-model.md#prd-13-13)
- [PRD-14-01](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-01)
- [PRD-14-02](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-02)
- [PRD-14-03](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-03)
- [PRD-14-04](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-04)
- [PRD-14-05](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-05)
- [PRD-14-06](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-06)
- [PRD-14-07](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-07)
- [PRD-14-08](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-08)
- [PRD-14-09](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-09)
- [PRD-14-10](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-10)
- [PRD-14-11](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-11)
- [PRD-14-12](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-12)
- [PRD-14-13](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-13)
- [PRD-14-14](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-14)
- [PRD-14-15](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-15)
- [PRD-14-16](../../../specification/product/14-identifiers-quantities-and-invariants.md#prd-14-16)
- [PRD-15-01](../../../specification/product/15-workflow-states.md#prd-15-01)
- [PRD-15-02](../../../specification/product/15-workflow-states.md#prd-15-02)
- [PRD-15-03](../../../specification/product/15-workflow-states.md#prd-15-03)
- [PRD-15-04](../../../specification/product/15-workflow-states.md#prd-15-04)
- [PRD-15-05](../../../specification/product/15-workflow-states.md#prd-15-05)
- [PRD-15-06](../../../specification/product/15-workflow-states.md#prd-15-06)
- [PRD-15-07](../../../specification/product/15-workflow-states.md#prd-15-07)
- [PRD-15-08](../../../specification/product/15-workflow-states.md#prd-15-08)
- [PRD-15-09](../../../specification/product/15-workflow-states.md#prd-15-09)
- [PRD-15-10](../../../specification/product/15-workflow-states.md#prd-15-10)
- [PRD-15-11](../../../specification/product/15-workflow-states.md#prd-15-11)
- [PRD-15-12](../../../specification/product/15-workflow-states.md#prd-15-12)
- [PRD-15-13](../../../specification/product/15-workflow-states.md#prd-15-13)
- [PRD-15-14](../../../specification/product/15-workflow-states.md#prd-15-14)
- [PRD-15-15](../../../specification/product/15-workflow-states.md#prd-15-15)
- [PRD-15-16](../../../specification/product/15-workflow-states.md#prd-15-16)
- [PRD-15-17](../../../specification/product/15-workflow-states.md#prd-15-17)

- `src/domain/decimal.ts` — Quantity
- `src/domain/identifiers.ts` — inspect only the relevant exported boundary
- `src/lib/sync-types.ts` — SyncEnvelope

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Exercise decimal serialization and a representative invalid transition using existing focused checks.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/02-contract-02.md`.
Allowed write roots: `docs/implementation/state/tasks/02-contract-02.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
