# 01-contract-04: Baseline and decisions — contract slice 4

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by baseline and decisions.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
This is a governance/evidence task; do not modify application code.

## Prerequisites and decisions

Required tasks: 01-contract-03. Read their handoff **interface section only**.
Decision records: platform, quality, privacy, devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [WF-01-07](../../../specification/workflows/01-agreed-decisions.md#wf-01-07)
- [WF-01-08](../../../specification/workflows/01-agreed-decisions.md#wf-01-08)
- [WF-01-09](../../../specification/workflows/01-agreed-decisions.md#wf-01-09)
- [WF-01-10](../../../specification/workflows/01-agreed-decisions.md#wf-01-10)
- [WF-01-11](../../../specification/workflows/01-agreed-decisions.md#wf-01-11)
- [WF-01-12](../../../specification/workflows/01-agreed-decisions.md#wf-01-12)
- [WF-02-01](../../../specification/workflows/02-the-experience.md#wf-02-01)
- [WF-02-02](../../../specification/workflows/02-the-experience.md#wf-02-02)
- [WF-03-01](../../../specification/workflows/03-1-end-to-end-flow.md#wf-03-01)
- [WF-03-02](../../../specification/workflows/03-1-end-to-end-flow.md#wf-03-02)
- [WF-29-01](../../../specification/workflows/29-implementation-sequence.md#wf-29-01)
- [WF-29-02](../../../specification/workflows/29-implementation-sequence.md#wf-29-02)
- [WF-29-03](../../../specification/workflows/29-implementation-sequence.md#wf-29-03)
- [WF-29-04](../../../specification/workflows/29-implementation-sequence.md#wf-29-04)
- [WF-29-05](../../../specification/workflows/29-implementation-sequence.md#wf-29-05)
- [WF-29-06](../../../specification/workflows/29-implementation-sequence.md#wf-29-06)
- [WF-32-01](../../../specification/workflows/32-remaining-operational-settings.md#wf-32-01)
- [WF-32-02](../../../specification/workflows/32-remaining-operational-settings.md#wf-32-02)
- [WF-32-03](../../../specification/workflows/32-remaining-operational-settings.md#wf-32-03)
- [WF-32-04](../../../specification/workflows/32-remaining-operational-settings.md#wf-32-04)
- [WF-32-05](../../../specification/workflows/32-remaining-operational-settings.md#wf-32-05)
- [WF-32-06](../../../specification/workflows/32-remaining-operational-settings.md#wf-32-06)
- [WF-32-07](../../../specification/workflows/32-remaining-operational-settings.md#wf-32-07)
- [WF-32-08](../../../specification/workflows/32-remaining-operational-settings.md#wf-32-08)
- [ARC-00-01](../../../specification/architecture/00-hb-trace-v1-architecture-and-technical-specification.md#arc-00-01)
- [ARC-07-01](../../../specification/architecture/07-implementation-sequence-and-open-decisions.md#arc-07-01)
- [ARC-07-02](../../../specification/architecture/07-implementation-sequence-and-open-decisions.md#arc-07-02)
- [ARC-07-03](../../../specification/architecture/07-implementation-sequence-and-open-decisions.md#arc-07-03)
- [ARC-07-04](../../../specification/architecture/07-implementation-sequence-and-open-decisions.md#arc-07-04)
- [ARC-07-05](../../../specification/architecture/07-implementation-sequence-and-open-decisions.md#arc-07-05)
- [ARC-08-01](../../../specification/architecture/08-provider-references.md#arc-08-01)
- [ARC-08-02](../../../specification/architecture/08-provider-references.md#arc-08-02)
- [ARC-08-03](../../../specification/architecture/08-provider-references.md#arc-08-03)
- [ARC-08-04](../../../specification/architecture/08-provider-references.md#arc-08-04)

- `src/lib/runtime-config.ts` — runtimeConfig

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Record decisions, ownership, scope and evidence gaps; never mark an unresolved policy approved.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Demonstrate that a local start needs no provider credentials and that hosted persistence is not falsely reported ready.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/01-contract-04.md`.
Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Narrow these further at dispatch.
