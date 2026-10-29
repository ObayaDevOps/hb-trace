# 02-contract-03: Shared contracts — contract slice 3

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by shared contracts.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 02-contract-02. Read their handoff **interface section only**.
Decision records: quality. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [ARC-01-01](../../../specification/architecture/01-architecture-diagram.md#arc-01-01)
- [ARC-01-02](../../../specification/architecture/01-architecture-diagram.md#arc-01-02)
- [ARC-02-01](../../../specification/architecture/02-components-and-ownership.md#arc-02-01)
- [ARC-02-02](../../../specification/architecture/02-components-and-ownership.md#arc-02-02)
- [ARC-02-03](../../../specification/architecture/02-components-and-ownership.md#arc-02-03)
- [ARC-02-04](../../../specification/architecture/02-components-and-ownership.md#arc-02-04)
- [ARC-02-05](../../../specification/architecture/02-components-and-ownership.md#arc-02-05)
- [ARC-02-06](../../../specification/architecture/02-components-and-ownership.md#arc-02-06)
- [ARC-02-07](../../../specification/architecture/02-components-and-ownership.md#arc-02-07)
- [ARC-02-08](../../../specification/architecture/02-components-and-ownership.md#arc-02-08)
- [ARC-02-09](../../../specification/architecture/02-components-and-ownership.md#arc-02-09)
- [ARC-02-10](../../../specification/architecture/02-components-and-ownership.md#arc-02-10)
- [ARC-02-11](../../../specification/architecture/02-components-and-ownership.md#arc-02-11)
- [ARC-02-12](../../../specification/architecture/02-components-and-ownership.md#arc-02-12)
- [ARC-03-01](../../../specification/architecture/03-data-model-contract.md#arc-03-01)
- [ARC-03-02](../../../specification/architecture/03-data-model-contract.md#arc-03-02)
- [ARC-03-03](../../../specification/architecture/03-data-model-contract.md#arc-03-03)
- [ARC-03-04](../../../specification/architecture/03-data-model-contract.md#arc-03-04)
- [ARC-03-05](../../../specification/architecture/03-data-model-contract.md#arc-03-05)
- [ARC-03-06](../../../specification/architecture/03-data-model-contract.md#arc-03-06)
- [ARC-03-07](../../../specification/architecture/03-data-model-contract.md#arc-03-07)
- [ARC-03-08](../../../specification/architecture/03-data-model-contract.md#arc-03-08)
- [ARC-03-09](../../../specification/architecture/03-data-model-contract.md#arc-03-09)
- [ARC-03-10](../../../specification/architecture/03-data-model-contract.md#arc-03-10)
- [ARC-03-11](../../../specification/architecture/03-data-model-contract.md#arc-03-11)
- [ARC-03-12](../../../specification/architecture/03-data-model-contract.md#arc-03-12)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)
- [WF-30-08](../../../specification/workflows/30-additional-implementation-records-and-boundaries.md#wf-30-08)

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
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/02-contract-03.md`.
Allowed write roots: `docs/implementation/state/tasks/02-contract-03.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
