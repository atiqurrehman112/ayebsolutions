"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth/auth";
import { createDatabaseClient } from "@/lib/database";
import { SiteSettingsRepository } from "@/lib/database/repositories/site-settings-repository";
import { siteSettingsSchema } from "@/lib/validation/site-settings";

export interface SiteSettingsActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "idle" | "error" | "success";
}

export const initialSiteSettingsActionState: SiteSettingsActionState = {
  message: "",
  status: "idle",
};

const nullable = (value: FormDataEntryValue | null) =>
  String(value ?? "").trim() || null;
const list = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function values(formData: FormData) {
  return {
    site_name: formData.get("site_name"),
    tagline: formData.get("tagline"),
    short_description: nullable(formData.get("short_description")),
    long_description: nullable(formData.get("long_description")),
    site_url: formData.get("site_url"),
    canonical_base_url: formData.get("canonical_base_url"),
    default_language: formData.get("default_language"),
    timezone: formData.get("timezone"),
    logo_media_id: nullable(formData.get("logo_media_id")),
    white_logo_media_id: nullable(formData.get("white_logo_media_id")),
    favicon_media_id: nullable(formData.get("favicon_media_id")),
    default_share_media_id: nullable(formData.get("default_share_media_id")),
    contact_email: nullable(formData.get("contact_email")),
    secondary_email: nullable(formData.get("secondary_email")),
    contact_phone: nullable(formData.get("contact_phone")),
    whatsapp: nullable(formData.get("whatsapp")),
    address: nullable(formData.get("address")),
    google_maps_url: nullable(formData.get("google_maps_url")),
    business_hours: nullable(formData.get("business_hours")),
    linkedin_url: nullable(formData.get("linkedin_url")),
    github_url: nullable(formData.get("github_url")),
    facebook_url: nullable(formData.get("facebook_url")),
    instagram_url: nullable(formData.get("instagram_url")),
    x_url: nullable(formData.get("x_url")),
    youtube_url: nullable(formData.get("youtube_url")),
    default_meta_title: formData.get("default_meta_title"),
    default_meta_description: formData.get("default_meta_description"),
    default_keywords: list(formData.get("default_keywords")),
    open_graph_media_id: nullable(formData.get("open_graph_media_id")),
    twitter_media_id: nullable(formData.get("twitter_media_id")),
    google_analytics_id: nullable(formData.get("google_analytics_id")),
    google_tag_manager_id: nullable(formData.get("google_tag_manager_id")),
    meta_pixel_id: nullable(formData.get("meta_pixel_id")),
    microsoft_clarity_id: nullable(formData.get("microsoft_clarity_id")),
    footer_copyright: formData.get("footer_copyright"),
    footer_description: nullable(formData.get("footer_description")),
    footer_cta: nullable(formData.get("footer_cta")),
    footer_button_text: nullable(formData.get("footer_button_text")),
    footer_button_link: nullable(formData.get("footer_button_link")),
    announcement_enabled: formData.get("announcement_enabled") === "on",
    announcement_text: nullable(formData.get("announcement_text")),
    announcement_button_text: nullable(
      formData.get("announcement_button_text"),
    ),
    announcement_button_url: nullable(formData.get("announcement_button_url")),
    maintenance_mode: formData.get("maintenance_mode") === "on",
    maintenance_message: formData.get("maintenance_message"),
    status: formData.get("intent") === "publish" ? "published" : "draft",
  };
}

export async function saveSiteSettings(
  _state: SiteSettingsActionState,
  formData: FormData,
): Promise<SiteSettingsActionState> {
  const parsed = siteSettingsSchema.safeParse(values(formData));
  if (!parsed.success)
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      message: "Review the highlighted fields.",
      status: "error",
    };
  try {
    const user = await requireAdmin();
    if (user.role !== "admin")
      return {
        message: "Only administrators can update global settings.",
        status: "error",
      };
    await new SiteSettingsRepository(await createDatabaseClient()).update({
      ...parsed.data,
      updated_by: user.id,
    });
    revalidateTag("site-settings");
    revalidateTag("homepage");
    revalidatePath("/", "layout");
    revalidatePath("/admin/site-settings");
    return { message: "Global settings saved.", status: "success" };
  } catch {
    return {
      message:
        "Settings could not be saved. Confirm the migration and try again.",
      status: "error",
    };
  }
}
