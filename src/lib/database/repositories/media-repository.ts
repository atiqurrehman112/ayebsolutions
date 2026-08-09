import type {
  ContentStatus,
  MediaLibraryInsert,
  MediaLibraryRow,
  MediaLibraryUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

export class MediaRepository extends ContentRepository<
  MediaLibraryRow,
  MediaLibraryInsert,
  MediaLibraryUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }
  async findAll() {
    const { data, error } = await this.client
      .from("media_library")
      .select("*")
      .order("updated_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }
  async findById(id: string) {
    const { data, error } = await this.client
      .from("media_library")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }
  async create(input: MediaLibraryInsert) {
    const { data, error } = await this.client
      .from("media_library")
      .insert(input)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async update(id: string, input: MediaLibraryUpdate) {
    const { data, error } = await this.client
      .from("media_library")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async delete(id: string) {
    const { error } = await this.client
      .from("media_library")
      .delete()
      .eq("id", id);
    this.throwIfError(error);
  }
  async search(query: string) {
    const term = query.trim().replaceAll(",", "");
    if (!term) return this.findAll();
    const { data, error } = await this.client
      .from("media_library")
      .select("*")
      .or(
        `file_name.ilike.%${term}%,storage_path.ilike.%${term}%,alt_text.ilike.%${term}%`,
      )
      .order("updated_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }
  async paginate(options: PaginationOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const { data, count, error } = await this.client
      .from("media_library")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
