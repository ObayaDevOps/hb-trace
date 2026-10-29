# Coverage, references and freshness

`source-map.json` catalogs stable marked requirement blocks and their original heading provenance. `coverage.json` maps every block to task owners/readers, every stable reference screen to one task, and operational design gaps to owners. Coverage is traceability, not proof of implementation or semantic completeness.

`manifest.json` stores packet fingerprints, selected source hashes, symbol-level code fingerprints, screen references and prerequisites. IDs do not change when content moves. File hashes are used only where a bounded symbol is unavailable. The original-document checksums establish the extraction baseline; they are not hashes of the new index files.

## Change procedure

1. Edit the authoritative fragment, never a copied packet excerpt. Preserve its stable ID and source provenance. `plan:check` should now report changed/stale references.
2. Run `plan:impact` with the requirement ID, code symbol/path, screen ID or decision ID. Review consumers and transitive dependants; mark affected accepted tasks stale until revalidated.
3. Amend task scope, decisions and dependency interfaces explicitly. If a packet is too large, split it and update coverage; do not drop a rule to fit.
4. After review, deliberately update only affected source/packet/code fingerprints in the JSON catalog. SHA-256 is over trimmed marked requirement text, exact packet bytes, or selected declaration text as returned by the planning helper. The exported `hash` and `codeText` helpers can be used for reviewed updates. There is intentionally no automatic accept/refresh command.
5. Re-run `plan:check`. Its link, coverage, cycle and size checks cannot prove the correctness of a policy interpretation; coordinator review remains required.

Dispatch records capture additional decision, dependency-result and working-tree fingerprints. `plan:check` validates these for active tasks and requires recorded acceptance evidence for accepted tasks. Planned packets are not dispatch-ready until that record exists.

## Output and screen extraction

`plan:task` prints marked requirement blocks, common instructions, the task and its one-screen reference excerpt. It lists code paths/symbols for incremental inspection. It never executes the reference gallery. Screen snapshots include the exact `screen(...)` declaration plus any later `change(...)`/`append(...)` overrides for that ID, with separate source fingerprints. Overrides take precedence for replaced properties. Shared helper definitions are inspected only if the screen needs them; fake gallery workflow arithmetic must not become domain code.

The budget counts the generated briefing. Coordinator-added decision and interface excerpts must also fit the dispatch budget. Keep runtime logs and historical reports out of prompts.
