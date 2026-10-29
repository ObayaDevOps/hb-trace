import "server-only";

import { authFailureStatus, canAccess, getApplicationIdentity, type AppRole } from "./identity";

export async function requireAnyRole(allowedRoles: readonly AppRole[]) {
  const result = await getApplicationIdentity();
  if (!result.identity) {
    return { ok: false as const, status: authFailureStatus(result.reason), reason: result.reason };
  }
  if (!canAccess(result.identity, allowedRoles)) {
    return { ok: false as const, status: 403 as const, reason: "forbidden" as const };
  }
  return { ok: true as const, identity: result.identity };
}
