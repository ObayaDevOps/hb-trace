import { NextResponse } from "next/server";
import { getProviderReadiness, runtimeConfig } from "@/lib/runtime-config";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      data: {
        status: "ok",
        service: "hb-trace",
        version: "v1",
        mode: runtimeConfig.mode,
        providers: getProviderReadiness(),
      },
      meta: { generatedAt: new Date().toISOString() },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
