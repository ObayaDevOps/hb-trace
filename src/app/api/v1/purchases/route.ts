import { NextResponse } from "next/server";
import { runtimeConfig } from "@/lib/runtime-config";
import { requireAnyRole } from "@/server/auth/authorization";
import { getLocalCommandService } from "@/server/commands/local";
import { PersistenceError } from "@/server/persistence";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authorization = await requireAnyRole(["collection_procurement", "supervisor", "administrator"]);
  if (!authorization.ok) {
    return NextResponse.json(
      { error: { code: authorization.reason === "not-configured" ? "AUTH_NOT_CONFIGURED" : "AUTH_REQUIRED", message: "Authenticated server commands are required." } },
      { status: authorization.status },
    );
  }

  if (runtimeConfig.mode === "hosted") {
    return NextResponse.json(
      { error: { code: "PERSISTENCE_NOT_CONFIGURED", message: "Hosted purchase persistence is not enabled yet; no receipt was created." } },
      { status: 501, headers: { "Cache-Control": "no-store" } },
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("object required");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON." } },
      { status: 400 },
    );
  }

  try {
    const result = await getLocalCommandService().submitPurchase(body, {
      actorId: authorization.identity.actorId,
      roles: authorization.identity.roles,
      displayName: authorization.identity.displayName,
    });
    return NextResponse.json(
      {
        data: result,
        meta: { demo: true, serverConfirmed: false },
      },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const status = error instanceof PersistenceError && ["already_exists", "idempotency_mismatch", "version_conflict"].includes(error.code) ? 409 : 422;
    return NextResponse.json(
      {
        error: {
          code: error instanceof PersistenceError ? error.code.toUpperCase() : "VALIDATION_ERROR",
          message: error instanceof Error ? error.message : "The purchase could not be accepted.",
        },
      },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  }
}
