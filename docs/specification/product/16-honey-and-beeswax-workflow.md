# Honey and beeswax workflow

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Honey and beeswax workflow](../../../HB-TRACE-V1-PLAN.md#honey-and-beeswax-workflow)

<a id="prd-16-01"></a>
<!-- requirement:PRD-16-01 -->
1. Register or select the farmer, apiary and origin evidence.
<!-- /requirement:PRD-16-01 -->

<a id="prd-16-02"></a>
<!-- requirement:PRD-16-02 -->
2. Record the honeycomb purchase/harvest, collection date, quantity, grade, agreed price and payment reference.
<!-- /requirement:PRD-16-02 -->

<a id="prd-16-03"></a>
<!-- requirement:PRD-16-03 -->
3. Issue a receipt containing a non-sensitive farmer reference, transaction code, product, quantity, grade,
   price/payment status, buyer and date. Provide a simple confirmation/dispute route appropriate to the pilot,
   such as signed paper acknowledgement, an SMS/USSD reference or staff-assisted lookup. A farmer can dispute
   the recorded transaction without altering the original entry; resolution is linked and audited.
<!-- /requirement:PRD-16-03 -->

<a id="prd-16-04"></a>
<!-- requirement:PRD-16-04 -->
4. Assign the purchase/harvest its permanent ID and print or attach a durable QR label. If labels are unavailable,
   issue a unique offline fallback code and record later QR assignment against the same identity.
<!-- /requirement:PRD-16-04 -->

<a id="prd-16-05"></a>
<!-- requirement:PRD-16-05 -->
5. Record separation/extraction as a transformation consuming honeycomb and producing one or more honey
   buckets, one or more raw-beeswax buckets and optional waste/residue.
<!-- /requirement:PRD-16-05 -->

<a id="prd-16-06"></a>
<!-- requirement:PRD-16-06 -->
6. Retain all upstream ancestors and exact direct allocations when units are processed or blended; calculated upstream attribution follows the explicit method below.
<!-- /requirement:PRD-16-06 -->

<a id="prd-16-07"></a>
<!-- requirement:PRD-16-07 -->
7. Record moisture, other inspections, laboratory samples/results and supporting reports against the physical
   batch they represent.
<!-- /requirement:PRD-16-07 -->

<a id="prd-16-08"></a>
<!-- requirement:PRD-16-08 -->
8. Flag suspect or failed results without automatically attributing fault to a farmer, apiary or region.
<!-- /requirement:PRD-16-08 -->

<a id="prd-16-09"></a>
<!-- requirement:PRD-16-09 -->
9. Require an authorised person to hold, quarantine, retest, reject, discard or release the affected batch.
<!-- /requirement:PRD-16-09 -->

<a id="prd-16-10"></a>
<!-- requirement:PRD-16-10 -->
10. Record a packaging run linking product, quantity, package size, internal batch and external lot code.
<!-- /requirement:PRD-16-10 -->

<a id="prd-16-11"></a>
<!-- requirement:PRD-16-11 -->
11. Publish only an approved sale batch, approved public claims and permitted provenance/story fields to the
    public verification page.
<!-- /requirement:PRD-16-11 -->

<a id="prd-16-12"></a>
<!-- requirement:PRD-16-12 -->
12. If a released result is superseded, a source is later held or another safety concern arises, calculate all
    downstream lots and packaging runs. An authorised quality manager records the affected scope and chooses hold,
    withdrawal or batch-level recall. A recall records reason, initiator, actions, public-page status and closure.
<!-- /requirement:PRD-16-12 -->

<a id="prd-16-13"></a>
<!-- requirement:PRD-16-13 -->
V1 provides backward trace from a bucket or batch to contributing farmers, apiaries, regions and quantities,
and forward trace from a farmer/apiary/source unit to derived batches, results and packaging runs.
<!-- /requirement:PRD-16-13 -->

<a id="prd-16-14"></a>
<!-- requirement:PRD-16-14 -->
Beeswax is traceable in V1, but the supplied documents do not include a beeswax product specification. The UNBS
catalogue currently lists US EAS 992:2020, Beeswax — Specification, for beeswax intended for food-industry use.
The quality owner must acquire the licensed standard and decide applicability in Phase 0. Do not claim beeswax
standards compliance until its requirements and testing rules have been reviewed and added to the register.
<!-- /requirement:PRD-16-14 -->
