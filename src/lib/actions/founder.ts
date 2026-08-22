"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth/auth";
import { getPermissions } from "@/lib/auth/permissions";
import { createDatabaseClient } from "@/lib/database";
import { FounderRepository } from "@/lib/database/repositories/founder-repository";
import { founderProfileSchema } from "@/lib/validation/founder";
import type { FounderActionState } from "./action-states";

const nullable = (value: FormDataEntryValue | null) =>
  String(value ?? "").trim() || null;
const numberOrNull = (value: FormDataEntryValue | null) =>
  value ? Number(value) : null;
const list = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function values(formData: FormData) {
  const intent = formData.get("intent");
  return {
    full_name: formData.get("full_name"),
    role_title: formData.get("role_title"),
    professional_headline: formData.get("professional_headline"),
    short_introduction: formData.get("short_introduction"),
    biography: formData.get("biography"),
    profile_photo: nullable(formData.get("profile_photo")),
    cover_image: nullable(formData.get("cover_image")),
    email: nullable(formData.get("email")),
    phone: nullable(formData.get("phone")),
    location: nullable(formData.get("location")),
    linkedin_url: nullable(formData.get("linkedin_url")),
    github_url: nullable(formData.get("github_url")),
    twitter_url: nullable(formData.get("twitter_url")),
    facebook_url: nullable(formData.get("facebook_url")),
    instagram_url: nullable(formData.get("instagram_url")),
    portfolio_url: nullable(formData.get("portfolio_url")),
    resume_url: nullable(formData.get("resume_url")),
    years_experience: numberOrNull(formData.get("years_experience")),
    projects_completed: numberOrNull(formData.get("projects_completed")),
    happy_clients: numberOrNull(formData.get("happy_clients")),
    technologies: list(formData.get("technologies")),
    certifications: list(formData.get("certifications")),
    skills: list(formData.get("skills")),
    vision_statement: nullable(formData.get("vision_statement")),
    mission_statement: nullable(formData.get("mission_statement")),
    personal_quote: nullable(formData.get("personal_quote")),
    availability_status: nullable(formData.get("availability_status")),
    featured_badge: nullable(formData.get("featured_badge")),
    display_order: numberOrNull(formData.get("display_order")) ?? 0,
    seo_title: nullable(formData.get("seo_title")),
    seo_description: nullable(formData.get("seo_description")),
    open_graph_image: nullable(formData.get("open_graph_image")),
    status:
      intent === "publish"
        ? "published"
        : intent === "draft" || intent === "unpublish"
          ? "draft"
          : formData.get("status"),
  };
}

export async function saveFounderProfile(
  _state: FounderActionState,
  formData: FormData,
): Promise<FounderActionState> {
  const parsed = founderProfileSchema.safeParse(values(formData));
  if (!parsed.success)
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      message: "Review the highlighted fields.",
      status: "error",
    };
  try {
    const user = await requireAdmin();
    if (!getPermissions(user.role).canManageContent)
      return {
        message: "Your role has read-only Founder access.",
        status: "error",
      };
    await new FounderRepository(await createDatabaseClient()).save({
      ...parsed.data,
      singleton_key: true,
      created_by: user.id,
      updated_by: user.id,
    });
    revalidatePath("/admin/founder");
    revalidatePath("/team");
    revalidateTag("founder");
    return { message: "Founder profile saved.", status: "success" };
  } catch {
    return {
      message:
        "The Founder profile could not be saved. Confirm the migration and try again.",
      status: "error",
    };
  }
}
