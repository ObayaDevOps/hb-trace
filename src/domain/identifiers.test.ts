import { describe, expect, it } from "vitest";
import {
  asApplicationUuid,
  asEntityId,
  isApplicationUuid,
  newApplicationUuid,
} from "./identifiers";

describe("application identifiers", () => {
  it("creates UUIDv4 values with the required version and variant bits", () => {
    const uuid = newApplicationUuid((bytes) => bytes.fill(0));

    expect(uuid).toBe("00000000-0000-4000-8000-000000000000");
    expect(isApplicationUuid(uuid)).toBe(true);
  });

  it("normalizes valid UUIDs and rejects non-v4 values", () => {
    const normalized = asApplicationUuid("00000000-0000-4ABC-8DEF-000000000001");

    expect(normalized).toBe("00000000-0000-4abc-8def-000000000001");
    expect(() => asApplicationUuid("not-an-id")).toThrow();
    expect(asEntityId("material_lot", normalized)).toBe(normalized);
  });
});

