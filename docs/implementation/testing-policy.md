# Lightweight development verification

User preference: optimize implementation progress. A comprehensive suite comes later. This policy changes when checks run; it does not remove product invariants or claim readiness without evidence.

| Moment | Required work |
| --- | --- |
| Individual edit | No automatic test run. |
| Coherent worker task | One focused existing check or manual main-flow exercise; add one critical rejection case when relevant. |
| Integrated increment | Relevant integration check once; typecheck if changed types/interfaces justify it. |
| Meaningful application milestone / final code handoff | Coordinator runs `npm run typecheck`, `npm test`, `npm run build` once against integrated state. |
| Increment 28 | Comprehensive suite, supported phones/printers, provider/security/performance/recovery validation. |

Prefer existing checks. Add a small test only to protect a core invariant or reproduce a real defect. Do not build exhaustive permutations, broad snapshot suites or tests mirroring implementation during feature delivery. Re-run only when relevant code changed, a failure needs diagnosis or a concrete unresolved concern warrants it.

Keep checks focused on saving collections, stable references, idempotent retries, arrival reconciliation, quantity availability, held-material restrictions, server permissions, public privacy, saved offline work, packaging eligibility and recall status. A narrow concurrency exercise is still necessary before exposing allocation/hold commands; broader concurrency matrices can wait.

For a screen, inspect its main action and one important failure at 320/390 px. The existing `npm run test:browser` checks the design gallery, not the operational app. Do not run it for every screen task or claim hosted integration from it.

Documentation-only handoffs need `npm run plan:check` and focused planning-tool checks. App typecheck/build are unnecessary when application code and dependencies have not changed. Record material deferred checks with owners and activation consequences in [deferred-testing.md](deferred-testing.md).
