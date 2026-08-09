import type { AuthSession, AuthUser, SupabaseAuthUser } from "@/types/auth";
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

export async function getSession(): Promise<AuthSession | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !user) return null;

  return {
    user: mapUser(user),
    expiresAt: session.expires_at ?? null,
  };
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getCurrentUser()) !== null;
}
