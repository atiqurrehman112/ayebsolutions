import type {
  ContentStatus,
  SiteSettingInsert,
  SiteSettingRow,
  SiteSettingUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

export class SettingsRepository extends ContentRepository<
  SiteSettingRow,
  SiteSettingInsert,
  SiteSettingUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }
  async findAll() {
    const { data, error } = await this.client
      .from("site_settings")
      .select("*")
      .order("group_name");
    this.throwIfError(error);
    return data ?? [];
  }
  async findById(id: string) {
    const { data, error } = await this.client
      .from("site_settings")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }
  async create(input: SiteSettingInsert) {
    const { data, error } = await this.client
      .from("site_settings")
      .insert(input)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async update(id: string, input: SiteSettingUpdate) {
    const { data, error } = await this.client
      .from("site_settings")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async delete(id: string) {
    const { error } = await this.client
      .from("site_settings")
      .delete()
      .eq("id", id);
    this.throwIfError(error);
  }
  async search(query: string) {
    const term = query.trim().replaceAll(",", "");
    if (!term) return this.findAll();
    const { data, error } = await this.client
      .from("site_settings")
      .select("*")
      .or(
        `key.ilike.%${term}%,group_name.ilike.%${term}%,description.ilike.%${term}%`,
      )
      .order("group_name");
    this.throwIfError(error);
    return data ?? [];
  }
  async paginate(options: PaginationOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const { data, count, error } = await this.client
      .from("site_settings")
      .select("*", { count: "exact" })
      .order("group_name")
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
