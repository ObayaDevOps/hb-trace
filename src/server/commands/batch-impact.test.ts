import { describe, expect, it } from "vitest";
import { AuthorizationError } from "@/domain/errors";
import { prepareBatchAction } from "./batch-impact";
import {
  createMaterialLedger,
  createMaterialLot,
  createPackagingRun,
  createQuantity,
  transitionPackagingRun,
} from "@/domain";
import { asEntityId } from "@/domain/identifiers";

function id<K extends string>(kind: K, suffix: string) {
  return asEntityId(kind, `00000000-0000-4000-8000-${suffix.padStart(12, "0")}`);
}

const actorId = id("actor", "801");
const sourceLotId = id("material_lot", "802");
const batchId = id("batch", "803");
const packagingRunId = id("packaging_run", "804");

function input(actorRole: string) {
  const lot = createMaterialLot({
    id: sourceLotId,
    product: "honey",
    quantity: createQuantity("1", "kg"),
    origin: { kind: "purchase", purchaseId: id("purchase", "805") },
    qualityDisposition: "released",
  });
  const draft = createPackagingRun({
    id: packagingRunId,
    batchId,
    sourceLotId,
    product: "honey",
    quantity: createQuantity("1", "kg"),
    packageSize: createQuantity("250", "g"),
    externalLotCode: "LOT-804",
  });
  const committed = transitionPackagingRun(draft, "committed", {
    actorId,
    actorRole: "quality_manager",
    occurredAt: "2026-01-01T00:00:00.000Z",
    reason: "commit packaging",
  });
  const run = transitionPackagingRun(committed, "released", {
    actorId,
    actorRole: "quality_manager",
    occurredAt: "2026-01-01T00:00:00.000Z",
    reason: "release packaging",
  });
  return {
    action: "hold" as const,
    actorRole,
    rootBatchIds: [batchId],
    ledger: createMaterialLedger([lot]),
    packagingRuns: [run],
  } as const;
}

describe("server batch action boundary", () => {
  it("requires the quality-manager role before preparing an incident action", () => {
    expect(() => prepareBatchAction(input("supervisor"))).toThrow(AuthorizationError);
  });

  it("returns a complete executable plan for an authorized recall", () => {
    const plan = prepareBatchAction({ ...input("quality_manager"), action: "recall" });
    expect(plan.action).toBe("recall");
    expect(plan.affectedBatchIds).toEqual([batchId]);
    expect(plan.packagingRunTransitions[0].to).toBe("recalled");
    expect(plan.executable).toBe(true);
  });
});
