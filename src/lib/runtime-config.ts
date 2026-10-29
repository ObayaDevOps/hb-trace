import "server-only";

export type RuntimeMode = "local" | "hosted";

const hosted = process.env.HB_TRACE_MODE === "hosted";

export const runtimeConfig = {
  mode: (hosted ? "hosted" : "local") as RuntimeMode,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  hasSupabase: Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY),
  ),
  hasSanity: Boolean(
    process.env.SANITY_PROJECT_ID &&
      (process.env.SANITY_READ_TOKEN || process.env.SANITY_WRITE_TOKEN),
  ),
};

export function getProviderReadiness() {
  return {
    mode: runtimeConfig.mode,
    supabase: runtimeConfig.hasSupabase ? "configured" : "local fallback",
    sanity: runtimeConfig.hasSanity ? "configured" : "local fallback",
    liveWritesEnabled: runtimeConfig.mode === "hosted" && runtimeConfig.hasSupabase,
  } as const;
}
