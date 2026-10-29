import { NextResponse } from "next/server";
import { demoDashboard } from "@/lib/demo-data";
import { runtimeConfig } from "@/lib/runtime-config";
import { requireAnyRole } from "@/server/auth/authorization";

export const dynamic = "force-dynamic";

export async function GET() {
  const authorization = await requireAnyRole([
    "production_staff",
    "collection_procurement",
    "supervisor",
    "quality_manager",
    "administrator",
    "auditor",
  ]);
  if (!authorization.ok) {
    return NextResponse.json(
      { error: { code: authorization.reason === "not-configured" ? "AUTH_NOT_CONFIGURED" : "AUTH_REQUIRED", message: "Staff authentication is required." } },
      { status: authorization.status, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (runtimeConfig.mode === "hosted") {
    return NextResponse.json(
      { error: { code: "PERSISTENCE_NOT_CONFIGURED", message: "The hosted persistence adapter has not been enabled yet." } },
      { status: 501, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { data: demoDashboard, meta: { demo: authorization.identity.assuranceLevel === "local-demo", roles: authorization.identity.roles } },
    { headers: { "Cache-Control": "no-store" } },
  );
}
