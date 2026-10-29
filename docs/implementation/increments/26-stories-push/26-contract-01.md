# 26-contract-01: Approved stories — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by approved stories and optional push.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 13-behavior, 23-behavior. Read their handoff **interface section only**.
Decision records: privacy, messaging. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-31-01](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-01)
- [PRD-31-02](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-02)
- [PRD-31-03](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-03)
- [PRD-31-04](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-04)
- [PRD-31-05](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-05)
- [PRD-31-06](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-06)
- [PRD-31-07](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-07)
- [PRD-31-08](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-08)
- [PRD-31-09](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-09)
- [PRD-31-10](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-10)
- [PRD-31-11](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-11)
- [PRD-31-12](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-12)
- [PRD-31-13](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-13)
- [PRD-31-14](../../../specification/product/31-public-claims-and-editorial-content.md#prd-31-14)

- `src/app/api/v1/public/batches/[code]/route.ts` — inspect only the relevant exported boundary
- `src/server/auth/identity.ts` — ApplicationIdentity

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Check one approved story revision excludes private fields; for push check denied permission leaves due work visible.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/26-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/26-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
