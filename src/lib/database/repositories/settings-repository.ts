import type { DatabaseClient } from "../client";
import type {
  MediaLibraryRow,
  SiteConfigurationRow,
  SiteConfigurationUpdate,
} from "@/types/database";
import type {
  PublicSiteSettings,
  SettingsFooterGroup,
  SettingsLink,
  SiteConfiguration,
} from "@/types/settings";
import { DatabaseRepositoryError } from "./base-repository";

const SETTINGS_ID = "00000000-0000-4000-8000-000000000001";
function links(value: unknown): readonly SettingsLink[] {
  return Array.isArray(value)
    ? value.filter((item): item is { label: string; href: string } =>
        Boolean(
          item &&
          typeof item === "object" &&
          "label" in item &&
          "href" in item &&
          typeof item.label === "string" &&
          typeof item.href === "string",
        ),
      )
    : [];
}
function footer(
  value: SiteConfigurationRow["footer_navigation"],
): readonly SettingsFooterGroup[] {
  return Array.isArray(value)
    ? value
        .filter(
          (item): item is { title: string; links: readonly SettingsLink[] } =>
            Boolean(
              item &&
              typeof item === "object" &&
              "title" in item &&
              "links" in item &&
              typeof item.title === "string" &&
              Array.isArray(item.links),
            ),
        )
        .map((item) => ({ title: item.title, links: links(item.links) }))
    : [];
}
function model(row: SiteConfigurationRow): SiteConfiguration {
  return {
    ...row,
    header_navigation: links(row.header_navigation),
    footer_navigation: footer(row.footer_navigation),
  };
}

export class SettingsRepository {
  constructor(private readonly client: DatabaseClient) {}
  async find() {
    const { data, error } = await this.client
      .from("site_configuration")
      .select("*")
      .eq("id", SETTINGS_ID)
      .maybeSingle();
    if (error) throw new DatabaseRepositoryError(error);
    return data ? model(data) : null;
  }
  async update(input: SiteConfigurationUpdate) {
    const { data, error } = await this.client
      .from("site_configuration")
      .update(input)
      .eq("id", SETTINGS_ID)
      .select("*")
      .single();
    if (error) throw new DatabaseRepositoryError(error);
    if (!data) throw new DatabaseRepositoryError();
    return model(data);
  }
  async findPublic(): Promise<PublicSiteSettings | null> {
    const settings = await this.find();
    if (!settings || settings.status !== "published") return null;
    const ids = [
      settings.logo_media_id,
      settings.favicon_media_id,
      settings.open_graph_media_id,
    ].filter((id): id is string => Boolean(id));
    let media: readonly MediaLibraryRow[] = [];
    if (ids.length) {
      const result = await this.client
        .from("media_library")
        .select("*")
        .in("id", ids)
        .eq("status", "published")
        .eq("visibility", "public");
      if (result.error) throw new DatabaseRepositoryError(result.error);
      media = result.data ?? [];
    }
    const byId = new Map(media.map((item) => [item.id, item]));
    return {
      ...settings,
      logo: settings.logo_media_id
        ? (byId.get(settings.logo_media_id) ?? null)
        : null,
      favicon: settings.favicon_media_id
        ? (byId.get(settings.favicon_media_id) ?? null)
        : null,
      openGraphImage: settings.open_graph_media_id
        ? (byId.get(settings.open_graph_media_id) ?? null)
        : null,
    };
  }
}
