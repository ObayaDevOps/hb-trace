# Recall and current public status

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Recall and current public status](../../../HB-TRACE-V1-PLAN.md#recall-and-current-public-status)

<a id="prd-51-01"></a>
<!-- requirement:PRD-51-01 -->
A minimal dispatch register or controlled external register links batch, quantity, date, recipient/destination
and contact reference. Name its owner and retrieval procedure; general sales/accounting remains deferred.
A recall drill reconciles stock held, distributed, recovered, disposed of and outstanding without double counting.
Record recipient contact attempts, acknowledgements, follow-up owner and closure evidence.
<!-- /requirement:PRD-51-01 -->

<a id="prd-51-02"></a>
<!-- requirement:PRD-51-02 -->
Hold, allocation, packaging and publication must serialize consistently: a concurrent hold cannot leave a newly
created descendant eligible. Recheck ancestor restrictions inside the commit boundary; include concurrent graph
extension in acceptance exercises. A named authorized deputy covers urgent quality decisions. Ordinary staff
can report and physically segregate suspect material under the SOP, but cannot authorize release.
<!-- /requirement:PRD-51-02 -->

<a id="prd-51-03"></a>
<!-- requirement:PRD-51-03 -->
Public lookup distinguishes unknown code, unavailable current status, withdrawn and recalled. Approved recall
actions and current status precede storytelling. Define a numeric maximum propagation delay covering the API,
other customer website and every cache before rollout; stale clients cannot assert current approval.
<!-- /requirement:PRD-51-03 -->
