import { Decimal, type DecimalInput } from "./decimal";
import { QuantityError, ValidationError } from "./errors";

declare const currencyCodeBrand: unique symbol;

export type CurrencyCode = string & { readonly [currencyCodeBrand]: "CurrencyCode" };
export type MonetaryMeaning = "agreed" | "paid" | "deducted" | "outstanding";

export function asCurrencyCode(value: string): CurrencyCode {
  const normalized = value.trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(normalized)) {
    throw new ValidationError("Currency must be a three-letter ISO 4217 code.", { value });
  }
  return normalized as CurrencyCode;
}

export interface MoneyInput {
  readonly amount: DecimalInput;
  readonly currency: string;
  readonly meaning: MonetaryMeaning;
}

/** Exact monetary value; no JavaScript number can enter this type. */
export class Money {
  readonly amount: Decimal;
  readonly currency: CurrencyCode;
  readonly meaning: MonetaryMeaning;

  private constructor(amount: Decimal, currency: CurrencyCode, meaning: MonetaryMeaning) {
    if (amount.isNegative()) {
      throw new QuantityError("Monetary amounts cannot be negative.", { amount: amount.toString() });
    }
    this.amount = amount;
    this.currency = currency;
    this.meaning = meaning;
  }

  static from(amount: DecimalInput, currency: string, meaning: MonetaryMeaning): Money;
  static from(amount: number, currency: string, meaning: MonetaryMeaning): never;
  static from(
    amount: DecimalInput | number,
    currency: string,
    meaning: MonetaryMeaning,
  ): Money {
    if (typeof amount === "number") {
      throw new QuantityError(
        "Binary floating-point numbers are not accepted; supply decimal text or a BigInt.",
        { amount },
      );
    }
    return new Money(Decimal.from(amount), asCurrencyCode(currency), meaning);
  }

  static fromInput(input: MoneyInput): Money {
    return Money.from(input.amount, input.currency, input.meaning);
  }

  add(other: Money): Money {
    this.assertCompatible(other);
    return new Money(this.amount.add(other.amount), this.currency, this.meaning);
  }

  subtract(other: Money): Money {
    this.assertCompatible(other);
    const result = this.amount.subtract(other.amount);
    if (result.isNegative()) {
      throw new QuantityError("A monetary amount cannot become negative.");
    }
    return new Money(result, this.currency, this.meaning);
  }

  equals(other: Money): boolean {
    this.assertCompatible(other);
    return this.amount.equals(other.amount);
  }

  toString(): string {
    return `${this.amount.toString()} ${this.currency} (${this.meaning})`;
  }

  toJSON(): { amount: string; currency: CurrencyCode; meaning: MonetaryMeaning } {
    return {
      amount: this.amount.toString(),
      currency: this.currency,
      meaning: this.meaning,
    };
  }

  private assertCompatible(other: Money): void {
    if (this.currency !== other.currency || this.meaning !== other.meaning) {
      throw new QuantityError("Money values must have the same currency and meaning.", {
        leftCurrency: this.currency,
        rightCurrency: other.currency,
        leftMeaning: this.meaning,
        rightMeaning: other.meaning,
      });
    }
  }
}
