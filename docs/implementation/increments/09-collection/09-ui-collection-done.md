# 09-ui-collection-done: Collection complete

## Outcome and exclusions

Implement only `collection-done` for role **field**, with primary action **Back to home**.
Do not load the complete gallery, screen inventory or PDF. Do not implement adjacent screens here.

## Prerequisites and reading

Required: 09-behavior, 07-behavior. Coordinator supplies their accepted client-safe API/query contract symbols and shared UI exports at dispatch. If missing, stop this task and resolve the prerequisite; never invent fixture-backed success.
Read the appended exact source blocks and this screen's reference excerpt. Visual reference: `public/design/mobile-ui/index.html#collection-done`.
Start at `src/components/v1/ui.jsx`; inspect shared controls only. Locate the existing feature component before adding a new one.

## Implementation

1. Adapt the single reference screen into a typed React screen using accepted shared controls and its predecessor API/draft interface. Follow the reference's fields and next-action contract; gallery JavaScript is not production domain logic.
2. Wire **Back to home**, back/cancel and error focus; preserve entered values and show saved/waiting/failed status accurately. Adjacent destinations are navigation contracts, not permission to load those screens.
3. Keep example grades and names as synthetic fixtures; do not promote prototype examples into approved policy.
4. Restrict displayed records/actions by the accepted query contract. Server permissions and validation remain authoritative.

## Core check

Inspect this screen once at 320 px and 390 px, perform its main action, then one relevant validation/failure path. Existing focused automation or manual browser inspection is sufficient.
Do not run the gallery-wide browser script or a full build/suite for this screen. Record broader cases in the deferred-testing index only if material.

## Handoff

Write `state/tasks/09-ui-collection-done.md`: actual component/route, consumed contract symbols, changed files, primary-action result and outstanding blockers.
Allowed write roots: `src/components/v1/`, `src/components/ui/`, `src/app/staff/`, `src/app/(public)/`, `docs/implementation/state/tasks/09-ui-collection-done.md`. Coordinator narrows this to the screen/component at dispatch. No server/domain/migration edits in a screen task.
