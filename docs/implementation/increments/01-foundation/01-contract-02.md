# 01-contract-02: Baseline and decisions — contract slice 2

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by baseline and decisions.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
This is a governance/evidence task; do not modify application code.

## Prerequisites and decisions

Required tasks: 01-contract-01. Read their handoff **interface section only**.
Decision records: platform, quality, privacy, devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-07-11](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-11)
- [PRD-07-12](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-12)
- [PRD-07-13](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-13)
- [PRD-07-14](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-14)
- [PRD-07-15](../../../specification/product/07-explicitly-deferred-to-v2.md#prd-07-15)
- [PRD-34-01](../../../specification/product/34-first-funded-infrastructure-iteration.md#prd-34-01)
- [PRD-34-02](../../../specification/product/34-first-funded-infrastructure-iteration.md#prd-34-02)
- [PRD-34-03](../../../specification/product/34-first-funded-infrastructure-iteration.md#prd-34-03)
- [PRD-34-04](../../../specification/product/34-first-funded-infrastructure-iteration.md#prd-34-04)
- [PRD-34-05](../../../specification/product/34-first-funded-infrastructure-iteration.md#prd-34-05)
- [PRD-34-06](../../../specification/product/34-first-funded-infrastructure-iteration.md#prd-34-06)
- [PRD-34-07](../../../specification/product/34-first-funded-infrastructure-iteration.md#prd-34-07)
- [PRD-34-08](../../../specification/product/34-first-funded-infrastructure-iteration.md#prd-34-08)
- [PRD-35-01](../../../specification/product/35-codebase-documentation.md#prd-35-01)
- [PRD-35-02](../../../specification/product/35-codebase-documentation.md#prd-35-02)
- [PRD-35-03](../../../specification/product/35-codebase-documentation.md#prd-35-03)
- [PRD-35-04](../../../specification/product/35-codebase-documentation.md#prd-35-04)
- [PRD-35-05](../../../specification/product/35-codebase-documentation.md#prd-35-05)
- [PRD-36-01](../../../specification/product/36-current-repository-transition.md#prd-36-01)
- [PRD-36-02](../../../specification/product/36-current-repository-transition.md#prd-36-02)
- [PRD-36-03](../../../specification/product/36-current-repository-transition.md#prd-36-03)
- [PRD-36-04](../../../specification/product/36-current-repository-transition.md#prd-36-04)
- [PRD-36-05](../../../specification/product/36-current-repository-transition.md#prd-36-05)
- [PRD-36-06](../../../specification/product/36-current-repository-transition.md#prd-36-06)
- [PRD-36-07](../../../specification/product/36-current-repository-transition.md#prd-36-07)
- [PRD-36-08](../../../specification/product/36-current-repository-transition.md#prd-36-08)
- [PRD-37-01](../../../specification/product/37-delivery-sequence.md#prd-37-01)
- [PRD-37-02](../../../specification/product/37-delivery-sequence.md#prd-37-02)
- [PRD-37-03](../../../specification/product/37-delivery-sequence.md#prd-37-03)
- [PRD-37-04](../../../specification/product/37-delivery-sequence.md#prd-37-04)
- [PRD-38-01](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-01)
- [PRD-38-02](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-02)
- [PRD-38-03](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-03)
- [PRD-38-04](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-04)
- [PRD-38-05](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-05)
- [PRD-38-06](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-06)
- [PRD-38-07](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-07)
- [PRD-38-08](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-08)

- `src/lib/runtime-config.ts` — runtimeConfig

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Record decisions, ownership, scope and evidence gaps; never mark an unresolved policy approved.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Demonstrate that a local start needs no provider credentials and that hosted persistence is not falsely reported ready.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/01-contract-02.md`.
Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Narrow these further at dispatch.
