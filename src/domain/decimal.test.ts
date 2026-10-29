import { describe, expect, it } from "vitest";
import { Decimal, Money, createQuantity } from "./index";

describe("exact decimals and quantities", () => {
  it("adds decimal text exactly without binary floating-point drift", () => {
    expect(Decimal.from("0.1").add("0.2").toString()).toBe("0.3");
    expect(Decimal.from("1.2300").toString()).toBe("1.23");
    expect(Decimal.from("1e-3").toString()).toBe("0.001");
    expect(() => Decimal.from(0.1)).toThrow(/floating-point/);
  });

  it("converts and combines quantities exactly while retaining entered units", () => {
    const grams = createQuantity("1500", "g");
    const kilograms = grams.convertTo("kg");

    expect(grams.enteredUnit).toBe("g");
    expect(grams.normalizedUnit).toBe("kg");
    expect(grams.normalizedValue.toString()).toBe("1.5");
    expect(kilograms.value.toString()).toBe("1.5");
    expect(grams.add(createQuantity("0.5", "kg")).toString()).toBe("2 kg");
    expect(() => createQuantity("-1", "kg")).toThrow();
  });

  it("keeps purchase money decimal as well", () => {
    const total = Money.from("0.10", "UGX", "agreed").add(
      Money.from("0.20", "UGX", "agreed"),
    );

    expect(total.amount.toString()).toBe("0.3");
    expect(() => Money.from(0.1, "UGX", "agreed")).toThrow(/floating-point/);
  });
});

