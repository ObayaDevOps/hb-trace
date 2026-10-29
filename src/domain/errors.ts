export type DomainErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_TRANSITION"
  | "AUTHORIZATION_ERROR"
  | "QUANTITY_ERROR"
  | "ALLOCATION_ERROR"
  | "INVARIANT_VIOLATION"
  | "LINEAGE_CYCLE";

export class DomainError extends Error {
  readonly code: DomainErrorCode;
  readonly details: Readonly<Record<string, unknown>>;

  constructor(
    code: DomainErrorCode,
    message: string,
    details: Readonly<Record<string, unknown>> = {},
  ) {
    super(message);
    this.name = "DomainError";
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends DomainError {
  constructor(message: string, details: Readonly<Record<string, unknown>> = {}) {
    super("VALIDATION_ERROR", message, details);
    this.name = "ValidationError";
  }
}

export class InvalidTransitionError<S extends string = string> extends DomainError {
  readonly entity: string;
  readonly from: S;
  readonly to: S;
  readonly allowed: readonly S[];

  constructor(entity: string, from: S, to: S, allowed: readonly S[]) {
    super(
      "INVALID_TRANSITION",
      `Invalid ${entity} transition from ${from} to ${to}.`,
      { entity, from, to, allowed },
    );
    this.name = "InvalidTransitionError";
    this.entity = entity;
    this.from = from;
    this.to = to;
    this.allowed = allowed;
  }
}

export class AuthorizationError extends DomainError {
  constructor(message: string, details: Readonly<Record<string, unknown>> = {}) {
    super("AUTHORIZATION_ERROR", message, details);
    this.name = "AuthorizationError";
  }
}

export class QuantityError extends DomainError {
  constructor(message: string, details: Readonly<Record<string, unknown>> = {}) {
    super("QUANTITY_ERROR", message, details);
    this.name = "QuantityError";
  }
}

export class AllocationError extends DomainError {
  constructor(message: string, details: Readonly<Record<string, unknown>> = {}) {
    super("ALLOCATION_ERROR", message, details);
    this.name = "AllocationError";
  }
}

export class InvariantViolationError extends DomainError {
  constructor(message: string, details: Readonly<Record<string, unknown>> = {}) {
    super("INVARIANT_VIOLATION", message, details);
    this.name = "InvariantViolationError";
  }
}

export class LineageCycleError extends DomainError {
  readonly cycleNodeIds: readonly string[];

  constructor(cycleNodeIds: readonly string[]) {
    super(
      "LINEAGE_CYCLE",
      "Lineage allocations must form an acyclic graph.",
      { cycleNodeIds },
    );
    this.name = "LineageCycleError";
    this.cycleNodeIds = cycleNodeIds;
  }
}

