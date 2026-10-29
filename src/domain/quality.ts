import { AllocationError, AuthorizationError, ValidationError } from "./errors";
import { isApplicationUuid, newEntityId, type MaterialLotId, type QualityReviewId } from "./identifiers";
import {
  canTransitionState,
  createStateTransition,
  requireActorRole,
  type StateTransition,
  type TransitionContext,
} from "./transitions";

export type QualityDispositionState =
  | "pending_review"
  | "held"
  | "quarantined"
  | "released"
  | "rejected"
  | "recalled";

export const QUALITY_DISPOSITION_TRANSITIONS: Readonly<
  Record<QualityDispositionState, readonly QualityDispositionState[]>
> = {
  pending_review: ["held", "quarantined", "released", "rejected", "recalled"],
  held: ["pending_review", "released", "rejected", "recalled"],
  quarantined: ["pending_review", "released", "rejected", "recalled"],
  released: ["held", "quarantined", "recalled"],
  rejected: [],
  recalled: [],
};

export interface QualityDisposition {
  readonly id: QualityReviewId;
  readonly lotId: MaterialLotId;
  readonly state: QualityDispositionState;
  readonly history: readonly StateTransition<QualityDispositionState>[];
}

export interface QualityDispositionInput {
  readonly id?: QualityReviewId;
  readonly lotId: MaterialLotId;
}

export function isQualityDispositionState(value: unknown): value is QualityDispositionState {
  return (
    value === "pending_review" ||
    value === "held" ||
    value === "quarantined" ||
    value === "released" ||
    value === "rejected" ||
    value === "recalled"
  );
}

export function createQualityDisposition(input: QualityDispositionInput): QualityDisposition {
  if (typeof input.lotId !== "string" || input.lotId.length === 0) {
    throw new ValidationError("A quality disposition requires a material lot ID.");
  }

  if (!isApplicationUuid(input.lotId)) {
    throw new ValidationError("A quality disposition requires a UUIDv4 material lot ID.", {
      lotId: input.lotId,
    });
  }

  return {
    id: input.id ?? newEntityId("quality_review"),
    lotId: input.lotId,
    state: "pending_review",
    history: [],
  };
}

export function canTransitionQualityDisposition(
  from: QualityDispositionState,
  to: QualityDispositionState,
): boolean {
  return canTransitionState(QUALITY_DISPOSITION_TRANSITIONS, from, to);
}

export function transitionQualityDisposition(
  disposition: QualityDisposition,
  to: QualityDispositionState,
  context: TransitionContext,
): QualityDisposition {
  // Quality decisions are owned by the quality manager. If the caller passes
  // a role, enforce it here; the application command must always enforce the
  // same permission against the authenticated server-side actor.
  requireActorRole(context, ["quality_manager"]);
  const transition = createStateTransition(
    "quality disposition",
    QUALITY_DISPOSITION_TRANSITIONS,
    disposition.state,
    to,
    context,
  );

  return {
    ...disposition,
    state: to,
    history: [...disposition.history, transition],
  };
}

export function canAllocateDisposition(state: QualityDispositionState): boolean {
  return state === "pending_review" || state === "released";
}

export function assertAllocatableDisposition(state: QualityDispositionState): void {
  if (!canAllocateDisposition(state)) {
    throw new AllocationError(
      `Material in ${state} disposition cannot be allocated without a recorded disposition change.`,
      { state },
    );
  }
}

export function canPackageDisposition(state: QualityDispositionState): boolean {
  return state === "released";
}

export function assertPackageableDisposition(state: QualityDispositionState): void {
  if (!canPackageDisposition(state)) {
    throw new AllocationError(
      `Only released material can be packaged; current disposition is ${state}.`,
      { state },
    );
  }
}

export const canPublishDisposition = canPackageDisposition;

export function assertPublishableDisposition(state: QualityDispositionState): void {
  if (!canPublishDisposition(state)) {
    throw new AuthorizationError(
      `Only released material can be published; current disposition is ${state}.`,
      { state },
    );
  }
}
