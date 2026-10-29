import { LineageCycleError, ValidationError } from "./errors";
import type { MaterialAllocation, MaterialLedger, MaterialLot } from "./materials";
import type { MaterialLotId } from "./identifiers";

export type LineageSource =
  | Pick<MaterialLedger, "allocations" | "lots">
  | readonly MaterialAllocation[];

export interface LineageTraceNode {
  readonly lotId: MaterialLotId;
  /** Zero is the requested lot; larger values are farther from it. */
  readonly depth: number;
}

export interface LineageTrace {
  readonly rootLotId: MaterialLotId;
  readonly direction: "backward" | "forward";
  readonly nodes: readonly LineageTraceNode[];
  readonly lotIds: readonly MaterialLotId[];
  /** Direct allocation edges, retained with their exact quantities. */
  readonly edges: readonly MaterialAllocation[];
}

function allocationsOf(source: LineageSource): readonly MaterialAllocation[] {
  return "allocations" in source ? source.allocations : source;
}

function lotsOf(source: LineageSource): readonly MaterialLot[] | undefined {
  return "lots" in source ? source.lots : undefined;
}

function edgeSortKey(edge: MaterialAllocation): string {
  return [
    edge.sourceLotId,
    edge.targetLotId,
    edge.transformationId,
    edge.quantity.toCanonical().value.toString(),
    edge.id,
  ].join("\u0000");
}

export function sortLineageAllocations(
  allocations: readonly MaterialAllocation[],
): readonly MaterialAllocation[] {
  return [...allocations].sort((left, right) => edgeSortKey(left).localeCompare(edgeSortKey(right)));
}

/** Throws if the direct allocation graph contains a cycle. */
export function assertNoLineageCycles(source: LineageSource): void {
  const edges = allocationsOf(source);
  const nodes = new Set<string>();
  const indegree = new Map<string, number>();
  const outgoing = new Map<string, string[]>();

  for (const edge of edges) {
    nodes.add(edge.sourceLotId);
    nodes.add(edge.targetLotId);
    indegree.set(edge.sourceLotId, indegree.get(edge.sourceLotId) ?? 0);
    indegree.set(edge.targetLotId, (indegree.get(edge.targetLotId) ?? 0) + 1);
    const neighbors = outgoing.get(edge.sourceLotId) ?? [];
    neighbors.push(edge.targetLotId);
    outgoing.set(edge.sourceLotId, neighbors);
  }

  const queue = [...nodes].filter((node) => indegree.get(node) === 0).sort();
  let processed = 0;

  while (queue.length > 0) {
    const node = queue.shift() as string;
    processed += 1;
    for (const neighbor of [...(outgoing.get(node) ?? [])].sort()) {
      const nextIndegree = (indegree.get(neighbor) ?? 0) - 1;
      indegree.set(neighbor, nextIndegree);
      if (nextIndegree === 0) {
        queue.push(neighbor);
        queue.sort();
      }
    }
  }

  if (processed !== nodes.size) {
    const cycleNodes = [...nodes].filter((node) => (indegree.get(node) ?? 0) > 0).sort();
    throw new LineageCycleError(cycleNodes);
  }
}

export function hasLineageCycle(source: LineageSource): boolean {
  try {
    assertNoLineageCycles(source);
    return false;
  } catch (error) {
    if (error instanceof LineageCycleError) return true;
    throw error;
  }
}

function assertKnownLot(source: LineageSource, lotId: MaterialLotId): void {
  const lots = lotsOf(source);
  if (lots !== undefined && !lots.some((lot) => lot.id === lotId)) {
    throw new ValidationError("Lineage root lot does not exist in the supplied ledger.", { lotId });
  }
}

function trace(source: LineageSource, rootLotId: MaterialLotId, direction: "backward" | "forward"): LineageTrace {
  assertKnownLot(source, rootLotId);
  assertNoLineageCycles(source);

  const edges = allocationsOf(source);
  const adjacent = new Map<string, MaterialAllocation[]>();
  for (const edge of edges) {
    const key = direction === "backward" ? edge.targetLotId : edge.sourceLotId;
    const list = adjacent.get(key) ?? [];
    list.push(edge);
    adjacent.set(key, list);
  }

  const depthByLot = new Map<string, number>([[rootLotId, 0]]);
  const queue = [rootLotId];
  const reachableEdges = new Map<string, MaterialAllocation>();

  while (queue.length > 0) {
    const current = queue.shift() as string;
    const currentDepth = depthByLot.get(current) as number;
    const nextEdges = sortLineageAllocations(adjacent.get(current) ?? []);

    for (const edge of nextEdges) {
      reachableEdges.set(edge.id, edge);
      const nextLot = direction === "backward" ? edge.sourceLotId : edge.targetLotId;
      if (!depthByLot.has(nextLot)) {
        depthByLot.set(nextLot, currentDepth + 1);
        queue.push(nextLot);
      }
    }
  }

  const nodes = [...depthByLot.entries()]
    .map(([lotId, depth]) => ({ lotId: lotId as MaterialLotId, depth }))
    .sort((left, right) => left.depth - right.depth || left.lotId.localeCompare(right.lotId));

  return {
    rootLotId,
    direction,
    nodes,
    lotIds: nodes.map((node) => node.lotId),
    edges: sortLineageAllocations([...reachableEdges.values()]),
  };
}

export function traceBackward(source: LineageSource, rootLotId: MaterialLotId): LineageTrace {
  return trace(source, rootLotId, "backward");
}

export function traceForward(source: LineageSource, rootLotId: MaterialLotId): LineageTrace {
  return trace(source, rootLotId, "forward");
}

export function directInputs(
  source: LineageSource,
  targetLotId: MaterialLotId,
): readonly MaterialAllocation[] {
  assertKnownLot(source, targetLotId);
  return sortLineageAllocations(allocationsOf(source).filter((edge) => edge.targetLotId === targetLotId));
}

export function directOutputs(
  source: LineageSource,
  sourceLotId: MaterialLotId,
): readonly MaterialAllocation[] {
  assertKnownLot(source, sourceLotId);
  return sortLineageAllocations(allocationsOf(source).filter((edge) => edge.sourceLotId === sourceLotId));
}

export function rootSourceLots(
  source: Pick<MaterialLedger, "allocations" | "lots">,
  rootLotId: MaterialLotId,
): readonly MaterialLot[] {
  const traceResult = traceBackward(source, rootLotId);
  const reachable = new Set(traceResult.lotIds);
  const incoming = new Set(
    allocationsOf(source)
      .filter((edge) => reachable.has(edge.targetLotId))
      .map((edge) => edge.targetLotId),
  );

  return source.lots
    .filter((lot) => reachable.has(lot.id) && !incoming.has(lot.id))
    .sort((left, right) => left.id.localeCompare(right.id));
}
