import { ValidationError } from "./errors";
import {
  asApplicationUuid,
  isApplicationUuid,
  newEntityId,
  type ApiaryId,
  type DisputeId,
  type FarmerId,
  type PurchaseId,
  type ReceiptId,
} from "./identifiers";
import { Money } from "./money";
import { createQuantity, toQuantity, type Quantity, type QuantityLike } from "./decimal";
import {
  canTransitionState,
  createStateTransition,
  type StateTransition,
  type TransitionContext,
} from "./transitions";

export type PurchaseSourceType = "purchase" | "harvest";
export type PurchaseState = "draft" | "submitted" | "accepted" | "rejected" | "closed";

export const PURCHASE_TRANSITIONS: Readonly<Record<PurchaseState, readonly PurchaseState[]>> = {
  draft: ["submitted"],
  submitted: ["accepted", "rejected"],
  accepted: ["closed"],
  rejected: ["closed"],
  closed: [],
};

export interface Purchase {
  readonly id: PurchaseId;
  readonly sourceType: PurchaseSourceType;
  readonly farmerId: FarmerId;
  readonly apiaryId: ApiaryId;
  readonly material: "honeycomb";
  readonly collectionDate: string;
  readonly quantity: Quantity;
  readonly grade: string;
  readonly agreedPrice?: Money;
  readonly paymentReference?: string;
  readonly state: PurchaseState;
  readonly history: readonly StateTransition<PurchaseState>[];
}

export interface PurchaseInput {
  readonly id?: PurchaseId;
  readonly sourceType: PurchaseSourceType;
  readonly farmerId: FarmerId;
  readonly apiaryId: ApiaryId;
  readonly material?: "honeycomb";
  readonly collectionDate: string;
  readonly quantity: QuantityLike;
  readonly grade: string;
  readonly agreedPrice?: Money;
  readonly paymentReference?: string;
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
    throw new ValidationError(`${fieldName} must not be empty.`, { fieldName, value });
  }
  return value.trim();
}

function assertPurchaseQuantity(input: QuantityLike): Quantity {
  const quantity = toQuantity(input);
  if (quantity.kind !== "mass" || !quantity.isPositive()) {
    throw new ValidationError("Purchase quantity must be a positive mass quantity.", {
      quantity: quantity.toJSON(),
    });
  }
  return quantity;
}

export function createPurchase(input: PurchaseInput): Purchase {
  assertUuid(input.farmerId, "farmerId");
  assertUuid(input.apiaryId, "apiaryId");
  const collectionDate = assertText(input.collectionDate, "collectionDate");
  const grade = assertText(input.grade, "grade");

  return {
    id: input.id ?? newEntityId("purchase"),
    sourceType: input.sourceType,
    farmerId: input.farmerId,
    apiaryId: input.apiaryId,
    material: "honeycomb",
    collectionDate,
    quantity: assertPurchaseQuantity(input.quantity),
    grade,
    agreedPrice: input.agreedPrice,
    paymentReference: input.paymentReference?.trim() || undefined,
    state: "draft",
    history: [],
  };
}

export function canTransitionPurchase(from: PurchaseState, to: PurchaseState): boolean {
  return canTransitionState(PURCHASE_TRANSITIONS, from, to);
}

export function transitionPurchase(
  purchase: Purchase,
  to: PurchaseState,
  context: TransitionContext,
): Purchase {
  const transition = createStateTransition(
    "purchase/harvest",
    PURCHASE_TRANSITIONS,
    purchase.state,
    to,
    context,
  );
  return { ...purchase, state: to, history: [...purchase.history, transition] };
}

export const submitPurchase = (purchase: Purchase, context: TransitionContext): Purchase =>
  transitionPurchase(purchase, "submitted", context);

export const acceptPurchase = (purchase: Purchase, context: TransitionContext): Purchase =>
  transitionPurchase(purchase, "accepted", context);

export const rejectPurchase = (purchase: Purchase, context: TransitionContext): Purchase =>
  transitionPurchase(purchase, "rejected", context);

export const closePurchase = (purchase: Purchase, context: TransitionContext): Purchase =>
  transitionPurchase(purchase, "closed", context);

export type ReceiptState =
  | "draft"
  | "issued"
  | "farmer_confirmed"
  | "confirmation_unavailable"
  | "disputed"
  | "resolved"
  | "closed";

export const RECEIPT_TRANSITIONS: Readonly<Record<ReceiptState, readonly ReceiptState[]>> = {
  draft: ["issued"],
  issued: ["farmer_confirmed", "confirmation_unavailable", "disputed"],
  farmer_confirmed: ["closed"],
  confirmation_unavailable: ["closed"],
  disputed: ["resolved"],
  resolved: ["closed"],
  closed: [],
};

export interface Receipt {
  readonly id: ReceiptId;
  readonly purchaseId: PurchaseId;
  readonly farmerReference: string;
  readonly transactionCode: string;
  readonly material: "honeycomb";
  readonly quantity: Quantity;
  readonly grade: string;
  readonly state: ReceiptState;
  readonly history: readonly StateTransition<ReceiptState>[];
}

export interface ReceiptInput {
  readonly id?: ReceiptId;
  readonly purchaseId: PurchaseId;
  readonly farmerReference: string;
  readonly transactionCode: string;
  readonly material?: "honeycomb";
  readonly quantity: QuantityLike;
  readonly grade: string;
}

export function createReceipt(input: ReceiptInput): Receipt {
  assertUuid(input.purchaseId, "purchaseId");
  const quantity = assertPurchaseQuantity(input.quantity);
  return {
    id: input.id ?? newEntityId("receipt"),
    purchaseId: input.purchaseId,
    farmerReference: assertText(input.farmerReference, "farmerReference"),
    transactionCode: assertText(input.transactionCode, "transactionCode"),
    material: "honeycomb",
    quantity,
    grade: assertText(input.grade, "grade"),
    state: "draft",
    history: [],
  };
}

export function createReceiptForPurchase(
  purchase: Purchase,
  input: Omit<ReceiptInput, "purchaseId" | "material" | "quantity" | "grade"> & {
    readonly id?: ReceiptId;
    readonly farmerReference: string;
    readonly transactionCode: string;
  },
): Receipt {
  return createReceipt({
    ...input,
    purchaseId: purchase.id,
    material: purchase.material,
    quantity: purchase.quantity,
    grade: purchase.grade,
  });
}

export function canTransitionReceipt(from: ReceiptState, to: ReceiptState): boolean {
  return canTransitionState(RECEIPT_TRANSITIONS, from, to);
}

export function transitionReceipt(
  receipt: Receipt,
  to: ReceiptState,
  context: TransitionContext,
): Receipt {
  const transition = createStateTransition(
    "purchase receipt",
    RECEIPT_TRANSITIONS,
    receipt.state,
    to,
    context,
  );
  return { ...receipt, state: to, history: [...receipt.history, transition] };
}

export const issueReceipt = (receipt: Receipt, context: TransitionContext): Receipt =>
  transitionReceipt(receipt, "issued", context);

export const confirmReceipt = (receipt: Receipt, context: TransitionContext): Receipt =>
  transitionReceipt(receipt, "farmer_confirmed", context);

export const markReceiptConfirmationUnavailable = (
  receipt: Receipt,
  context: TransitionContext,
): Receipt => transitionReceipt(receipt, "confirmation_unavailable", context);

export interface ReceiptDispute {
  readonly id: DisputeId;
  readonly receiptId: ReceiptId;
  readonly purchaseId: PurchaseId;
  readonly reason: string;
  readonly openedAt: string;
  readonly actorId: ReturnType<typeof asApplicationUuid>;
}

export function openReceiptDispute(
  receipt: Receipt,
  context: TransitionContext,
): { readonly receipt: Receipt; readonly dispute: ReceiptDispute } {
  const nextReceipt = transitionReceipt(receipt, "disputed", context);
  return {
    receipt: nextReceipt,
    dispute: {
      id: newEntityId("dispute"),
      receiptId: receipt.id,
      purchaseId: receipt.purchaseId,
      reason: context.reason.trim(),
      openedAt: context.occurredAt,
      actorId: asApplicationUuid(context.actorId),
    },
  };
}

export const resolveReceiptDispute = (receipt: Receipt, context: TransitionContext): Receipt =>
  transitionReceipt(receipt, "resolved", context);

export const closeReceipt = (receipt: Receipt, context: TransitionContext): Receipt =>
  transitionReceipt(receipt, "closed", context);
