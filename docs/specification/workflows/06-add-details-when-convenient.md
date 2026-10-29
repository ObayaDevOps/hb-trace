# Add details when convenient

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Add details when convenient](../../mobile-first-workflow-ui-plan.md#add-details-when-convenient)

<a id="wf-06-01"></a>
<!-- requirement:WF-06-01 -->
From a saved farmer or apiary, show **Add more details** with small, independent
sections. Each has **Save** and **Do this later**. Completion is separate from
readiness to collect and from synchronization status.
<!-- /requirement:WF-06-01 -->

<a id="wf-06-02"></a>
<!-- requirement:WF-06-02 -->
| Section | Fields and behavior |
| --- | --- |
| Farmer identity | National identifier, using the correct locally agreed label and format. The original request called this a national insurance number; confirm which identifier is intended. It is optional for collection and private. |
<!-- /requirement:WF-06-02 -->

<a id="wf-06-03"></a>
<!-- requirement:WF-06-03 -->
| Section | Fields and behavior |
| --- | --- |
| Contact and payment | Phone updates, mobile money number, and **Same as phone** when a phone exists. When a payment number is provided, **Registered account holder’s name** is required; choose **Same as farmer** or enter the actual holder. These profile fields are optional for collection; an actual payment still needs its appropriate transaction record. |
<!-- /requirement:WF-06-03 -->

<a id="wf-06-04"></a>
<!-- requirement:WF-06-04 -->
| Section | Fields and behavior |
| --- | --- |
| Photo | Take or select a photo, preview it and save. Show upload progress separately from the farmer record's sync status. |
<!-- /requirement:WF-06-04 -->

<a id="wf-06-05"></a>
<!-- requirement:WF-06-05 -->
| Section | Fields and behavior |
| --- | --- |
| Story and notes | Private operational notes and a separate public-story draft, such as a farmer's beekeeping experience. Private notes are never automatically published. |
<!-- /requirement:WF-06-05 -->

<a id="wf-06-06"></a>
<!-- requirement:WF-06-06 -->
| Section | Fields and behavior |
| --- | --- |
| Sharing choices | Record the farmer's choices for public photo, story and location information. Declining public sharing does not block registration or collection. Publication still needs permission and approval. |
<!-- /requirement:WF-06-06 -->

<a id="wf-06-07"></a>
<!-- requirement:WF-06-07 -->
| Section | Fields and behavior |
| --- | --- |
| Apiary position | GPS coordinates and a location description. Offer **Use my location** at the apiary, or manual entry. Confirm the position and retain accuracy/source information where available. |
<!-- /requirement:WF-06-07 -->

<a id="wf-06-08"></a>
<!-- requirement:WF-06-08 -->
| Section | Fields and behavior |
| --- | --- |
| Forage | Multiple choices such as shea or coffee, **Other**, and notes. Unknown is allowed. |
<!-- /requirement:WF-06-08 -->

<a id="wf-06-09"></a>
<!-- requirement:WF-06-09 -->
| Section | Fields and behavior |
| --- | --- |
| Hives | Counts by hive type, allowing multiple types at one apiary. Unknown counts stay unknown, not zero. |
<!-- /requirement:WF-06-09 -->

<a id="wf-06-10"></a>
<!-- requirement:WF-06-10 -->
| Section | Fields and behavior |
| --- | --- |
| Expected harvest | Estimated available honey in kg with an expected season or period and the date the estimate was recorded. This is planning information, not actual stock or a recorded harvest. |
<!-- /requirement:WF-06-10 -->

<a id="wf-06-11"></a>
<!-- requirement:WF-06-11 -->
| Section | Fields and behavior |
| --- | --- |
| Equipment | Bee suits, hive tools, bee brushes and other equipment; record available items and optional quantities/notes. |
<!-- /requirement:WF-06-11 -->

<a id="wf-06-12"></a>
<!-- requirement:WF-06-12 -->
Location permission, a missing photo or an incomplete story must not interrupt
quick registration. Record actual harvest timing on each collection, separately
from the apiary's expected yield.
<!-- /requirement:WF-06-12 -->
