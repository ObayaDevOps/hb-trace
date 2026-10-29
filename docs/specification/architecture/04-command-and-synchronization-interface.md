# Command and synchronization interface

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/architecture-technical-spec.md — Command and synchronization interface](../../architecture-technical-spec.md#command-and-synchronization-interface)

<a id="arc-04-01"></a>
<!-- requirement:ARC-04-01 -->
All operational clients use versioned REST/JSON commands under `/api/v1`. Keep OpenAPI synchronized with the
implemented command contract; endpoint names below describe interface families rather than existing routes.
<!-- /requirement:ARC-04-01 -->

<a id="arc-04-02"></a>
<!-- requirement:ARC-04-02 -->
| Interface family | Request/result contract |
| --- | --- |
| Command/sync | Operation UUID, command/schema version, actor/device context, target/base version, dependencies, occurrence time and payload hash; per-operation acknowledgement or actionable rejection/conflict/dependency-pending result. |
<!-- /requirement:ARC-04-02 -->

<a id="arc-04-03"></a>
<!-- requirement:ARC-04-03 -->
| Interface family | Request/result contract |
| --- | --- |
| Staff queries | Authorized organization/role scope, pagination, record versions and last-updated information; private fields excluded where unnecessary. |
<!-- /requirement:ARC-04-03 -->

<a id="arc-04-04"></a>
<!-- requirement:ARC-04-04 -->
| Interface family | Request/result contract |
| --- | --- |
| Evidence ingestion | Authorized upload intent with application asset ID and constraints; streamed bytes followed by asynchronous verification status. |
<!-- /requirement:ARC-04-04 -->

<a id="arc-04-05"></a>
<!-- requirement:ARC-04-05 -->
| Interface family | Request/result contract |
| --- | --- |
| Evidence retrieval | Authorize evidence link and actor before issuing a bounded signed URL; log sensitive access. |
<!-- /requirement:ARC-04-05 -->

<a id="arc-04-06"></a>
<!-- requirement:ARC-04-06 -->
| Interface family | Request/result contract |
| --- | --- |
| Trace/export | Batch/source identifier, direction and cutoff; lineage plus evidence completeness, limitations and a durable export job/result. |
<!-- /requirement:ARC-04-06 -->

<a id="arc-04-07"></a>
<!-- requirement:ARC-04-07 -->
| Interface family | Request/result contract |
| --- | --- |
| Quality/correction/recall | Expected versions, reason, evidence and proposed scope; server recomputes scope and validates authority atomically. |
<!-- /requirement:ARC-04-07 -->

<a id="arc-04-08"></a>
<!-- requirement:ARC-04-08 -->
| Interface family | Request/result contract |
| --- | --- |
| Public batch lookup | Public code only; whitelisted snapshot/current status, safe unknown/unavailable/withdrawn/recalled responses. |
<!-- /requirement:ARC-04-08 -->

<a id="arc-04-09"></a>
<!-- requirement:ARC-04-09 -->
For each committed command: validate the session and current application roles, validate payload and ownership,
check idempotency, lock affected state in a consistent order, recheck eligibility and ancestor restrictions,
write ledger/state, audit, operation result and side-effect outbox in one PostgreSQL transaction. Retry the
whole command on retryable serialization/deadlock failures. The same operation ID/hash returns the original
result; changed content under an existing operation ID is rejected. No database transaction spans an external
object upload or message delivery.
<!-- /requirement:ARC-04-09 -->

<a id="arc-04-10"></a>
<!-- requirement:ARC-04-10 -->
A source hold and a descendant transformation/publication must share a serialization strategy that prevents
new eligible descendants escaping the hold scope. Choose and prove the locking/version strategy before exposing
these commands. Background propagation alone cannot establish eligibility safety.
<!-- /requirement:ARC-04-10 -->

<a id="arc-04-11"></a>
<!-- requirement:ARC-04-11 -->
Offline capture persists the envelope and required attachment bytes before reporting local success. Sync on
open/resume, reconnect and explicit action. Retain all individually unacknowledged commands. Corrections to sent
commands use linked new operations; never silently rewrite payloads already submitted. Auth expiry retains
pending work but requires approved re-entry and renewed server authorization. Only collection-related commands
are offline-capable; HQ/quality/publication commands require server decisions.
<!-- /requirement:ARC-04-11 -->
