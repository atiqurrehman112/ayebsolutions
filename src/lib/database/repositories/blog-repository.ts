import type {
  BlogArticleInsert,
  BlogArticleRow,
  BlogArticleUpdate,
  AppRole,
  CategoryRow,
  ContentStatus,
  MediaLibraryRow,
  TagRow,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import {
  ContentRepository,
  type PaginatedResult,
  type PaginationOptions,
} from "./base-repository";

export interface BlogQueryOptions extends PaginationOptions {
  readonly authorRole?: AppRole;
  readonly categoryId?: string;
  readonly featured?: boolean;
  readonly query?: string;
  readonly status?: ContentStatus;
}
export type PublicBlogSort = "featured" | "newest" | "oldest";
export interface PublicBlogQuery extends PaginationOptions {
  readonly categoryId?: string;
  readonly tagId?: string;
  readonly query?: string;
  readonly sort?: PublicBlogSort;
}
export interface PublicBlogContext {
  readonly category: Pick<CategoryRow, "id" | "name" | "slug"> | null;
  readonly featuredMedia: MediaLibraryRow | null;
  readonly tags: readonly Pick<TagRow, "id" | "name" | "slug">[];
  readonly gallery: readonly MediaLibraryRow[];
  readonly openGraphMedia: MediaLibraryRow | null;
}
export interface PublicBlogArticle extends BlogArticleRow {
  readonly featuredMedia: MediaLibraryRow | null;
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

  private async attachFeaturedMedia(
    rows: readonly BlogArticleRow[],
  ): Promise<readonly PublicBlogArticle[]> {
    const mediaIds = rows
      .map((item) => item.featured_media_id)
      .filter((id): id is string => Boolean(id));
    const media = mediaIds.length
      ? await this.client
          .from("media_library")
          .select("*")
          .in("id", mediaIds)
          .eq("status", "published")
          .eq("visibility", "public")
      : { data: [], error: null };
    this.throwIfError(media.error);
    const byId = new Map((media.data ?? []).map((item) => [item.id, item]));
    return rows.map((item) => ({
      ...item,
      featuredMedia: item.featured_media_id
        ? (byId.get(item.featured_media_id) ?? null)
        : null,
    }));
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
  async findAuthors() {
    const { data, error } = await this.client
      .from("profiles")
      .select("id,display_name,role")
      .eq("status", "active")
      .in("role", ["admin", "editor"])
      .order("display_name");
    this.throwIfError(error);
    return data ?? [];
  }

  async findEditorMedia() {
    const { data, error } = await this.client
      .from("media_library")
      .select("*")
      .eq("status", "published")
      .eq("visibility", "public")
      .in("resource_type", ["image", "video"])
      .order("file_name")
      .limit(200);
    this.throwIfError(error);
    return data ?? [];
  }

  async findGalleryMap(articleIds: readonly string[]) {
    if (!articleIds.length) return {};
    const { data, error } = await this.client
      .from("blog_article_media")
      .select("article_id,media_id")
      .in("article_id", [...articleIds])
      .order("sort_order");
    this.throwIfError(error);
    return Object.fromEntries(
      articleIds.map((id) => [
        id,
        (data ?? [])
          .filter((item) => item.article_id === id)
          .map((item) => item.media_id),
      ]),
    );
  }

  async findPublishedPage(
    options: PublicBlogQuery = {},
  ): Promise<PaginatedResult<PublicBlogArticle>> {
    const { page, pageSize, from, to } = this.getRange(options);
    const term = options.query ? normalizeSearchTerm(options.query) : "";
    let request = this.client
      .from("blog_articles")
      .select("*", { count: "exact" })
      .or(
        `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`,
      );
    if (term) request = request.ilike("search_text", `%${term}%`);
    if (options.categoryId)
      request = request.eq("category_id", options.categoryId);
    if (options.tagId) request = request.contains("keywords", [options.tagId]);
    const sort = options.sort ?? "newest";
    if (sort === "featured")
      request = request
        .order("is_featured", { ascending: false })
        .order("published_at", { ascending: false, nullsFirst: false });
    else
      request = request.order("published_at", {
        ascending: sort === "oldest",
        nullsFirst: false,
      });
    const { data, count, error } = await request
      .order("id", { ascending: true })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(
      await this.attachFeaturedMedia(data ?? []),
      count,
      page,
      pageSize,
    );
  }

  async findPublishedBySlug(slug: string) {
    const { data, error } = await this.client
      .from("blog_articles")
      .select("*")
      .eq("slug", slug)
      .or(
        `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`,
      )
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }

  async findPublishedSlugs() {
    const { data, error } = await this.client
      .from("blog_articles")
      .select("slug,updated_at")
      .or(
        `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`,
      )
      .order("slug");
    this.throwIfError(error);
    return data ?? [];
  }

  async findPublicCategories() {
    const { data, error } = await this.client
      .from("categories")
      .select("id,name,slug")
      .eq("kind", "blog")
      .eq("status", "published")
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }

  async findPublicTags() {
    const { data, error } = await this.client
      .from("blog_articles")
      .select("keywords")
      .or(
        `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`,
      )
      .order("published_at", { ascending: false, nullsFirst: false });
    this.throwIfError(error);
    return [...new Set((data ?? []).flatMap((article) => article.keywords))]
      .sort((left, right) => left.localeCompare(right))
      .map((name) => ({ id: name, name, slug: name }));
  }

  async findPublicContext(article: BlogArticleRow): Promise<PublicBlogContext> {
    const [category, featuredMedia, openGraphMedia] = await Promise.all([
      article.category_id
        ? this.client
            .from("categories")
            .select("id,name,slug")
            .eq("id", article.category_id)
            .eq("status", "published")
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      article.featured_media_id
        ? this.client
            .from("media_library")
            .select("*")
            .eq("id", article.featured_media_id)
            .eq("status", "published")
            .eq("visibility", "public")
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      article.open_graph_media_id
        ? this.client
            .from("media_library")
            .select("*")
            .eq("id", article.open_graph_media_id)
            .eq("status", "published")
            .eq("visibility", "public")
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);
    this.throwIfError(category.error);
    this.throwIfError(featuredMedia.error);
    this.throwIfError(openGraphMedia.error);
    const galleryLinks = await this.client
      .from("blog_article_media")
      .select("media_id")
      .eq("article_id", article.id)
      .order("sort_order");
    this.throwIfError(galleryLinks.error);
    const galleryIds = (galleryLinks.data ?? []).map((item) => item.media_id);
    const gallery = galleryIds.length
      ? await this.client
          .from("media_library")
          .select("*")
          .in("id", galleryIds)
          .eq("status", "published")
          .eq("visibility", "public")
      : { data: [], error: null };
    this.throwIfError(gallery.error);
    return {
      category: category.data,
      featuredMedia: featuredMedia.data,
      tags: article.keywords.map((name) => ({ id: name, name, slug: name })),
      gallery: gallery.data ?? [],
      openGraphMedia: openGraphMedia.data,
    };
  }

  async syncGallery(articleId: string, mediaIds: readonly string[]) {
    const { error: deleteError } = await this.client
      .from("blog_article_media")
      .delete()
      .eq("article_id", articleId);
    this.throwIfError(deleteError);
    if (!mediaIds.length) return;
    const { error } = await this.client
      .from("blog_article_media")
      .insert(
        mediaIds.map((mediaId, index) => ({
          article_id: articleId,
          media_id: mediaId,
          sort_order: index,
        })),
      );
    this.throwIfError(error);
  }

  async duplicate(id: string, userId: string) {
    const article = await this.findById(id);
    if (!article) return null;
    const {
      id: _id,
      created_at: _created,
      updated_at: _updated,
      ...copy
    } = article;
    return this.create({
      ...copy,
      created_by: userId,
      updated_by: userId,
      title: `${article.title} Copy`,
      slug: `${article.slug}-copy-${Date.now().toString(36)}`,
      status: "draft",
      published_at: null,
      scheduled_at: null,
    });
  }

  async findRelated(article: BlogArticleRow) {
    let request = this.client
      .from("blog_articles")
      .select("*")
      .or(
        `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`,
      )
      .neq("id", article.id);
    if (article.category_id)
      request = request.eq("category_id", article.category_id);
    const result = await request
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(3);
    this.throwIfError(result.error);
    return result.data ?? [];
  }

  async findAdjacent(article: BlogArticleRow) {
    if (!article.published_at) return { previous: null, next: null };
    const [previous, next] = await Promise.all([
      this.client
        .from("blog_articles")
        .select("title,slug")
        .or(
          `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`,
        )
        .lt("published_at", article.published_at)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      this.client
        .from("blog_articles")
        .select("title,slug")
        .or(
          `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`,
        )
        .gt("published_at", article.published_at)
        .order("published_at", { ascending: true })
        .limit(1)
        .maybeSingle(),
    ]);
    this.throwIfError(previous.error);
    this.throwIfError(next.error);
    return { previous: previous.data, next: next.data };
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
