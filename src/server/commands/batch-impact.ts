import {
  assertExecutableBatchImpact,
  planBatchImpact,
  type BatchImpactPlan,
  type BatchImpactRequest,
} from "@/domain";
import { AuthorizationError } from "@/domain/errors";

/** Only a quality manager may commit a V1 hold, withdrawal or recall. */
export const BATCH_ACTION_ROLE = "quality_manager" as const;

export interface PrepareBatchActionInput extends BatchImpactRequest {
  readonly actorRole: string;
}

/**
 * Server-side command seam for the incident workflow.
 *
 * This deliberately prepares and validates a complete impact plan but does
 * not write anything. The eventual persistence command must call this after
 * loading the same records in its transaction, lock/re-check versions, then
 * append recall scope, quality decisions, publication withdrawal revisions and
 * audit events before committing.
 */
export function prepareBatchAction(input: PrepareBatchActionInput): BatchImpactPlan {
  if (input.actorRole !== BATCH_ACTION_ROLE) {
    throw new AuthorizationError("Only a quality manager may prepare a batch hold, withdrawal or recall.", {
      actorRole: input.actorRole,
      requiredRole: BATCH_ACTION_ROLE,
    });
  }

  const plan = planBatchImpact(input);
  assertExecutableBatchImpact(plan);
  return plan;
}
