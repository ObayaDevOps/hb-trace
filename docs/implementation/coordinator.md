# Coordinator protocol

Own the dependency graph, source freshness, shared interfaces, migration sequence, integration review and evidence. Keep only one implementation worker active. A worker receives a fresh context, not this thread or earlier worker transcripts.

## Dispatch

1. Read `state/current.md` and one increment index. Select a dependency-ready task; IDs are stable even if scheduling changes.
2. Run `npm run plan:check` after coherent planning changes. Inspect only the selected task's relevant decisions and accepted prerequisite handoffs.
3. Capture relevant working-tree changes, including untracked files. Git HEAD alone is insufficient in this workspace. Do not stage or discard unrelated edits.
4. Create `state/tasks/<task-id>.dispatch.json` using the dispatch template. Record requirement/code/decision fingerprints, accepted prerequisite result hashes, relevant uncommitted file hashes, exact allowed files and produced/consumed contract symbols. These fields are mandatory before work starts.
5. If prerequisite results are not accepted, do not dispatch implementation. A planning preview is allowed. If an operational decision is unresolved, distinguish implementation against a port from activation that requires approved values; block only the dependent behavior.
6. Run `npm run plan:task -- <task-id>`. Add only needed decision excerpts and prerequisite interface sections, not full files. Keep the combined briefing within 24,000 UTF-8 bytes, or split the task. An exception needs a written reason and explicit coordinator approval.
7. Start the fresh worker with the task briefing and dispatch record. One screen packet owns one screen; adjacent screens are interface contracts. Use targeted lookups if imports/types require extra context.

## Review and integration

Inspect the diff against requirements and allowed files. Check authoritative server ownership, public/private boundaries, exact values and immutable history where relevant. Verify the worker's focused evidence; do not rerun the same check without a reason.

Recompare dispatch fingerprints before accepting. Changes to a consumed interface or source rule require impact review, including tasks already accepted. Do not reject the task solely because its own authorized output changed: review that output, then establish the next baseline explicitly. Never automatically refresh all hashes to make the check green.

Write `state/tasks/<task-id>.md` using the result template. Record implementation status separately from activation status. Only the coordinator sets manifest status to accepted and supplies the evidence path after review. Unimplemented prerequisites cannot be waived with a screenshot or mock result.

Shared migration numbering and API changes are coordinator-owned. Update affected packets and coverage when splitting scope. No API/provider implementation should silently adopt the historical Sanity guidance.

## Integration checkpoints

Use the testing policy. Workers check the changed main behavior once; coordinator runs relevant integration checks once per increment. Full typecheck/test/build occurs at a meaningful application milestone and final code handoff. Do not run comprehensive device/provider/security matrices during ordinary development.

Before the core integration task, ensure the selected core screen tasks are also accepted; backend dependencies alone do not demonstrate a usable journey. Increment 28 requires all tasks in the approved pilot scope and all activation gates, not just the backend chain.

## Context resets

Keep `state/current.md` under 1,000 words: current task, accepted milestone IDs, blocking decisions, next action and evidence locations. Put detailed results in task files and logs in separate artifacts. At each increment boundary, or before checkpoint growth, restart coordinator context from START-HERE and current state.

Do not accumulate full worker reports or repeatedly summarize all previous work. Reopen one historical result only when its interface or evidence is needed. Read coverage and manifests through tools rather than dumping them into context.
