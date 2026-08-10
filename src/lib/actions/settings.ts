"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth/auth";
import { createDatabaseClient } from "@/lib/database";
import { SettingsRepository } from "@/lib/database/repositories/settings-repository";
import { siteConfigurationSchema } from "@/lib/validation/settings";
import type { SettingsFooterGroup, SettingsLink } from "@/types/settings";

export interface SettingsActionState {
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
  readonly message: string;
  readonly status: "error" | "idle" | "success";
}
export const initialSettingsActionState: SettingsActionState = {
  message: "",
  status: "idle",
};
function nullable(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text || null;
}
function links(value: FormDataEntryValue | null): readonly SettingsLink[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...href] = line.split("|");
      return { label: label?.trim() ?? "", href: href.join("|").trim() };
    });
}
function footer(
  value: FormDataEntryValue | null,
): readonly SettingsFooterGroup[] {
  const groups = new Map<string, SettingsLink[]>();
  for (const line of String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)) {
    const [title, label, ...href] = line.split("|");
    const current = groups.get(title?.trim() ?? "") ?? [];
    current.push({ label: label?.trim() ?? "", href: href.join("|").trim() });
    groups.set(title?.trim() ?? "", current);
  }
  return [...groups].map(([title, groupLinks]) => ({
    title,
    links: groupLinks,
  }));
}
function input(formData: FormData) {
  const boolean = (name: string) => formData.get(name) === "on";
  return {
    site_name: formData.get("site_name"),
    tagline: formData.get("tagline"),
    site_url: formData.get("site_url"),
    default_language: formData.get("default_language"),
    timezone: formData.get("timezone"),
    logo_media_id: nullable(formData.get("logo_media_id")),
    favicon_media_id: nullable(formData.get("favicon_media_id")),
    open_graph_media_id: nullable(formData.get("open_graph_media_id")),
    default_meta_title: formData.get("default_meta_title"),
    default_meta_description: formData.get("default_meta_description"),
    default_keywords: String(formData.get("default_keywords") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    robots: formData.get("robots"),
    canonical_base_url: formData.get("canonical_base_url"),
    contact_email: String(formData.get("contact_email") ?? ""),
    contact_phone: nullable(formData.get("contact_phone")),
    whatsapp: nullable(formData.get("whatsapp")),
    address: nullable(formData.get("address")),
    google_maps_url: String(formData.get("google_maps_url") ?? ""),
    facebook_url: String(formData.get("facebook_url") ?? ""),
    instagram_url: String(formData.get("instagram_url") ?? ""),
    linkedin_url: String(formData.get("linkedin_url") ?? ""),
    github_url: String(formData.get("github_url") ?? ""),
    x_url: String(formData.get("x_url") ?? ""),
    youtube_url: String(formData.get("youtube_url") ?? ""),
    header_navigation: links(formData.get("header_navigation")),
    footer_navigation: footer(formData.get("footer_navigation")),
    footer_copyright: formData.get("footer_copyright"),
    working_hours: nullable(formData.get("working_hours")),
    emergency_contact: nullable(formData.get("emergency_contact")),
    business_registration_number: nullable(
      formData.get("business_registration_number"),
    ),
    google_analytics_id: nullable(formData.get("google_analytics_id")),
    google_search_console_verification: nullable(
      formData.get("google_search_console_verification"),
    ),
    google_tag_manager_id: nullable(formData.get("google_tag_manager_id")),
    microsoft_clarity_id: nullable(formData.get("microsoft_clarity_id")),
    plausible_domain: nullable(formData.get("plausible_domain")),
    vercel_analytics_enabled: boolean("vercel_analytics_enabled"),
    enable_blog: boolean("enable_blog"),
    enable_testimonials: boolean("enable_testimonials"),
    enable_contact_form: boolean("enable_contact_form"),
    enable_newsletter: boolean("enable_newsletter"),
    enable_ai_features: boolean("enable_ai_features"),
    maintenance_mode: boolean("maintenance_mode"),
    maintenance_message: formData.get("maintenance_message"),
    status: "published" as const,
  };
}
export async function updateSiteSettings(
  _state: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const parsed = siteConfigurationSchema.safeParse(input(formData));
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      fieldErrors: Object.fromEntries(
        Object.entries(errors).filter((entry): entry is [string, string[]] =>
          Boolean(entry[1]?.length),
        ),
      ),
      message: "Review the highlighted settings and try again.",
      status: "error",
    };
  }
  try {
    const user = await requireAdmin();
    if (user.role !== "admin")
      return {
        message: "Only administrators can update site settings.",
        status: "error",
      };
    await new SettingsRepository(await createDatabaseClient()).update(
      parsed.data,
    );
    revalidateTag("site-settings");
    revalidateTag("settings");
    revalidateTag("homepage");
    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    return {
      message: "Site settings saved and public caches refreshed.",
      status: "success",
    };
  } catch {
    return {
      message:
        "Settings could not be saved. Confirm the migration and database connection.",
      status: "error",
    };
  }
}
