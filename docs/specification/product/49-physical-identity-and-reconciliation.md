# Physical identity and reconciliation

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Physical identity and reconciliation](../../../HB-TRACE-V1-PLAN.md#physical-identity-and-reconciliation)

<a id="prd-49-01"></a>
<!-- requirement:PRD-49-01 -->
Container identity and contents/lot identity are separate. Emptying and refilling a reusable container requires
recording the prior contents' destination and assigning the new contents reference. Decanting, topping up,
splitting and mixing record quantities and links before further use. Replacement labels retain contents identity;
refilling does not reuse an obsolete contents label. Scan/typed-code confirmation displays material, source and
expected quantity. Damaged or ambiguous labels enter review rather than automatic source assignment.
<!-- /requirement:PRD-49-01 -->

<a id="prd-49-02"></a>
<!-- requirement:PRD-49-02 -->
Record physical stock counts at a quality-owner-approved frequency and reconcile to ledger balances. Retain
both observed and recorded quantities, variance, reason, reviewer and approved adjustment. Positive adjustments
with unknown source remain explicitly unproven and unavailable for provenance claims or release until resolved.
Yield tolerances are process-specific; unexplained out-of-tolerance differences block release pending review.
<!-- /requirement:PRD-49-02 -->
