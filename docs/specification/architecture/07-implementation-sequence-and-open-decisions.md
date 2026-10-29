# Implementation sequence and open decisions

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/architecture-technical-spec.md — Implementation sequence and open decisions](../../architecture-technical-spec.md#implementation-sequence-and-open-decisions)

<a id="arc-07-01"></a>
<!-- requirement:ARC-07-01 -->
1. Confirm host, connection mode, roles, private/public bucket policies, backup destination, RPO/RTO, device limits,
   capture-route authority, quality deputy and external dispatch register ownership.
<!-- /requirement:ARC-07-01 -->

<a id="arc-07-02"></a>
<!-- requirement:ARC-07-02 -->
2. Implement one online end-to-end path with durable SQL transactions, private assets, evidence export and recall.
<!-- /requirement:ARC-07-02 -->

<a id="arc-07-03"></a>
<!-- requirement:ARC-07-03 -->
3. Add restricted offline startup/sync and guided receiving/correction together; prove recovery on actual devices.
<!-- /requirement:ARC-07-03 -->

<a id="arc-07-04"></a>
<!-- requirement:ARC-07-04 -->
4. Enable wax/infusion only when their full lineage and quality workflows pass acceptance. Add messaging, optional
   push and richer stories independently after the core path is proven.
<!-- /requirement:ARC-07-04 -->

<a id="arc-07-05"></a>
<!-- requirement:ARC-07-05 -->
Implementation must later exercise the V1 concurrency, privacy, restore, physical reconciliation and usability
acceptance scenarios. This documentation change does not execute those tests or claim their success. Existing
code/provider documentation may still describe the earlier design and must be reconciled during implementation.
<!-- /requirement:ARC-07-05 -->
