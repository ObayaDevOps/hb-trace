# Navigation and home

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Navigation and home](../../mobile-first-workflow-ui-plan.md#navigation-and-home)

<a id="wf-26-01"></a>
<!-- requirement:WF-26-01 -->
Bottom navigation: **Home**, **Find**, **My work**. Account and help are in the
header. Home prioritizes an unfinished task or actionable problem when present;
otherwise it offers **Add a farmer** and **Record honey collection**. Role-specific
HQ home screens prioritize receiving, production or quality queues. Administration,
imports, controlled documents and advanced trace reports remain in a secondary
menu for permitted users.
<!-- /requirement:WF-26-01 -->

<a id="wf-26-02"></a>
<!-- requirement:WF-26-02 -->
```text
FIELD HOME                                  [Account]
Good morning, Amina
2 collections saved on this device           [View]

Continue registration for Grace              [Continue]
[ Record honey collection ]
[ Add a farmer ]

My work needing attention: 1                 [Review]
Home                     Find                 My work
```
<!-- /requirement:WF-26-02 -->

<a id="wf-26-03"></a>
<!-- requirement:WF-26-03 -->
```text
QUICK REGISTRATION                      Step 2 of 3
Apiary for Grace A.

Apiary name *                 [___________________]
Location description *        [___________________]
Example: Near the school, along the northern path

GPS, forage, hives and equipment can be added later.

[Back]                                  [Review]
Save and finish later
```
<!-- /requirement:WF-26-03 -->

<a id="wf-26-04"></a>
<!-- requirement:WF-26-04 -->
```text
HQ RECEIVING
Bucket code                   [___________________]
Source record has not synced yet.

Received net weight *         [________] kg
Storage location *            [Choose            v]
Condition                     [Choose            v]

This bucket will appear in stock as Awaiting source
details. Processing stays blocked until resolved.

[ Save arrival ]
```
<!-- /requirement:WF-26-04 -->
