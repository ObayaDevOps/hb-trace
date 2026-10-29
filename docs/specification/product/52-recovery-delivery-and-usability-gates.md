# Recovery, delivery and usability gates

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Recovery, delivery and usability gates](../../../HB-TRACE-V1-PLAN.md#recovery-delivery-and-usability-gates)

<a id="prd-52-01"></a>
<!-- requirement:PRD-52-01 -->
Backups include database records, original object bytes, editorial revisions and a hash manifest in an independent
encrypted destination. Success requires every required object to reconcile; missing downloads fail the backup.
Document a consistent recovery cutoff and pending uploads. Demonstrate restoration with the original Storage
provider inaccessible. Database backups or object listings alone do not meet this requirement.
<!-- /requirement:PRD-52-01 -->

<a id="prd-52-02"></a>
<!-- requirement:PRD-52-02 -->
Prove collection → receiving → processing → release → packaging → evidence retrieval → recall first. Accepted
wax/infusion workflows are gated increments and must be complete before those products enter the pilot. Rich
storytelling, optional push and additional dashboard features follow the operational proof. Basic receipt capture
remains core; messaging integration can roll out separately without weakening receipt identity or confirmation.
<!-- /requirement:PRD-52-02 -->

<a id="prd-52-03"></a>
<!-- requirement:PRD-52-03 -->
Acceptance includes a randomly selected batch evidence pack, a physical stock reconciliation, a consumed-input
correction, a source hold racing with packaging, a recipient-based recall drill and provider-inaccessible restore.
Exercise damaged labels, duplicate farmers, wrong weights, failed uploads, expired sessions and HQ outages.
Every pilot role participates on actual phones in the working language without developer assistance. Record
completion time, errors and help needed; critical save/hold/release meanings must be understood correctly.
Provisional targets are 90% unassisted routine-task attempts, median returning-farmer capture within two minutes,
and evidence-pack retrieval within five minutes. Confirm or revise these against field baselines before rollout;
record approved thresholds and owners. Integrity and privacy criteria are not relaxed to meet timing targets.
<!-- /requirement:PRD-52-03 -->
