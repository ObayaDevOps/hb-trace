# 7. Poor connection and guided correction

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — 7. Poor connection and guided correction](../../mobile-first-workflow-ui-plan.md#7-poor-connection-and-guided-correction)

<a id="wf-21-01"></a>
<!-- requirement:WF-21-01 -->
Online sign-in prepares an authorized offline session. Before a field trip, make
the app and minimum permitted reference records available on the device. Field
capture uses the approved V1 offline commands; HQ, privileged quality and
publication actions require an online server decision.
<!-- /requirement:WF-21-01 -->

<a id="wf-21-02"></a>
<!-- requirement:WF-21-02 -->
```mermaid
flowchart TD
    A[Complete a supported field step] --> B{Saved durably on device?}
    B -->|No| C[Keep form open; explain save failure]
    B -->|Yes| D[Saved on this device]
    D --> E{Connection and valid session available?}
    E -->|No| F[Retain work; reconnect or sign in when possible]
    F --> E
    E -->|Yes| G[Sync prerequisites and dependent records in order]
    G --> H{Result}
    H -->|Accepted| I[Synced]
    H -->|Temporary failure| F
    H -->|Simple correction| J[Officer reviews and fixes the highlighted error]
    H -->|Identity or source conflict| K[Supervisor reviews related records]
    J --> L[Preserve originals and prepare linked corrections]
    K --> L
    L --> M[Reconnect dependent records and retry safely]
    M --> G
```
<!-- /requirement:WF-21-02 -->
