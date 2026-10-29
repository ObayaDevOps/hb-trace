# Accepted integrity and usability refinement — 2026-10-28

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Accepted integrity and usability refinement — 2026-10-28](../../mobile-first-workflow-ui-plan.md#accepted-integrity-and-usability-refinement--2026-10-28)

<a id="wf-33-01"></a>
<!-- requirement:WF-33-01 -->
The revised V1 proof requirements and [technical specification](../../architecture-technical-spec.md) govern implementation.
Supabase Storage supplies private evidence and approved public images; PostgreSQL owns editorial revisions.
<!-- /requirement:WF-33-01 -->

<a id="wf-33-02"></a>
<!-- requirement:WF-33-02 -->
- Scanning or typing a bucket code shows material, source and expected quantity for confirmation. Distinguish the
  reusable container from its current contents. Provide guided transfer, empty/refill and label-replacement tasks;
  refilling assigns the new contents reference and never silently retains the old provenance.
<!-- /requirement:WF-33-02 -->

<a id="wf-33-03"></a>
<!-- requirement:WF-33-03 -->
- Add a stock-count task showing recorded/observed weight, discrepancy and next reviewer. Unknown-origin stock
  stays visible but blocked. Explain calculated source attribution and its assumptions in trace reports.
<!-- /requirement:WF-33-03 -->

<a id="wf-33-04"></a>
<!-- requirement:WF-33-04 -->
- Paper-first entry includes the form reference and critical-field review. A mismatch shows one reconciliation
  task, owner and blocked next steps. During HQ outages show the approved numbered-paper procedure or stop-work
  instruction; resumed work stays blocked until online reconciliation.
<!-- /requirement:WF-33-04 -->

<a id="wf-33-05"></a>
<!-- requirement:WF-33-05 -->
- **Correct this record** shows previous/proposed values, a short reason choice with detail where necessary,
  affected downstream records and the required approver. Prevent simple reversal after downstream consumption.
  Routine corrections should not require users to understand ledger or synchronization internals.
<!-- /requirement:WF-33-05 -->

<a id="wf-33-06"></a>
<!-- requirement:WF-33-06 -->
- Add a minimal dispatch/recipient entry or link to the designated controlled external register. The recall screen
  shows quantities held, distributed, recovered, disposed of and outstanding, recipient follow-ups and owners.
  This is a recall capability; general sales remains deferred.
<!-- /requirement:WF-33-06 -->

<a id="wf-33-07"></a>
<!-- requirement:WF-33-07 -->
- Public status and approved recall instructions precede stories. Unknown, unavailable, withdrawn and recalled
  have distinct messages. Show a last-checked time without implying cached approval is current.
<!-- /requirement:WF-33-07 -->

<a id="wf-33-08"></a>
<!-- requirement:WF-33-08 -->
- Every blocked task states what happened, whether work is saved, the next action and who owns escalation.
  Distinguish text synchronization from photo upload and quality release. Provide a named quality deputy route.
<!-- /requirement:WF-33-08 -->

<a id="wf-33-09"></a>
<!-- requirement:WF-33-09 -->
- Observe every role on actual phones in the working language, including mistakes and recovery. Use the revised
  V1 provisional timing/success targets, record observed results and confirm thresholds before rollout. All critical
  save/hold/release meanings must be understood. No UI mockup alone closes an operational acceptance gate.
<!-- /requirement:WF-33-09 -->

<a id="wf-33-10"></a>
<!-- requirement:WF-33-10 -->
Sales exclusions earlier in this document do not exclude the minimal recall recipient register specified here.
<!-- /requirement:WF-33-10 -->
