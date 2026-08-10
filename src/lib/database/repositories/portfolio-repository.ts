import type {
  ContentStatus,
  PortfolioProjectInsert,
  PortfolioProjectRow,
  PortfolioProjectUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

export interface PortfolioQueryOptions extends PaginationOptions {
  readonly categoryId?: string;
  readonly featured?: boolean;
  readonly query?: string;
  readonly status?: ContentStatus;
}
export type PublicPortfolioSort =
  "alphabetical" | "featured" | "newest" | "oldest";
export interface PublicPortfolioQuery extends PaginationOptions {
  readonly categoryId?: string;
  readonly featured?: boolean;
  readonly tagId?: string;
  readonly query?: string;
  readonly sort?: PublicPortfolioSort;
}

function normalizeSearchTerm(query: string) {
  return query
    .trim()
    .replace(/[,%().]/g, " ")
    .replace(/\s+/g, " ");
}

export class PortfolioRepository extends ContentRepository<
  PortfolioProjectRow,
  PortfolioProjectInsert,
  PortfolioProjectUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }

  async findAll() {
    const { data, error } = await this.client
      .from("portfolio_projects")
      .select("*")
      .order("updated_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from("portfolio_projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }

  async create(input: PortfolioProjectInsert) {
    const { data, error } = await this.client
      .from("portfolio_projects")
      .insert(input)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }

  async update(id: string, input: PortfolioProjectUpdate) {
    const { data, error } = await this.client
      .from("portfolio_projects")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }

  async delete(id: string) {
    const { error } = await this.client
      .from("portfolio_projects")
      .delete()
      .eq("id", id);
    this.throwIfError(error);
  }

  async search(query: string) {
    const term = normalizeSearchTerm(query);
    if (!term) return this.findAll();
    const { data, error } = await this.client
      .from("portfolio_projects")
      .select("*")
      .or(
        `title.ilike.%${term}%,summary.ilike.%${term}%,project_type.ilike.%${term}%`,
      )
      .order("updated_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }

  async paginate(options: PaginationOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const { data, count, error } = await this.client
      .from("portfolio_projects")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }

  async findPage(options: PortfolioQueryOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const term = options.query ? normalizeSearchTerm(options.query) : "";
    let request = this.client
      .from("portfolio_projects")
      .select("*", { count: "exact" });

    if (term) {
      request = request.or(
        `title.ilike.%${term}%,summary.ilike.%${term}%,project_type.ilike.%${term}%`,
      );
    }
    if (options.status) request = request.eq("status", options.status);
    if (options.categoryId) {
      request = request.eq("category_id", options.categoryId);
    }
    if (options.featured !== undefined) {
      request = request.eq("is_featured", options.featured);
    }

    const { data, count, error } = await request
      .order("updated_at", { ascending: false })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }

  async findCategories() {
    const { data, error } = await this.client
      .from("categories")
      .select("id,name,slug")
      .eq("kind", "portfolio")
      .neq("status", "archived")
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }

  async findPublishedPage(options: PublicPortfolioQuery = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const term = options.query ? normalizeSearchTerm(options.query) : "";
    let projectIds: readonly string[] | undefined;
    if (options.tagId) {
      const tagged = await this.client
        .from("project_tags")
        .select("project_id")
        .eq("tag_id", options.tagId);
      this.throwIfError(tagged.error);
      projectIds = (tagged.data ?? []).map((item) => item.project_id);
      if (!projectIds.length) return this.paginateResult([], 0, page, pageSize);
    }
    let request = this.client
      .from("portfolio_projects")
      .select("*", { count: "exact" })
      .eq("status", "published");
    if (term)
      request = request.or(
        `title.ilike.%${term}%,summary.ilike.%${term}%,project_type.ilike.%${term}%`,
      );
    if (options.categoryId)
      request = request.eq("category_id", options.categoryId);
    if (options.featured !== undefined)
      request = request.eq("is_featured", options.featured);
    if (projectIds) request = request.in("id", [...projectIds]);
    const sort = options.sort ?? "newest";
    if (sort === "alphabetical")
      request = request.order("title", { ascending: true });
    if (sort === "featured")
      request = request
        .order("is_featured", { ascending: false })
        .order("published_at", { ascending: false, nullsFirst: false });
    if (sort === "newest")
      request = request.order("published_at", {
        ascending: false,
        nullsFirst: false,
      });
    if (sort === "oldest")
      request = request.order("published_at", {
        ascending: true,
        nullsFirst: false,
      });
    const { data, count, error } = await request
      .order("id", { ascending: true })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  async findPublishedBySlug(slug: string) {
    const { data, error } = await this.client
      .from("portfolio_projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }
  async findPublishedSlugs() {
    const { data, error } = await this.client
      .from("portfolio_projects")
      .select("slug,updated_at")
      .eq("status", "published")
      .order("slug");
    this.throwIfError(error);
    return data ?? [];
  }
  async findPublicCategories() {
    const { data, error } = await this.client
      .from("categories")
      .select("id,name,slug")
      .eq("kind", "portfolio")
      .eq("status", "published")
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }
  async findPublicTags() {
    const { data, error } = await this.client
      .from("tags")
      .select("id,name,slug")
      .eq("status", "published")
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }
  async findPublicContext(project: PortfolioProjectRow) {
    const [categoryResult, tagLinks, galleryLinks] = await Promise.all([
      project.category_id
        ? this.client
            .from("categories")
            .select("id,name,slug")
            .eq("id", project.category_id)
            .eq("status", "published")
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      this.client
        .from("project_tags")
        .select("tag_id")
        .eq("project_id", project.id),
      this.client
        .from("portfolio_project_media")
        .select("media_id,sort_order,caption")
        .eq("project_id", project.id)
        .order("sort_order"),
    ]);
    this.throwIfError(categoryResult.error);
    this.throwIfError(tagLinks.error);
    this.throwIfError(galleryLinks.error);
    const tagIds = (tagLinks.data ?? []).map((item) => item.tag_id);
    const mediaIds = (galleryLinks.data ?? []).map((item) => item.media_id);
    const [tagsResult, mediaResult] = await Promise.all([
      tagIds.length
        ? this.client
            .from("tags")
            .select("id,name,slug")
            .in("id", tagIds)
            .eq("status", "published")
        : Promise.resolve({ data: [], error: null }),
      mediaIds.length
        ? this.client
            .from("media_library")
            .select("*")
            .in("id", mediaIds)
            .eq("status", "published")
            .eq("visibility", "public")
        : Promise.resolve({ data: [], error: null }),
    ]);
    this.throwIfError(tagsResult.error);
    this.throwIfError(mediaResult.error);
    const mediaById = new Map(
      (mediaResult.data ?? []).map((item) => [item.id, item]),
    );
    return {
      category: categoryResult.data,
      tags: tagsResult.data ?? [],
      gallery: (galleryLinks.data ?? []).flatMap((link) => {
        const media = mediaById.get(link.media_id);
        return media
          ? [{ ...media, caption: link.caption, sort_order: link.sort_order }]
          : [];
      }),
    };
  }
  async findRelated(project: PortfolioProjectRow) {
    let request = this.client
      .from("portfolio_projects")
      .select("*")
      .eq("status", "published")
      .neq("id", project.id);
    if (project.category_id)
      request = request.eq("category_id", project.category_id);
    const { data, error } = await request
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3);
    this.throwIfError(error);
    if (data?.length || !project.category_id) return data ?? [];
    const fallback = await this.client
      .from("portfolio_projects")
      .select("*")
      .eq("status", "published")
      .neq("id", project.id)
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3);
    this.throwIfError(fallback.error);
    return fallback.data ?? [];
  }

  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
