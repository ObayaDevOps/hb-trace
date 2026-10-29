import { describe, expect, it } from "vitest";
import {
  createMaterialLedger,
  createMaterialLot,
  createPackagingRun,
  createQuantity,
  createWithdrawnPublicRevision,
  planBatchImpact,
  transitionPackagingRun,
  type MaterialLedger,
  type MaterialLot,
  type PackagingRun,
  type PublicBatchRevisionReference,
} from "./index";
import { asApplicationUuid, asEntityId } from "./identifiers";

function id<K extends string>(kind: K, suffix: string) {
  return asEntityId(kind, `00000000-0000-4000-8000-${suffix.padStart(12, "0")}`);
}

const actorId = id("actor", "1");
const context = (reason: string) => ({
  actorId,
  actorRole: "quality_manager" as const,
  occurredAt: "2026-01-01T00:00:00.000Z",
  reason,
});

function releasedRun(
  runId: ReturnType<typeof id<"packaging_run">>,
  batchId: ReturnType<typeof id<"batch">>,
  sourceLotId: ReturnType<typeof id<"material_lot">>,
): PackagingRun {
  const draft = createPackagingRun({
    id: runId,
    batchId,
    sourceLotId,
    product: "honey",
    quantity: createQuantity("1", "kg"),
    packageSize: createQuantity("250", "g"),
    externalLotCode: `LOT-${runId.slice(-4)}`,
  });
  const committed = transitionPackagingRun(draft, "committed", context("commit packaging"));
  return transitionPackagingRun(committed, "released", context("release packaging"));
}

function fixture(): {
  ledger: MaterialLedger;
  packagingRuns: readonly PackagingRun[];
  publicationRevisions: readonly PublicBatchRevisionReference[];
  sourceLotId: ReturnType<typeof id<"material_lot">>;
  derivedLotId: ReturnType<typeof id<"material_lot">>;
  finalLotId: ReturnType<typeof id<"material_lot">>;
  firstBatchId: ReturnType<typeof id<"batch">>;
  secondBatchId: ReturnType<typeof id<"batch">>;
} {
  const sourceLotId = id("material_lot", "101");
  const derivedLotId = id("material_lot", "102");
  const finalLotId = id("material_lot", "103");
  const unrelatedLotId = id("material_lot", "104");
  const firstBatchId = id("batch", "201");
  const secondBatchId = id("batch", "202");
  const firstTransformationId = id("transformation", "301");
  const secondTransformationId = id("transformation", "302");

  const sourceLot = createMaterialLot({
    id: sourceLotId,
    product: "honeycomb",
    quantity: createQuantity("10", "kg"),
    origin: { kind: "purchase", purchaseId: id("purchase", "401") },
    qualityDisposition: "released",
  });
  const derivedLot = createMaterialLot({
    id: derivedLotId,
    product: "honey",
    quantity: createQuantity("8", "kg"),
    origin: { kind: "transformation", transformationId: firstTransformationId },
    qualityDisposition: "released",
  });
  const finalLot = createMaterialLot({
    id: finalLotId,
    product: "honey",
    quantity: createQuantity("7", "kg"),
    origin: { kind: "transformation", transformationId: secondTransformationId },
    qualityDisposition: "released",
  });
  const unrelatedLot = createMaterialLot({
    id: unrelatedLotId,
    product: "honey",
    quantity: createQuantity("4", "kg"),
    origin: { kind: "purchase", purchaseId: id("purchase", "402") },
    qualityDisposition: "released",
  });

  const ledger = createMaterialLedger(
    [sourceLot, derivedLot, finalLot, unrelatedLot],
    [
      {
        id: id("allocation", "501"),
        transformationId: firstTransformationId,
        sourceLotId,
        targetLotId: derivedLotId,
        quantity: createQuantity("8", "kg"),
      },
      {
        id: id("allocation", "502"),
        transformationId: secondTransformationId,
        sourceLotId: derivedLotId,
        targetLotId: finalLotId,
        quantity: createQuantity("7", "kg"),
      },
    ],
  );
  const packagingRuns = [
    releasedRun(id("packaging_run", "601"), firstBatchId, derivedLotId),
    releasedRun(id("packaging_run", "602"), secondBatchId, finalLotId),
    releasedRun(id("packaging_run", "603"), id("batch", "203"), unrelatedLotId),
  ];
  const publicationRevisions = [
    {
      id: asApplicationUuid(id("publication_revision", "701")),
      batchId: firstBatchId,
      status: "published" as const,
    },
    {
      id: asApplicationUuid(id("publication_revision", "702")),
      batchId: secondBatchId,
      status: "published" as const,
    },
    {
      id: asApplicationUuid(id("publication_revision", "703")),
      batchId: id("batch", "203"),
      status: "published" as const,
    },
    {
      id: asApplicationUuid(id("publication_revision", "704")),
      batchId: firstBatchId,
      status: "superseded" as const,
    },
  ];

  return {
    ledger,
    packagingRuns,
    publicationRevisions,
    sourceLotId,
    derivedLotId,
    finalLotId,
    firstBatchId,
    secondBatchId,
  };
}

describe("batch impact planning", () => {
  it("calculates transitive lot, packaging and active public revision impact for a recall", () => {
    const fixtureData = fixture();
    const plan = planBatchImpact({
      action: "recall",
      rootLotIds: [fixtureData.sourceLotId],
      ledger: fixtureData.ledger,
      packagingRuns: fixtureData.packagingRuns,
      publicationRevisions: fixtureData.publicationRevisions,
    });

    expect(plan.affectedLotIds).toEqual([
      fixtureData.sourceLotId,
      fixtureData.derivedLotId,
      fixtureData.finalLotId,
    ].sort());
    expect(plan.affectedPackagingRunIds).toEqual([
      fixtureData.packagingRuns[0].id,
      fixtureData.packagingRuns[1].id,
    ].sort());
    expect(plan.affectedBatchIds).toEqual([fixtureData.firstBatchId, fixtureData.secondBatchId].sort());
    expect(plan.affectedPublishedRevisionIds).toEqual([
      asApplicationUuid(id("publication_revision", "701")),
      asApplicationUuid(id("publication_revision", "702")),
    ].sort());
    expect(plan.publicPageAction).toBe("withdrawn");
    expect(plan.executable).toBe(true);
    expect(plan.blockedTransitions).toEqual([]);
    expect(plan.lotTransitions.every((transition) => transition.to === "recalled")).toBe(true);
    expect(plan.packagingRunTransitions.every((transition) => transition.to === "recalled")).toBe(true);
  });

  it("requires recall policy to be explicit when a public notice is preferred", () => {
    const fixtureData = fixture();
    const plan = planBatchImpact({
      action: "recall",
      rootBatchIds: [fixtureData.firstBatchId],
      publicPageAction: "notice",
      ledger: fixtureData.ledger,
      packagingRuns: fixtureData.packagingRuns,
      publicationRevisions: fixtureData.publicationRevisions,
    });

    expect(plan.publicPageAction).toBe("notice");
    expect(() => planBatchImpact({
      action: "recall",
      rootBatchIds: [fixtureData.firstBatchId],
      publicPageAction: "unchanged",
      ledger: fixtureData.ledger,
      packagingRuns: fixtureData.packagingRuns,
    })).toThrow("cannot leave an affected public page unchanged");
  });

  it("does not downgrade already-contained material while planning a hold or recall", () => {
    const fixtureData = fixture();
    const containedLot = createMaterialLot({
      id: id("material_lot", "105"),
      product: "honey",
      quantity: createQuantity("2", "kg"),
      origin: { kind: "purchase", purchaseId: id("purchase", "403") },
      qualityDisposition: "quarantined",
    });
    const rejectedLot = createMaterialLot({
      id: id("material_lot", "106"),
      product: "honey",
      quantity: createQuantity("2", "kg"),
      origin: { kind: "purchase", purchaseId: id("purchase", "404") },
      qualityDisposition: "rejected",
    });
    const ledger = createMaterialLedger([
      ...fixtureData.ledger.lots,
      containedLot,
      rejectedLot,
    ], fixtureData.ledger.allocations);

    const holdPlan = planBatchImpact({
      action: "hold",
      rootLotIds: [containedLot.id],
      ledger,
      packagingRuns: [],
    });
    expect(holdPlan.executable).toBe(true);
    expect(holdPlan.lotTransitions[0].status).toBe("already_satisfied");

    const recallPlan = planBatchImpact({
      action: "recall",
      rootLotIds: [rejectedLot.id],
      ledger,
      packagingRuns: [],
    });
    expect(recallPlan.executable).toBe(true);
    expect(recallPlan.lotTransitions[0].status).toBe("already_satisfied");
  });

  it("creates a new withdrawn public revision without rewriting the published snapshot", () => {
    const fixtureData = fixture();
    const current = {
      id: asApplicationUuid(id("publication_revision", "705")),
      batchId: fixtureData.firstBatchId,
      publicBatchCodeId: asApplicationUuid(id("public_batch_code", "706")),
      revisionNumber: 3,
      status: "published" as const,
      snapshot: {
        publicCode: "HB-26-0042",
        facts: [{ label: "Batch code", value: "HB-26-0042" }],
      },
    };
    const revision = createWithdrawnPublicRevision(current, {
      id: asApplicationUuid(id("publication_revision", "707")),
      actorId,
      withdrawnAt: "2026-01-02T00:00:00.000Z",
    });

    expect(revision).toMatchObject({
      batchId: current.batchId,
      publicBatchCodeId: current.publicBatchCodeId,
      revisionNumber: 4,
      status: "withdrawn",
      supersedesRevisionId: current.id,
      withdrawnAt: "2026-01-02T00:00:00.000Z",
    });
    expect(revision.snapshot).toEqual(current.snapshot);
    expect(revision.snapshot).not.toBe(current.snapshot);
    expect(current.status).toBe("published");
  });

  it("keeps the active public revision visible as impact for an operational hold", () => {
    const fixtureData = fixture();
    const plan = planBatchImpact({
      action: "hold",
      rootLotIds: [fixtureData.sourceLotId],
      ledger: fixtureData.ledger,
      packagingRuns: fixtureData.packagingRuns,
      publicationRevisions: fixtureData.publicationRevisions,
    });

    expect(plan.publicPageAction).toBe("unchanged");
    expect(plan.affectedPublishedRevisionIds).toHaveLength(2);
    expect(plan.lotTransitions.every((transition) => transition.to === "held")).toBe(true);
    expect(plan.packagingRunTransitions.every((transition) => transition.to === "held")).toBe(true);
  });

  it("supports direct batch scope without widening to sibling batches or lots", () => {
    const fixtureData = fixture();
    const plan = planBatchImpact({
      action: "withdraw",
      rootBatchIds: [fixtureData.firstBatchId],
      ledger: fixtureData.ledger,
      packagingRuns: fixtureData.packagingRuns,
      publicationRevisions: fixtureData.publicationRevisions,
    });

    expect(plan.affectedLotIds).toEqual([]);
    expect(plan.affectedPackagingRunIds).toEqual([fixtureData.packagingRuns[0].id]);
    expect(plan.affectedBatchIds).toEqual([fixtureData.firstBatchId]);
    expect(plan.affectedPublishedRevisionIds).toEqual([
      asApplicationUuid(id("publication_revision", "701")),
    ]);
    expect(plan.packagingRunTransitions[0].to).toBe("withdrawn");
  });

  it("reports a closed packaging run as blocked for a hold but permits later withdrawal/recall", () => {
    const fixtureData = fixture();
    const closedRun = transitionPackagingRun(
      fixtureData.packagingRuns[0],
      "closed",
      context("close packaging"),
    );
    const holdPlan = planBatchImpact({
      action: "hold",
      rootBatchIds: [fixtureData.firstBatchId],
      ledger: fixtureData.ledger,
      packagingRuns: [closedRun],
    });
    expect(holdPlan.executable).toBe(false);
    expect(holdPlan.blockedTransitions).toEqual([
      {
        entity: "packaging_run",
        id: closedRun.id,
        from: "closed",
        to: "held",
      },
    ]);

    const recallPlan = planBatchImpact({
      action: "recall",
      rootBatchIds: [fixtureData.firstBatchId],
      ledger: fixtureData.ledger,
      packagingRuns: [closedRun],
    });
    expect(recallPlan.executable).toBe(true);
    expect(recallPlan.packagingRunTransitions[0].to).toBe("recalled");
  });
});
