import type {
  ContentStatus,
  CategoryRow,
  MediaLibraryRow,
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
export type PublicServiceSort = Exclude<ServiceSort, "updated-desc">;
export interface PublicServiceQuery extends PaginationOptions {
  readonly categoryId?: string;
  readonly featured?: boolean;
  readonly query?: string;
  readonly sort?: PublicServiceSort;
}
export interface PublicServiceContext {
  readonly category: Pick<CategoryRow, "id" | "name" | "slug"> | null;
  readonly gallery: readonly (MediaLibraryRow & {
    readonly caption: string | null;
    readonly sort_order: number;
  })[];
}
export interface PublicService extends ServiceRow {
  readonly cover: MediaLibraryRow | null;
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
  async findPublishedPage(options: PublicServiceQuery = {}) {
    const result = await this.findPage({ ...options, status: "published" });
    const links = result.data.length
      ? await this.client
          .from("service_media")
          .select("service_id,media_id,sort_order")
          .in(
            "service_id",
            result.data.map((item) => item.id),
          )
          .order("sort_order")
      : { data: [], error: null };
    this.throwIfError(links.error);
    const firstByService = new Map<string, string>();
    for (const link of links.data ?? [])
      if (!firstByService.has(link.service_id))
        firstByService.set(link.service_id, link.media_id);
    const mediaIds = [...new Set(firstByService.values())];
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
    return {
      ...result,
      data: result.data.map((item): PublicService => ({
        ...item,
        cover: byId.get(firstByService.get(item.id) ?? "") ?? null,
      })),
    };
  }
  async findHomepagePublished(limit = 6) {
    const { data, error } = await this.client
      .from("services")
      .select("*")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true })
      .limit(limit);
    this.throwIfError(error);
    return data ?? [];
  }
  async findPublishedBySlug(slug: string) {
    const { data, error } = await this.client
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }
  async findPublishedSlugs() {
    const { data, error } = await this.client
      .from("services")
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
      .eq("kind", "service")
      .eq("status", "published")
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }
  async findPublicContext(service: ServiceRow): Promise<PublicServiceContext> {
    const [category, galleryLinks] = await Promise.all([
      service.category_id
        ? this.client
            .from("categories")
            .select("id,name,slug")
            .eq("id", service.category_id)
            .eq("status", "published")
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      this.client
        .from("service_media")
        .select("media_id,sort_order,caption")
        .eq("service_id", service.id)
        .order("sort_order"),
    ]);
    this.throwIfError(category.error);
    this.throwIfError(galleryLinks.error);
    const mediaIds = (galleryLinks.data ?? []).map((item) => item.media_id);
    const media = mediaIds.length
      ? await this.client
          .from("media_library")
          .select("*")
          .in("id", mediaIds)
          .eq("status", "published")
          .eq("visibility", "public")
      : { data: [], error: null };
    this.throwIfError(media.error);
    const mediaById = new Map(
      (media.data ?? []).map((item) => [item.id, item]),
    );
    return {
      category: category.data,
      gallery: (galleryLinks.data ?? []).flatMap((link) => {
        const item = mediaById.get(link.media_id);
        return item
          ? [{ ...item, caption: link.caption, sort_order: link.sort_order }]
          : [];
      }),
    };
  }
  async findRelated(service: ServiceRow) {
    let request = this.client
      .from("services")
      .select("*")
      .eq("status", "published")
      .neq("id", service.id);
    if (service.category_id)
      request = request.eq("category_id", service.category_id);
    const result = await request
      .order("is_featured", { ascending: false })
      .order("sort_order")
      .limit(3);
    this.throwIfError(result.error);
    if (result.data?.length || !service.category_id) return result.data ?? [];
    const fallback = await this.client
      .from("services")
      .select("*")
      .eq("status", "published")
      .neq("id", service.id)
      .order("is_featured", { ascending: false })
      .order("sort_order")
      .limit(3);
    this.throwIfError(fallback.error);
    return fallback.data ?? [];
  }
  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
