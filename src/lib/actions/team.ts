"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { TeamRepository } from "@/lib/database/repositories/team-repository";
import {
  teamMemberSchema,
  teamMemberUpdateSchema,
} from "@/lib/validation/team";

export interface TeamActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "idle" | "error" | "success";
}
export const initialTeamActionState: TeamActionState = {
  message: "",
  status: "idle",
};
class TeamPermissionError extends Error {}

async function permission(deleteOperation = false) {
  const user = await requireAdmin();
  if (!getPermissions(user.role).canManageContent)
    throw new TeamPermissionError(
      "Your viewer role has read-only Team access.",
    );
  if (deleteOperation && user.role !== "admin")
    throw new TeamPermissionError(
      "Only administrators can permanently delete team members.",
    );
  return user;
}
const nullable = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  return text || null;
};
function values(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    profile_image: nullable(formData.get("profile_image")),
    role: formData.get("role"),
    department: nullable(formData.get("department")),
    short_bio: formData.get("short_bio"),
    full_bio: nullable(formData.get("full_bio")),
    skills: String(formData.get("skills") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    years_experience: formData.get("years_experience")
      ? Number(formData.get("years_experience"))
      : null,
    email: nullable(formData.get("email")),
    linkedin_url: nullable(formData.get("linkedin_url")),
    github_url: nullable(formData.get("github_url")),
    twitter_url: nullable(formData.get("twitter_url")),
    portfolio_url: nullable(formData.get("portfolio_url")),
    featured: formData.get("featured") === "on",
    display_order: Number(formData.get("display_order") ?? 0),
    status: formData.get("status"),
  };
}
function invalid(
  errors: Record<string, string[] | undefined>,
): TeamActionState {
  return {
    fieldErrors: Object.fromEntries(
      Object.entries(errors).filter((entry): entry is [string, string[]] =>
        Boolean(entry[1]?.length),
      ),
    ),
    message: "Review the highlighted fields and try again.",
    status: "error",
  };
}
function failure(error: unknown): TeamActionState {
  return {
    message:
      error instanceof TeamPermissionError
        ? error.message
        : "The team member change could not be completed. Check unique fields and try again.",
    status: "error",
  };
}
function refresh() {
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidateTag("team");
}

export async function createTeamMember(
  _state: TeamActionState,
  formData: FormData,
): Promise<TeamActionState> {
  const parsed = teamMemberSchema.safeParse(values(formData));
  if (!parsed.success) return invalid(parsed.error.flatten().fieldErrors);
  try {
    const user = await permission();
    await new TeamRepository(await createDatabaseClient()).create({
      ...parsed.data,
      created_by: user.id,
      updated_by: user.id,
    });
    refresh();
    return { message: "Team member created.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
export async function updateTeamMember(
  _state: TeamActionState,
  formData: FormData,
): Promise<TeamActionState> {
  const id = String(formData.get("id") ?? "");
  const parsed = teamMemberUpdateSchema.safeParse(values(formData));
  if (!z.uuid().safeParse(id).success)
    return { message: "A valid member ID is required.", status: "error" };
  if (!parsed.success) return invalid(parsed.error.flatten().fieldErrors);
  try {
    const user = await permission();
    await new TeamRepository(await createDatabaseClient()).update(id, {
      ...parsed.data,
      updated_by: user.id,
    });
    refresh();
    return { message: "Team member updated.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
async function lifecycle(
  id: string,
  operation: "delete" | "publish" | "draft" | "feature",
): Promise<TeamActionState> {
  if (!z.uuid().safeParse(id).success)
    return { message: "A valid member ID is required.", status: "error" };
  try {
    const user = await permission(operation === "delete");
    const repository = new TeamRepository(await createDatabaseClient());
    const member = await repository.findById(id);
    if (!member)
      return {
        message: "The requested team member was not found.",
        status: "error",
      };
    if (operation === "delete") await repository.delete(id);
    else if (operation === "publish")
      await repository.update(id, { status: "published", updated_by: user.id });
    else if (operation === "draft")
      await repository.update(id, { status: "draft", updated_by: user.id });
    else
      await repository.update(id, {
        featured: !member.featured,
        updated_by: user.id,
      });
    refresh();
    return {
      message:
        operation === "delete"
          ? "Team member deleted permanently."
          : operation === "feature"
            ? "Featured placement updated."
            : `Team member moved to ${operation}.`,
      status: "success",
    };
  } catch (error) {
    return failure(error);
  }
}
export async function deleteTeamMember(id: string) {
  return lifecycle(id, "delete");
}
export async function publishTeamMember(id: string) {
  return lifecycle(id, "publish");
}
export async function draftTeamMember(id: string) {
  return lifecycle(id, "draft");
}
export async function toggleFeaturedTeamMember(id: string) {
  return lifecycle(id, "feature");
}

export async function reorderTeamMembers(
  ids: readonly string[],
): Promise<TeamActionState> {
  const parsed = z.array(z.uuid()).min(1).max(100).safeParse(ids);
  if (!parsed.success)
    return { message: "A valid ordering is required.", status: "error" };
  try {
    const user = await permission();
    await new TeamRepository(await createDatabaseClient()).reorder(
      parsed.data,
      user.id,
    );
    refresh();
    return { message: "Team order saved.", status: "success" };
  } catch (error) {
    return failure(error);
  }
}
