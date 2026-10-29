# Paper authority, outages and corrections

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Paper authority, outages and corrections](../../../HB-TRACE-V1-PLAN.md#paper-authority-outages-and-corrections)

<a id="prd-50-01"></a>
<!-- requirement:PRD-50-01 -->
Each event type has one approved capture route: digital-first or paper-first. Signed paper remains authoritative
for paper-first floor events. Transcription links the exact controlled form and requires verification of source,
quantity, batch and dates before downstream eligibility. Disagreement creates a blocking reconciliation task
owned by a supervisor, with quality-manager approval where release is affected; neither original is overwritten.
<!-- /requirement:PRD-50-01 -->

<a id="prd-50-02"></a>
<!-- requirement:PRD-50-02 -->
During an HQ outage, committed allocations, release and publication stop. Only activities explicitly authorized
by the quality owner's numbered-paper continuity procedure may continue physically; their products remain
segregated and blocked until records are entered, reconciled and reviewed online. Record actual occurrence and
later entry separately. Field capture retains the restricted offline command vocabulary.
<!-- /requirement:PRD-50-02 -->

<a id="prd-50-03"></a>
<!-- requirement:PRD-50-03 -->
Corrections distinguish clerical fields, quantities, source attribution and actual physical reversals. A simple
transformation reversal is forbidden once any output has downstream consumption. Guided corrections preserve
original edges, reconcile all affected quantities and require review of downstream release/publication decisions.
Accounting reversal alone never recreates physical stock. Source corrections conservatively retain old and new
potential exposure paths until adjudicated. Show previous/proposed values, reason, affected records and approver.
<!-- /requirement:PRD-50-03 -->
