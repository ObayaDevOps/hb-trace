# Simple display, separate underlying states

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Simple display, separate underlying states](../../mobile-first-workflow-ui-plan.md#simple-display-separate-underlying-states)

<a id="wf-14-01"></a>
<!-- requirement:WF-14-01 -->
Each bucket appears once in the stock list, with its quantity, location and
plain-language badges. Keep source reconciliation, quality disposition and
material availability separate internally.
<!-- /requirement:WF-14-01 -->

<a id="wf-14-02"></a>
<!-- requirement:WF-14-02 -->
| State shown | Meaning and next action |
| --- | --- |
| Awaiting source details | Physically at HQ; source is not yet resolved. **Review source**. No processing, bottling or publication. |
<!-- /requirement:WF-14-02 -->

<a id="wf-14-03"></a>
<!-- requirement:WF-14-03 -->
| State shown | Meaning and next action |
| --- | --- |
| Awaiting checks | Required quality checks or a decision are outstanding. **Record checks** or **Review checks**, according to role. |
<!-- /requirement:WF-14-03 -->

<a id="wf-14-04"></a>
<!-- requirement:WF-14-04 -->
| State shown | Meaning and next action |
| --- | --- |
| Held | A quality restriction is active. **Review a problem** for the quality manager. |
<!-- /requirement:WF-14-04 -->

<a id="wf-14-05"></a>
<!-- requirement:WF-14-05 -->
| State shown | Meaning and next action |
| --- | --- |
| Released for next step | Source is resolved and the required quality decision permits the next production step. **Start processing** when quantity is available. |
<!-- /requirement:WF-14-05 -->

<a id="wf-14-06"></a>
<!-- requirement:WF-14-06 -->
| State shown | Meaning and next action |
| --- | --- |
| Rejected or recalled | Material remains accounted for and unavailable. Follow the quality manager's recorded disposition. |
<!-- /requirement:WF-14-06 -->

<a id="wf-14-07"></a>
<!-- requirement:WF-14-07 -->
A bucket may be both awaiting source details and held. Show both facts, with the
next blocking action prominent. Stock totals count each physical quantity once;
filters may overlap and must not be summed as independent quantities. Release
changes eligibility, not the amount received. Returns, discards, transfers and
processing outputs require recorded movements.
<!-- /requirement:WF-14-07 -->

<a id="wf-14-08"></a>
<!-- requirement:WF-14-08 -->
Receiving, reconciliation, stock allocation and quality decisions require an
online, authorized server action. If HQ is offline, retain the open form and
explain that the action cannot yet be completed; a draft is not confirmed stock.
This preserves V1's restricted field-offline scope.
<!-- /requirement:WF-14-08 -->
