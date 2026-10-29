# Deferred testing

Comprehensive testing belongs to increment 28. This file indexes material gaps; feature handoffs retain details. A focused development check never establishes pilot readiness.

| Area | Later verification | Owner | Blocks activation? |
| --- | --- | --- | --- |
| Transaction safety | Broader hold/allocation/packaging races and graph-extension matrix | 03, 11–14, 28 | Yes; a narrow safety proof is also required before exposing commands. |
| Device reliability | Supported-device cold restarts, multi-day storage, quota, expiry, N-1 updates and interrupted migrations | 16–17, 28 | Yes for offline pilot use. |
| Private assets and access | Provider access, expiry, malicious/invalid assets and expanded role/privacy checks | 04, 06, 28 | Yes for live private data. |
| Recovery | Complete restore with original provider inaccessible, all hashes reconciled, approved numeric RPO/RTO | 15, 28 | Yes for production. |
| Product quality | Approved rules, process checks and complete wax/infusion tracing/release exercises | 12, 20–24, 28 | Yes for the respective product. |
| Operational acceptance | Actual printers, working-language staff tasks, recipient recall, public-cache deadline and supervised cycle | 28 | Yes for pilot cut-over. |

Add only observed omissions or required release evidence. Record task ID, missing check and owner in the affected task result. Do not run these matrices after routine edits.
