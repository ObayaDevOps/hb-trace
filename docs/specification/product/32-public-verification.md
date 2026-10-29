# Public verification

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Public verification](../../../HB-TRACE-V1-PLAN.md#public-verification)

<a id="prd-32-01"></a>
<!-- requirement:PRD-32-01 -->
- Use a non-sequential public code mapped to the permanent internal batch ID.
<!-- /requirement:PRD-32-01 -->

<a id="prd-32-02"></a>
<!-- requirement:PRD-32-02 -->
- Publish only released batches through an explicit quality-manager approval.
<!-- /requirement:PRD-32-02 -->

<a id="prd-32-03"></a>
<!-- requirement:PRD-32-03 -->
- On approval, create an immutable, denormalized `PublicationRevision` containing only whitelisted factual fields,
  generalized location, approved claim summaries and a copy of approved consumer-facing editorial fields plus their
  source document/revision and asset references. The public endpoint reads this projection rather than joining
  private operational tables or querying mutable editorial records at request time.
<!-- /requirement:PRD-32-03 -->

<a id="prd-32-04"></a>
<!-- requirement:PRD-32-04 -->
- Make current status and any approved recall action prominent before story content. Its V1 structure is:
  1. current batch status, required customer action, batch/lot code and packaging summary;
  2. an easy-to-understand farmer-to-jar timeline of approved production stages;
  3. an approximate map and privacy-safe farmer/apiary/region summary;
  4. approved public claims with plain-language evidence summaries;
  5. expandable batch facts and relevant quality/process information; and
  6. optional approved project/story sections, Humble Beeing links and sharing controls.
<!-- /requirement:PRD-32-04 -->

<a id="prd-32-05"></a>
<!-- requirement:PRD-32-05 -->
- Generate factual stages, dates and relationships from approved traceability data when constructing the revision.
  Resolve an exact approved editorial revision rather than displaying mutable draft content. Allow editorial titles,
  descriptions, images and calls to action only through their separate approved content records.
<!-- /requirement:PRD-32-05 -->

<a id="prd-32-06"></a>
<!-- requirement:PRD-32-06 -->
- Show whether a claim is current, the batch it applies to and an understandable description of its support.
  Never expose private evidence merely to make a claim appear stronger.
<!-- /requirement:PRD-32-06 -->

<a id="prd-32-07"></a>
<!-- requirement:PRD-32-07 -->
- Aggregate or generalize farmer/apiary locations and identities according to consent and publication policy.
  A public profile is opt-in and can use an approved pseudonym; internal farmer data remains unchanged.
<!-- /requirement:PRD-32-07 -->

<a id="prd-32-08"></a>
<!-- requirement:PRD-32-08 -->
- Retain legacy batch links when identifiers or page designs change.
<!-- /requirement:PRD-32-08 -->

<a id="prd-32-09"></a>
<!-- requirement:PRD-32-09 -->
- Rate-limit lookup endpoints and provide a privacy-safe distinct responses for unknown, unavailable, withdrawn and recalled codes without exposing
  internal identifiers.
<!-- /requirement:PRD-32-09 -->

<a id="prd-32-10"></a>
<!-- requirement:PRD-32-10 -->
- Maintain every publication revision privately so an auditor can determine exactly what information was public at
  a given time. A withdrawal or recall changes the active public response without deleting publication history.
<!-- /requirement:PRD-32-10 -->

<a id="prd-32-11"></a>
<!-- requirement:PRD-32-11 -->
- V1 QR codes identify a batch/lot, not an individually serialized jar. User interfaces and marketing copy must say
  **batch code** or **lot code** and must not promise a unique jar identity.
<!-- /requirement:PRD-32-11 -->
