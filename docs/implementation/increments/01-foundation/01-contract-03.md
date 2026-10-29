# 01-contract-03: Baseline and decisions — contract slice 3

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by baseline and decisions.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
This is a governance/evidence task; do not modify application code.

## Prerequisites and decisions

Required tasks: 01-contract-02. Read their handoff **interface section only**.
Decision records: platform, quality, privacy, devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-38-09](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-09)
- [PRD-38-10](../../../specification/product/38-phase-0--scope-decisions-and-risk-retirement.md#prd-38-10)
- [PRD-45-01](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-01)
- [PRD-45-02](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-02)
- [PRD-45-03](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-03)
- [PRD-45-04](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-04)
- [PRD-45-05](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-05)
- [PRD-45-06](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-06)
- [PRD-45-07](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-07)
- [PRD-45-08](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-08)
- [PRD-45-09](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-09)
- [PRD-45-10](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-10)
- [PRD-45-11](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-11)
- [PRD-45-12](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-12)
- [PRD-45-13](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-13)
- [PRD-45-14](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-14)
- [PRD-45-15](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-15)
- [PRD-45-16](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-16)
- [PRD-45-17](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-17)
- [PRD-45-18](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-18)
- [PRD-45-19](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-19)
- [PRD-45-20](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-20)
- [PRD-45-21](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-21)
- [PRD-45-22](../../../specification/product/45-decisions-required-before-implementation.md#prd-45-22)
- [PRD-46-01](../../../specification/product/46-assumptions.md#prd-46-01)
- [PRD-46-02](../../../specification/product/46-assumptions.md#prd-46-02)
- [PRD-46-03](../../../specification/product/46-assumptions.md#prd-46-03)
- [PRD-46-04](../../../specification/product/46-assumptions.md#prd-46-04)
- [PRD-46-05](../../../specification/product/46-assumptions.md#prd-46-05)
- [PRD-46-06](../../../specification/product/46-assumptions.md#prd-46-06)
- [PRD-46-07](../../../specification/product/46-assumptions.md#prd-46-07)
- [PRD-46-08](../../../specification/product/46-assumptions.md#prd-46-08)
- [WF-00-01](../../../specification/workflows/00-mobile-first-workflow-and-ui-plan.md#wf-00-01)
- [WF-00-02](../../../specification/workflows/00-mobile-first-workflow-and-ui-plan.md#wf-00-02)
- [WF-01-01](../../../specification/workflows/01-agreed-decisions.md#wf-01-01)
- [WF-01-02](../../../specification/workflows/01-agreed-decisions.md#wf-01-02)
- [WF-01-03](../../../specification/workflows/01-agreed-decisions.md#wf-01-03)
- [WF-01-04](../../../specification/workflows/01-agreed-decisions.md#wf-01-04)
- [WF-01-05](../../../specification/workflows/01-agreed-decisions.md#wf-01-05)
- [WF-01-06](../../../specification/workflows/01-agreed-decisions.md#wf-01-06)

- `src/lib/runtime-config.ts` — runtimeConfig

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Record decisions, ownership, scope and evidence gaps; never mark an unresolved policy approved.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Demonstrate that a local start needs no provider credentials and that hosted persistence is not falsely reported ready.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/01-contract-03.md`.
Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Narrow these further at dispatch.
