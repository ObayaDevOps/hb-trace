# Agreed decisions

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Agreed decisions](../../mobile-first-workflow-ui-plan.md#agreed-decisions)

<a id="wf-01-01"></a>
<!-- requirement:WF-01-01 -->
| Issue | Settled behavior |
| --- | --- |
| Bucket arrives before its collection syncs | HQ records its code, weight and storage location as **Awaiting source details**. Reconcile with the original collection after sync; block processing until resolved. |
<!-- /requirement:WF-01-01 -->

<a id="wf-01-02"></a>
<!-- requirement:WF-01-02 -->
| Issue | Settled behavior |
| --- | --- |
| When stock becomes visible | Every physical arrival appears in HQ stock immediately, separately identified as awaiting checks, held or released. Only eligible stock can be processed. |
<!-- /requirement:WF-01-02 -->

<a id="wf-01-03"></a>
<!-- requirement:WF-01-03 -->
| Issue | Settled behavior |
| --- | --- |
| Minimum onboarding | Farmer name, phone number or **No phone**, and a named apiary with a location description are sufficient to capture a collection. Other profile details can be added later. |
<!-- /requirement:WF-01-03 -->

<a id="wf-01-04"></a>
<!-- requirement:WF-01-04 -->
| Issue | Settled behavior |
| --- | --- |
| Who fixes offline problems | Officers correct simple errors; supervisors resolve duplicate identities and source conflicts. The app reconnects dependent records while preserving bucket codes and history. |
<!-- /requirement:WF-01-04 -->

<a id="wf-01-05"></a>
<!-- requirement:WF-01-05 -->
| Issue | Settled behavior |
| --- | --- |
| Dates | Collection date is required. Harvest timing is an exact date, an approximate date range, or **Unknown**. Customer-facing labels distinguish these. |
<!-- /requirement:WF-01-05 -->

<a id="wf-01-06"></a>
<!-- requirement:WF-01-06 -->
| Issue | Settled behavior |
| --- | --- |
| Receipt delivery | Company services send SMS and WhatsApp; delivery is separate from farmer agreement. |
<!-- /requirement:WF-01-06 -->

<a id="wf-01-07"></a>
<!-- requirement:WF-01-07 -->
| Issue | Settled behavior |
| --- | --- |
| Wax scope | Track raw wax residue through melting/filtering to labelled finished-wax stock. General sales are outside this revision; recall uses the minimal recipient register defined below. |
<!-- /requirement:WF-01-07 -->

<a id="wf-01-08"></a>
<!-- requirement:WF-01-08 -->
| Issue | Settled behavior |
| --- | --- |
| Infusion sequence | Choose available honey using a dropdown, add another honey batch when needed, and choose one ingredient lot by default. Confirm the infusion, then copy the generated bucket label. Record actual completion and release before bottling. |
<!-- /requirement:WF-01-08 -->

<a id="wf-01-09"></a>
<!-- requirement:WF-01-09 -->
| Issue | Settled behavior |
| --- | --- |
| Infusion checks | Weekly on days 7, 14, 21 and 28 after the start: inspect, stir, check for fermentation and record moisture against the batch. |
<!-- /requirement:WF-01-09 -->

<a id="wf-01-10"></a>
<!-- requirement:WF-01-10 -->
| Issue | Settled behavior |
| --- | --- |
| Ingredients | Purchase lots have internal references, available balances and exact allocations to infusions. |
<!-- /requirement:WF-01-10 -->

<a id="wf-01-11"></a>
<!-- requirement:WF-01-11 -->
| Issue | Settled behavior |
| --- | --- |
| Saved-record changes | Review previous/proposed values and require a change-and-reason note; preserve authorization and immutable-event rules. |
<!-- /requirement:WF-01-11 -->

<a id="wf-01-12"></a>
<!-- requirement:WF-01-12 -->
| Issue | Settled behavior |
| --- | --- |
| Quality problems | The quality manager owns one **Review a problem** workflow for retesting, release, downstream tracing, withdrawal/recall and public-page updates. |
<!-- /requirement:WF-01-12 -->
