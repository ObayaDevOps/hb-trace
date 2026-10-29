# 01-contract-01: Baseline and decisions — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by baseline and decisions.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
This is a governance/evidence task; do not modify application code.

## Prerequisites and decisions

Required tasks: none. Read their handoff **interface section only**.
Decision records: platform, quality, privacy, devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-01-01](../../../specification/product/01-purpose.md#prd-01-01)
- [PRD-01-02](../../../specification/product/01-purpose.md#prd-01-02)
- [PRD-01-03](../../../specification/product/01-purpose.md#prd-01-03)
- [PRD-01-04](../../../specification/product/01-purpose.md#prd-01-04)
- [PRD-03-01](../../../specification/product/03-implementation-status-and-specification.md#prd-03-01)
- [PRD-04-01](../../../specification/product/04-v1-outcomes.md#prd-04-01)
- [PRD-04-02](../../../specification/product/04-v1-outcomes.md#prd-04-02)
- [PRD-04-03](../../../specification/product/04-v1-outcomes.md#prd-04-03)
- [PRD-04-04](../../../specification/product/04-v1-outcomes.md#prd-04-04)
- [PRD-04-05](../../../specification/product/04-v1-outcomes.md#prd-04-05)
- [PRD-04-06](../../../specification/product/04-v1-outcomes.md#prd-04-06)
- [PRD-04-07](../../../specification/product/04-v1-outcomes.md#prd-04-07)
- [PRD-04-08](../../../specification/product/04-v1-outcomes.md#prd-04-08)
- [PRD-04-09](../../../specification/product/04-v1-outcomes.md#prd-04-09)
- [PRD-04-10](../../../specification/product/04-v1-outcomes.md#prd-04-10)
- [PRD-04-11](../../../specification/product/04-v1-outcomes.md#prd-04-11)
- [PRD-04-12](../../../specification/product/04-v1-outcomes.md#prd-04-12)
- [PRD-04-13](../../../specification/product/04-v1-outcomes.md#prd-04-13)
- [PRD-04-14](../../../specification/product/04-v1-outcomes.md#prd-04-14)
- [PRD-04-15](../../../specification/product/04-v1-outcomes.md#prd-04-15)
- [PRD-04-16](../../../specification/product/04-v1-outcomes.md#prd-04-16)
- [PRD-04-17](../../../specification/product/04-v1-outcomes.md#prd-04-17)
- [PRD-04-18](../../../specification/product/04-v1-outcomes.md#prd-04-18)
- [PRD-04-19](../../../specification/product/04-v1-outcomes.md#prd-04-19)
- [PRD-06-01](../../../specification/product/06-included-in-v1.md#prd-06-01)
- [PRD-06-02](../../../specification/product/06-included-in-v1.md#prd-06-02)
- [PRD-06-03](../../../specification/product/06-included-in-v1.md#prd-06-03)
- [PRD-06-04](../../../specification/product/06-included-in-v1.md#prd-06-04)
- [PRD-06-05](../../../specification/product/06-included-in-v1.md#prd-06-05)
- [PRD-06-06](../../../specification/product/06-included-in-v1.md#prd-06-06)
- [PRD-06-07](../../../specification/product/06-included-in-v1.md#prd-06-07)
- [PRD-06-08](../../../specification/product/06-included-in-v1.md#prd-06-08)
- [PRD-06-09](../../../specification/product/06-included-in-v1.md#prd-06-09)
- [PRD-06-10](../../../specification/product/06-included-in-v1.md#prd-06-10)
- [PRD-06-11](../../../specification/product/06-included-in-v1.md#prd-06-11)
- [PRD-06-12](../../../specification/product/06-included-in-v1.md#prd-06-12)
- [PRD-06-13](../../../specification/product/06-included-in-v1.md#prd-06-13)
- [PRD-06-14](../../../specification/product/06-included-in-v1.md#prd-06-14)
- [PRD-06-15](../../../specification/product/06-included-in-v1.md#prd-06-15)
- [PRD-06-16](../../../specification/product/06-included-in-v1.md#prd-06-16)
- [PRD-06-17](../../../specification/product/06-included-in-v1.md#prd-06-17)
- [PRD-07-01](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-01)
- [PRD-07-02](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-02)
- [PRD-07-03](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-03)
- [PRD-07-04](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-04)
- [PRD-07-05](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-05)
- [PRD-07-06](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-06)
- [PRD-07-07](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-07)
- [PRD-07-08](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-08)
- [PRD-07-09](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-09)
- [PRD-07-10](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-10)

- `src/lib/runtime-config.ts` — runtimeConfig

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Record decisions, ownership, scope and evidence gaps; never mark an unresolved policy approved.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Demonstrate that a local start needs no provider credentials and that hosted persistence is not falsely reported ready.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/01-contract-01.md`.
Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Narrow these further at dispatch.
