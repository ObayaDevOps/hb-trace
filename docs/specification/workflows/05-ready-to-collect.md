# Ready to collect

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Ready to collect](../../mobile-first-workflow-ui-plan.md#ready-to-collect)

<a id="wf-05-01"></a>
<!-- requirement:WF-05-01 -->
Registration has three short steps:
<!-- /requirement:WF-05-01 -->

<a id="wf-05-02"></a>
<!-- requirement:WF-05-02 -->
1. **Farmer:** enter name and either a phone number or an explicit **No phone**.
<!-- /requirement:WF-05-02 -->

<a id="wf-05-03"></a>
<!-- requirement:WF-05-03 -->
2. **Apiary:** enter its name and a location description, linked to this farmer.
<!-- /requirement:WF-05-03 -->

<a id="wf-05-04"></a>
<!-- requirement:WF-05-04 -->
3. **Review:** confirm the farmer and apiary, then **Save and record collection**
   or **Save and finish**.
<!-- /requirement:WF-05-04 -->

<a id="wf-05-05"></a>
<!-- requirement:WF-05-05 -->
These fields are the minimum for field capture. Missing optional profile details
do not block a collection. An incomplete minimum registration stays a resumable
draft and identifies the missing field. Local readiness permits offline capture;
it does not imply server acceptance, completed source reconciliation or quality
release.
<!-- /requirement:WF-05-05 -->

<a id="wf-05-06"></a>
<!-- requirement:WF-05-06 -->
```mermaid
flowchart TD
    A[Add a farmer or find a source] --> B[Search name or phone]
    B --> C{Existing farmer?}
    C -->|Yes| D[Confirm farmer and required details]
    C -->|No| E[Enter name and phone or No phone]
    D --> F{Existing apiary?}
    F -->|Yes| G[Select and confirm name and location description]
    F -->|No| H[Enter apiary name and location description]
    E --> H
    G --> I[Review minimum registration]
    H --> I
    I --> J[Save and show local or synced status]
    J --> K{Next action}
    K -->|Collect now| L[Record honey collection]
    K -->|Add more details| M[Optional farmer and apiary profile]
    K -->|Later| N[Return home]
```
<!-- /requirement:WF-05-06 -->

<a id="wf-05-07"></a>
<!-- requirement:WF-05-07 -->
Search only authorized records. Offline, say **Searching records on this device**.
A possible duplicate requires a deliberate choice; uncertain matches go to the
supervisor. Preserve any linked field drafts while that review is pending.
<!-- /requirement:WF-05-07 -->
