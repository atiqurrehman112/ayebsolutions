import type {
  ContentStatus,
  ServiceInsert,
  ServiceRow,
  ServiceUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

export type ServiceSort =
  "display-asc" | "display-desc" | "title-asc" | "title-desc" | "updated-desc";
export interface ServiceQueryOptions extends PaginationOptions {
  readonly categoryId?: string;
  readonly featured?: boolean;
  readonly query?: string;
  readonly sort?: ServiceSort;
  readonly status?: ContentStatus;
}
function normalizeSearchTerm(query: string) {
  return query
    .trim()
    .replace(/[,%().]/g, " ")
    .replace(/\s+/g, " ");
}

export class ServicesRepository extends ContentRepository<
  ServiceRow,
  ServiceInsert,
  ServiceUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }
  async findAll() {
    const { data, error } = await this.client
      .from("services")
      .select("*")
      .order("sort_order");
    this.throwIfError(error);
    return data ?? [];
  }
  async findById(id: string) {
    const { data, error } = await this.client
      .from("services")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }
  async create(input: ServiceInsert) {
    const { data, error } = await this.client
      .from("services")
      .insert(input)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async update(id: string, input: ServiceUpdate) {
    const { data, error } = await this.client
      .from("services")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async delete(id: string) {
    const { error } = await this.client.from("services").delete().eq("id", id);
    this.throwIfError(error);
  }
  async search(query: string) {
    const term = normalizeSearchTerm(query);
    if (!term) return this.findAll();
    const { data, error } = await this.client
      .from("services")
      .select("*")
      .or(
        `title.ilike.%${term}%,summary.ilike.%${term}%,description.ilike.%${term}%`,
      )
      .order("sort_order");
    this.throwIfError(error);
    return data ?? [];
  }
  async paginate(options: PaginationOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const { data, count, error } = await this.client
      .from("services")
      .select("*", { count: "exact" })
      .order("sort_order")
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  async findPage(options: ServiceQueryOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const term = options.query ? normalizeSearchTerm(options.query) : "";
    let request = this.client.from("services").select("*", { count: "exact" });
    if (term)
      request = request.or(
        `title.ilike.%${term}%,summary.ilike.%${term}%,description.ilike.%${term}%`,
      );
    if (options.status) request = request.eq("status", options.status);
    if (options.categoryId)
      request = request.eq("category_id", options.categoryId);
    if (options.featured !== undefined)
      request = request.eq("is_featured", options.featured);
    const sort = options.sort ?? "display-asc";
    if (sort === "display-asc")
      request = request.order("sort_order", { ascending: true });
    if (sort === "display-desc")
      request = request.order("sort_order", { ascending: false });
    if (sort === "title-asc")
      request = request.order("title", { ascending: true });
    if (sort === "title-desc")
      request = request.order("title", { ascending: false });
    if (sort === "updated-desc")
      request = request.order("updated_at", { ascending: false });
    request = request.order("id", { ascending: true });
    const { data, count, error } = await request.range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  async findCategories() {
    const { data, error } = await this.client
      .from("categories")
      .select("id,name,slug")
      .eq("kind", "service")
      .neq("status", "archived")
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }
  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
