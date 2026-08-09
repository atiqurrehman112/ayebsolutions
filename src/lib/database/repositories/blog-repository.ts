import type {
  BlogArticleInsert,
  BlogArticleRow,
  BlogArticleUpdate,
  AppRole,
  CategoryRow,
  ContentStatus,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

export interface BlogQueryOptions extends PaginationOptions {
  readonly authorRole?: AppRole;
  readonly categoryId?: string;
  readonly featured?: boolean;
  readonly query?: string;
  readonly status?: ContentStatus;
}

function normalizeSearchTerm(query: string) {
  return query
    .trim()
    .replace(/[,%().]/g, " ")
    .replace(/\s+/g, " ");
}

export class BlogRepository extends ContentRepository<
  BlogArticleRow,
  BlogArticleInsert,
  BlogArticleUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }

  async findAll() {
    const { data, error } = await this.client
      .from("blog_articles")
      .select("*")
      .order("updated_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from("blog_articles")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }

  async create(input: BlogArticleInsert) {
    const { data, error } = await this.client
      .from("blog_articles")
      .insert(input)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }

  async update(id: string, input: BlogArticleUpdate) {
    const { data, error } = await this.client
      .from("blog_articles")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }

  async delete(id: string) {
    const { error } = await this.client
      .from("blog_articles")
      .delete()
      .eq("id", id);
    this.throwIfError(error);
  }

  async search(query: string) {
    const term = normalizeSearchTerm(query);
    if (!term) return this.findAll();
    const { data, error } = await this.client
      .from("blog_articles")
      .select("*")
      .ilike("search_text", `%${term}%`)
      .order("updated_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }

  async paginate(options: PaginationOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const { data, count, error } = await this.client
      .from("blog_articles")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }

  async findPage(options: BlogQueryOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const term = options.query ? normalizeSearchTerm(options.query) : "";
    let authorIds: readonly string[] | undefined;

    if (options.authorRole) {
      const { data, error } = await this.client
        .from("profiles")
        .select("id")
        .eq("role", options.authorRole);
      this.throwIfError(error);
      authorIds = (data ?? []).map((profile) => profile.id);
      if (authorIds.length === 0) {
        return this.paginateResult([], 0, page, pageSize);
      }
    }

    let request = this.client
      .from("blog_articles")
      .select("*", { count: "exact" });
    if (term) request = request.ilike("search_text", `%${term}%`);
    if (options.status) request = request.eq("status", options.status);
    if (options.categoryId)
      request = request.eq("category_id", options.categoryId);
    if (options.featured !== undefined)
      request = request.eq("is_featured", options.featured);
    if (authorIds) request = request.in("created_by", [...authorIds]);

    const { data, count, error } = await request
      .order("updated_at", { ascending: false })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }

  async findCategories(): Promise<
    readonly Pick<CategoryRow, "id" | "name" | "slug">[]
  > {
    const { data, error } = await this.client
      .from("categories")
      .select("id,name,slug")
      .eq("kind", "blog")
      .neq("status", "archived")
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }

  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }

  publish(id: string) {
    return this.update(id, {
      published_at: new Date().toISOString(),
      status: "published",
    });
  }

  unpublish(id: string) {
    return this.update(id, { published_at: null, status: "draft" });
  }

  restore(id: string) {
    return this.update(id, { published_at: null, status: "draft" });
  }
}
