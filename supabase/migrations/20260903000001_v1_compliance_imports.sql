-- HB-TRACE V1 compliance, evidence and import foundation
--
-- Depends on 20260903000000_v1_persistence_foundation.sql. The tables keep
-- operational records, immutable evidence metadata and controlled references
-- separate. Asset bytes remain behind the server/provider adapter.

BEGIN;

CREATE TABLE controlled_documents (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    document_type text NOT NULL
        CHECK (document_type IN ('form_template', 'sop', 'haccp_plan', 'other')),
    code text NOT NULL,
    title text NOT NULL,
    owner_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'approved', 'effective', 'superseded', 'retired')),
    description text,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(code)) > 0),
    CHECK (char_length(btrim(title)) > 0),
    UNIQUE (organization_id, code)
);

CREATE TABLE controlled_document_revisions (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    document_id uuid NOT NULL REFERENCES controlled_documents (id) ON DELETE RESTRICT,
    version_label text NOT NULL,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'under_review', 'approved', 'effective', 'superseded', 'retired')),
    content_asset_id uuid REFERENCES asset_metadata (id) ON DELETE RESTRICT,
    content_sha256 text,
    page_count integer CHECK (page_count IS NULL OR page_count > 0),
    approver_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    approved_at timestamptz,
    effective_at timestamptz,
    review_due_at timestamptz,
    requires_acknowledgement boolean NOT NULL DEFAULT false,
    change_summary text,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(version_label)) > 0),
    CHECK (content_sha256 IS NULL OR content_sha256 ~ '^[0-9a-fA-F]{64}$'),
    CHECK (approved_at IS NULL OR effective_at IS NULL OR effective_at >= approved_at),
    UNIQUE (document_id, version_label)
);

COMMENT ON TABLE controlled_document_revisions IS
    'Versioned forms/SOP/HACCP metadata. The controlled source file is a private asset.';

CREATE TABLE document_acknowledgements (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    document_revision_id uuid NOT NULL REFERENCES controlled_document_revisions (id) ON DELETE RESTRICT,
    actor_id uuid NOT NULL REFERENCES actors (id) ON DELETE RESTRICT,
    acknowledged_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    client_version text,
    notes text,
    UNIQUE (document_revision_id, actor_id)
);

CREATE TABLE completed_forms (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    document_revision_id uuid NOT NULL REFERENCES controlled_document_revisions (id) ON DELETE RESTRICT,
    responsible_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    subject_type text,
    subject_id uuid,
    completed_on date NOT NULL,
    status text NOT NULL DEFAULT 'submitted'
        CHECK (status IN ('draft', 'submitted', 'under_review', 'verified', 'correction_requested', 'rejected')),
    reviewed_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    reviewed_at timestamptz,
    review_note text,
    correction_of_form_id uuid REFERENCES completed_forms (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0)
);

CREATE TABLE completed_form_assets (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    completed_form_id uuid NOT NULL REFERENCES completed_forms (id) ON DELETE RESTRICT,
    asset_id uuid NOT NULL REFERENCES asset_metadata (id) ON DELETE RESTRICT,
    page_number integer NOT NULL CHECK (page_number > 0),
    captured_at timestamptz,
    UNIQUE (completed_form_id, page_number),
    UNIQUE (completed_form_id, asset_id)
);

CREATE TABLE requirements_register (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    source_name text NOT NULL,
    source_edition text NOT NULL,
    clause_reference text,
    title text NOT NULL,
    operational_requirement text NOT NULL,
    applicability text NOT NULL,
    owner_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    review_frequency text,
    evidence_summary text,
    acceptance_rule text,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'active', 'review_due', 'superseded', 'retired')),
    effective_at date,
    review_due_at date,
    superseded_by_id uuid REFERENCES requirements_register (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(source_name)) > 0),
    CHECK (char_length(btrim(source_edition)) > 0),
    CHECK (char_length(btrim(title)) > 0),
    CHECK (char_length(btrim(operational_requirement)) > 0),
    CHECK (char_length(btrim(applicability)) > 0)
);

CREATE TABLE haccp_controls (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    document_revision_id uuid REFERENCES controlled_document_revisions (id) ON DELETE RESTRICT,
    process_stage text NOT NULL,
    hazard text NOT NULL,
    control_type text NOT NULL CHECK (control_type IN ('ccp', 'operational_prerequisite', 'prerequisite')),
    limit_text text NOT NULL,
    monitoring_method text NOT NULL,
    monitoring_frequency text NOT NULL,
    responsible_role text NOT NULL,
    corrective_action text NOT NULL,
    verification_method text NOT NULL,
    required_record text NOT NULL,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'active', 'superseded', 'retired')),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(process_stage)) > 0),
    CHECK (char_length(btrim(hazard)) > 0),
    CHECK (char_length(btrim(limit_text)) > 0)
);

CREATE TABLE nonconformances (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    reference_code text NOT NULL,
    severity text NOT NULL DEFAULT 'minor'
        CHECK (severity IN ('minor', 'major', 'critical')),
    source_type text NOT NULL,
    source_id uuid,
    description text NOT NULL,
    status text NOT NULL DEFAULT 'open'
        CHECK (status IN ('open', 'investigating', 'corrective_action_in_progress', 'verified', 'closed')),
    owner_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    opened_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    closed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(reference_code)) > 0),
    CHECK (char_length(btrim(source_type)) > 0),
    CHECK (char_length(btrim(description)) > 0),
    CHECK (closed_at IS NULL OR closed_at >= opened_at),
    UNIQUE (organization_id, reference_code)
);

CREATE TABLE corrective_actions (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    nonconformance_id uuid NOT NULL REFERENCES nonconformances (id) ON DELETE RESTRICT,
    action_text text NOT NULL,
    owner_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    due_at date,
    status text NOT NULL DEFAULT 'open'
        CHECK (status IN ('open', 'in_progress', 'completed', 'verified', 'cancelled')),
    completed_at timestamptz,
    verified_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    verified_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(action_text)) > 0)
);

CREATE TABLE haccp_deviations (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    haccp_control_id uuid NOT NULL REFERENCES haccp_controls (id) ON DELETE RESTRICT,
    measurement_id uuid REFERENCES measurements (id) ON DELETE RESTRICT,
    nonconformance_id uuid REFERENCES nonconformances (id) ON DELETE RESTRICT,
    observed_value text,
    limit_text text NOT NULL,
    disposition text NOT NULL DEFAULT 'open'
        CHECK (disposition IN ('open', 'held', 'corrective_action', 'verified', 'closed')),
    observed_at timestamptz NOT NULL,
    resolved_at timestamptz,
    reason text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(limit_text)) > 0),
    CHECK (char_length(btrim(reason)) > 0),
    CHECK (resolved_at IS NULL OR resolved_at >= observed_at)
);

CREATE TABLE recall_events (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    reference_code text NOT NULL,
    reason text NOT NULL,
    initiated_by_actor_id uuid NOT NULL REFERENCES actors (id) ON DELETE RESTRICT,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'active', 'withdrawn', 'closed')),
    public_page_status text NOT NULL DEFAULT 'unchanged'
        CHECK (public_page_status IN ('unchanged', 'withdrawn', 'notice')),
    actions jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(actions) = 'object'),
    opened_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    closed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(reference_code)) > 0),
    CHECK (char_length(btrim(reason)) > 0),
    CHECK (closed_at IS NULL OR closed_at >= opened_at),
    UNIQUE (organization_id, reference_code)
);

CREATE TABLE recall_lots (
    recall_id uuid NOT NULL REFERENCES recall_events (id) ON DELETE RESTRICT,
    lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    scope_reason text,
    PRIMARY KEY (recall_id, lot_id)
);

CREATE TABLE recall_packaging_batches (
    recall_id uuid NOT NULL REFERENCES recall_events (id) ON DELETE RESTRICT,
    packaging_batch_id uuid NOT NULL REFERENCES packaging_batches (id) ON DELETE RESTRICT,
    scope_reason text,
    PRIMARY KEY (recall_id, packaging_batch_id)
);

CREATE TABLE public_claims (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    claim_code text NOT NULL,
    wording text NOT NULL,
    evidence_summary text NOT NULL,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'evidence_under_review', 'approved', 'expired', 'withdrawn', 'superseded')),
    valid_from date,
    valid_until date,
    approved_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    approved_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(claim_code)) > 0),
    CHECK (char_length(btrim(wording)) > 0),
    CHECK (char_length(btrim(evidence_summary)) > 0),
    CHECK (valid_until IS NULL OR valid_from IS NULL OR valid_until >= valid_from),
    UNIQUE (organization_id, claim_code)
);

CREATE TABLE public_profiles (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    actor_id uuid NOT NULL REFERENCES actors (id) ON DELETE RESTRICT,
    consent_id uuid REFERENCES actor_consents (id) ON DELETE RESTRICT,
    display_name text NOT NULL,
    approximate_location text,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'approved', 'withdrawn', 'retired')),
    approved_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    approved_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(display_name)) > 0),
    UNIQUE (organization_id, actor_id)
);

CREATE TABLE import_batches (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    import_type text NOT NULL CHECK (import_type IN ('farmers', 'apiaries')),
    template_version text NOT NULL,
    original_asset_id uuid REFERENCES asset_metadata (id) ON DELETE RESTRICT,
    source_sha256 text NOT NULL,
    uploaded_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    status text NOT NULL DEFAULT 'uploaded'
        CHECK (status IN ('uploaded', 'validated', 'correction_required', 'ready', 'committed', 'completed', 'partially_rejected')),
    row_count integer NOT NULL DEFAULT 0 CHECK (row_count >= 0),
    created_count integer NOT NULL DEFAULT 0 CHECK (created_count >= 0),
    matched_count integer NOT NULL DEFAULT 0 CHECK (matched_count >= 0),
    rejected_count integer NOT NULL DEFAULT 0 CHECK (rejected_count >= 0),
    skipped_count integer NOT NULL DEFAULT 0 CHECK (skipped_count >= 0),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (source_sha256 ~ '^[0-9a-fA-F]{64}$'),
    UNIQUE (organization_id, source_sha256, template_version)
);

CREATE TABLE import_rows (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    import_batch_id uuid NOT NULL REFERENCES import_batches (id) ON DELETE RESTRICT,
    row_number integer NOT NULL CHECK (row_number > 0),
    raw_values jsonb NOT NULL CHECK (jsonb_typeof(raw_values) = 'object'),
    normalized_values jsonb CHECK (normalized_values IS NULL OR jsonb_typeof(normalized_values) = 'object'),
    outcome text NOT NULL DEFAULT 'pending'
        CHECK (outcome IN ('pending', 'created', 'matched', 'rejected', 'skipped')),
    error_details jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(error_details) = 'object'),
    matched_record_type text,
    matched_record_id uuid,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (import_batch_id, row_number)
);

CREATE INDEX controlled_document_revisions_status_idx
    ON controlled_document_revisions (organization_id, status, review_due_at);
CREATE INDEX completed_forms_status_idx
    ON completed_forms (organization_id, status, completed_on);
CREATE INDEX requirements_register_status_idx
    ON requirements_register (organization_id, status, review_due_at);
CREATE INDEX nonconformances_status_idx
    ON nonconformances (organization_id, status, severity);
CREATE INDEX haccp_deviations_status_idx
    ON haccp_deviations (organization_id, disposition, observed_at);
CREATE INDEX recall_lots_lot_idx
    ON recall_lots (lot_id, recall_id);
CREATE INDEX recall_packaging_batches_batch_idx
    ON recall_packaging_batches (packaging_batch_id, recall_id);
CREATE INDEX public_claims_status_idx
    ON public_claims (organization_id, status, valid_until);
CREATE INDEX import_batches_status_idx
    ON import_batches (organization_id, status, created_at);
CREATE INDEX import_rows_outcome_idx
    ON import_rows (import_batch_id, outcome, row_number);

COMMIT;
