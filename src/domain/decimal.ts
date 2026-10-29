import { QuantityError, ValidationError } from "./errors";

const TEN = 10n;
const MAX_DECIMAL_SCALE = 10_000;

function powerOfTen(exponent: number): bigint {
  if (!Number.isSafeInteger(exponent) || exponent < 0 || exponent > MAX_DECIMAL_SCALE) {
    throw new ValidationError("Decimal scale is outside the supported exact range.", {
      exponent,
      max: MAX_DECIMAL_SCALE,
    });
  }

  return TEN ** BigInt(exponent);
}

function normalizeParts(coefficient: bigint, scale: number): { coefficient: bigint; scale: number } {
  if (!Number.isSafeInteger(scale) || scale < 0 || scale > MAX_DECIMAL_SCALE) {
    throw new ValidationError("Decimal scale must be a non-negative supported integer.", {
      scale,
    });
  }

  if (coefficient === 0n) {
    return { coefficient: 0n, scale: 0 };
  }

  let normalizedCoefficient = coefficient;
  let normalizedScale = scale;

  while (normalizedScale > 0 && normalizedCoefficient % TEN === 0n) {
    normalizedCoefficient /= TEN;
    normalizedScale -= 1;
  }

  return { coefficient: normalizedCoefficient, scale: normalizedScale };
}

function parseDecimalString(input: string): { coefficient: bigint; scale: number } {
  const value = input.trim();
  const match = /^([+-])?(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/.exec(value);

  if (!match) {
    throw new ValidationError("Decimal values must be supplied as exact decimal text.", {
      value: input,
    });
  }

  const wholeDigits = match[2] ?? "";
  const fractionalDigits = match[3] ?? match[4] ?? "";
  const digits = `${wholeDigits}${fractionalDigits}` || "0";
  const exponent = Number(match[5] ?? "0");

  if (!Number.isSafeInteger(exponent)) {
    throw new ValidationError("Decimal exponent is outside the supported exact range.", {
      value: input,
    });
  }

  let scale = fractionalDigits.length - exponent;
  let coefficient = BigInt(digits);

  if (match[1] === "-") {
    coefficient = -coefficient;
  }

  if (scale < 0) {
    coefficient *= powerOfTen(-scale);
    scale = 0;
  }

  return normalizeParts(coefficient, scale);
}

export type DecimalInput = string | bigint | Decimal;

/**
 * Exact base-10 decimal arithmetic backed by a signed BigInt coefficient.
 * JavaScript numbers are deliberately not accepted, so values such as 0.1
 * cannot enter the domain through a binary floating-point conversion.
 */
export class Decimal {
  private constructor(
    private readonly coefficientValue: bigint,
    private readonly scaleValue: number,
  ) {}

  static from(value: DecimalInput): Decimal;
  static from(value: number): never;
  static from(value: DecimalInput | number): Decimal {
    if (value instanceof Decimal) {
      return value;
    }

    if (typeof value === "number") {
      throw new QuantityError(
        "Binary floating-point numbers are not accepted; supply decimal text or a BigInt.",
        { value },
      );
    }

    const parts = typeof value === "bigint" ? normalizeParts(value, 0) : parseDecimalString(value);
    return new Decimal(parts.coefficient, parts.scale);
  }

  static zero(): Decimal {
    return new Decimal(0n, 0);
  }

  get coefficient(): bigint {
    return this.coefficientValue;
  }

  get scale(): number {
    return this.scaleValue;
  }

  isZero(): boolean {
    return this.coefficientValue === 0n;
  }

  isNegative(): boolean {
    return this.coefficientValue < 0n;
  }

  isPositive(): boolean {
    return this.coefficientValue > 0n;
  }

  negate(): Decimal {
    return Decimal.fromParts(-this.coefficientValue, this.scaleValue);
  }

  abs(): Decimal {
    return this.isNegative() ? this.negate() : this;
  }

  add(other: DecimalInput): Decimal {
    const right = Decimal.from(other);
    const scale = Math.max(this.scaleValue, right.scaleValue);
    const leftCoefficient = this.coefficientValue * powerOfTen(scale - this.scaleValue);
    const rightCoefficient = right.coefficientValue * powerOfTen(scale - right.scaleValue);
    return Decimal.fromParts(leftCoefficient + rightCoefficient, scale);
  }

  subtract(other: DecimalInput): Decimal {
    return this.add(Decimal.from(other).negate());
  }

  multiply(other: DecimalInput): Decimal {
    const right = Decimal.from(other);
    return Decimal.fromParts(
      this.coefficientValue * right.coefficientValue,
      this.scaleValue + right.scaleValue,
    );
  }

  /** Multiply by an exact power of ten without going through Number arithmetic. */
  scaleByPowerOfTen(power: number): Decimal {
    if (!Number.isSafeInteger(power)) {
      throw new ValidationError("Decimal power-of-ten scale must be an integer.", { power });
    }

    const newScale = this.scaleValue - power;
    if (newScale < 0) {
      return Decimal.fromParts(this.coefficientValue * powerOfTen(-newScale), 0);
    }

    return Decimal.fromParts(this.coefficientValue, newScale);
  }

  compare(other: DecimalInput): -1 | 0 | 1 {
    const right = Decimal.from(other);
    const scale = Math.max(this.scaleValue, right.scaleValue);
    const leftCoefficient = this.coefficientValue * powerOfTen(scale - this.scaleValue);
    const rightCoefficient = right.coefficientValue * powerOfTen(scale - right.scaleValue);

    if (leftCoefficient < rightCoefficient) return -1;
    if (leftCoefficient > rightCoefficient) return 1;
    return 0;
  }

  equals(other: DecimalInput): boolean {
    return this.compare(other) === 0;
  }

  lessThan(other: DecimalInput): boolean {
    return this.compare(other) === -1;
  }

  lessThanOrEqual(other: DecimalInput): boolean {
    return this.compare(other) !== 1;
  }

  greaterThan(other: DecimalInput): boolean {
    return this.compare(other) === 1;
  }

  greaterThanOrEqual(other: DecimalInput): boolean {
    return this.compare(other) !== -1;
  }

  toString(): string {
    if (this.coefficientValue === 0n) return "0";

    const negative = this.coefficientValue < 0n;
    const digits = (negative ? -this.coefficientValue : this.coefficientValue).toString();

    if (this.scaleValue === 0) {
      return `${negative ? "-" : ""}${digits}`;
    }

    const decimalIndex = digits.length - this.scaleValue;
    const whole = decimalIndex > 0 ? digits.slice(0, decimalIndex) : "0";
    const fraction =
      decimalIndex > 0
        ? digits.slice(decimalIndex)
        : `${"0".repeat(-decimalIndex)}${digits}`;

    return `${negative ? "-" : ""}${whole}.${fraction}`;
  }

  toJSON(): string {
    return this.toString();
  }

  private static fromParts(coefficient: bigint, scale: number): Decimal {
    const parts = normalizeParts(coefficient, scale);
    return new Decimal(parts.coefficient, parts.scale);
  }
}

export function decimal(value: DecimalInput): Decimal;
export function decimal(value: number): never;
export function decimal(value: DecimalInput | number): Decimal {
  if (typeof value === "number") {
    throw new QuantityError(
      "Binary floating-point numbers are not accepted; supply decimal text or a BigInt.",
      { value },
    );
  }
  return value instanceof Decimal ? value : Decimal.from(value);
}

export type QuantityKind = "mass" | "volume" | "count";
export type MassUnit = "mg" | "g" | "kg" | "t";
export type VolumeUnit = "mL" | "L";
export type QuantityUnit = MassUnit | VolumeUnit | "count";

export interface QuantityUnitDefinition {
  readonly kind: QuantityKind;
  readonly canonicalUnit: QuantityUnit;
  /** canonical value = entered value × 10^powerOfTen */
  readonly powerOfTen: number;
}

export const QUANTITY_UNIT_DEFINITIONS: Readonly<Record<QuantityUnit, QuantityUnitDefinition>> = {
  mg: { kind: "mass", canonicalUnit: "kg", powerOfTen: -6 },
  g: { kind: "mass", canonicalUnit: "kg", powerOfTen: -3 },
  kg: { kind: "mass", canonicalUnit: "kg", powerOfTen: 0 },
  t: { kind: "mass", canonicalUnit: "kg", powerOfTen: 3 },
  mL: { kind: "volume", canonicalUnit: "L", powerOfTen: -3 },
  L: { kind: "volume", canonicalUnit: "L", powerOfTen: 0 },
  count: { kind: "count", canonicalUnit: "count", powerOfTen: 0 },
};

export interface QuantityInputObject {
  readonly value: DecimalInput;
  readonly unit: QuantityUnit;
}

export type QuantityLike = Quantity | QuantityInputObject;

function assertQuantityUnit(unit: QuantityUnit): QuantityUnitDefinition {
  const definition = QUANTITY_UNIT_DEFINITIONS[unit];
  if (!definition) {
    throw new ValidationError(`Unsupported quantity unit: ${String(unit)}.`, { unit });
  }
  return definition;
}

function assertSameKind(left: Quantity, right: Quantity): void {
  if (left.kind !== right.kind) {
    throw new QuantityError("Quantities with different dimensions cannot be combined.", {
      leftKind: left.kind,
      rightKind: right.kind,
    });
  }
}

export class Quantity {
  readonly value: Decimal;
  readonly unit: QuantityUnit;
  readonly kind: QuantityKind;
  readonly enteredValue: Decimal;
  readonly enteredUnit: QuantityUnit;
  readonly canonicalValue: Decimal;
  readonly canonicalUnit: QuantityUnit;

  private constructor(value: Decimal, unit: QuantityUnit) {
    const definition = assertQuantityUnit(unit);
    if (value.isNegative()) {
      throw new QuantityError("Quantities cannot be negative.", { value: value.toString(), unit });
    }

    this.value = value;
    this.unit = unit;
    this.kind = definition.kind;
    this.enteredValue = value;
    this.enteredUnit = unit;
    this.canonicalValue = value.scaleByPowerOfTen(definition.powerOfTen);
    this.canonicalUnit = definition.canonicalUnit;
  }

  static from(value: DecimalInput, unit: QuantityUnit): Quantity;
  static from(value: number, unit: QuantityUnit): never;
  static from(input: QuantityInputObject): Quantity;
  static from(
    valueOrInput: DecimalInput | QuantityInputObject | number,
    unit?: QuantityUnit,
  ): Quantity {
    if (typeof valueOrInput === "object" && valueOrInput !== null && "unit" in valueOrInput) {
      return new Quantity(Decimal.from(valueOrInput.value), valueOrInput.unit);
    }

    if (unit === undefined) {
      throw new ValidationError("A quantity unit is required.");
    }

    if (
      typeof valueOrInput === "string" ||
      typeof valueOrInput === "bigint" ||
      valueOrInput instanceof Decimal
    ) {
      return new Quantity(Decimal.from(valueOrInput), unit);
    }

    throw new ValidationError("A valid decimal quantity value is required.");
  }

  toCanonical(): Quantity {
    return Quantity.from(this.canonicalValue, this.canonicalUnit);
  }

  /** The normalized value stored for ledger comparisons and persistence. */
  get normalizedValue(): Decimal {
    return this.canonicalValue;
  }

  get normalizedUnit(): QuantityUnit {
    return this.canonicalUnit;
  }

  convertTo(targetUnit: QuantityUnit): Quantity {
    const targetDefinition = assertQuantityUnit(targetUnit);
    if (targetDefinition.kind !== this.kind) {
      throw new QuantityError("A quantity can only be converted within its dimension.", {
        from: this.unit,
        to: targetUnit,
      });
    }

    return Quantity.from(
      this.canonicalValue.scaleByPowerOfTen(-targetDefinition.powerOfTen),
      targetUnit,
    );
  }

  add(other: QuantityLike): Quantity {
    const right = toQuantity(other);
    assertSameKind(this, right);
    return Quantity.from(this.canonicalValue.add(right.canonicalValue), this.canonicalUnit);
  }

  subtract(other: QuantityLike): Quantity {
    const right = toQuantity(other);
    assertSameKind(this, right);
    const result = this.canonicalValue.subtract(right.canonicalValue);
    if (result.isNegative()) {
      throw new QuantityError("A quantity cannot become negative.", {
        available: this.toString(),
        requested: right.toString(),
      });
    }
    return Quantity.from(result, this.canonicalUnit);
  }

  compare(other: QuantityLike): -1 | 0 | 1 {
    const right = toQuantity(other);
    assertSameKind(this, right);
    return this.canonicalValue.compare(right.canonicalValue);
  }

  equals(other: QuantityLike): boolean {
    return this.compare(other) === 0;
  }

  isZero(): boolean {
    return this.canonicalValue.isZero();
  }

  isPositive(): boolean {
    return this.canonicalValue.isPositive();
  }

  toString(): string {
    return `${this.value.toString()} ${this.unit}`;
  }

  toJSON(): { value: string; unit: QuantityUnit; canonicalValue: string; canonicalUnit: QuantityUnit } {
    return {
      value: this.value.toString(),
      unit: this.unit,
      canonicalValue: this.canonicalValue.toString(),
      canonicalUnit: this.canonicalUnit,
    };
  }
}

export function createQuantity(value: DecimalInput, unit: QuantityUnit): Quantity;
export function createQuantity(value: number, unit: QuantityUnit): never;
export function createQuantity(value: DecimalInput | number, unit: QuantityUnit): Quantity {
  if (typeof value === "number") {
    throw new QuantityError(
      "Binary floating-point numbers are not accepted; supply decimal text or a BigInt.",
      { value },
    );
  }
  return Quantity.from(value, unit);
}

export function quantity(value: DecimalInput, unit: QuantityUnit): Quantity;
export function quantity(value: number, unit: QuantityUnit): never;
export function quantity(value: DecimalInput | number, unit: QuantityUnit): Quantity {
  if (typeof value === "number") {
    throw new QuantityError(
      "Binary floating-point numbers are not accepted; supply decimal text or a BigInt.",
      { value },
    );
  }
  return createQuantity(value, unit);
}

export function toQuantity(input: QuantityLike): Quantity {
  return input instanceof Quantity ? input : Quantity.from(input);
}

export function quantityEquals(left: QuantityLike, right: QuantityLike): boolean {
  return toQuantity(left).equals(right);
}
