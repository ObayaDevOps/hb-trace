import { InvariantViolationError, ValidationError } from "./errors";
import {
  isApplicationUuid,
  type ApplicationUuid,
  type BatchId,
  type MaterialLotId,
  type PackagingRunId,
} from "./identifiers";
import { traceForward } from "./lineage";
import type { MaterialLedger } from "./materials";
import {
  canTransitionPackagingRun,
  type PackagingRun,
  type PackagingRunState,
} from "./packaging";
import {
  canTransitionQualityDisposition,
  type QualityDispositionState,
} from "./quality";
import { assertUtcInstant } from "./transitions";

/** The three quality-manager choices in the V1 batch incident workflow. */
export type BatchActionKind = "hold" | "withdraw" | "recall";
export type BatchPublicPageAction = "unchanged" | "withdrawn" | "notice";

export type PublicJsonPrimitive = string | number | boolean | null;
export type PublicJsonValue = PublicJsonPrimitive | PublicJsonObject | readonly PublicJsonValue[];
export interface PublicJsonObject {
  readonly [key: string]: PublicJsonValue;
}

/**
 * A publication revision is deliberately a small read model here. The
 * server command will load the full persistence record and create a new
 * immutable withdrawal revision when required.
 */
export interface PublicBatchRevisionReference {
  readonly id: ApplicationUuid;
  readonly batchId: BatchId;
  readonly status: "draft" | "approved" | "published" | "withdrawn" | "superseded";
}

export interface CurrentPublicRevision {
  readonly id: ApplicationUuid;
  readonly batchId: BatchId;
  readonly publicBatchCodeId: ApplicationUuid;
  readonly revisionNumber: number;
  readonly status: "published" | "withdrawn" | "superseded";
  readonly snapshot: PublicJsonObject;
}

export interface WithdrawnPublicRevision extends CurrentPublicRevision {
  readonly status: "withdrawn";
  readonly approvedByActorId: ApplicationUuid;
  readonly approvedAt: string;
  readonly publishedAt: null;
  readonly withdrawnAt: string;
  readonly createdByActorId: ApplicationUuid;
  readonly supersedesRevisionId: ApplicationUuid;
}

export interface WithdrawalRevisionInput {
  readonly id: ApplicationUuid;
  readonly actorId: ApplicationUuid;
  readonly withdrawnAt: string;
  readonly snapshot?: PublicJsonObject;
}

export type BatchImpactTransitionStatus = "required" | "already_satisfied" | "blocked";

export interface LotImpactTransition {
  readonly lotId: MaterialLotId;
  readonly from: QualityDispositionState;
  readonly to: QualityDispositionState;
  readonly status: BatchImpactTransitionStatus;
}

export interface PackagingRunImpactTransition {
  readonly packagingRunId: PackagingRunId;
  readonly batchId: BatchId;
  readonly from: PackagingRunState;
  readonly to: PackagingRunState;
  readonly status: BatchImpactTransitionStatus;
}

export interface BlockedBatchImpactTransition {
  readonly entity: "material_lot" | "packaging_run";
  readonly id: string;
  readonly from: string;
  readonly to: string;
}

export interface BatchImpactRequest {
  readonly action: BatchActionKind;
  /** One or more upstream lots whose complete forward lineage is affected. */
  readonly rootLotIds?: readonly MaterialLotId[];
  /** One or more packaging batches to scope directly. */
  readonly rootBatchIds?: readonly BatchId[];
  /** Recall policy is explicit; withdrawal always removes the public page. */
  readonly publicPageAction?: BatchPublicPageAction;
  readonly ledger: Pick<MaterialLedger, "lots" | "allocations">;
  readonly packagingRuns: readonly PackagingRun[];
  readonly publicationRevisions?: readonly PublicBatchRevisionReference[];
}

export interface BatchImpactPlan {
  readonly action: BatchActionKind;
  readonly rootLotIds: readonly MaterialLotId[];
  readonly rootBatchIds: readonly BatchId[];
  /** Includes upstream roots and every reachable downstream material lot. */
  readonly affectedLotIds: readonly MaterialLotId[];
  readonly affectedPackagingRunIds: readonly PackagingRunId[];
  readonly affectedBatchIds: readonly BatchId[];
  /** Only active published revisions are returned; historical revisions stay untouched. */
  readonly affectedPublishedRevisionIds: readonly ApplicationUuid[];
  /** Hold is operational only; withdrawal/recall use the selected public policy. */
  readonly publicPageAction: BatchPublicPageAction;
  readonly lotTransitions: readonly LotImpactTransition[];
  readonly packagingRunTransitions: readonly PackagingRunImpactTransition[];
  readonly blockedTransitions: readonly BlockedBatchImpactTransition[];
  readonly executable: boolean;
}

function assertUuid(value: unknown, fieldName: string): void {
  if (!isApplicationUuid(value)) {
    throw new ValidationError(`${fieldName} must be an application UUIDv4.`, { fieldName, value });
  }
}

function assertBatchAction(value: unknown): asserts value is BatchActionKind {
  if (value !== "hold" && value !== "withdraw" && value !== "recall") {
    throw new ValidationError("Unknown batch action.", { action: value });
  }
}

function resolvePublicPageAction(
  action: BatchActionKind,
  requested: BatchPublicPageAction | undefined,
): BatchPublicPageAction {
  if (action === "hold") {
    if (requested !== undefined && requested !== "unchanged") {
      throw new ValidationError("A hold cannot change the public page action.", {
        action,
        publicPageAction: requested,
      });
    }
    return "unchanged";
  }
  if (action === "withdraw") {
    if (requested !== undefined && requested !== "withdrawn") {
      throw new ValidationError("A withdrawal must withdraw the public page.", {
        action,
        publicPageAction: requested,
      });
    }
    return "withdrawn";
  }
  if (requested === "unchanged") {
    throw new ValidationError("A recall cannot leave an affected public page unchanged.", {
      action,
      publicPageAction: requested,
    });
  }
  if (requested !== undefined && requested !== "withdrawn" && requested !== "notice") {
    throw new ValidationError("A recall public page action must be withdrawn or notice.", {
      action,
      publicPageAction: requested,
    });
  }
  return requested ?? "withdrawn";
}

function uniqueIds<T extends string>(values: readonly T[] | undefined, fieldName: string): readonly T[] {
  if (values !== undefined && !Array.isArray(values)) {
    throw new ValidationError(`${fieldName} must be an array of IDs.`, { fieldName });
  }
  const normalized = [...(values ?? [])];
  if (new Set(normalized).size !== normalized.length) {
    throw new ValidationError(`${fieldName} must not contain duplicate IDs.`, { fieldName });
  }
  for (const value of normalized) assertUuid(value, fieldName);
  return normalized;
}

function sorted<T extends string>(values: Iterable<T>): readonly T[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function requestedLotDisposition(action: BatchActionKind): QualityDispositionState {
  return action === "recall" ? "recalled" : "held";
}

function requestedPackagingState(action: BatchActionKind): PackagingRunState {
  if (action === "hold") return "held";
  return action === "withdraw" ? "withdrawn" : "recalled";
}

function isAtLeastAsRestrictive(
  current: QualityDispositionState,
  requested: QualityDispositionState,
): boolean {
  if (current === requested) return true;
  // Quarantined/rejected/recalled material is already blocked from further
  // use, so a weaker hold request need not rewrite the disposition.
  if (requested === "held" && (current === "quarantined" || current === "recalled" || current === "rejected")) return true;
  if (requested === "recalled" && current === "rejected") return true;
  return false;
}

function isAtLeastAsRestrictivePackaging(
  current: PackagingRunState,
  requested: PackagingRunState,
): boolean {
  if (current === requested) return true;
  if (requested === "held" && (current === "withdrawn" || current === "recalled")) return true;
  if (requested === "withdrawn" && current === "recalled") return true;
  return false;
}

function planLotTransition(
  lotId: MaterialLotId,
  from: QualityDispositionState,
  to: QualityDispositionState,
): LotImpactTransition {
  if (isAtLeastAsRestrictive(from, to)) {
    return { lotId, from, to, status: "already_satisfied" };
  }
  if (canTransitionQualityDisposition(from, to)) {
    return { lotId, from, to, status: "required" };
  }
  return { lotId, from, to, status: "blocked" };
}

function planPackagingTransition(
  run: PackagingRun,
  to: PackagingRunState,
): PackagingRunImpactTransition {
  if (isAtLeastAsRestrictivePackaging(run.state, to)) {
    return {
      packagingRunId: run.id,
      batchId: run.batchId,
      from: run.state,
      to,
      status: "already_satisfied",
    };
  }
  if (canTransitionPackagingRun(run.state, to)) {
    return {
      packagingRunId: run.id,
      batchId: run.batchId,
      from: run.state,
      to,
      status: "required",
    };
  }
  return {
    packagingRunId: run.id,
    batchId: run.batchId,
    from: run.state,
    to,
    status: "blocked",
  };
}

function validatePublicationReferences(
  revisions: readonly PublicBatchRevisionReference[],
): void {
  const ids = new Set<string>();
  for (const revision of revisions) {
    assertUuid(revision.id, "publication revision id");
    assertUuid(revision.batchId, "publication revision batchId");
    if (ids.has(revision.id)) {
      throw new ValidationError("Publication revision IDs must be unique.", { revisionId: revision.id });
    }
    ids.add(revision.id);
  }
}

function clonePublicJson(value: PublicJsonValue): PublicJsonValue {
  if (Array.isArray(value)) return value.map(clonePublicJson);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, clonePublicJson(child)]),
    );
  }
  return value;
}

function clonePublicSnapshot(snapshot: PublicJsonObject): PublicJsonObject {
  return clonePublicJson(snapshot) as PublicJsonObject;
}

/**
 * Create a new immutable public revision for a withdrawal. The current
 * published revision is never rewritten; the future persistence command can
 * insert this result and make it the active response in the same transaction
 * as the batch action.
 */
export function createWithdrawnPublicRevision(
  current: CurrentPublicRevision,
  input: WithdrawalRevisionInput,
): WithdrawnPublicRevision {
  assertUuid(current.id, "current publication revision id");
  assertUuid(current.batchId, "current publication batchId");
  assertUuid(current.publicBatchCodeId, "current public batch code id");
  assertUuid(input.id, "withdrawal revision id");
  assertUuid(input.actorId, "withdrawal actorId");
  assertUtcInstant(input.withdrawnAt, "withdrawnAt");
  if (current.status !== "published") {
    throw new ValidationError("A withdrawal revision must supersede the active published revision.", {
      currentRevisionId: current.id,
      currentStatus: current.status,
    });
  }
  if (
    !Number.isSafeInteger(current.revisionNumber) ||
    current.revisionNumber < 1 ||
    current.revisionNumber >= Number.MAX_SAFE_INTEGER
  ) {
    throw new ValidationError("The current publication revision number must be a positive safe integer.", {
      revisionNumber: current.revisionNumber,
    });
  }

  return {
    id: input.id,
    batchId: current.batchId,
    publicBatchCodeId: current.publicBatchCodeId,
    revisionNumber: current.revisionNumber + 1,
    status: "withdrawn",
    snapshot: clonePublicSnapshot(input.snapshot ?? current.snapshot),
    approvedByActorId: input.actorId,
    approvedAt: input.withdrawnAt,
    publishedAt: null,
    withdrawnAt: input.withdrawnAt,
    createdByActorId: input.actorId,
    supersedesRevisionId: current.id,
  };
}

/**
 * Calculate the complete downstream scope before a command mutates anything.
 *
 * The result is intentionally a plan rather than a persistence write. A
 * server command can use it inside one transaction, lock the listed records,
 * re-check versions, append quality/recall/audit records and then commit the
 * plan atomically. No caller should implement a partial best-effort update.
 */
export function planBatchImpact(input: BatchImpactRequest): BatchImpactPlan {
  assertBatchAction(input.action);
  const rootLotIds = uniqueIds(input.rootLotIds, "rootLotIds") as readonly MaterialLotId[];
  const rootBatchIds = uniqueIds(input.rootBatchIds, "rootBatchIds") as readonly BatchId[];
  const publicPageAction = resolvePublicPageAction(input.action, input.publicPageAction);
  if (rootLotIds.length === 0 && rootBatchIds.length === 0) {
    throw new ValidationError("A batch action requires at least one root lot or packaging batch.");
  }

  const lotsById = new Map(input.ledger.lots.map((lot) => [lot.id, lot]));
  const affectedLotIdSet = new Set<MaterialLotId>();
  for (const rootLotId of rootLotIds) {
    if (!lotsById.has(rootLotId)) {
      throw new ValidationError("A batch action root lot was not found in the supplied ledger.", { rootLotId });
    }
    for (const lotId of traceForward(input.ledger, rootLotId).lotIds) {
      affectedLotIdSet.add(lotId);
    }
  }

  const packagingRuns = [...input.packagingRuns].sort((left, right) => left.id.localeCompare(right.id));
  const packagingRunIds = new Set<string>();
  for (const run of packagingRuns) {
    if (packagingRunIds.has(run.id)) {
      throw new ValidationError("Packaging run IDs must be unique in an impact request.", {
        packagingRunId: run.id,
      });
    }
    packagingRunIds.add(run.id);
    if (!lotsById.has(run.sourceLotId)) {
      throw new ValidationError("A packaging run references a lot outside the supplied ledger.", {
        packagingRunId: run.id,
        sourceLotId: run.sourceLotId,
      });
    }
  }

  const rootBatchIdSet = new Set(rootBatchIds);
  const affectedRuns = packagingRuns.filter(
    (run) => rootBatchIdSet.has(run.batchId) || affectedLotIdSet.has(run.sourceLotId),
  );
  for (const rootBatchId of rootBatchIds) {
    if (!affectedRuns.some((run) => run.batchId === rootBatchId)) {
      throw new ValidationError("A batch action root packaging batch was not found.", { rootBatchId });
    }
  }

  const affectedPackagingRunIds = affectedRuns.map((run) => run.id);
  const affectedBatchIds = sorted(affectedRuns.map((run) => run.batchId)) as readonly BatchId[];
  const publicationRevisions = input.publicationRevisions ?? [];
  validatePublicationReferences(publicationRevisions);
  const affectedBatchIdSet = new Set(affectedBatchIds);
  const affectedPublishedRevisionIds = sorted(
    publicationRevisions
      .filter((revision) => revision.status === "published" && affectedBatchIdSet.has(revision.batchId))
      .map((revision) => revision.id),
  );

  const lotTarget = requestedLotDisposition(input.action);
  const lotTransitions = sorted(affectedLotIdSet).map((lotId) => {
    const lot = lotsById.get(lotId);
    if (!lot) {
      throw new InvariantViolationError("The impact graph referenced an unknown material lot.", { lotId });
    }
    return planLotTransition(lotId, lot.qualityDisposition, lotTarget);
  });

  const packagingTarget = requestedPackagingState(input.action);
  const packagingRunTransitions = affectedRuns.map((run) => planPackagingTransition(run, packagingTarget));
  const blockedTransitions = [
    ...lotTransitions
      .filter((transition) => transition.status === "blocked")
      .map((transition) => ({
        entity: "material_lot" as const,
        id: transition.lotId,
        from: transition.from,
        to: transition.to,
      })),
    ...packagingRunTransitions
      .filter((transition) => transition.status === "blocked")
      .map((transition) => ({
        entity: "packaging_run" as const,
        id: transition.packagingRunId,
        from: transition.from,
        to: transition.to,
      })),
  ].sort((left, right) => left.entity.localeCompare(right.entity) || left.id.localeCompare(right.id));

  return {
    action: input.action,
    rootLotIds: [...rootLotIds].sort(),
    rootBatchIds: [...rootBatchIds].sort(),
    affectedLotIds: sorted(affectedLotIdSet),
    affectedPackagingRunIds,
    affectedBatchIds,
    affectedPublishedRevisionIds,
    publicPageAction,
    lotTransitions,
    packagingRunTransitions,
    blockedTransitions,
    executable: blockedTransitions.length === 0,
  };
}

/** Guard used by the future transactional command before it writes any row. */
export function assertExecutableBatchImpact(plan: BatchImpactPlan): void {
  if (plan.blockedTransitions.length > 0) {
    throw new InvariantViolationError(
      "A batch action contains state transitions that cannot be committed atomically.",
      { blockedTransitions: plan.blockedTransitions },
    );
  }
}
