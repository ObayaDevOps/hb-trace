# 04-contract-01: Identity and permissions — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by identity and permissions.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 03-behavior. Read their handoff **interface section only**.
Decision records: privacy, platform. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-12-01](../../../specification/product/12-roles-and-access.md#prd-12-01)
- [PRD-12-02](../../../specification/product/12-roles-and-access.md#prd-12-02)
- [PRD-12-03](../../../specification/product/12-roles-and-access.md#prd-12-03)
- [PRD-12-04](../../../specification/product/12-roles-and-access.md#prd-12-04)
- [PRD-12-05](../../../specification/product/12-roles-and-access.md#prd-12-05)
- [PRD-12-06](../../../specification/product/12-roles-and-access.md#prd-12-06)
- [PRD-12-07](../../../specification/product/12-roles-and-access.md#prd-12-07)
- [PRD-12-08](../../../specification/product/12-roles-and-access.md#prd-12-08)

- `src/server/auth/identity.ts` — getApplicationIdentity
- `src/server/auth/authorization.ts` — inspect only the relevant exported boundary

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Check one authorized action and one wrong-role/organization denial.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/04-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/04-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
