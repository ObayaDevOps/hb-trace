# Additional implementation records and boundaries

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Additional implementation records and boundaries](../../mobile-first-workflow-ui-plan.md#additional-implementation-records-and-boundaries)

<a id="wf-30-01"></a>
<!-- requirement:WF-30-01 -->
| Record | Required information and invariants |
| --- | --- |
| Payment profile | Private mobile-money number, registered holder name, same-as-farmer choice and amendment history. A profile is not a payment. |
<!-- /requirement:WF-30-01 -->

<a id="wf-30-02"></a>
<!-- requirement:WF-30-02 -->
| Record | Required information and invariants |
| --- | --- |
| Receipt delivery request/attempt | Receipt identity/revision, channel, destination and farmer approval, status, provider evidence, retry identity and timestamps. Farmer agreement is separate. |
<!-- /requirement:WF-30-02 -->

<a id="wf-30-03"></a>
<!-- requirement:WF-30-03 -->
| Record | Required information and invariants |
| --- | --- |
| Amendment | Previous/proposed values, change/reason, author, event/commit time, expected version and link to original event where required. |
<!-- /requirement:WF-30-03 -->

<a id="wf-30-04"></a>
<!-- requirement:WF-30-04 -->
| Record | Required information and invariants |
| --- | --- |
| Ingredient purchase lot | Internal reference, ingredient, seller, date, original quantity/unit, normalized mass, optional supplier batch/evidence, quality and ledger-derived available balance. |
<!-- /requirement:WF-30-04 -->

<a id="wf-30-05"></a>
<!-- requirement:WF-30-05 -->
| Record | Required information and invariants |
| --- | --- |
| Infusion | Honey/ingredient allocations, actual start/completion, operator/facility, container/location history, day-7/14/21/28 check schedule and immutable inspection/moisture records, per-ingredient fate, product/retained outputs/waste/loss, evidence and release. |
<!-- /requirement:WF-30-05 -->

<a id="wf-30-06"></a>
<!-- requirement:WF-30-06 -->
| Record | Required information and invariants |
| --- | --- |
| Wax transformation | Existing material lots/containers and input/output edges for raw residue, finished wax and retained outputs; exact allocations, locations, quantity balance and quality. |
<!-- /requirement:WF-30-06 -->

<a id="wf-30-07"></a>
<!-- requirement:WF-30-07 -->
| Record | Required information and invariants |
| --- | --- |
| Bottled/public batch | Distinct infused product identity, full honey/ingredient ancestry, packaging release, approved ingredient descriptions and privacy-safe publication revision. |
<!-- /requirement:WF-30-07 -->

<a id="wf-30-08"></a>
<!-- requirement:WF-30-08 -->
Review migrations, commands and adapters separately before operational integration.
Use existing material lineage and ledger abstractions for wax; extend material and
product definitions for ingredients and infused outputs explicitly. Do not pretend
the current honey-only model already represents ingredient lineage. All stock
allocations, quantity arithmetic, authorization, amendments, release and publication
remain server concerns, with atomic commits and idempotent retry. Live company
messaging, providers and durable backend integration are separate work. Local mode
continues without Supabase or messaging credentials.
<!-- /requirement:WF-30-08 -->
