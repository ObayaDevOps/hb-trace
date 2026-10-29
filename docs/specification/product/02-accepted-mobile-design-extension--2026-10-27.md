# Accepted mobile design extension — 2026-10-27

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Accepted mobile design extension — 2026-10-27](../../../HB-TRACE-V1-PLAN.md#accepted-mobile-design-extension--2026-10-27)

<a id="prd-02-01"></a>
<!-- requirement:PRD-02-01 -->
The [mobile workflow plan](../../mobile-first-workflow-ui-plan.md) and
[clickable reference](../../mobile-ui-reference.md) now specify company-sent
SMS/WhatsApp receipts, registered mobile-money holder names, explained saved-record
amendments, raw-wax processing through finished-wax stock, and bulk honey infusion
using purchased ingredient lots before bottling. These are accepted implementation
requirements; the reference is not live messaging or operational backend integration.
<!-- /requirement:PRD-02-01 -->

<a id="prd-02-02"></a>
<!-- requirement:PRD-02-02 -->
Ingredient purchases retain internal references even without supplier batch IDs,
ledger balances and allocations. Distinct infused outputs retain every honey and
ingredient ancestor, actual start/completion, ingredient fate and container history.
Completion plus applicable quality release precede bottling. Wax uses the existing
material lineage model. Public infused batches disclose actual ingredients, including
those used and removed, while seller, invoice, payment and purchase details stay
internal. Seller identity is not growing origin. The quality owner supplies process
and release requirements; no recipes, durations or safety limits are inferred.
<!-- /requirement:PRD-02-02 -->

<a id="prd-02-03"></a>
<!-- requirement:PRD-02-03 -->
**28 October refinement:** the mobile reference selects available honey from dropdowns
with an explicit add-another-batch action, and starts ingredient selection with one
purchase-lot dropdown. After confirmation, it suggests the bucket description from
honey, ingredient(s) and start date, retaining stable batch/container references.
Weekly checks on days 7, 14, 21 and 28 were confirmed: inspection, stirring,
fermentation observations and moisture readings are recorded against the infusion,
with operator, actual time, instrument and follow-up history. These monitoring dates
are not automatic release dates or invented safety limits.
<!-- /requirement:PRD-02-03 -->

<a id="prd-02-04"></a>
<!-- requirement:PRD-02-04 -->
The immutable-event, authorization, exact arithmetic, privacy and restricted-offline
invariants below remain authoritative. Reviewed schema/command/provider changes and
live acceptance evidence remain separate work; sales remain outside V1; a minimal dispatch/recipient register or controlled external register is required for recall. The detailed mobile plan contains the added records and acceptance
scenarios, including company receipt retry without duplicate receipts and mandatory
previous/proposed-value review with a change reason for saved-record edits.
<!-- /requirement:PRD-02-04 -->
