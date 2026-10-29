import { asApplicationUuid, isApplicationUuid, type ApplicationUuid } from "./identifiers";
import { AuthorizationError, InvalidTransitionError, ValidationError } from "./errors";

export type DomainRole =
  | "production_staff"
  | "collection_staff"
  | "supervisor"
  | "quality_manager"
  | "administrator"
  | "auditor";

export interface TransitionContext {
  readonly actorId: ApplicationUuid;
  /** Event occurrence time. Instants must include an explicit UTC `Z` suffix. */
  readonly occurredAt: string;
  readonly reason: string;
  readonly evidenceIds?: readonly ApplicationUuid[];
  readonly actorRole?: DomainRole;
  readonly deviceCapturedAt?: string;
  readonly serverCommittedAt?: string;
}

export interface StateTransition<S extends string> {
  readonly from: S;
  readonly to: S;
  readonly actorId: ApplicationUuid;
  readonly actorRole?: DomainRole;
  readonly occurredAt: string;
  readonly deviceCapturedAt?: string;
  readonly serverCommittedAt?: string;
  readonly reason: string;
  readonly evidenceIds: readonly ApplicationUuid[];
}

const UTC_INSTANT_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z$/;

export function assertUtcInstant(value: string, fieldName = "instant"): void {
  if (typeof value !== "string" || !UTC_INSTANT_PATTERN.test(value) || Number.isNaN(Date.parse(value))) {
    throw new ValidationError(`${fieldName} must be a valid ISO-8601 UTC instant.`, {
      fieldName,
      value,
    });
  }
}

export function assertTransitionContext(context: TransitionContext): void {
  if (!isApplicationUuid(context.actorId)) {
    throw new ValidationError("A state transition requires a valid application actor UUID.", {
      actorId: context.actorId,
    });
  }

  assertUtcInstant(context.occurredAt, "occurredAt");
  if (context.deviceCapturedAt !== undefined) {
    assertUtcInstant(context.deviceCapturedAt, "deviceCapturedAt");
  }
  if (context.serverCommittedAt !== undefined) {
    assertUtcInstant(context.serverCommittedAt, "serverCommittedAt");
  }

  if (typeof context.reason !== "string" || context.reason.trim().length === 0) {
    throw new ValidationError("A state transition requires a non-empty reason.");
  }

  for (const evidenceId of context.evidenceIds ?? []) {
    if (!isApplicationUuid(evidenceId)) {
      throw new ValidationError("Transition evidence IDs must be application UUIDv4 values.", {
        evidenceId,
      });
    }
  }
}

export function canTransitionState<S extends string>(
  flow: Readonly<Record<S, readonly S[]>>,
  from: S,
  to: S,
): boolean {
  return (flow[from] ?? []).includes(to);
}

export function createStateTransition<S extends string>(
  entity: string,
  flow: Readonly<Record<S, readonly S[]>>,
  from: S,
  to: S,
  context: TransitionContext,
): StateTransition<S> {
  assertTransitionContext(context);
  const allowed = flow[from] ?? [];
  if (!allowed.includes(to)) {
    throw new InvalidTransitionError(entity, from, to, allowed);
  }

  return {
    from,
    to,
    actorId: asApplicationUuid(context.actorId),
    actorRole: context.actorRole,
    occurredAt: context.occurredAt,
    deviceCapturedAt: context.deviceCapturedAt,
    serverCommittedAt: context.serverCommittedAt,
    reason: context.reason.trim(),
    evidenceIds: (context.evidenceIds ?? []).map((id) => asApplicationUuid(id)),
  };
}

/**
 * Role checks are kept as a small domain policy helper. The application layer
 * still performs server-side permission checks for every command; when a role
 * is supplied here, an incompatible role is rejected as defence in depth.
 */
export function assertActorRole(
  context: TransitionContext,
  allowedRoles: readonly DomainRole[],
): void {
  if (context.actorRole !== undefined && !allowedRoles.includes(context.actorRole)) {
    throw new AuthorizationError("The actor role is not authorized for this domain action.", {
      actorRole: context.actorRole,
      allowedRoles,
    });
  }
}

/** Require an explicit role for privileged domain transitions. */
export function requireActorRole(
  context: TransitionContext,
  allowedRoles: readonly DomainRole[],
): void {
  if (context.actorRole === undefined || !allowedRoles.includes(context.actorRole)) {
    throw new AuthorizationError("An explicit authorized actor role is required for this domain action.", {
      actorRole: context.actorRole,
      allowedRoles,
    });
  }
}
