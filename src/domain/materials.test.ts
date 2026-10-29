import { describe, expect, it } from 'vitest';
import {
  asEntityId,
  commitTransformation,
  createMaterialAllocation,
  createMaterialLedger,
  createMaterialLot,
  createQuantity,
  hasLineageCycle,
  rootSourceLots,
  traceBackward,
  traceForward,
} from './index';

function id<K extends string>(kind: K, suffix: string) {
  return asEntityId(kind, `00000000-0000-4000-8000-${suffix.padStart(12, '0')}`);
}

const sourceId = id('material_lot', '101');
const transformationId = id('transformation', '102');
const outputId = id('material_lot', '103');
const actorId = id('actor', '104');
const facilityId = id('facility', '105');

describe('material ledger and direct lineage', () => {
  it('commits exact multi-stage allocation and traces both directions', () => {
    const source = createMaterialLot({
      id: sourceId,
      product: 'honeycomb',
      quantity: createQuantity('10', 'kg'),
      origin: { kind: 'purchase', purchaseId: id('purchase', '106') },
    });
    const output = createMaterialLot({
      id: outputId,
      product: 'honey',
      quantity: createQuantity('8', 'kg'),
      origin: { kind: 'transformation', transformationId },
    });
    const result = commitTransformation(
      createMaterialLedger([source]),
      {
        id: transformationId,
        operatorId: actorId,
        facilityId,
        occurredAt: '2026-01-01T00:00:00.000Z',
        inputs: [{ sourceLotId: sourceId, quantity: createQuantity('8', 'kg') }],
        outputs: [output],
        allocations: [{
          transformationId,
          sourceLotId: sourceId,
          targetLotId: outputId,
          quantity: createQuantity('8', 'kg'),
        }],
      },
      { committedAt: '2026-01-01T01:00:00.000Z' },
    );

    expect(result.ledger.lots).toHaveLength(2);
    expect(result.ledger.allocations).toHaveLength(1);
    expect(traceBackward(result.ledger, outputId).lotIds).toEqual([outputId, sourceId]);
    expect(traceForward(result.ledger, sourceId).lotIds).toEqual([sourceId, outputId]);
    expect(rootSourceLots(result.ledger, outputId).map((lot) => lot.id)).toEqual([sourceId]);
    expect(result.ledger.lots.find((lot) => lot.id === sourceId)?.quantity.canonicalValue.toString()).toBe('10');
  });

  it('rejects over-allocation and cycles before returning a new ledger', () => {
    const source = createMaterialLot({
      id: sourceId,
      product: 'honeycomb',
      quantity: createQuantity('2', 'kg'),
      origin: { kind: 'purchase', purchaseId: id('purchase', '107') },
    });
    const target = createMaterialLot({
      id: outputId,
      product: 'honey',
      quantity: createQuantity('2', 'kg'),
      origin: { kind: 'transformation', transformationId },
    });
    const ledger = createMaterialLedger([source, target], [
      createMaterialAllocation({
        id: id('allocation', '108'),
        transformationId,
        sourceLotId: sourceId,
        targetLotId: outputId,
        quantity: createQuantity('2', 'kg'),
      }),
    ]);

    expect(() => createMaterialLedger([source, target], [
      createMaterialAllocation({
        id: id('allocation', '109'),
        transformationId,
        sourceLotId: sourceId,
        targetLotId: outputId,
        quantity: createQuantity('1', 'kg'),
      }),
    ])).toThrow();
    expect(ledger.allocations).toHaveLength(1);

    const cycleEdges = [
      createMaterialAllocation({ id: id('allocation', '110'), transformationId, sourceLotId: sourceId, targetLotId: outputId, quantity: createQuantity('1', 'kg') }),
      createMaterialAllocation({ id: id('allocation', '111'), transformationId: id('transformation', '112'), sourceLotId: outputId, targetLotId: sourceId, quantity: createQuantity('1', 'kg') }),
    ];
    expect(hasLineageCycle(cycleEdges)).toBe(true);
  });
});
