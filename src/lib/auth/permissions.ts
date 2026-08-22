import { type AuthRole, type PermissionSet } from "@/types/auth";

const permissions: Readonly<Record<AuthRole, PermissionSet>> = {
  admin: {
    canManageContent: true,
    canManageUsers: true,
    canViewAdmin: true,
  },
  editor: {
    canManageContent: true,
    canManageUsers: false,
    canViewAdmin: true,
  },
  viewer: {
    canManageContent: false,
    canManageUsers: false,
    canViewAdmin: true,
  },
};

export function getPermissions(role: AuthRole): PermissionSet {
  return permissions[role];
}
