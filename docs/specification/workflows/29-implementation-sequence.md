# Implementation sequence

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Implementation sequence](../../mobile-first-workflow-ui-plan.md#implementation-sequence)

<a id="wf-29-01"></a>
<!-- requirement:WF-29-01 -->
1. **Prototype the settled journey.** Test quick registration, optional profile
   completion, collection labels, My work, unsynced HQ arrival and quality review
   with synthetic records on a phone. Confirm the remaining operational settings
   below without reopening the settled workflow decisions.
<!-- /requirement:WF-29-01 -->

<a id="wf-29-02"></a>
<!-- requirement:WF-29-02 -->
2. **Make field capture durable.** Connect authentication, persistence and private
   assets; implement minimum registration, dates, price/quantity rules, buckets,
   receipts and resumable drafts. Add reviewed schema changes for new fields.
   Correct sync idempotency, transient retry and timestamp defects before live use.
<!-- /requirement:WF-29-02 -->

<a id="wf-29-03"></a>
<!-- requirement:WF-29-03 -->
3. **Implement correction and receiving together.** Add guided officer/supervisor
   resolution, dependent-record recovery, provisional arrivals and idempotent
   reconciliation. Stock appears at receipt and retains independent blocking states.
<!-- /requirement:WF-29-03 -->

<a id="wf-29-04"></a>
<!-- requirement:WF-29-04 -->
4. **Complete HQ production and quality.** Add stock movements, processing and
   blending, measurements, authorized release, bottling and the quality manager's
   problem/recall workflow with downstream impact and audit history.
<!-- /requirement:WF-29-04 -->

<a id="wf-29-05"></a>
<!-- requirement:WF-29-05 -->
5. **Connect public verification.** Add approved profiles, accurately labelled dates,
   approximate map data, immutable public revisions and the other website's lookup,
   withdrawal/recall and cache-update integration.
<!-- /requirement:WF-29-05 -->

<a id="wf-29-06"></a>
<!-- requirement:WF-29-06 -->
6. **Run pilot acceptance.** Exercise the scenarios below on actual phones and
   printers, including outages, concurrent operations, permissions and recovery.
   Keep demo results visibly distinct until durable provider workflows are enabled.
<!-- /requirement:WF-29-06 -->
