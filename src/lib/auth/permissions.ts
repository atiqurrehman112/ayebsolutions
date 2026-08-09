import {
  AUTH_ROLES,
  type AuthRole,
  type PermissionSet,
  type SupabaseAuthUser,
} from "@/types/auth";

const permissions: Readonly<Record<AuthRole, PermissionSet>> = {
  admin: {
    canManageContent: true,
    canManageUsers: true,
    canManageSettings: true,
    canViewAdmin: true,
  },
  editor: {
    canManageContent: true,
    canManageUsers: false,
    canManageSettings: false,
    canViewAdmin: true,
  },
  viewer: {
    canManageContent: false,
    canManageUsers: false,
    canManageSettings: false,
    canViewAdmin: true,
  },
};

export function isAuthRole(value: unknown): value is AuthRole {
  return typeof value === "string" && AUTH_ROLES.includes(value as AuthRole);
}

export function getUserRole(user: SupabaseAuthUser): AuthRole {
  const role = user.app_metadata.role;
  return isAuthRole(role) ? role : "viewer";
}

export function getPermissions(role: AuthRole): PermissionSet {
  return permissions[role];
}
