# One problem, one guided resolution

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — One problem, one guided resolution](../../mobile-first-workflow-ui-plan.md#one-problem-one-guided-resolution)

<a id="wf-23-01"></a>
<!-- requirement:WF-23-01 -->
Show a single attention card for the affected farmer, apiary and collection
chain. Explain the error and the records waiting behind it, without requiring
the officer to understand command IDs or dependency graphs.
<!-- /requirement:WF-23-01 -->

<a id="wf-23-02"></a>
<!-- requirement:WF-23-02 -->
- **Officer:** corrects straightforward missing/invalid fields on their own
  uncommitted records, such as a malformed phone number. Changes to identity,
  source attribution or committed financial/material facts are not simple edits.
<!-- /requirement:WF-23-02 -->

<a id="wf-23-03"></a>
<!-- requirement:WF-23-03 -->
- **Supervisor:** resolves duplicate identities and source conflicts, chooses an
  existing record or confirms a distinct one, and records the reason. No fuzzy
  name match automatically merges people or reassigns honey.
<!-- /requirement:WF-23-03 -->

<a id="wf-23-04"></a>
<!-- requirement:WF-23-04 -->
- **Quality manager:** continues to own quality disposition. A supervisor's source
  correction does not confer authority to release held honey.
<!-- /requirement:WF-23-04 -->

<a id="wf-23-05"></a>
<!-- requirement:WF-23-05 -->
Behind the UI, preserve original commands and their results. A temporary retry
uses the same operation identity and immutable envelope. A correction to a
rejected/conflicted command uses a new linked operation; sent commands are never
rewritten in place to change their dependencies or bypass a rejection.
<!-- /requirement:WF-23-05 -->

<a id="wf-23-06"></a>
<!-- requirement:WF-23-06 -->
Resolve the affected chain in order. Rebind never-sent dependent drafts to the
approved replacement; for already-sent dependants, issue linked replacement
operations where needed. Preserve collection and bucket identities, quantities
and labels. If a duplicate farmer or apiary is matched to an existing record,
retain the rejected draft's identity and history with an explicit resolution
mapping to the canonical record. Committed records need authorized amendments,
not blind replay.
The server enforces at-most-once effects for these records across correction and
retry, verifies ownership, and reconciles any waiting HQ arrival without creating
another purchase or another stock receipt.
<!-- /requirement:WF-23-06 -->

<a id="wf-23-07"></a>
<!-- requirement:WF-23-07 -->
Example: an officer registers a farmer, adds an apiary and labels a collection
offline. The farmer record is rejected on sync. The app offers one correction;
after it is approved, it reconnects the apiary and collection and then resolves
HQ's waiting arrival. The same bucket code remains on the physical honey.
<!-- /requirement:WF-23-07 -->
