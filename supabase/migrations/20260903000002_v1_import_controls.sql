-- HB-TRACE V1 import review/commit controls
--
-- The base import tables are intentionally provider-neutral. This forward
-- migration records explicit duplicate decisions and the operation UUID used
-- to make a commit safely replayable.

BEGIN;

ALTER TABLE import_batches
    ADD COLUMN commit_operation_id uuid;

ALTER TABLE import_rows
    ADD COLUMN duplicate_decision text
        CHECK (duplicate_decision IN ('create', 'match', 'skip')),
    ADD COLUMN duplicate_candidate_ids jsonb NOT NULL DEFAULT '[]'::jsonb
        CHECK (jsonb_typeof(duplicate_candidate_ids) = 'array');

CREATE UNIQUE INDEX import_batches_commit_operation_uidx
    ON import_batches (organization_id, commit_operation_id)
    WHERE commit_operation_id IS NOT NULL;

COMMENT ON COLUMN import_batches.commit_operation_id IS
    'Application operation UUID for an idempotent import commit; a retry must reuse the same value.';
COMMENT ON COLUMN import_rows.duplicate_decision IS
    'Explicit reviewer decision for a likely duplicate; no fuzzy match is committed automatically.';
COMMENT ON COLUMN import_rows.duplicate_candidate_ids IS
    'Application IDs of records presented to the reviewer as duplicate candidates.';

COMMIT;
