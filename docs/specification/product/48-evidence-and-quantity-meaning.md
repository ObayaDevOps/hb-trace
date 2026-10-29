# Evidence and quantity meaning

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Evidence and quantity meaning](../../../HB-TRACE-V1-PLAN.md#evidence-and-quantity-meaning)

<a id="prd-48-01"></a>
<!-- requirement:PRD-48-01 -->
A complete batch evidence pack contains source identities and receipts, contents/lot identifiers, custody and
movement events, transformation inputs/outputs, recorded quantities and discrepancies, quality decisions,
corrections, original supporting files and hashes, applicable rule versions and an export cutoff. Include
reviewer, completeness status and explicit missing/uncertain evidence. A hash establishes byte integrity,
not the truth of an observation. The audit trail does not prove resistance to a privileged administrator.
<!-- /requirement:PRD-48-01 -->

<a id="prd-48-02"></a>
<!-- requirement:PRD-48-02 -->
Recorded direct allocations use exact decimal arithmetic. Calculated upstream mass attribution is separately
labelled with its versioned method and assumptions. For example, 20 kg drawn from a 60:40 mixed lot may be
attributed as 12:8 only under an approved mixing assumption; those are not separately measured source masses.
All potentially contributing ancestors remain traceable regardless of attribution rounding or later ingredient
removal. Multi-output extraction requires an explicit allocation method; never infer physical composition from
input proportions alone. Unknown attribution remains unknown and cannot become an approved origin claim.
<!-- /requirement:PRD-48-02 -->
