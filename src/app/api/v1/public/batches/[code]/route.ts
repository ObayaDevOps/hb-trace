import { NextResponse } from "next/server";
import { getDemoBatch } from "@/lib/demo-data";
import { runtimeConfig } from "@/lib/runtime-config";
import { checkRateLimit, requestAddress } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const rateLimit = checkRateLimit(`public-batch:${requestAddress(request)}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many lookup requests. Try again shortly." } },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  }
  const { code } = await context.params;
  if (runtimeConfig.mode === "hosted") {
    return NextResponse.json(
      { error: { code: "PUBLIC_PROJECTION_NOT_CONFIGURED", message: "Hosted public publication is not enabled yet." } },
      { status: 501, headers: { "Cache-Control": "no-store" } },
    );
  }
  let decodedCode = code;
  try {
    decodedCode = decodeURIComponent(code);
  } catch {
    decodedCode = "";
  }
  const batch = getDemoBatch(decodedCode);

  if (!batch || batch.status !== "published") {
    return NextResponse.json(
      { error: { code: "BATCH_NOT_FOUND", message: "Batch or lot code not found." } },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { data: batch, meta: { source: "approved-public-projection", demo: true } },
    {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        "X-Robots-Tag": "noarchive",
      },
    },
  );
}
