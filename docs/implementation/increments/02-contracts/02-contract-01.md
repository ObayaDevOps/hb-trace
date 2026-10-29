# 02-contract-01: Shared contracts — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by shared contracts.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 01-behavior. Read their handoff **interface section only**.
Decision records: quality. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-09-01](../../../specification/product/09-modular-monolith.md#prd-09-01)
- [PRD-09-02](../../../specification/product/09-modular-monolith.md#prd-09-02)
- [PRD-09-03](../../../specification/product/09-modular-monolith.md#prd-09-03)
- [PRD-09-04](../../../specification/product/09-modular-monolith.md#prd-09-04)
- [PRD-09-05](../../../specification/product/09-modular-monolith.md#prd-09-05)
- [PRD-09-06](../../../specification/product/09-modular-monolith.md#prd-09-06)
- [PRD-09-07](../../../specification/product/09-modular-monolith.md#prd-09-07)
- [PRD-09-08](../../../specification/product/09-modular-monolith.md#prd-09-08)
- [PRD-10-01](../../../specification/product/10-technical-stack.md#prd-10-01)
- [PRD-10-02](../../../specification/product/10-technical-stack.md#prd-10-02)
- [PRD-10-03](../../../specification/product/10-technical-stack.md#prd-10-03)
- [PRD-10-04](../../../specification/product/10-technical-stack.md#prd-10-04)
- [PRD-10-05](../../../specification/product/10-technical-stack.md#prd-10-05)
- [PRD-10-06](../../../specification/product/10-technical-stack.md#prd-10-06)
- [PRD-10-07](../../../specification/product/10-technical-stack.md#prd-10-07)
- [PRD-10-08](../../../specification/product/10-technical-stack.md#prd-10-08)
- [PRD-10-09](../../../specification/product/10-technical-stack.md#prd-10-09)
- [PRD-10-10](../../../specification/product/10-technical-stack.md#prd-10-10)
- [PRD-10-11](../../../specification/product/10-technical-stack.md#prd-10-11)
- [PRD-10-12](../../../specification/product/10-technical-stack.md#prd-10-12)
- [PRD-10-13](../../../specification/product/10-technical-stack.md#prd-10-13)
- [PRD-10-14](../../../specification/product/10-technical-stack.md#prd-10-14)
- [PRD-10-15](../../../specification/product/10-technical-stack.md#prd-10-15)
- [PRD-11-01](../../../specification/product/11-v1-portability-contract.md#prd-11-01)
- [PRD-11-02](../../../specification/product/11-v1-portability-contract.md#prd-11-02)
- [PRD-11-03](../../../specification/product/11-v1-portability-contract.md#prd-11-03)
- [PRD-11-04](../../../specification/product/11-v1-portability-contract.md#prd-11-04)
- [PRD-11-05](../../../specification/product/11-v1-portability-contract.md#prd-11-05)
- [PRD-11-06](../../../specification/product/11-v1-portability-contract.md#prd-11-06)
- [PRD-11-07](../../../specification/product/11-v1-portability-contract.md#prd-11-07)
- [PRD-11-08](../../../specification/product/11-v1-portability-contract.md#prd-11-08)
- [PRD-11-09](../../../specification/product/11-v1-portability-contract.md#prd-11-09)
- [PRD-13-01](../../../specification/product/13-core-domain-model.md#prd-13-01)
- [PRD-13-02](../../../specification/product/13-core-domain-model.md#prd-13-02)
- [PRD-13-03](../../../specification/product/13-core-domain-model.md#prd-13-03)
- [PRD-13-04](../../../specification/product/13-core-domain-model.md#prd-13-04)
- [PRD-13-05](../../../specification/product/13-core-domain-model.md#prd-13-05)
- [PRD-13-06](../../../specification/product/13-core-domain-model.md#prd-13-06)
- [PRD-13-07](../../../specification/product/13-core-domain-model.md#prd-13-07)
- [PRD-13-08](../../../specification/product/13-core-domain-model.md#prd-13-08)
- [PRD-13-09](../../../specification/product/13-core-domain-model.md#prd-13-09)

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
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/02-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/02-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
