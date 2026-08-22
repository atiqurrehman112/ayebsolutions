import type { DatabaseClient } from "../client";
import type { SiteConfigurationUpdate } from "@/types/database";
import { DatabaseRepositoryError } from "./base-repository";

export const SITE_SETTINGS_ID = "00000000-0000-4000-8000-000000000001";

export class SiteSettingsRepository {
  constructor(private readonly client: DatabaseClient) {}

  async findSingleton() {
    const { data, error } = await this.client
      .from("site_configuration")
      .select("*")
      .eq("id", SITE_SETTINGS_ID)
      .maybeSingle();
    if (error) throw new DatabaseRepositoryError(error);
    return data;
  }

  async findPublished() {
    const { data, error } = await this.client
      .from("site_configuration")
      .select("*")
      .eq("id", SITE_SETTINGS_ID)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new DatabaseRepositoryError(error);
    return data;
  }

  async update(input: SiteConfigurationUpdate) {
    const { data, error } = await this.client
      .from("site_configuration")
      .update(input)
      .eq("id", SITE_SETTINGS_ID)
      .select("*")
      .single();
    if (error) throw new DatabaseRepositoryError(error);
    if (!data) throw new DatabaseRepositoryError();
    return data;
  }
}
