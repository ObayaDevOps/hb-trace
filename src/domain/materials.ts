import { AllocationError, InvariantViolationError, ValidationError } from "./errors";
import {
  isApplicationUuid,
  newEntityId,
  type ActorId,
  type AdjustmentId,
  type AllocationId,
  type FacilityId,
  type HarvestId,
  type MaterialLotId,
  type PurchaseId,
  type TransformationId,
} from "./identifiers";
import {
  createQuantity,
  Decimal,
  toQuantity,
  type Quantity,
  type QuantityLike,
} from "./decimal";
import { isMaterialProduct, type MaterialProduct } from "./products";
import {
  assertAllocatableDisposition,
  isQualityDispositionState,
  type QualityDisposition,
  type QualityDispositionState,
} from "./quality";
import { assertNoLineageCycles } from "./lineage";
import { assertUtcInstant } from "./transitions";

export type MaterialOrigin =
  | { readonly kind: "purchase"; readonly purchaseId: PurchaseId }
  | { readonly kind: "harvest"; readonly harvestId: HarvestId }
  | { readonly kind: "transformation"; readonly transformationId: TransformationId }
  | { readonly kind: "adjustment"; readonly adjustmentId: AdjustmentId; readonly reason: string };

export interface MaterialLot {
  readonly id: MaterialLotId;
  readonly product: MaterialProduct;
  readonly quantity: Quantity;
  readonly origin: MaterialOrigin;
  readonly qualityDisposition: QualityDispositionState;
  /** These are ledger facts, not a manually editable availability state. */
  readonly reservedQuantity: Quantity;
  readonly discardedQuantity: Quantity;
  readonly packagedQuantity: Quantity;
}

export interface MaterialLotInput {
  readonly id?: MaterialLotId;
  readonly product: MaterialProduct;
  readonly quantity: QuantityLike;
  readonly origin: MaterialOrigin;
  readonly qualityDisposition?: QualityDispositionState;
  readonly reservedQuantity?: QuantityLike;
  readonly discardedQuantity?: QuantityLike;
  readonly packagedQuantity?: QuantityLike;
}

export type MaterialLotLike = MaterialLot | MaterialLotInput;

function assertUuid(value: unknown, fieldName: string): void {
  if (!isApplicationUuid(value)) {
    throw new ValidationError(`${fieldName} must be an application UUIDv4.`, {
      fieldName,
      value,
    });
  }
}

function positiveMass(input: QuantityLike, fieldName: string): Quantity {
  const quantity = toQuantity(input);
  if (quantity.kind !== "mass" || !quantity.isPositive()) {
    throw new ValidationError(`${fieldName} must be a positive mass quantity.`, {
      fieldName,
      value: quantity.toJSON(),
    });
  }
  return quantity;
}

function nonNegativeMass(input: QuantityLike | undefined, fieldName: string): Quantity {
  const quantity = input === undefined ? createQuantity("0", "kg") : toQuantity(input);
  if (quantity.kind !== "mass") {
    throw new ValidationError(`${fieldName} must be a mass quantity.`, {
      fieldName,
      value: quantity.toJSON(),
    });
  }
  return quantity;
}

function validateOrigin(origin: MaterialOrigin): MaterialOrigin {
  switch (origin.kind) {
    case "purchase":
      assertUuid(origin.purchaseId, "origin.purchaseId");
      return origin;
    case "harvest":
      assertUuid(origin.harvestId, "origin.harvestId");
      return origin;
    case "transformation":
      assertUuid(origin.transformationId, "origin.transformationId");
      return origin;
    case "adjustment":
      assertUuid(origin.adjustmentId, "origin.adjustmentId");
      if (typeof origin.reason !== "string" || origin.reason.trim().length === 0) {
        throw new ValidationError("An adjustment origin requires a reason.");
      }
      return { ...origin, reason: origin.reason.trim() };
    default:
      throw new ValidationError("Unknown material lot origin.", { origin });
  }
}

function canonicalMass(value: QuantityLike, fieldName: string, requirePositive = false): Quantity {
  const quantity = toQuantity(value);
  if (quantity.kind !== "mass" || (requirePositive && !quantity.isPositive())) {
    throw new ValidationError(
      `${fieldName} must be ${requirePositive ? "a positive " : "a "}mass quantity.`,
      { fieldName, value: quantity.toJSON() },
    );
  }
  return quantity.toCanonical();
}

function sumDecimal(values: readonly Decimal[]): Decimal {
  return values.reduce((sum, value) => sum.add(value), Decimal.zero());
}

function decimalForQuantity(value: QuantityLike): Decimal {
  return canonicalMass(value, "quantity").value;
}

function decimalQuantity(value: Decimal): Quantity {
  return createQuantity(value, "kg");
}

function assertNoMoreThan(total: Decimal, limit: Decimal, fieldName: string): void {
  if (total.greaterThan(limit)) {
    throw new InvariantViolationError(`${fieldName} exceeds the lot quantity.`, {
      total: total.toString(),
      limit: limit.toString(),
    });
  }
}

export function createMaterialLot(input: MaterialLotInput): MaterialLot {
  if (!isMaterialProduct(input.product)) {
    throw new ValidationError("Unknown material product.", { product: input.product });
  }
  const quantity = positiveMass(input.quantity, "quantity");
  const reservedQuantity = nonNegativeMass(input.reservedQuantity, "reservedQuantity");
  const discardedQuantity = nonNegativeMass(input.discardedQuantity, "discardedQuantity");
  const packagedQuantity = nonNegativeMass(input.packagedQuantity, "packagedQuantity");
  const totalCommitted = sumDecimal([
    reservedQuantity.canonicalValue,
    discardedQuantity.canonicalValue,
    packagedQuantity.canonicalValue,
  ]);
  assertNoMoreThan(totalCommitted, quantity.canonicalValue, "Initial material usage");

  const qualityDisposition = input.qualityDisposition ?? "pending_review";
  if (!isQualityDispositionState(qualityDisposition)) {
    throw new ValidationError("Unknown quality disposition.", { qualityDisposition });
  }

  return {
    id: input.id ?? newEntityId("material_lot"),
    product: input.product,
    quantity,
    origin: validateOrigin(input.origin),
    qualityDisposition,
    reservedQuantity,
    discardedQuantity,
    packagedQuantity,
  };
}

export function applyQualityDisposition(
  lot: MaterialLot,
  disposition: QualityDisposition,
): MaterialLot {
  if (lot.id !== disposition.lotId) {
    throw new InvariantViolationError("Quality disposition does not belong to the material lot.", {
      lotId: lot.id,
      dispositionLotId: disposition.lotId,
    });
  }
  return { ...lot, qualityDisposition: disposition.state };
}

export interface MaterialAllocationInput {
  readonly id?: AllocationId;
  readonly transformationId: TransformationId;
  readonly sourceLotId: MaterialLotId;
  readonly targetLotId: MaterialLotId;
  readonly quantity: QuantityLike;
}

export interface MaterialAllocation {
  readonly id: AllocationId;
  readonly transformationId: TransformationId;
  readonly sourceLotId: MaterialLotId;
  readonly targetLotId: MaterialLotId;
  /** Allocations are stored in canonical kilograms. */
  readonly quantity: Quantity;
}

export function createMaterialAllocation(input: MaterialAllocationInput): MaterialAllocation {
  assertUuid(input.transformationId, "transformationId");
  assertUuid(input.sourceLotId, "sourceLotId");
  assertUuid(input.targetLotId, "targetLotId");
  return {
    id: input.id ?? newEntityId("allocation"),
    transformationId: input.transformationId,
    sourceLotId: input.sourceLotId,
    targetLotId: input.targetLotId,
    quantity: canonicalMass(input.quantity, "allocation.quantity", true),
  };
}

export type TransformationState = "draft" | "committed";

export interface TransformationInput {
  readonly sourceLotId: MaterialLotId;
  readonly quantity: QuantityLike;
}

export interface TransformationDraft {
  readonly id: TransformationId;
  readonly operatorId: ActorId;
  readonly facilityId: FacilityId;
  readonly occurredAt: string;
  readonly capturedAt?: string;
  readonly inputs: readonly TransformationInput[];
  readonly outputs: readonly MaterialLotLike[];
  readonly allocations: readonly MaterialAllocationInput[];
}

export interface CommittedTransformation {
  readonly id: TransformationId;
  readonly state: "committed";
  readonly operatorId: ActorId;
  readonly facilityId: FacilityId;
  readonly occurredAt: string;
  readonly capturedAt?: string;
  readonly committedAt: string;
  readonly inputLotIds: readonly MaterialLotId[];
  readonly outputLotIds: readonly MaterialLotId[];
  readonly allocationIds: readonly AllocationId[];
}

export interface TransformationCommitContext {
  readonly committedAt?: string;
}

export interface MaterialLedger {
  readonly lots: readonly MaterialLot[];
  readonly allocations: readonly MaterialAllocation[];
  readonly transformations: readonly CommittedTransformation[];
}

function normalizeLot(input: MaterialLotLike): MaterialLot {
  return createMaterialLot(input);
}

function normalizeTransformationRecord(record: CommittedTransformation): CommittedTransformation {
  assertUuid(record.id, "transformation.id");
  assertUuid(record.operatorId, "transformation.operatorId");
  assertUuid(record.facilityId, "transformation.facilityId");
  assertUtcInstant(record.occurredAt, "transformation.occurredAt");
  assertUtcInstant(record.committedAt, "transformation.committedAt");
  return {
    ...record,
    inputLotIds: [...record.inputLotIds],
    outputLotIds: [...record.outputLotIds],
    allocationIds: [...record.allocationIds],
  };
}

function allocationsBySource(
  allocations: readonly MaterialAllocation[],
): Map<MaterialLotId, MaterialAllocation[]> {
  const result = new Map<MaterialLotId, MaterialAllocation[]>();
  for (const allocation of allocations) {
    const list = result.get(allocation.sourceLotId) ?? [];
    list.push(allocation);
    result.set(allocation.sourceLotId, list);
  }
  return result;
}

function allocationsByTarget(
  allocations: readonly MaterialAllocation[],
): Map<MaterialLotId, MaterialAllocation[]> {
  const result = new Map<MaterialLotId, MaterialAllocation[]>();
  for (const allocation of allocations) {
    const list = result.get(allocation.targetLotId) ?? [];
    list.push(allocation);
    result.set(allocation.targetLotId, list);
  }
  return result;
}

function validateLedgerInvariants(
  lots: readonly MaterialLot[],
  allocations: readonly MaterialAllocation[],
  transformations: readonly CommittedTransformation[],
): void {
  const lotsById = new Map<MaterialLotId, MaterialLot>();
  for (const lot of lots) {
    assertUuid(lot.id, "materialLot.id");
    if (lotsById.has(lot.id)) {
      throw new InvariantViolationError("Material lot IDs must be unique.", { lotId: lot.id });
    }
    lotsById.set(lot.id, lot);
  }

  const allocationIds = new Set<AllocationId>();
  const allocationPairs = new Set<string>();
  for (const allocation of allocations) {
    if (allocationIds.has(allocation.id)) {
      throw new InvariantViolationError("Allocation IDs must be unique.", { allocationId: allocation.id });
    }
    allocationIds.add(allocation.id);

    const source = lotsById.get(allocation.sourceLotId);
    const target = lotsById.get(allocation.targetLotId);
    if (!source || !target) {
      throw new InvariantViolationError("Allocation endpoints must exist in the material ledger.", {
        allocationId: allocation.id,
        sourceLotId: allocation.sourceLotId,
        targetLotId: allocation.targetLotId,
      });
    }
    if (allocation.sourceLotId === allocation.targetLotId) {
      throw new AllocationError("A material lot cannot allocate to itself.", {
        lotId: allocation.sourceLotId,
      });
    }
    if (!allocation.quantity.isPositive() || allocation.quantity.kind !== "mass") {
      throw new AllocationError("Allocation quantity must be a positive mass quantity.", {
        allocationId: allocation.id,
      });
    }
    if (
      target.origin.kind !== "transformation" ||
      target.origin.transformationId !== allocation.transformationId
    ) {
      throw new InvariantViolationError(
        "An allocation target must be an output of the same transformation.",
        { allocationId: allocation.id, targetLotId: target.id },
      );
    }

    const pair = `${allocation.transformationId}\u0000${allocation.sourceLotId}\u0000${allocation.targetLotId}`;
    if (allocationPairs.has(pair)) {
      throw new InvariantViolationError("A transformation cannot duplicate a source/output edge.", {
        sourceLotId: allocation.sourceLotId,
        targetLotId: allocation.targetLotId,
        transformationId: allocation.transformationId,
      });
    }
    allocationPairs.add(pair);
  }

  assertNoLineageCycles(allocations);

  const incoming = allocationsByTarget(allocations);
  for (const lot of lots) {
    const incomingEdges = incoming.get(lot.id) ?? [];
    const origin = lot.origin;
    if (origin.kind === "transformation") {
      if (incomingEdges.length === 0) {
        throw new InvariantViolationError("A transformation output must have direct input allocations.", {
          lotId: lot.id,
        });
      }
      const incomingQuantity = sumDecimal(incomingEdges.map((edge) => edge.quantity.canonicalValue));
      if (!incomingQuantity.equals(lot.quantity.canonicalValue)) {
        throw new InvariantViolationError(
          "Direct input allocations must exactly explain a transformation output quantity.",
          {
            lotId: lot.id,
            allocated: incomingQuantity.toString(),
            outputQuantity: lot.quantity.canonicalValue.toString(),
          },
        );
      }
      if (incomingEdges.some((edge) => edge.transformationId !== origin.transformationId)) {
        throw new InvariantViolationError("A material lot cannot have multiple transformation origins.", {
          lotId: lot.id,
        });
      }
    } else if (incomingEdges.length > 0) {
      throw new InvariantViolationError("Only transformation-origin lots may have input allocations.", {
        lotId: lot.id,
      });
    }
  }

  const outgoing = allocationsBySource(allocations);
  for (const lot of lots) {
    const allocatedQuantity = sumDecimal(
      (outgoing.get(lot.id) ?? []).map((edge) => edge.quantity.canonicalValue),
    );
    const otherUsage = sumDecimal([
      lot.reservedQuantity.canonicalValue,
      lot.discardedQuantity.canonicalValue,
      lot.packagedQuantity.canonicalValue,
    ]);
    assertNoMoreThan(allocatedQuantity.add(otherUsage), lot.quantity.canonicalValue, "Material usage");
  }

  const transformationIds = new Set<TransformationId>();
  for (const transformation of transformations) {
    const normalized = normalizeTransformationRecord(transformation);
    if (transformationIds.has(normalized.id)) {
      throw new InvariantViolationError("Transformation IDs must be unique.", {
        transformationId: normalized.id,
      });
    }
    transformationIds.add(normalized.id);
    for (const allocationId of normalized.allocationIds) {
      const allocation = allocations.find((candidate) => candidate.id === allocationId);
      if (!allocation || allocation.transformationId !== normalized.id) {
        throw new InvariantViolationError("Transformation records must reference their own allocations.", {
          transformationId: normalized.id,
          allocationId,
        });
      }
    }
  }
}

export function createMaterialLedger(
  lots: readonly MaterialLotLike[],
  allocations: readonly MaterialAllocationInput[] = [],
  transformations: readonly CommittedTransformation[] = [],
): MaterialLedger {
  const normalizedLots = lots.map(normalizeLot);
  const normalizedAllocations = allocations.map(createMaterialAllocation);
  const normalizedTransformations = transformations.map(normalizeTransformationRecord);
  validateLedgerInvariants(normalizedLots, normalizedAllocations, normalizedTransformations);
  return {
    lots: normalizedLots,
    allocations: normalizedAllocations,
    transformations: normalizedTransformations,
  };
}

export function availableQuantity(ledger: MaterialLedger, lotId: MaterialLotId): Quantity {
  const lot = ledger.lots.find((candidate) => candidate.id === lotId);
  if (!lot) {
    throw new ValidationError("Material lot was not found in the ledger.", { lotId });
  }

  const allocatedQuantity = sumDecimal(
    ledger.allocations
      .filter((allocation) => allocation.sourceLotId === lotId)
      .map((allocation) => allocation.quantity.canonicalValue),
  );
  const otherUsage = sumDecimal([
    lot.reservedQuantity.canonicalValue,
    lot.discardedQuantity.canonicalValue,
    lot.packagedQuantity.canonicalValue,
  ]);
  const available = lot.quantity.canonicalValue.subtract(allocatedQuantity).subtract(otherUsage);
  if (available.isNegative()) {
    throw new InvariantViolationError("Material availability cannot be negative.", { lotId });
  }
  return decimalQuantity(available);
}

function validateAdditionalAllocations(
  ledger: MaterialLedger,
  candidateLots: readonly MaterialLot[],
  allocations: readonly MaterialAllocation[],
): void {
  const lotsById = new Map(candidateLots.map((lot) => [lot.id, lot]));
  const existingAllocationIds = new Set(ledger.allocations.map((allocation) => allocation.id));
  const existingPairs = new Set(
    ledger.allocations.map(
      (allocation) =>
        `${allocation.transformationId}\u0000${allocation.sourceLotId}\u0000${allocation.targetLotId}`,
    ),
  );
  const plannedBySource = new Map<MaterialLotId, Decimal[]>();

  for (const allocation of allocations) {
    if (existingAllocationIds.has(allocation.id)) {
      throw new AllocationError("Allocation ID has already been committed.", {
        allocationId: allocation.id,
      });
    }
    existingAllocationIds.add(allocation.id);

    const source = ledger.lots.find((lot) => lot.id === allocation.sourceLotId);
    const target = lotsById.get(allocation.targetLotId);
    if (!source || !target) {
      throw new AllocationError("New allocation endpoints must exist in the ledger.", {
        allocationId: allocation.id,
      });
    }
    if (source.id === target.id) {
      throw new AllocationError("A material lot cannot allocate to itself.", { lotId: source.id });
    }
    if (target.origin.kind !== "transformation" || target.origin.transformationId !== allocation.transformationId) {
      throw new AllocationError(
        "Allocation target must be an output lot of the same transformation.",
        { allocationId: allocation.id },
      );
    }
    const pair = `${allocation.transformationId}\u0000${allocation.sourceLotId}\u0000${allocation.targetLotId}`;
    if (existingPairs.has(pair)) {
      throw new AllocationError("A source/output allocation edge is already committed.", { pair });
    }
    existingPairs.add(pair);
    assertAllocatableDisposition(source.qualityDisposition);

    const planned = plannedBySource.get(source.id) ?? [];
    planned.push(allocation.quantity.canonicalValue);
    plannedBySource.set(source.id, planned);
  }

  for (const [sourceLotId, quantities] of plannedBySource) {
    const requested = sumDecimal(quantities);
    const available = availableQuantity(ledger, sourceLotId).canonicalValue;
    if (requested.greaterThan(available)) {
      throw new AllocationError("Committed allocations exceed the source lot's available quantity.", {
        sourceLotId,
        requested: requested.toString(),
        available: available.toString(),
      });
    }
  }

  assertNoLineageCycles([...ledger.allocations, ...allocations]);
}

function appendAllocations(
  ledger: MaterialLedger,
  allocations: readonly MaterialAllocation[],
  additionalLots: readonly MaterialLot[] = [],
): MaterialLedger {
  const candidateLots = [...ledger.lots, ...additionalLots];
  const candidateIds = new Set<string>();
  for (const lot of candidateLots) {
    if (candidateIds.has(lot.id)) {
      throw new InvariantViolationError("Material lot IDs must be unique.", { lotId: lot.id });
    }
    candidateIds.add(lot.id);
  }
  validateAdditionalAllocations(ledger, candidateLots, allocations);
  return createMaterialLedger(candidateLots, [...ledger.allocations, ...allocations], ledger.transformations);
}

/** Validates the complete set before returning a new ledger, so the command is atomic. */
export function commitAllocations(
  ledger: MaterialLedger,
  allocations: readonly MaterialAllocationInput[],
): MaterialLedger {
  const normalized = allocations.map(createMaterialAllocation);
  return appendAllocations(ledger, normalized);
}

export const commitMaterialAllocations = commitAllocations;

export interface CommitTransformationResult {
  readonly ledger: MaterialLedger;
  readonly transformation: CommittedTransformation;
}

function assertUniqueIds(ids: readonly string[], fieldName: string): void {
  if (new Set(ids).size !== ids.length) {
    throw new InvariantViolationError(`${fieldName} IDs must be unique.`, { fieldName });
  }
}

export function commitTransformation(
  ledger: MaterialLedger,
  draft: TransformationDraft,
  context: TransformationCommitContext = {},
): CommitTransformationResult {
  assertUuid(draft.id, "transformation.id");
  assertUuid(draft.operatorId, "transformation.operatorId");
  assertUuid(draft.facilityId, "transformation.facilityId");
  assertUtcInstant(draft.occurredAt, "transformation.occurredAt");
  if (draft.capturedAt !== undefined) assertUtcInstant(draft.capturedAt, "transformation.capturedAt");
  const committedAt = context.committedAt ?? draft.occurredAt;
  assertUtcInstant(committedAt, "transformation.committedAt");

  if (ledger.transformations.some((transformation) => transformation.id === draft.id)) {
    throw new InvariantViolationError("A transformation cannot be committed twice.", {
      transformationId: draft.id,
    });
  }

  const inputLotIds = draft.inputs.map((input) => input.sourceLotId);
  const outputLots = draft.outputs.map(normalizeLot);
  const outputLotIds = outputLots.map((lot) => lot.id);
  assertUniqueIds(inputLotIds, "Transformation input lot");
  assertUniqueIds(outputLotIds, "Transformation output lot");

  if (outputLots.length === 0 || draft.allocations.length === 0) {
    throw new InvariantViolationError("A committed transformation requires inputs, outputs and allocations.");
  }
  if (outputLots.some((lot) => ledger.lots.some((existing) => existing.id === lot.id))) {
    throw new InvariantViolationError("Transformation output lot IDs must be new.");
  }
  if (
    outputLots.some(
      (lot) => lot.origin.kind !== "transformation" || lot.origin.transformationId !== draft.id,
    )
  ) {
    throw new InvariantViolationError(
      "Every transformation output must name this transformation as its sole origin.",
      { transformationId: draft.id },
    );
  }

  const inputsByLot = new Map<MaterialLotId, Decimal>();
  for (const input of draft.inputs) {
    if (!ledger.lots.some((lot) => lot.id === input.sourceLotId)) {
      throw new ValidationError("Transformation input lot does not exist in the ledger.", {
        sourceLotId: input.sourceLotId,
      });
    }
    const amount = decimalForQuantity(input.quantity);
    if (!amount.isPositive()) {
      throw new ValidationError("Transformation input quantities must be positive.");
    }
    inputsByLot.set(input.sourceLotId, amount);
  }

  const allocations = draft.allocations.map(createMaterialAllocation);
  for (const allocation of allocations) {
    if (allocation.transformationId !== draft.id) {
      throw new InvariantViolationError("Transformation allocations must use the draft transformation ID.", {
        allocationId: allocation.id,
      });
    }
    if (!inputsByLot.has(allocation.sourceLotId) || !outputLotIds.includes(allocation.targetLotId)) {
      throw new InvariantViolationError("Every allocation must reference this transformation's input and output.", {
        allocationId: allocation.id,
      });
    }
  }

  const allocatedBySource = new Map<MaterialLotId, Decimal[]>();
  const allocatedByTarget = new Map<MaterialLotId, Decimal[]>();
  for (const allocation of allocations) {
    const sourceValues = allocatedBySource.get(allocation.sourceLotId) ?? [];
    sourceValues.push(allocation.quantity.canonicalValue);
    allocatedBySource.set(allocation.sourceLotId, sourceValues);
    const targetValues = allocatedByTarget.get(allocation.targetLotId) ?? [];
    targetValues.push(allocation.quantity.canonicalValue);
    allocatedByTarget.set(allocation.targetLotId, targetValues);
  }

  for (const input of draft.inputs) {
    const allocated = sumDecimal(allocatedBySource.get(input.sourceLotId) ?? []);
    const expected = inputsByLot.get(input.sourceLotId) as Decimal;
    if (!allocated.equals(expected)) {
      throw new InvariantViolationError("Input quantity must equal the source's exact output allocations.", {
        sourceLotId: input.sourceLotId,
        input: expected.toString(),
        allocated: allocated.toString(),
      });
    }
  }
  for (const output of outputLots) {
    const allocated = sumDecimal(allocatedByTarget.get(output.id) ?? []);
    if (!allocated.equals(output.quantity.canonicalValue)) {
      throw new InvariantViolationError("Output quantity must equal its exact source contributions.", {
        targetLotId: output.id,
        output: output.quantity.canonicalValue.toString(),
        allocated: allocated.toString(),
      });
    }
  }

  const candidateLedgerForValidation = appendAllocations(ledger, allocations, outputLots);
  const transformation: CommittedTransformation = {
    id: draft.id,
    state: "committed",
    operatorId: draft.operatorId,
    facilityId: draft.facilityId,
    occurredAt: draft.occurredAt,
    capturedAt: draft.capturedAt,
    committedAt,
    inputLotIds: [...inputLotIds],
    outputLotIds: [...outputLotIds],
    allocationIds: allocations.map((allocation) => allocation.id),
  };
  const finalLedger = createMaterialLedger(
    candidateLedgerForValidation.lots,
    candidateLedgerForValidation.allocations,
    [...ledger.transformations, transformation],
  );
  return { ledger: finalLedger, transformation };
}
