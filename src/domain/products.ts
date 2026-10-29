export const MATERIAL_PRODUCTS = [
  "honeycomb",
  "honey",
  "raw_beeswax",
  "beeswax",
  "waste_residue",
] as const;

export type MaterialProduct = (typeof MATERIAL_PRODUCTS)[number];

export function isMaterialProduct(value: unknown): value is MaterialProduct {
  return typeof value === "string" && (MATERIAL_PRODUCTS as readonly string[]).includes(value);
}

