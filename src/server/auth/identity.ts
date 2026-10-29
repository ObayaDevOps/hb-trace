import "server-only";

import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import { runtimeConfig } from "@/lib/runtime-config";
import { LOCAL_DEMO_ACTOR_ID } from "@/lib/sync-types";

export const APP_ROLES = [
  "production_staff",
  "collection_procurement",
  "supervisor",
  "quality_manager",
  "administrator",
  "auditor",
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export type ApplicationIdentity = {
  actorId: string;
  externalSubject: string;
  displayName: string;
  roles: AppRole[];
  assuranceLevel: "local-demo" | "authenticated";
};

export type IdentityResult =
  | { identity: ApplicationIdentity }
  | { identity: null; reason: "not-configured" | "unauthenticated" | "unmapped" };

type ActorMapping = {
  actor_id: string;
  actors: { display_name?: string } | { display_name?: string }[] | null;
};

type AssignedRole = {
  roles: { code?: string } | { code?: string }[] | null;
};

const localDemoIdentity: ApplicationIdentity = {
  actorId: LOCAL_DEMO_ACTOR_ID,
  externalSubject: "local-demo",
  displayName: "Amina M.",
  roles: ["production_staff", "collection_procurement", "supervisor"],
  assuranceLevel: "local-demo",
};

export async function getApplicationIdentity(): Promise<IdentityResult> {
  if (runtimeConfig.mode === "local") return { identity: localDemoIdentity };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { identity: null, reason: "not-configured" };

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { identity: null, reason: "unauthenticated" };

  const { data: rawMapping, error: mappingError } = await supabase
    .from("actor_identities")
    .select("actor_id, actors(display_name)")
    .eq("provider", "supabase")
    .eq("subject", data.user.id)
    .eq("status", "active")
    .maybeSingle();
  const mapping = rawMapping as unknown as ActorMapping | null;

  if (mappingError || !mapping) return { identity: null, reason: "unmapped" };

  const { data: rawAssignedRoles } = await supabase
    .from("actor_roles")
    .select("roles(code)")
    .eq("actor_id", mapping.actor_id)
    .is("revoked_at", null);
  const assignedRoles = (rawAssignedRoles ?? []) as unknown as AssignedRole[];

  const roles = (assignedRoles ?? [])
    .map((row) => {
      const role = Array.isArray(row.roles) ? row.roles[0]?.code : row.roles?.code;
      return role as AppRole;
    })
    .filter((role): role is AppRole => APP_ROLES.includes(role));
  const actorRelation = Array.isArray(mapping.actors) ? mapping.actors[0] : mapping.actors;
  const displayName = actorRelation?.display_name;

  return {
    identity: {
      actorId: mapping.actor_id,
      externalSubject: data.user.id,
      displayName: displayName || data.user.email || "Authenticated staff member",
      roles,
      assuranceLevel: "authenticated",
    },
  };
}

export function canAccess(identity: ApplicationIdentity, allowedRoles: readonly AppRole[]) {
  return identity.roles.some((role) => allowedRoles.includes(role));
}

export function authFailureStatus(reason: "not-configured" | "unauthenticated" | "unmapped") {
  if (reason === "not-configured") return 503;
  return 401;
}
