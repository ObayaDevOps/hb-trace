import { NextResponse } from "next/server";
import { validateSyncEnvelope } from "@/lib/sync-protocol";
import { runtimeConfig } from "@/lib/runtime-config";
import { requireAnyRole } from "@/server/auth/authorization";
import { getLocalCommandService } from "@/server/commands/local";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authorization = await requireAnyRole(["collection_procurement", "supervisor", "administrator"]);
  if (!authorization.ok) {
    return NextResponse.json(
      { error: { code: authorization.reason === "not-configured" ? "AUTH_NOT_CONFIGURED" : "AUTH_REQUIRED", message: "An authenticated sync session is required." } },
      { status: authorization.status },
    );
  }

  if (runtimeConfig.mode === "hosted") {
    return NextResponse.json(
      { error: { code: "PERSISTENCE_NOT_CONFIGURED", message: "Hosted synchronization is not enabled yet; no command was acknowledged." } },
      { status: 501, headers: { "Cache-Control": "no-store" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: { code: "INVALID_JSON", message: "Request body must be valid JSON." } }, { status: 400 });
  }

  const commands = Array.isArray(body) ? body : [body];
  const results = [];
  for (const command of commands) {
    const validation = validateSyncEnvelope(command);
    if (!validation.ok) {
      results.push({ operationId: typeof command === "object" && command ? (command as { operationId?: string }).operationId : undefined, status: "rejected", errorType: "INVALID_ENVELOPE", message: validation.message });
      continue;
    }
    results.push(await getLocalCommandService().processSyncEnvelope(validation.envelope, {
      actorId: authorization.identity.actorId,
      roles: authorization.identity.roles,
      displayName: authorization.identity.displayName,
    }));
  }

  return NextResponse.json(
    { data: results, meta: { demo: true, protocolVersion: 1 } },
    { headers: { "Cache-Control": "no-store" } },
  );
}
