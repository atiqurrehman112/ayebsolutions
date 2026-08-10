import type {
  ContentStatus,
  MediaLibraryInsert,
  MediaLibraryRow,
  MediaLibraryUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

export type MediaKind = "document" | "image" | "pdf" | "svg" | "video";
export type MediaSort = "alphabetical" | "largest" | "newest" | "oldest";
export interface MediaQueryOptions extends PaginationOptions {
  readonly kind?: MediaKind;
  readonly query?: string;
  readonly sort?: MediaSort;
}
function normalizeSearchTerm(query: string) {
  return query
    .trim()
    .replace(/[,%().]/g, " ")
    .replace(/\s+/g, " ");
}

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
    const term = normalizeSearchTerm(query);
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
  async findPage(options: MediaQueryOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const term = options.query ? normalizeSearchTerm(options.query) : "";
    let request = this.client
      .from("media_library")
      .select("*", { count: "exact" });
    if (term)
      request = request.or(
        `file_name.ilike.%${term}%,public_id.ilike.%${term}%,alt.ilike.%${term}%`,
      );
    if (options.kind === "video")
      request = request.eq("resource_type", "video");
    if (options.kind === "pdf") request = request.eq("format", "pdf");
    if (options.kind === "svg") request = request.eq("format", "svg");
    if (options.kind === "image")
      request = request
        .eq("resource_type", "image")
        .neq("format", "pdf")
        .neq("format", "svg");
    if (options.kind === "document")
      request = request.eq("resource_type", "raw").neq("format", "pdf");
    const sort = options.sort ?? "newest";
    if (sort === "newest")
      request = request.order("created_at", { ascending: false });
    if (sort === "oldest")
      request = request.order("created_at", { ascending: true });
    if (sort === "alphabetical")
      request = request.order("file_name", { ascending: true });
    if (sort === "largest")
      request = request.order("bytes", { ascending: false });
    const { data, count, error } = await request
      .order("id", { ascending: true })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
