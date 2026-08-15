import type { AuthUser } from "@/types/auth";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile || profile.status !== "active") return null;

  return {
    id: user.id,
    email: user.email ?? null,
    role: profile.role,
  };
}
