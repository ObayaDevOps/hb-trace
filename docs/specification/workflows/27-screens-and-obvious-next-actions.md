# Screens and obvious next actions

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Screens and obvious next actions](../../mobile-first-workflow-ui-plan.md#screens-and-obvious-next-actions)

<a id="wf-27-01"></a>
<!-- requirement:WF-27-01 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Sign in | Approved sign-in and account recovery. | **Sign in** |
<!-- /requirement:WF-27-01 -->

<a id="wf-27-02"></a>
<!-- requirement:WF-27-02 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Find farmer | Search accessible records; review matches. | **Choose farmer** or **Add farmer** |
<!-- /requirement:WF-27-02 -->

<a id="wf-27-03"></a>
<!-- requirement:WF-27-03 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Quick registration | Farmer, source apiary, then review. | **Continue**, then **Save and record collection** |
<!-- /requirement:WF-27-03 -->

<a id="wf-27-04"></a>
<!-- requirement:WF-27-04 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Farmer/apiary details | View source and add optional details in small sections. | **Record collection** |
<!-- /requirement:WF-27-04 -->

<a id="wf-27-05"></a>
<!-- requirement:WF-27-05 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Collection | Source, dates, measurements, price/payment, buckets, review. | **Save collection** |
<!-- /requirement:WF-27-05 -->

<a id="wf-27-06"></a>
<!-- requirement:WF-27-06 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Collection saved | Large bucket codes and receipt/confirmation. | **Show labels**, then **Show receipt** |
<!-- /requirement:WF-27-06 -->

<a id="wf-27-07"></a>
<!-- requirement:WF-27-07 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Receive bucket | Record arrival even when source is unavailable. | **Save arrival** |
<!-- /requirement:WF-27-07 -->

<a id="wf-27-08"></a>
<!-- requirement:WF-27-08 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Stock item | Quantity, location, independent source/quality states and history. | The next permitted action: **Review source**, **Record checks** or **Start processing** |
<!-- /requirement:WF-27-08 -->

<a id="wf-27-09"></a>
<!-- requirement:WF-27-09 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Source review | Supervisor resolves mismatches with supporting evidence. | **Confirm resolution** |
<!-- /requirement:WF-27-09 -->

<a id="wf-27-10"></a>
<!-- requirement:WF-27-10 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Quality review | Manager reviews checks and records a disposition. | **Record decision** |
<!-- /requirement:WF-27-10 -->

<a id="wf-27-11"></a>
<!-- requirement:WF-27-11 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Process honey | Select quantities and record outputs/losses. | **Review processing**, then **Confirm** |
<!-- /requirement:WF-27-11 -->

<a id="wf-27-12"></a>
<!-- requirement:WF-27-12 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Bottle honey | Released inputs, package size, units, quantity and date. | **Review bottling**, then **Confirm** |
<!-- /requirement:WF-27-12 -->

<a id="wf-27-13"></a>
<!-- requirement:WF-27-13 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Review a problem | Quality manager traces impact, retests and records action. | **Review affected batches**, then the appropriate authorized decision |
<!-- /requirement:WF-27-13 -->

<a id="wf-27-14"></a>
<!-- requirement:WF-27-14 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Public-page review | Preview approved facts and permitted story; verify packaging/publication readiness. | **Approve and publish**, when authorized |
<!-- /requirement:WF-27-14 -->

<a id="wf-27-15"></a>
<!-- requirement:WF-27-15 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| My work / Account | Own records, drafts, attention items and history; profile and sign-out. | **Continue** or **Review** on the selected item |
<!-- /requirement:WF-27-15 -->

<a id="wf-27-16"></a>
<!-- requirement:WF-27-16 -->
| Screen | Purpose | Primary next action |
| --- | --- | --- |
| Customer lookup | Batch code, approved sources and story. | **Find batch** |
<!-- /requirement:WF-27-16 -->

<a id="wf-27-17"></a>
<!-- requirement:WF-27-17 -->
Each wizard uses short screens, progress, a back action, a visible save/resume
option and one primary button. Use large touch targets, readable type, high
contrast and input-specific keyboards. Preserve values across navigation and
connection changes. Place errors beside fields and move focus to the first error;
use text as well as color for states. Confirm saves, prevent duplicate submission
and restore the previous step after a supported app restart. Test the exact screen
grouping with field officers.
<!-- /requirement:WF-27-17 -->
