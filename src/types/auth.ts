import type { User } from "@supabase/supabase-js";

export const AUTH_ROLES = ["admin", "editor", "viewer"] as const;

export type AuthRole = (typeof AUTH_ROLES)[number];

export interface AuthUser {
  readonly id: string;
  readonly email: string | null;
  readonly role: AuthRole;
}

export type SupabaseAuthUser = User;

export interface PermissionSet {
  readonly canManageContent: boolean;
  readonly canManageUsers: boolean;
  readonly canViewAdmin: boolean;
}
