import type { AuthUser, SupabaseAuthUser } from "@/types/auth";
import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "./permissions";

function mapUser(user: SupabaseAuthUser): AuthUser {
  return {
    id: user.id,
    email: user.email ?? null,
    role: getUserRole(user),
  };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? mapUser(user) : null;
}
