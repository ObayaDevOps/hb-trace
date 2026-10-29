# Editing a saved record

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Editing a saved record](../../mobile-first-workflow-ui-plan.md#editing-a-saved-record)

<a id="wf-22-01"></a>
<!-- requirement:WF-22-01 -->
Show **Previous** and **Proposed** values and require a note explaining **what
changed and why** before saving a change to a saved record. Retain the original
values, author, occurrence time, server commit time and reason. Cancel restores
the saved values; ordinary editing before the first save requires no explanation.
Saved drafts also retain their prior values when corrected. Version checks and
permissions remain server enforced.
<!-- /requirement:WF-22-01 -->

<a id="wf-22-02"></a>
<!-- requirement:WF-22-02 -->
A reason is evidence, not authority. Committed quantities, financial events,
source allocations and quality decisions keep their existing linked reversal,
amendment or authorized decision workflows. Do not turn them into editable forms.
The reference demonstrates this review on saved profile sections, receipt response
and officer correction; it does not provide a live amendment API.
<!-- /requirement:WF-22-02 -->
