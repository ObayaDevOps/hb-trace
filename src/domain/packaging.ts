import { ValidationError } from "./errors";
import {
  isApplicationUuid,
  newEntityId,
  type BatchId,
  type MaterialLotId,
  type PackagingRunId,
} from "./identifiers";
import { toQuantity, type Quantity, type QuantityLike } from "./decimal";
import { type MaterialProduct } from "./products";
import {
  assertPackageableDisposition,
  type QualityDispositionState,
} from "./quality";
import {
  canTransitionState,
  createStateTransition,
  requireActorRole,
  type StateTransition,
  type TransitionContext,
} from "./transitions";

export type PackagingRunState =
  | "draft"
  | "committed"
  | "released"
  | "held"
  | "closed"
  | "withdrawn"
  | "recalled";

export const PACKAGING_RUN_TRANSITIONS: Readonly<
  Record<PackagingRunState, readonly PackagingRunState[]>
> = {
  draft: ["committed"],
  committed: ["released", "held"],
  released: ["held", "closed", "withdrawn", "recalled"],
  held: ["released", "closed", "withdrawn", "recalled"],
  // A closed batch may still be withdrawn or recalled after distribution.
  // Withdrawal may also be escalated to recall without rewriting history.
  closed: ["withdrawn", "recalled"],
  withdrawn: ["recalled"],
  recalled: [],
};

export interface PackagingRun {
  readonly id: PackagingRunId;
  readonly batchId: BatchId;
  readonly sourceLotId: MaterialLotId;
  readonly product: MaterialProduct;
  readonly quantity: Quantity;
  readonly packageSize: Quantity;
  readonly externalLotCode: string;
  readonly state: PackagingRunState;
  readonly history: readonly StateTransition<PackagingRunState>[];
}

export interface PackagingRunInput {
  readonly id?: PackagingRunId;
  readonly batchId?: BatchId;
  readonly sourceLotId: MaterialLotId;
  readonly product: MaterialProduct;
  readonly quantity: QuantityLike;
  readonly packageSize: QuantityLike;
  readonly externalLotCode: string;
}

function assertUuid(value: unknown, fieldName: string): void {
  if (!isApplicationUuid(value)) {
    throw new ValidationError(`${fieldName} must be an application UUIDv4.`, {
      fieldName,
      value,
    });
  }
}

function assertText(value: string, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ValidationError(`${fieldName} must not be empty.`, { fieldName });
  }
  return value.trim();
}

function assertPositiveMass(value: QuantityLike, fieldName: string): Quantity {
  const quantity = toQuantity(value);
  if (quantity.kind !== "mass" || !quantity.isPositive()) {
    throw new ValidationError(`${fieldName} must be a positive mass quantity.`, {
      fieldName,
      value: quantity.toJSON(),
    });
  }
  return quantity;
}

export function createPackagingRun(input: PackagingRunInput): PackagingRun {
  assertUuid(input.sourceLotId, "sourceLotId");
  const quantity = assertPositiveMass(input.quantity, "quantity");
  const packageSize = assertPositiveMass(input.packageSize, "packageSize");
  if (quantity.compare(packageSize) === -1) {
    throw new ValidationError("Package size cannot exceed the run quantity.", {
      quantity: quantity.toJSON(),
      packageSize: packageSize.toJSON(),
    });
  }

  return {
    id: input.id ?? newEntityId("packaging_run"),
    batchId: input.batchId ?? newEntityId("batch"),
    sourceLotId: input.sourceLotId,
    product: input.product,
    quantity,
    packageSize,
    externalLotCode: assertText(input.externalLotCode, "externalLotCode"),
    state: "draft",
    history: [],
  };
}

export function canTransitionPackagingRun(
  from: PackagingRunState,
  to: PackagingRunState,
): boolean {
  return canTransitionState(PACKAGING_RUN_TRANSITIONS, from, to);
}

export function transitionPackagingRun(
  run: PackagingRun,
  to: PackagingRunState,
  context: TransitionContext,
): PackagingRun {
  if (["released", "held", "withdrawn", "recalled"].includes(to)) {
    requireActorRole(context, ["quality_manager"]);
  }
  const transition = createStateTransition(
    "packaging run",
    PACKAGING_RUN_TRANSITIONS,
    run.state,
    to,
    context,
  );
  return { ...run, state: to, history: [...run.history, transition] };
}

/** Commit is the point at which the source quantity is consumed for packaging. */
export function commitPackagingRun(
  run: PackagingRun,
  sourceDisposition: QualityDispositionState,
  context: TransitionContext,
): PackagingRun {
  assertPackageableDisposition(sourceDisposition);
  return transitionPackagingRun(run, "committed", context);
}

export function releasePackagingRun(run: PackagingRun, context: TransitionContext): PackagingRun {
  return transitionPackagingRun(run, "released", context);
}
