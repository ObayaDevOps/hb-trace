# Acceptance scenarios

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Acceptance scenarios](../../mobile-first-workflow-ui-plan.md#acceptance-scenarios)

<a id="wf-31-01"></a>
<!-- requirement:WF-31-01 -->
| Scenario | Required result |
| --- | --- |
| Mobile money holder | Same as farmer and a different actual holder both work; missing holder blocks a supplied payment number; details remain private. |
<!-- /requirement:WF-31-01 -->

<a id="wf-31-02"></a>
<!-- requirement:WF-31-02 -->
| Scenario | Required result |
| --- | --- |
| Units at 320 px and 390 px | Every kg stays inside its own input and aligns right, including bucket grids. |
<!-- /requirement:WF-31-02 -->

<a id="wf-31-03"></a>
<!-- requirement:WF-31-03 -->
| Scenario | Required result |
| --- | --- |
| Digital receipt and retry | Contact number is the default; approved alternative works; waiting, queued, sent, failed and supported delivery-confirmed states retain one receipt and attempt history. Delivery never changes agreement. |
<!-- /requirement:WF-31-03 -->

<a id="wf-31-04"></a>
<!-- requirement:WF-31-04 -->
| Scenario | Required result |
| --- | --- |
| Saved change review | Previous/proposed values and a reason are required; cancellation restores originals; first-save drafts need no reason; committed events retain authorized amendment rules. |
<!-- /requirement:WF-31-04 -->

<a id="wf-31-05"></a>
<!-- requirement:WF-31-05 -->
| Scenario | Required result |
| --- | --- |
| Wax transformation | Store labelled raw residue, use partial quantities from multiple sources, reject over-allocation or unaccounted outputs, retain finished and separate material stock with source history. |
<!-- /requirement:WF-31-05 -->

<a id="wf-31-06"></a>
<!-- requirement:WF-31-06 -->
| Scenario | Required result |
| --- | --- |
| Ingredient and infusion | Purchases with/without supplier batch retain internal references; partial use, multiple ingredients and unused balances work; insufficient stock is blocked. |
<!-- /requirement:WF-31-06 -->

<a id="wf-31-07"></a>
<!-- requirement:WF-31-07 -->
| Scenario | Required result |
| --- | --- |
| Infusion selection and bucket label | Start with one honey dropdown; add/remove extra batches without hidden allocations. Default to one ingredient dropdown. After confirmation show the saved honey/ingredient/date label and stable references for staff to write on the bucket. |
<!-- /requirement:WF-31-07 -->

<a id="wf-31-08"></a>
<!-- requirement:WF-31-08 -->
| Scenario | Required result |
| --- | --- |
| Weekly infusion checks | Schedule days 7, 14, 21 and 28 from the actual start, including across month/year boundaries. Save inspection, stirring, fermentation, moisture, instrument, operator and actual time against the batch. Missing due checks and unresolved concerns prevent release; retries preserve the original evidence. |
<!-- /requirement:WF-31-08 -->

<a id="wf-31-09"></a>
<!-- requirement:WF-31-09 -->
| Scenario | Required result |
| --- | --- |
| Infusion completion and bottling | Actual completion and accounted outputs are required; removed ingredients stay in lineage and disclosure; bottling requires applicable release. |
<!-- /requirement:WF-31-09 -->

<a id="wf-31-10"></a>
<!-- requirement:WF-31-10 -->
| Scenario | Required result |
| --- | --- |
| Backward and forward tracing | Jar batch reaches every honey/ingredient input; an ingredient problem reaches all affected infusions and bottled batches. |
<!-- /requirement:WF-31-10 -->

<a id="wf-31-11"></a>
<!-- requirement:WF-31-11 -->
| Scenario | Required result |
| --- | --- |
| Infused public page | Correct product identity, approved honey story/forage/dates and actual ingredients; no seller, invoice, purchase/payment or private staff details. |
<!-- /requirement:WF-31-11 -->

<a id="wf-31-12"></a>
<!-- requirement:WF-31-12 -->
| Scenario | Required result |
| --- | --- |
| First collection with minimal details | Name, phone or No phone, apiary name and location description permit capture. Missing GPS, ID, payment profile, photo, story, forage, hives, yield and equipment do not block it. |
<!-- /requirement:WF-31-12 -->

<a id="wf-31-13"></a>
<!-- requirement:WF-31-13 -->
| Scenario | Required result |
| --- | --- |
| Returning farmer | Choose an existing farmer and apiary, or add another apiary, then proceed directly to collection without re-entering the profile. |
<!-- /requirement:WF-31-13 -->

<a id="wf-31-14"></a>
<!-- requirement:WF-31-14 -->
| Scenario | Required result |
| --- | --- |
| Incomplete minimum registration | Save a draft, resume from My work and identify the missing required field before collection. |
<!-- /requirement:WF-31-14 -->

<a id="wf-31-15"></a>
<!-- requirement:WF-31-15 -->
| Scenario | Required result |
| --- | --- |
| Exact, approximate and unknown harvest dates | Collection date is always retained; customer labels accurately reflect the chosen harvest precision, including a blend with mixed precision. |
<!-- /requirement:WF-31-15 -->

<a id="wf-31-16"></a>
<!-- requirement:WF-31-16 -->
| Scenario | Required result |
| --- | --- |
| One collection, several buckets | Each bucket has its own code and weight; quantities reconcile to the transaction. Label reprints and retries retain the original identities. |
<!-- /requirement:WF-31-16 -->

<a id="wf-31-17"></a>
<!-- requirement:WF-31-17 -->
| Scenario | Required result |
| --- | --- |
| Bucket reaches HQ before field sync | Arrival appears once in HQ stock with code, weight and location; it cannot be processed. Later sync links the original collection without double-counting or clearing a quality hold. |
<!-- /requirement:WF-31-17 -->

<a id="wf-31-18"></a>
<!-- requirement:WF-31-18 -->
| Scenario | Required result |
| --- | --- |
| Wrong or ambiguous bucket code | Preserve the arrival and route it for review; never infer a source or release it merely because a possible match appears. |
<!-- /requirement:WF-31-18 -->

<a id="wf-31-19"></a>
<!-- requirement:WF-31-19 -->
| Scenario | Required result |
| --- | --- |
| Quality checks pending or failed | All received stock remains visible. Awaiting, held, rejected and recalled material stays unavailable under the applicable rules. |
<!-- /requirement:WF-31-19 -->

<a id="wf-31-20"></a>
<!-- requirement:WF-31-20 -->
| Scenario | Required result |
| --- | --- |
| Farmer correction with dependent records | A simple error is fixed by the officer; identity/source conflicts require the supervisor. Apiary, collection, receipt and bucket references recover together with no duplicate transaction or broken HQ link. |
<!-- /requirement:WF-31-20 -->

<a id="wf-31-21"></a>
<!-- requirement:WF-31-21 -->
| Scenario | Required result |
| --- | --- |
| Late rejection after an uncertain response | Determine the original operation result and preserve at-most-once effects; never create a replacement purchase when the first one already committed. |
<!-- /requirement:WF-31-21 -->

<a id="wf-31-22"></a>
<!-- requirement:WF-31-22 -->
| Scenario | Required result |
| --- | --- |
| Retest of held honey | Keep both results and the review history; only the quality manager's valid decision permits the next step, with other blockers preserved. |
<!-- /requirement:WF-31-22 -->

<a id="wf-31-23"></a>
<!-- requirement:WF-31-23 -->
| Scenario | Required result |
| --- | --- |
| Problem discovered after bottling | Identify every affected source/derived lot, packaged batch and publication; record authorized restrictions, withdrawal/recall response and follow-up actions. |
<!-- /requirement:WF-31-23 -->

<a id="wf-31-24"></a>
<!-- requirement:WF-31-24 -->
| Scenario | Required result |
| --- | --- |
| Blending and partial use | Trace direct allocations, qualified upstream attribution and remaining quantities; concurrent operations cannot over-allocate material. |
<!-- /requirement:WF-31-24 -->

<a id="wf-31-25"></a>
<!-- requirement:WF-31-25 -->
| Scenario | Required result |
| --- | --- |
| Photo declined or upload delayed | Collection can continue; public output contains only permitted, approved content. Photo progress remains visible separately. |
<!-- /requirement:WF-31-25 -->

<a id="wf-31-26"></a>
<!-- requirement:WF-31-26 -->
| Scenario | Required result |
| --- | --- |
| Connection loss, expiry or device restart | Durably saved supported work remains resumable; sign-in recovery, storage limits and account switching do not silently lose or expose it. |
<!-- /requirement:WF-31-26 -->

<a id="wf-31-27"></a>
<!-- requirement:WF-31-27 -->
| Scenario | Required result |
| --- | --- |
| Public lookup and withdrawal | The other website shows the correct current approved response; exact GPS, contact, payment and identity details stay private. |
<!-- /requirement:WF-31-27 -->

<a id="wf-31-28"></a>
<!-- requirement:WF-31-28 -->
| Scenario | Required result |
| --- | --- |
| Non-technical user test | Representative staff complete each role's tasks on supported phones without developer assistance. Set measurable time/success targets from the observed baseline. |
<!-- /requirement:WF-31-28 -->
