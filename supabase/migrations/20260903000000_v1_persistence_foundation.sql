-- HB-TRACE V1 persistence foundation
--
-- This migration deliberately uses application-generated UUIDs and ordinary
-- PostgreSQL tables. It does not reference Supabase Auth, Storage, RLS,
-- extensions, triggers, or provider-specific functions. Cross-row invariants
-- which require a command transaction are documented in docs/persistence.md.

BEGIN;

CREATE TABLE organizations (
    id uuid PRIMARY KEY,
    legal_name text NOT NULL,
    display_name text NOT NULL,
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'archived')),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(legal_name)) > 0),
    CHECK (char_length(btrim(display_name)) > 0)
);

COMMENT ON TABLE organizations IS
    'Application-owned producer boundary. V1 normally contains one organization per deployment.';

CREATE TABLE locations (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    parent_location_id uuid REFERENCES locations (id) ON DELETE RESTRICT,
    location_kind text NOT NULL DEFAULT 'other'
        CHECK (location_kind IN ('region', 'collection_point', 'apiary', 'facility', 'storage', 'other')),
    name text NOT NULL,
    country_code text,
    region_name text,
    district_name text,
    subcounty_name text,
    address_text text,
    latitude numeric(9, 6),
    longitude numeric(9, 6),
    coordinate_precision_m numeric(12, 2),
    public_label text,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(name)) > 0),
    CHECK (country_code IS NULL OR country_code ~ '^[A-Z]{2}$'),
    CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
    CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180),
    CHECK ((latitude IS NULL) = (longitude IS NULL)),
    CHECK (coordinate_precision_m IS NULL OR coordinate_precision_m >= 0)
);

COMMENT ON TABLE locations IS
    'Operational locations. Exact coordinates stay private; public_label is an approved generalized label.';

CREATE TABLE facilities (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    location_id uuid REFERENCES locations (id) ON DELETE RESTRICT,
    facility_code text NOT NULL,
    name text NOT NULL,
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'archived')),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(facility_code)) > 0),
    CHECK (char_length(btrim(name)) > 0),
    UNIQUE (organization_id, facility_code)
);

CREATE TABLE actors (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    actor_kind text NOT NULL DEFAULT 'person'
        CHECK (actor_kind IN ('person', 'organization', 'system')),
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'archived')),
    display_name text NOT NULL,
    legal_name text,
    phone text,
    email text,
    timezone text NOT NULL DEFAULT 'Africa/Kampala',
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(display_name)) > 0),
    CHECK (legal_name IS NULL OR char_length(btrim(legal_name)) > 0),
    CHECK (char_length(btrim(timezone)) > 0)
);

COMMENT ON TABLE actors IS
    'Application identities. External authentication subjects are replaceable mappings in actor_identities.';

CREATE TABLE actor_identities (
    id uuid PRIMARY KEY,
    actor_id uuid NOT NULL REFERENCES actors (id) ON DELETE RESTRICT,
    provider text NOT NULL,
    subject text NOT NULL,
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'retired')),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    retired_at timestamptz,
    CHECK (char_length(btrim(provider)) > 0),
    CHECK (char_length(btrim(subject)) > 0),
    CHECK (retired_at IS NULL OR retired_at >= created_at),
    CHECK ((status = 'active' AND retired_at IS NULL) OR (status = 'retired' AND retired_at IS NOT NULL)),
    UNIQUE (provider, subject)
);

COMMENT ON TABLE actor_identities IS
    'Provider-neutral mapping from an external auth subject to an application actor; never a domain identity.';

CREATE TABLE roles (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    code text NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(code)) > 0),
    CHECK (char_length(btrim(name)) > 0),
    UNIQUE (organization_id, code)
);

CREATE TABLE actor_roles (
    id uuid PRIMARY KEY,
    actor_id uuid NOT NULL REFERENCES actors (id) ON DELETE RESTRICT,
    role_id uuid NOT NULL REFERENCES roles (id) ON DELETE RESTRICT,
    granted_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    granted_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    revoked_at timestamptz,
    reason text,
    CHECK (revoked_at IS NULL OR revoked_at >= granted_at),
    CHECK (reason IS NULL OR char_length(btrim(reason)) > 0)
);

CREATE TABLE actor_consents (
    id uuid PRIMARY KEY,
    actor_id uuid NOT NULL REFERENCES actors (id) ON DELETE RESTRICT,
    consent_type text NOT NULL,
    purpose text NOT NULL,
    status text NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'granted', 'withdrawn', 'expired', 'not_required')),
    policy_version text NOT NULL,
    granted_at timestamptz,
    withdrawn_at timestamptz,
    recorded_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    source text,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(consent_type)) > 0),
    CHECK (char_length(btrim(purpose)) > 0),
    CHECK (char_length(btrim(policy_version)) > 0),
    CHECK (granted_at IS NULL OR withdrawn_at IS NULL OR withdrawn_at >= granted_at)
);

COMMENT ON TABLE actor_consents IS
    'Purpose-specific consent history. Consent does not replace another applicable lawful basis.';

CREATE TABLE farmers (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    actor_id uuid NOT NULL REFERENCES actors (id) ON DELETE RESTRICT,
    farmer_reference text NOT NULL,
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'archived')),
    notes text,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(farmer_reference)) > 0),
    UNIQUE (organization_id, farmer_reference),
    UNIQUE (actor_id)
);

COMMENT ON TABLE farmers IS
    'Private operational farmer record. Public storytelling uses separately approved content.';

CREATE TABLE apiaries (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    farmer_id uuid NOT NULL REFERENCES farmers (id) ON DELETE RESTRICT,
    location_id uuid REFERENCES locations (id) ON DELETE RESTRICT,
    apiary_reference text NOT NULL,
    name text,
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'archived')),
    hive_count integer CHECK (hive_count IS NULL OR hive_count >= 0),
    notes text,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(apiary_reference)) > 0),
    CHECK (name IS NULL OR char_length(btrim(name)) > 0),
    UNIQUE (organization_id, apiary_reference)
);

COMMENT ON TABLE apiaries IS
    'Operational apiary and origin relationship; location precision is governed by publication policy.';

CREATE TABLE sync_operations (
    operation_id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    device_id text NOT NULL,
    deployment_id text NOT NULL,
    command_type text NOT NULL,
    command_schema_version integer NOT NULL CHECK (command_schema_version > 0),
    aggregate_type text NOT NULL,
    aggregate_id uuid,
    expected_version bigint CHECK (expected_version IS NULL OR expected_version >= 0),
    event_occurrence_at timestamptz NOT NULL,
    client_captured_at timestamptz NOT NULL,
    client_timezone text NOT NULL,
    client_version text NOT NULL,
    payload jsonb NOT NULL,
    payload_hash_sha256 text NOT NULL,
    result_status text NOT NULL DEFAULT 'pending'
        CHECK (result_status IN ('pending', 'acknowledged', 'rejected', 'conflicted', 'dependency_pending')),
    result_payload jsonb,
    error_type text,
    error_message text,
    completed_at timestamptz,
    received_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(device_id)) > 0),
    CHECK (char_length(btrim(deployment_id)) > 0),
    CHECK (char_length(btrim(command_type)) > 0),
    CHECK (char_length(btrim(aggregate_type)) > 0),
    CHECK (client_timezone = btrim(client_timezone)),
    CHECK (char_length(btrim(client_timezone)) > 0),
    CHECK (char_length(btrim(client_version)) > 0),
    CHECK (payload_hash_sha256 ~ '^[0-9a-fA-F]{64}$'),
    CHECK (jsonb_typeof(payload) = 'object'),
    CHECK (result_payload IS NULL OR jsonb_typeof(result_payload) = 'object'),
    CHECK (error_type IS NULL OR char_length(btrim(error_type)) > 0),
    CHECK (error_message IS NULL OR char_length(btrim(error_message)) > 0),
    CHECK (
        (result_status IN ('pending', 'dependency_pending') AND completed_at IS NULL)
        OR (result_status IN ('acknowledged', 'rejected', 'conflicted') AND completed_at IS NOT NULL)
    )
);

COMMENT ON TABLE sync_operations IS
    'Server-side idempotency ledger for client command envelopes. operation_id is the idempotency key.';
COMMENT ON COLUMN sync_operations.payload_hash_sha256 IS
    'Hash of the deterministic command payload; a reused operation_id with a different hash is misuse.';

CREATE TABLE sync_operation_dependencies (
    operation_id uuid NOT NULL REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    -- A client may upload a dependent operation before its prerequisite. Keep
    -- the prerequisite ID as an opaque idempotency reference and resolve its
    -- status in the command service instead of rejecting the upload at FK time.
    depends_on_operation_id uuid NOT NULL,
    dependency_order integer NOT NULL CHECK (dependency_order >= 0),
    PRIMARY KEY (operation_id, depends_on_operation_id),
    CHECK (operation_id <> depends_on_operation_id)
);

COMMENT ON TABLE sync_operation_dependencies IS
    'Ordered client dependency references. depends_on_operation_id may arrive before the prerequisite operation.';

CREATE TABLE purchases (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    purchase_type text NOT NULL
        CHECK (purchase_type IN ('purchase', 'harvest')),
    farmer_id uuid NOT NULL REFERENCES farmers (id) ON DELETE RESTRICT,
    apiary_id uuid REFERENCES apiaries (id) ON DELETE RESTRICT,
    collection_location_id uuid REFERENCES locations (id) ON DELETE RESTRICT,
    supplier_reference text,
    product_kind text NOT NULL
        CHECK (product_kind IN ('honeycomb', 'raw_beeswax', 'other')),
    grade text,
    quantity_value numeric(20, 6) NOT NULL CHECK (quantity_value > 0),
    quantity_unit text NOT NULL,
    canonical_quantity_value numeric(20, 6) NOT NULL CHECK (canonical_quantity_value > 0),
    canonical_quantity_unit text NOT NULL,
    gross_weight_kg numeric(20, 6),
    tare_weight_kg numeric(20, 6),
    net_weight_kg numeric(20, 6),
    agreed_amount numeric(20, 4),
    paid_amount numeric(20, 4),
    currency_code text,
    payment_status text NOT NULL DEFAULT 'not_applicable'
        CHECK (payment_status IN ('not_applicable', 'pending', 'partial', 'paid', 'disputed')),
    payment_reference text,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'submitted', 'accepted', 'rejected', 'closed')),
    operator_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    occurred_at timestamptz NOT NULL,
    captured_at timestamptz NOT NULL,
    received_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    committed_at timestamptz,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(quantity_unit)) > 0),
    CHECK (char_length(btrim(canonical_quantity_unit)) > 0),
    CHECK (gross_weight_kg IS NULL OR gross_weight_kg >= 0),
    CHECK (tare_weight_kg IS NULL OR tare_weight_kg >= 0),
    CHECK (net_weight_kg IS NULL OR net_weight_kg >= 0),
    CHECK (
        gross_weight_kg IS NULL
        OR tare_weight_kg IS NULL
        OR net_weight_kg IS NULL
        OR gross_weight_kg >= tare_weight_kg + net_weight_kg
    ),
    CHECK (agreed_amount IS NULL OR agreed_amount >= 0),
    CHECK (paid_amount IS NULL OR paid_amount >= 0),
    CHECK ((agreed_amount IS NULL AND paid_amount IS NULL) OR currency_code IS NOT NULL),
    CHECK (currency_code IS NULL OR currency_code ~ '^[A-Z]{3}$'),
    CHECK (committed_at IS NULL OR committed_at >= received_at)
);

COMMENT ON TABLE purchases IS
    'Purchase or harvest source event. Quantity and money are decimal values with explicit units/meaning.';

CREATE TABLE purchase_receipts (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    purchase_id uuid NOT NULL REFERENCES purchases (id) ON DELETE RESTRICT,
    receipt_code text NOT NULL,
    receipt_status text NOT NULL DEFAULT 'draft'
        CHECK (receipt_status IN ('draft', 'issued', 'farmer_confirmed', 'confirmation_unavailable', 'disputed', 'resolved', 'closed')),
    receipt_snapshot jsonb NOT NULL,
    issued_at timestamptz,
    confirmed_at timestamptz,
    disputed_at timestamptz,
    closed_at timestamptz,
    buyer_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(receipt_code)) > 0),
    CHECK (jsonb_typeof(receipt_snapshot) = 'object'),
    CHECK (receipt_status = 'draft' OR issued_at IS NOT NULL),
    CHECK (confirmed_at IS NULL OR issued_at IS NOT NULL),
    CHECK (disputed_at IS NULL OR issued_at IS NOT NULL),
    CHECK (closed_at IS NULL OR closed_at >= created_at),
    UNIQUE (purchase_id),
    UNIQUE (organization_id, receipt_code)
);

COMMENT ON COLUMN purchase_receipts.receipt_snapshot IS
    'Immutable-at-issuance, non-sensitive receipt projection; corrections link back to the purchase.';

CREATE TABLE receipt_acknowledgements (
    id uuid PRIMARY KEY,
    receipt_id uuid NOT NULL REFERENCES purchase_receipts (id) ON DELETE RESTRICT,
    acknowledgement_status text NOT NULL
        CHECK (acknowledgement_status IN ('confirmed', 'confirmation_unavailable')),
    method text NOT NULL
        CHECK (method IN ('paper', 'sms', 'ussd', 'staff_assisted', 'other')),
    acknowledged_at timestamptz,
    recorded_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    note text,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (
        (acknowledgement_status = 'confirmed' AND acknowledged_at IS NOT NULL)
        OR (acknowledgement_status = 'confirmation_unavailable' AND acknowledged_at IS NULL)
    )
);

CREATE TABLE receipt_disputes (
    id uuid PRIMARY KEY,
    receipt_id uuid NOT NULL REFERENCES purchase_receipts (id) ON DELETE RESTRICT,
    status text NOT NULL DEFAULT 'open'
        CHECK (status IN ('open', 'under_review', 'corrected', 'rejected', 'acknowledged', 'closed')),
    reason text NOT NULL,
    resolution text,
    opened_at timestamptz NOT NULL,
    resolved_at timestamptz,
    opened_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    resolved_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(reason)) > 0),
    CHECK (resolution IS NULL OR char_length(btrim(resolution)) > 0),
    CHECK (resolved_at IS NULL OR resolved_at >= opened_at),
    CHECK (
        status IN ('open', 'under_review')
        OR (resolved_at IS NOT NULL AND resolved_by_actor_id IS NOT NULL)
    )
);

CREATE TABLE traceable_lots (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    lot_reference text,
    material_kind text NOT NULL
        CHECK (material_kind IN ('honeycomb', 'honey', 'raw_beeswax', 'beeswax', 'waste', 'residue', 'other')),
    lifecycle_state text NOT NULL DEFAULT 'draft'
        CHECK (lifecycle_state IN ('draft', 'active', 'closed', 'discarded')),
    quality_disposition text NOT NULL DEFAULT 'pending'
        CHECK (quality_disposition IN ('pending', 'held', 'released', 'rejected', 'recalled')),
    initial_quantity_value numeric(20, 6) NOT NULL CHECK (initial_quantity_value > 0),
    initial_quantity_unit text NOT NULL,
    canonical_quantity_value numeric(20, 6) NOT NULL CHECK (canonical_quantity_value > 0),
    canonical_quantity_unit text NOT NULL,
    current_location_id uuid REFERENCES locations (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    created_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    occurred_at timestamptz NOT NULL,
    committed_at timestamptz,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (lot_reference IS NULL OR char_length(btrim(lot_reference)) > 0),
    CHECK (char_length(btrim(initial_quantity_unit)) > 0),
    CHECK (char_length(btrim(canonical_quantity_unit)) > 0),
    CHECK (committed_at IS NULL OR committed_at >= created_at)
);

COMMENT ON TABLE traceable_lots IS
    'Traceable material identity. Availability is derived from material_ledger_entries, not edited here.';
COMMENT ON COLUMN traceable_lots.quality_disposition IS
    'Current projection of the latest authorised quality decision; quality_reviews retain the decision history.';

CREATE TABLE containers (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    container_reference text,
    container_kind text NOT NULL
        CHECK (container_kind IN ('bucket', 'drum', 'tote', 'tank', 'crate', 'other')),
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'empty', 'retired', 'damaged')),
    capacity_value numeric(20, 6),
    capacity_unit text,
    current_location_id uuid REFERENCES locations (id) ON DELETE RESTRICT,
    created_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (container_reference IS NULL OR char_length(btrim(container_reference)) > 0),
    CHECK (capacity_value IS NULL OR capacity_value > 0),
    CHECK ((capacity_value IS NULL) = (capacity_unit IS NULL)),
    CHECK (capacity_unit IS NULL OR char_length(btrim(capacity_unit)) > 0)
);

CREATE TABLE transformations (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    transformation_reference text,
    transformation_type text NOT NULL
        CHECK (transformation_type IN ('extraction', 'separation', 'processing', 'blending', 'adjustment')),
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'committed', 'reversed')),
    facility_id uuid REFERENCES facilities (id) ON DELETE RESTRICT,
    operator_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    rule_version text NOT NULL,
    occurred_at timestamptz NOT NULL,
    captured_at timestamptz NOT NULL,
    received_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    committed_at timestamptz,
    reversal_of_transformation_id uuid REFERENCES transformations (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    notes text,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (transformation_reference IS NULL OR char_length(btrim(transformation_reference)) > 0),
    CHECK (char_length(btrim(rule_version)) > 0),
    CHECK (reversal_of_transformation_id IS NULL OR reversal_of_transformation_id <> id),
    CHECK (committed_at IS NULL OR committed_at >= received_at)
);

COMMENT ON TABLE transformations IS
    'Committed transformations are corrected by linked reversal/amendment records, not by rewriting edges.';

CREATE TABLE transformation_allocations (
    id uuid PRIMARY KEY,
    transformation_id uuid NOT NULL REFERENCES transformations (id) ON DELETE RESTRICT,
    source_lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    source_container_id uuid REFERENCES containers (id) ON DELETE RESTRICT,
    line_number integer NOT NULL CHECK (line_number > 0),
    quantity_value numeric(20, 6) NOT NULL CHECK (quantity_value > 0),
    quantity_unit text NOT NULL,
    canonical_quantity_value numeric(20, 6) NOT NULL CHECK (canonical_quantity_value > 0),
    canonical_quantity_unit text NOT NULL,
    expected_source_lot_version bigint CHECK (expected_source_lot_version IS NULL OR expected_source_lot_version >= 0),
    allocated_at timestamptz NOT NULL,
    created_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(quantity_unit)) > 0),
    CHECK (char_length(btrim(canonical_quantity_unit)) > 0),
    UNIQUE (transformation_id, line_number),
    UNIQUE (transformation_id, source_lot_id)
);

COMMENT ON TABLE transformation_allocations IS
    'Direct lineage input edges. The command transaction must lock source lots and reject over-allocation/cycles.';

CREATE TABLE transformation_outputs (
    id uuid PRIMARY KEY,
    transformation_id uuid NOT NULL REFERENCES transformations (id) ON DELETE RESTRICT,
    output_lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    sequence_number integer NOT NULL CHECK (sequence_number > 0),
    output_material_kind text NOT NULL
        CHECK (output_material_kind IN ('honeycomb', 'honey', 'raw_beeswax', 'beeswax', 'waste', 'residue', 'other')),
    quantity_value numeric(20, 6) NOT NULL CHECK (quantity_value > 0),
    quantity_unit text NOT NULL,
    canonical_quantity_value numeric(20, 6) NOT NULL CHECK (canonical_quantity_value > 0),
    canonical_quantity_unit text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(quantity_unit)) > 0),
    CHECK (char_length(btrim(canonical_quantity_unit)) > 0),
    UNIQUE (transformation_id, sequence_number),
    UNIQUE (output_lot_id)
);

CREATE TABLE lot_origins (
    lot_id uuid PRIMARY KEY REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    origin_type text NOT NULL
        CHECK (origin_type IN ('purchase', 'transformation', 'adjustment')),
    purchase_id uuid REFERENCES purchases (id) ON DELETE RESTRICT,
    transformation_id uuid REFERENCES transformations (id) ON DELETE RESTRICT,
    transformation_output_id uuid REFERENCES transformation_outputs (id) ON DELETE RESTRICT,
    adjustment_reference text,
    recorded_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    recorded_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (adjustment_reference IS NULL OR char_length(btrim(adjustment_reference)) > 0),
    CHECK (
        (origin_type = 'purchase'
            AND purchase_id IS NOT NULL
            AND transformation_id IS NULL
            AND transformation_output_id IS NULL
            AND adjustment_reference IS NULL)
        OR (origin_type = 'transformation'
            AND purchase_id IS NULL
            AND transformation_id IS NOT NULL
            AND transformation_output_id IS NOT NULL
            AND adjustment_reference IS NULL)
        OR (origin_type = 'adjustment'
            AND purchase_id IS NULL
            AND transformation_id IS NULL
            AND transformation_output_id IS NULL
            AND adjustment_reference IS NOT NULL)
    )
);

COMMENT ON TABLE lot_origins IS
    'Exactly one originating purchase, transformation output, or approved adjustment per lot.';

CREATE TABLE container_lot_assignments (
    id uuid PRIMARY KEY,
    container_id uuid NOT NULL REFERENCES containers (id) ON DELETE RESTRICT,
    lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    assigned_quantity_value numeric(20, 6) NOT NULL CHECK (assigned_quantity_value > 0),
    assigned_quantity_unit text NOT NULL,
    remaining_quantity_value numeric(20, 6) NOT NULL CHECK (remaining_quantity_value >= 0),
    assigned_at timestamptz NOT NULL,
    emptied_at timestamptz,
    assigned_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(assigned_quantity_unit)) > 0),
    CHECK (remaining_quantity_value <= assigned_quantity_value),
    CHECK (emptied_at IS NULL OR emptied_at >= assigned_at),
    CHECK ((remaining_quantity_value > 0 AND emptied_at IS NULL) OR (remaining_quantity_value = 0 AND emptied_at IS NOT NULL))
);

CREATE TABLE lot_custody_events (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    container_id uuid REFERENCES containers (id) ON DELETE RESTRICT,
    from_location_id uuid REFERENCES locations (id) ON DELETE RESTRICT,
    to_location_id uuid REFERENCES locations (id) ON DELETE RESTRICT,
    event_type text NOT NULL
        CHECK (event_type IN ('received', 'stored', 'moved', 'released', 'dispatched', 'returned', 'other')),
    occurred_at timestamptz NOT NULL,
    captured_at timestamptz NOT NULL,
    recorded_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    note text,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (from_location_id IS NOT NULL OR to_location_id IS NOT NULL OR event_type = 'other')
);

CREATE TABLE measurements (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    measurement_type text NOT NULL,
    value_numeric numeric(20, 8),
    value_unit text,
    normalized_value_numeric numeric(20, 8),
    normalized_value_unit text,
    result_text text,
    method text,
    source_type text NOT NULL
        CHECK (source_type IN ('manual', 'device', 'laboratory')),
    status text NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'accepted', 'out_of_limit', 'invalid', 'superseded')),
    instrument_reference text,
    laboratory_name text,
    external_reference text,
    measured_at timestamptz NOT NULL,
    captured_at timestamptz NOT NULL,
    received_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    recorded_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(measurement_type)) > 0),
    CHECK ((value_numeric IS NULL) = (value_unit IS NULL)),
    CHECK ((normalized_value_numeric IS NULL) = (normalized_value_unit IS NULL)),
    CHECK (value_unit IS NULL OR char_length(btrim(value_unit)) > 0),
    CHECK (normalized_value_unit IS NULL OR char_length(btrim(normalized_value_unit)) > 0),
    CHECK (value_numeric IS NOT NULL OR result_text IS NOT NULL),
    CHECK (result_text IS NULL OR char_length(btrim(result_text)) > 0)
);

COMMENT ON TABLE measurements IS
    'Observed quality/process values with entered and normalized units; no binary floating-point storage.';

CREATE TABLE quality_reviews (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    review_type text NOT NULL
        CHECK (review_type IN ('release', 'hold', 'retest', 'reject', 'recall', 'other')),
    disposition text NOT NULL DEFAULT 'pending'
        CHECK (disposition IN ('pending', 'held', 'released', 'rejected', 'recalled')),
    decision_reason text,
    rule_set_version text,
    reviewed_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    reviewed_at timestamptz,
    supersedes_review_id uuid REFERENCES quality_reviews (id) ON DELETE RESTRICT,
    is_current boolean NOT NULL DEFAULT true,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(review_type)) > 0),
    CHECK (rule_set_version IS NULL OR char_length(btrim(rule_set_version)) > 0),
    CHECK (disposition = 'pending' OR (decision_reason IS NOT NULL AND char_length(btrim(decision_reason)) > 0)),
    CHECK ((disposition = 'pending' AND reviewed_at IS NULL) OR (disposition <> 'pending' AND reviewed_at IS NOT NULL AND reviewed_by_actor_id IS NOT NULL)),
    CHECK (supersedes_review_id IS NULL OR supersedes_review_id <> id)
);

COMMENT ON TABLE quality_reviews IS
    'Authorised quality disposition history. The latest current row is a projection; transitions remain audited.';

CREATE TABLE quality_review_measurements (
    quality_review_id uuid NOT NULL REFERENCES quality_reviews (id) ON DELETE RESTRICT,
    measurement_id uuid NOT NULL REFERENCES measurements (id) ON DELETE RESTRICT,
    relevance text,
    PRIMARY KEY (quality_review_id, measurement_id),
    CHECK (relevance IS NULL OR char_length(btrim(relevance)) > 0)
);

CREATE TABLE packaging_batches (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    internal_batch_code text NOT NULL,
    external_lot_code text,
    product_material_kind text NOT NULL
        CHECK (product_material_kind IN ('honey', 'beeswax', 'other')),
    package_size_value numeric(20, 6) NOT NULL CHECK (package_size_value > 0),
    package_size_unit text NOT NULL,
    package_count integer NOT NULL CHECK (package_count > 0),
    packed_quantity_value numeric(20, 6) NOT NULL CHECK (packed_quantity_value > 0),
    packed_quantity_unit text NOT NULL,
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'committed', 'released', 'held', 'closed', 'withdrawn', 'recalled')),
    facility_id uuid REFERENCES facilities (id) ON DELETE RESTRICT,
    packed_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    packaging_date date NOT NULL,
    best_before_date date,
    label_reference text,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    committed_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(internal_batch_code)) > 0),
    CHECK (external_lot_code IS NULL OR char_length(btrim(external_lot_code)) > 0),
    CHECK (char_length(btrim(package_size_unit)) > 0),
    CHECK (char_length(btrim(packed_quantity_unit)) > 0),
    CHECK (best_before_date IS NULL OR best_before_date >= packaging_date),
    CHECK (committed_at IS NULL OR committed_at >= created_at),
    UNIQUE (organization_id, internal_batch_code)
);

COMMENT ON TABLE packaging_batches IS
    'Sale/package batch and batch-level public identity; V1 does not serialize individual jars.';

CREATE TABLE packaging_batch_inputs (
    id uuid PRIMARY KEY,
    packaging_batch_id uuid NOT NULL REFERENCES packaging_batches (id) ON DELETE RESTRICT,
    source_lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    line_number integer NOT NULL CHECK (line_number > 0),
    quantity_value numeric(20, 6) NOT NULL CHECK (quantity_value > 0),
    quantity_unit text NOT NULL,
    canonical_quantity_value numeric(20, 6) NOT NULL CHECK (canonical_quantity_value > 0),
    canonical_quantity_unit text NOT NULL,
    expected_source_lot_version bigint CHECK (expected_source_lot_version IS NULL OR expected_source_lot_version >= 0),
    allocated_at timestamptz NOT NULL,
    created_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(quantity_unit)) > 0),
    CHECK (char_length(btrim(canonical_quantity_unit)) > 0),
    UNIQUE (packaging_batch_id, line_number),
    UNIQUE (packaging_batch_id, source_lot_id)
);

CREATE TABLE public_batch_codes (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    packaging_batch_id uuid NOT NULL REFERENCES packaging_batches (id) ON DELETE RESTRICT,
    code text NOT NULL,
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'retired')),
    issued_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    retired_at timestamptz,
    created_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (char_length(btrim(code)) > 0),
    CHECK (retired_at IS NULL OR retired_at >= issued_at),
    CHECK ((status = 'active' AND retired_at IS NULL) OR (status = 'retired' AND retired_at IS NOT NULL)),
    UNIQUE (packaging_batch_id),
    UNIQUE (organization_id, code)
);

COMMENT ON TABLE public_batch_codes IS
    'Stable, non-sequential public lookup code mapped to a packaging batch.';

CREATE TABLE publication_revisions (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    packaging_batch_id uuid NOT NULL REFERENCES packaging_batches (id) ON DELETE RESTRICT,
    public_batch_code_id uuid NOT NULL REFERENCES public_batch_codes (id) ON DELETE RESTRICT,
    revision_number integer NOT NULL CHECK (revision_number > 0),
    status text NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'approved', 'published', 'withdrawn', 'superseded')),
    snapshot jsonb NOT NULL,
    snapshot_sha256 text,
    approved_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    approved_at timestamptz,
    published_at timestamptz,
    withdrawn_at timestamptz,
    supersedes_revision_id uuid REFERENCES publication_revisions (id) ON DELETE RESTRICT,
    created_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version bigint NOT NULL DEFAULT 0 CHECK (version >= 0),
    CHECK (jsonb_typeof(snapshot) = 'object'),
    CHECK (snapshot_sha256 IS NULL OR snapshot_sha256 ~ '^[0-9a-fA-F]{64}$'),
    CHECK ((approved_by_actor_id IS NULL) = (approved_at IS NULL)),
    CHECK (status = 'draft' OR (approved_by_actor_id IS NOT NULL AND approved_at IS NOT NULL)),
    CHECK (status <> 'published' OR published_at IS NOT NULL),
    CHECK (status <> 'withdrawn' OR withdrawn_at IS NOT NULL),
    CHECK (supersedes_revision_id IS NULL OR supersedes_revision_id <> id),
    UNIQUE (packaging_batch_id, revision_number)
);

COMMENT ON TABLE publication_revisions IS
    'Immutable-at-publication, denormalized public projection. It must not query mutable private records at request time.';
COMMENT ON COLUMN publication_revisions.snapshot IS
    'Whitelisted public facts, generalized provenance, approved claim summaries, and approved editorial references.';

CREATE TABLE publication_revision_sources (
    id uuid PRIMARY KEY,
    publication_revision_id uuid NOT NULL REFERENCES publication_revisions (id) ON DELETE RESTRICT,
    source_type text NOT NULL
        CHECK (source_type IN ('purchase', 'farmer', 'apiary', 'location', 'lot', 'transformation', 'measurement', 'quality_review', 'packaging_batch', 'asset', 'editorial_revision', 'other')),
    source_id uuid NOT NULL,
    source_role text NOT NULL,
    display_order integer NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    source_snapshot jsonb,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(source_role)) > 0),
    CHECK (source_snapshot IS NULL OR jsonb_typeof(source_snapshot) = 'object'),
    UNIQUE (publication_revision_id, source_type, source_id, source_role, display_order)
);

COMMENT ON TABLE publication_revision_sources IS
    'Provider-neutral provenance links allowing each public stage/claim support to be resolved internally.';

CREATE TABLE material_ledger_entries (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    lot_id uuid NOT NULL REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    entry_kind text NOT NULL
        CHECK (entry_kind IN ('purchased', 'produced', 'allocated', 'packaged', 'reserved', 'unreserved', 'adjusted', 'discarded', 'reversal')),
    quantity_delta_value numeric(20, 6) NOT NULL CHECK (quantity_delta_value <> 0),
    quantity_delta_unit text NOT NULL,
    canonical_quantity_delta_value numeric(20, 6) NOT NULL CHECK (canonical_quantity_delta_value <> 0),
    canonical_quantity_delta_unit text NOT NULL,
    purchase_id uuid REFERENCES purchases (id) ON DELETE RESTRICT,
    transformation_allocation_id uuid REFERENCES transformation_allocations (id) ON DELETE RESTRICT,
    transformation_output_id uuid REFERENCES transformation_outputs (id) ON DELETE RESTRICT,
    packaging_batch_input_id uuid REFERENCES packaging_batch_inputs (id) ON DELETE RESTRICT,
    reversal_of_entry_id uuid REFERENCES material_ledger_entries (id) ON DELETE RESTRICT,
    source_operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    reason text,
    occurred_at timestamptz NOT NULL,
    recorded_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    recorded_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(quantity_delta_unit)) > 0),
    CHECK (char_length(btrim(canonical_quantity_delta_unit)) > 0),
    CHECK (reason IS NULL OR char_length(btrim(reason)) > 0),
    CHECK (
        CASE WHEN purchase_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN transformation_allocation_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN transformation_output_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN packaging_batch_input_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN reversal_of_entry_id IS NOT NULL THEN 1 ELSE 0 END
        <= 1
    ),
    CHECK (
        (entry_kind = 'purchased' AND purchase_id IS NOT NULL AND quantity_delta_value > 0)
        OR (entry_kind = 'produced' AND transformation_output_id IS NOT NULL AND quantity_delta_value > 0)
        OR (entry_kind = 'allocated' AND transformation_allocation_id IS NOT NULL AND quantity_delta_value < 0)
        OR (entry_kind = 'packaged' AND packaging_batch_input_id IS NOT NULL AND quantity_delta_value < 0)
        OR (entry_kind = 'reserved' AND quantity_delta_value < 0)
        OR (entry_kind = 'unreserved' AND quantity_delta_value > 0)
        OR (entry_kind = 'adjusted')
        OR (entry_kind = 'discarded' AND quantity_delta_value < 0)
        OR (entry_kind = 'reversal' AND reversal_of_entry_id IS NOT NULL)
    )
);

COMMENT ON TABLE material_ledger_entries IS
    'Signed material quantity movements. Available quantity is the sum of canonical deltas in a command transaction.';
COMMENT ON COLUMN material_ledger_entries.quantity_delta_value IS
    'Positive adds material; negative removes, allocates, reserves, packages, discards, or reverses it.';

CREATE TABLE identifiers (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    identifier_type text NOT NULL
        CHECK (identifier_type IN ('internal', 'qr', 'fallback', 'supplier', 'external', 'gs1', 'farmer_card')),
    value text NOT NULL,
    normalized_value text NOT NULL,
    status text NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'retired')),
    issued_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    retired_at timestamptz,
    created_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(value)) > 0),
    CHECK (char_length(btrim(normalized_value)) > 0),
    CHECK (retired_at IS NULL OR retired_at >= issued_at),
    CHECK ((status = 'active' AND retired_at IS NULL) OR (status = 'retired' AND retired_at IS NOT NULL)),
    UNIQUE (organization_id, identifier_type, normalized_value)
);

COMMENT ON TABLE identifiers IS
    'Replaceable human/QR/fallback identifiers. Replacing a label never changes an application record ID.';

CREATE TABLE identifier_assignments (
    id uuid PRIMARY KEY,
    identifier_id uuid NOT NULL REFERENCES identifiers (id) ON DELETE RESTRICT,
    farmer_id uuid REFERENCES farmers (id) ON DELETE RESTRICT,
    apiary_id uuid REFERENCES apiaries (id) ON DELETE RESTRICT,
    purchase_id uuid REFERENCES purchases (id) ON DELETE RESTRICT,
    traceable_lot_id uuid REFERENCES traceable_lots (id) ON DELETE RESTRICT,
    container_id uuid REFERENCES containers (id) ON DELETE RESTRICT,
    packaging_batch_id uuid REFERENCES packaging_batches (id) ON DELETE RESTRICT,
    assigned_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unassigned_at timestamptz,
    assigned_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    CHECK (unassigned_at IS NULL OR unassigned_at >= assigned_at),
    CHECK (
        CASE WHEN farmer_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN apiary_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN purchase_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN traceable_lot_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN container_id IS NOT NULL THEN 1 ELSE 0 END
        + CASE WHEN packaging_batch_id IS NOT NULL THEN 1 ELSE 0 END
        = 1
    )
);

CREATE TABLE asset_metadata (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    provider text NOT NULL,
    provider_asset_id text,
    provider_object_key text,
    sha256 text NOT NULL,
    media_type text NOT NULL,
    byte_size bigint NOT NULL CHECK (byte_size >= 0),
    original_filename text,
    visibility text NOT NULL
        CHECK (visibility IN ('private', 'public')),
    ingestion_state text NOT NULL DEFAULT 'quarantined'
        CHECK (ingestion_state IN ('quarantined', 'verifying', 'available', 'rejected', 'deleted')),
    retention_class text NOT NULL,
    page_count integer CHECK (page_count IS NULL OR page_count > 0),
    provider_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    uploaded_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    captured_at timestamptz,
    uploaded_at timestamptz,
    verified_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (char_length(btrim(provider)) > 0),
    CHECK (sha256 ~ '^[0-9a-fA-F]{64}$'),
    CHECK (char_length(btrim(media_type)) > 0),
    CHECK (char_length(btrim(retention_class)) > 0),
    CHECK (original_filename IS NULL OR char_length(btrim(original_filename)) > 0),
    CHECK (jsonb_typeof(provider_metadata) = 'object'),
    CHECK (uploaded_at IS NULL OR captured_at IS NULL OR uploaded_at >= captured_at),
    CHECK (verified_at IS NULL OR uploaded_at IS NULL OR verified_at >= uploaded_at)
);

COMMENT ON TABLE asset_metadata IS
    'Application asset identity and integrity metadata; provider bytes and credentials stay behind an adapter.';
COMMENT ON COLUMN asset_metadata.sha256 IS
    'Application-computed SHA-256 of original bytes, independent of provider hashing/deduplication.';

CREATE TABLE asset_provider_mappings (
    id uuid PRIMARY KEY,
    asset_id uuid NOT NULL REFERENCES asset_metadata (id) ON DELETE RESTRICT,
    provider text NOT NULL,
    provider_asset_id text NOT NULL,
    provider_object_key text,
    is_active boolean NOT NULL DEFAULT true,
    mapped_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unmapped_at timestamptz,
    provider_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    CHECK (char_length(btrim(provider)) > 0),
    CHECK (char_length(btrim(provider_asset_id)) > 0),
    CHECK ((is_active AND unmapped_at IS NULL) OR ((NOT is_active) AND unmapped_at IS NOT NULL)),
    CHECK (jsonb_typeof(provider_metadata) = 'object'),
    UNIQUE (provider, provider_asset_id)
);

CREATE TABLE asset_links (
    id uuid PRIMARY KEY,
    asset_id uuid NOT NULL REFERENCES asset_metadata (id) ON DELETE RESTRICT,
    subject_type text NOT NULL
        CHECK (subject_type IN ('actor', 'farmer', 'apiary', 'purchase', 'receipt', 'lot', 'container', 'transformation', 'measurement', 'quality_review', 'packaging_batch', 'publication_revision', 'completed_form', 'other')),
    subject_id uuid NOT NULL,
    link_type text NOT NULL
        CHECK (link_type IN ('evidence', 'original', 'supporting', 'laboratory_report', 'receipt', 'preview', 'editorial', 'other')),
    page_number integer CHECK (page_number IS NULL OR page_number > 0),
    display_order integer NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    created_by_actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (asset_id, subject_type, subject_id, link_type, display_order)
);

COMMENT ON TABLE asset_links IS
    'Typed application links from asset metadata to records. Provider asset IDs never appear in domain links.';

CREATE TABLE audit_events (
    id uuid PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES organizations (id) ON DELETE RESTRICT,
    event_type text NOT NULL,
    actor_id uuid REFERENCES actors (id) ON DELETE RESTRICT,
    subject_type text NOT NULL,
    subject_id uuid,
    operation_id uuid REFERENCES sync_operations (operation_id) ON DELETE RESTRICT,
    correlation_id uuid,
    occurrence_at timestamptz NOT NULL,
    captured_at timestamptz,
    recorded_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reason text,
    before_state jsonb,
    after_state jsonb,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    CHECK (char_length(btrim(event_type)) > 0),
    CHECK (char_length(btrim(subject_type)) > 0),
    CHECK (reason IS NULL OR char_length(btrim(reason)) > 0),
    CHECK (before_state IS NULL OR jsonb_typeof(before_state) = 'object'),
    CHECK (after_state IS NULL OR jsonb_typeof(after_state) = 'object'),
    CHECK (jsonb_typeof(metadata) = 'object')
);

COMMENT ON TABLE audit_events IS
    'Append-only operational audit trail. Application/database roles must deny UPDATE and DELETE in deployment.';

CREATE UNIQUE INDEX actor_roles_one_active_grant
    ON actor_roles (actor_id, role_id)
    WHERE revoked_at IS NULL;

CREATE INDEX actor_identities_actor_idx
    ON actor_identities (actor_id, status);

CREATE INDEX locations_organization_kind_idx
    ON locations (organization_id, location_kind, name);

CREATE INDEX facilities_organization_status_idx
    ON facilities (organization_id, status);

CREATE INDEX actors_organization_status_idx
    ON actors (organization_id, status, display_name);

CREATE INDEX farmers_organization_status_idx
    ON farmers (organization_id, status, farmer_reference);

CREATE INDEX apiaries_farmer_status_idx
    ON apiaries (farmer_id, status);

CREATE INDEX apiaries_location_idx
    ON apiaries (location_id);

CREATE INDEX sync_operations_status_received_idx
    ON sync_operations (organization_id, result_status, received_at);

CREATE INDEX sync_operations_aggregate_idx
    ON sync_operations (organization_id, aggregate_type, aggregate_id, created_at);

CREATE INDEX sync_operations_actor_idx
    ON sync_operations (actor_id, created_at);

CREATE INDEX sync_operation_dependencies_dependency_idx
    ON sync_operation_dependencies (depends_on_operation_id);

CREATE INDEX purchases_farmer_occurred_idx
    ON purchases (farmer_id, occurred_at DESC);

CREATE INDEX purchases_status_occurred_idx
    ON purchases (organization_id, status, occurred_at DESC);

CREATE UNIQUE INDEX purchases_source_operation_uidx
    ON purchases (source_operation_id)
    WHERE source_operation_id IS NOT NULL;

CREATE INDEX purchase_receipts_status_idx
    ON purchase_receipts (organization_id, receipt_status, created_at DESC);

CREATE UNIQUE INDEX purchase_receipts_source_operation_uidx
    ON purchase_receipts (source_operation_id)
    WHERE source_operation_id IS NOT NULL;

CREATE INDEX receipt_acknowledgements_receipt_idx
    ON receipt_acknowledgements (receipt_id, created_at DESC);

CREATE INDEX receipt_disputes_status_idx
    ON receipt_disputes (status, opened_at);

CREATE INDEX traceable_lots_stock_idx
    ON traceable_lots (organization_id, material_kind, quality_disposition, lifecycle_state);

CREATE UNIQUE INDEX traceable_lots_reference_uidx
    ON traceable_lots (organization_id, lot_reference)
    WHERE lot_reference IS NOT NULL;

CREATE UNIQUE INDEX traceable_lots_source_operation_uidx
    ON traceable_lots (source_operation_id)
    WHERE source_operation_id IS NOT NULL;

CREATE INDEX traceable_lots_location_idx
    ON traceable_lots (current_location_id);

CREATE INDEX containers_location_status_idx
    ON containers (organization_id, current_location_id, status);

CREATE UNIQUE INDEX containers_reference_uidx
    ON containers (organization_id, container_reference)
    WHERE container_reference IS NOT NULL;

CREATE UNIQUE INDEX container_lot_assignments_one_open_container
    ON container_lot_assignments (container_id)
    WHERE emptied_at IS NULL;

CREATE INDEX container_lot_assignments_lot_idx
    ON container_lot_assignments (lot_id, emptied_at);

CREATE INDEX transformations_status_occurred_idx
    ON transformations (organization_id, status, occurred_at DESC);

CREATE UNIQUE INDEX transformations_reference_uidx
    ON transformations (organization_id, transformation_reference)
    WHERE transformation_reference IS NOT NULL;

CREATE UNIQUE INDEX transformations_source_operation_uidx
    ON transformations (source_operation_id)
    WHERE source_operation_id IS NOT NULL;

CREATE INDEX transformation_allocations_source_lot_idx
    ON transformation_allocations (source_lot_id, allocated_at);

CREATE INDEX transformation_outputs_lot_idx
    ON transformation_outputs (output_lot_id);

CREATE INDEX lot_custody_events_lot_occurred_idx
    ON lot_custody_events (lot_id, occurred_at DESC);

CREATE INDEX measurements_lot_type_date_idx
    ON measurements (lot_id, measurement_type, measured_at DESC);

CREATE INDEX measurements_status_idx
    ON measurements (organization_id, status, measured_at DESC);

CREATE INDEX quality_reviews_lot_date_idx
    ON quality_reviews (lot_id, created_at DESC);

CREATE INDEX quality_reviews_disposition_idx
    ON quality_reviews (organization_id, disposition, created_at DESC);

CREATE UNIQUE INDEX quality_reviews_one_current_per_lot
    ON quality_reviews (lot_id)
    WHERE is_current;

CREATE INDEX packaging_batches_status_date_idx
    ON packaging_batches (organization_id, status, packaging_date DESC);

CREATE UNIQUE INDEX packaging_batches_external_lot_uidx
    ON packaging_batches (organization_id, external_lot_code)
    WHERE external_lot_code IS NOT NULL;

CREATE UNIQUE INDEX packaging_batches_source_operation_uidx
    ON packaging_batches (source_operation_id)
    WHERE source_operation_id IS NOT NULL;

CREATE INDEX packaging_batch_inputs_source_lot_idx
    ON packaging_batch_inputs (source_lot_id, allocated_at);

CREATE INDEX public_batch_codes_code_idx
    ON public_batch_codes (organization_id, code, status);

CREATE INDEX publication_revisions_batch_status_idx
    ON publication_revisions (packaging_batch_id, status, revision_number DESC);

CREATE UNIQUE INDEX publication_revisions_one_published_batch
    ON publication_revisions (packaging_batch_id)
    WHERE status = 'published';

CREATE INDEX publication_revision_sources_source_idx
    ON publication_revision_sources (source_type, source_id);

CREATE INDEX material_ledger_entries_lot_occurred_idx
    ON material_ledger_entries (lot_id, occurred_at, recorded_at);

CREATE INDEX material_ledger_entries_organization_kind_idx
    ON material_ledger_entries (organization_id, entry_kind, occurred_at);

CREATE UNIQUE INDEX material_ledger_entries_allocation_uidx
    ON material_ledger_entries (transformation_allocation_id)
    WHERE transformation_allocation_id IS NOT NULL;

CREATE UNIQUE INDEX material_ledger_entries_output_uidx
    ON material_ledger_entries (transformation_output_id)
    WHERE transformation_output_id IS NOT NULL;

CREATE UNIQUE INDEX material_ledger_entries_packaging_input_uidx
    ON material_ledger_entries (packaging_batch_input_id)
    WHERE packaging_batch_input_id IS NOT NULL;

CREATE INDEX identifiers_active_lookup_idx
    ON identifiers (organization_id, identifier_type, normalized_value, status);

CREATE UNIQUE INDEX identifier_assignments_one_current
    ON identifier_assignments (identifier_id)
    WHERE unassigned_at IS NULL;

CREATE INDEX identifier_assignments_targets_idx
    ON identifier_assignments (farmer_id, apiary_id, purchase_id, traceable_lot_id, container_id, packaging_batch_id);

CREATE INDEX asset_metadata_hash_idx
    ON asset_metadata (organization_id, sha256);

CREATE INDEX asset_metadata_ingestion_idx
    ON asset_metadata (organization_id, ingestion_state, visibility);

CREATE UNIQUE INDEX asset_metadata_provider_asset_uidx
    ON asset_metadata (provider, provider_asset_id)
    WHERE provider_asset_id IS NOT NULL;

CREATE UNIQUE INDEX asset_provider_mappings_one_active_asset
    ON asset_provider_mappings (asset_id)
    WHERE is_active;

CREATE INDEX asset_provider_mappings_asset_idx
    ON asset_provider_mappings (asset_id, is_active);

CREATE INDEX asset_links_subject_idx
    ON asset_links (subject_type, subject_id, link_type);

CREATE INDEX audit_events_subject_recorded_idx
    ON audit_events (organization_id, subject_type, subject_id, recorded_at);

CREATE INDEX audit_events_actor_recorded_idx
    ON audit_events (actor_id, recorded_at);

CREATE INDEX audit_events_operation_idx
    ON audit_events (operation_id);

COMMIT;
