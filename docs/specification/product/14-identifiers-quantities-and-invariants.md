# Identifiers, quantities and invariants

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Identifiers, quantities and invariants](../../../HB-TRACE-V1-PLAN.md#identifiers-quantities-and-invariants)

<a id="prd-14-01"></a>
<!-- requirement:PRD-14-01 -->
- Use a cryptographically random, client-generatable UUIDv4 as the permanent internal identifier for every
  offline-creatable traceable unit and record. Database timestamps, not client ID ordering, establish receipt order.
<!-- /requirement:PRD-14-01 -->

<a id="prd-14-02"></a>
<!-- requirement:PRD-14-02 -->
- Maintain a separate identifier registry for human-readable codes, QR codes, supplier codes and future GS1
  identifiers. Replacing a damaged label never changes the internal identity.
<!-- /requirement:PRD-14-02 -->

<a id="prd-14-03"></a>
<!-- requirement:PRD-14-03 -->
- Assign every farmer a stable internal identity and allow one or more external/card identifiers to be attached
  later. V1 may print a farmer QR/reference on receipts, but does not require NFC hardware; the identifier model
  must allow an NFC/QR Farmer Card to be added later without replacing the farmer record.
<!-- /requirement:PRD-14-03 -->

<a id="prd-14-04"></a>
<!-- requirement:PRD-14-04 -->
- Store measured quantities as decimal values with the entered unit and a canonical normalized unit; never use
  binary floating point for weights. Define precision, conversion and rounding once in the data dictionary.
<!-- /requirement:PRD-14-04 -->

<a id="prd-14-05"></a>
<!-- requirement:PRD-14-05 -->
- Store every monetary amount as a decimal value with an ISO 4217 currency and an explicit meaning such as agreed,
  paid, deducted or outstanding; never use binary floating point for money.
<!-- /requirement:PRD-14-05 -->

<a id="prd-14-06"></a>
<!-- requirement:PRD-14-06 -->
- Record gross, tare and net weights separately when applicable, including device/manual origin and operator.
<!-- /requirement:PRD-14-06 -->

<a id="prd-14-07"></a>
<!-- requirement:PRD-14-07 -->
- A committed transformation input allocation cannot exceed the source lot's available quantity. Commit all
  allocations atomically while locking affected source rows or using serializable transactions with full-command
  retry; offline concurrency is never resolved with last-write-wins.
<!-- /requirement:PRD-14-07 -->

<a id="prd-14-08"></a>
<!-- requirement:PRD-14-08 -->
- Every transformation records all inputs, exact allocated quantities, outputs, operator, facility and time.
<!-- /requirement:PRD-14-08 -->

<a id="prd-14-09"></a>
<!-- requirement:PRD-14-09 -->
- Direct input/output allocation edges are the lineage source of truth. Recursive PostgreSQL queries calculate
  indirect ancestry; V1 does not maintain a speculative lineage-closure service. Reject cycles and ensure every
  produced material lot has exactly one originating purchase, harvest, transformation or approved adjustment.
<!-- /requirement:PRD-14-09 -->

<a id="prd-14-10"></a>
<!-- requirement:PRD-14-10 -->
- Yield differences are visible and reviewable. V1 flags configurable tolerances rather than enforcing perfect
  mass balance because honeycomb, residue, moisture and handling cause legitimate differences.
<!-- /requirement:PRD-14-10 -->

<a id="prd-14-11"></a>
<!-- requirement:PRD-14-11 -->
- Drafts may be edited with audit history. Committed material/financial events are corrected through linked
  reversal or amendment records; controlled documents and publications use explicit revisions. Do not apply one
  universal versioning mechanism to every entity.
<!-- /requirement:PRD-14-11 -->

<a id="prd-14-12"></a>
<!-- requirement:PRD-14-12 -->
- Public biography, project and marketing copy never modifies operational farmer, transaction or lineage facts.
  Editorial content is versioned, approved and linked to the factual records it describes.
<!-- /requirement:PRD-14-12 -->

<a id="prd-14-13"></a>
<!-- requirement:PRD-14-13 -->
- A held, rejected or recalled material lot cannot be allocated, packaged or published without an authorised,
  audited disposition change.
<!-- /requirement:PRD-14-13 -->

<a id="prd-14-14"></a>
<!-- requirement:PRD-14-14 -->
- Record event occurrence time, device capture time and server receipt/commit time separately. Store instants in
  UTC and render operational local time using the `Africa/Kampala` IANA timezone. Server commit time is
  authoritative for ordering submissions and reviews.
<!-- /requirement:PRD-14-14 -->

<a id="prd-14-15"></a>
<!-- requirement:PRD-14-15 -->
- Availability is derived from the material ledger. If a cached balance is introduced for performance, update it
  in the same transaction as its ledger entries and continuously reconcile it.
<!-- /requirement:PRD-14-15 -->

<a id="prd-14-16"></a>
<!-- requirement:PRD-14-16 -->
- Audit events are append-only under the application database role, but are described as an operational audit
  trail rather than cryptographic proof against a privileged database administrator.
<!-- /requirement:PRD-14-16 -->
