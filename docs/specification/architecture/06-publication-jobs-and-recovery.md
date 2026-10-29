# Publication, jobs and recovery

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/architecture-technical-spec.md — Publication, jobs and recovery](../../architecture-technical-spec.md#publication-jobs-and-recovery)

<a id="arc-06-01"></a>
<!-- requirement:ARC-06-01 -->
Quality approval creates an immutable snapshot in PostgreSQL and switches the active public revision inside the
same transaction. Public lookups use a restricted query/role over publication data only. Include approved images
by asset mapping. Keep current withdrawal/recall status out of long-lived caches; configure and prove a numeric
propagation deadline across the customer website, API and service worker before rollout. Story edits create new
approved revisions and cannot rewrite operational facts.
<!-- /requirement:ARC-06-01 -->

<a id="arc-06-02"></a>
<!-- requirement:ARC-06-02 -->
Jobs claim durable work with leases and bounded retries. Persist result/attempt IDs, deduplicate callbacks, expose
failed work to a named owner and recover expired leases. Messaging uncertainty requires provider reconciliation
before another send. Infusion due tasks derive from committed start time; notifications never complete checks.
<!-- /requirement:ARC-06-02 -->

<a id="arc-06-03"></a>
<!-- requirement:ARC-06-03 -->
Recovery copies include SQL, every required original/publication asset, editorial revisions and a manifest of
IDs, keys, hashes, sizes, counts and recovery cutoff. Use an independent encrypted destination with separate
credentials and retention; the exact destination and numeric RPO/RTO are Phase 0 decisions. Freeze or reconcile
writes/uploads around the cutoff so the backup represents a defined recoverable state. Missing bytes fail the
backup. Restore to an isolated environment with the original provider inaccessible and compare hashes,
relationships, balances and public revisions. Unsynced device work is outside server backup coverage.
<!-- /requirement:ARC-06-03 -->
