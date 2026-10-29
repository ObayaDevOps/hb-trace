import { describe, expect, it } from "vitest";
import {
  acceptPurchase,
  closeReceipt,
  closePurchase,
  commitPackagingRun,
  confirmReceipt,
  createPackagingRun,
  createPurchase,
  createQualityDisposition,
  createReceiptForPurchase,
  issueReceipt,
  openReceiptDispute,
  releasePackagingRun,
  resolveReceiptDispute,
  submitPurchase,
  transitionPackagingRun,
  transitionQualityDisposition,
} from "./index";
import { asEntityId } from "./identifiers";
import { createQuantity } from "./decimal";

function id<K extends string>(kind: K, suffix: string) {
  return asEntityId(kind, `00000000-0000-4000-8000-${suffix.padStart(12, "0")}`);
}

const actorId = id("actor", "1");
const context = (reason: string, actorRole?: "quality_manager") => ({
  actorId,
  occurredAt: "2026-01-01T00:00:00.000Z",
  reason,
  actorRole,
});

describe("purchase, receipt, quality and packaging workflows", () => {
  it("guards purchase and receipt transitions while retaining the original purchase link", () => {
    const purchase = createPurchase({
      id: id("purchase", "10"),
      sourceType: "purchase",
      farmerId: id("farmer", "11"),
      apiaryId: id("apiary", "12"),
      collectionDate: "2026-01-01",
      quantity: createQuantity("10", "kg"),
      grade: "A",
    });
    const submitted = submitPurchase(purchase, context("submit"));

    expect(() => closePurchase(submitted, context("close too early"))).toThrow();
    const accepted = acceptPurchase(submitted, context("accept"));
    expect(closePurchase(accepted, context("close accepted purchase")).state).toBe("closed");

    const receipt = createReceiptForPurchase(purchase, {
      farmerReference: "F-11",
      transactionCode: "TX-10",
    });
    const issued = issueReceipt(receipt, context("issue receipt"));
    const disputed = openReceiptDispute(issued, context("quantity disputed")).receipt;
    const resolved = resolveReceiptDispute(disputed, context("reviewed correction"));
    const closed = closeReceipt(resolved, context("close after resolution"));

    expect(closed.purchaseId).toBe(purchase.id);
    expect(closed.state).toBe("closed");
    expect(closed.history).toHaveLength(4);
  });

  it("requires a valid quality path and blocks packaging before release", () => {
    const lotId = id("material_lot", "20");
    const quality = createQualityDisposition({ id: id("quality_review", "21"), lotId });
    const held = transitionQualityDisposition(quality, "held", context("failed inspection", "quality_manager"));
    expect(() => transitionQualityDisposition(held, "recalled", context("not authorized"))).toThrow();
    expect(transitionQualityDisposition(held, "recalled", context("recall authorized", "quality_manager")).state).toBe("recalled");

    const packaging = createPackagingRun({
      id: id("packaging_run", "22"),
      batchId: id("batch", "23"),
      sourceLotId: lotId,
      product: "honey",
      quantity: createQuantity("1", "kg"),
      packageSize: createQuantity("250", "g"),
      externalLotCode: "LOT-22",
    });
    expect(() => commitPackagingRun(packaging, "held", context("try to pack held lot"))).toThrow();
    const committed = commitPackagingRun(
      packaging,
      "released",
      context("package released lot", "quality_manager"),
    );
    expect(() => transitionPackagingRun(committed, "draft", context("reverse commit"))).toThrow();
    expect(releasePackagingRun(committed, context("release packaging", "quality_manager")).state).toBe(
      "released",
    );
  });
});
