import type {
  CategoryRow,
  MediaLibraryRow,
  ServiceRow,
} from "@/types/database";
import type { PostgrestError } from "@supabase/supabase-js";
import type { DatabaseClient } from "../client";
import {
  DatabaseRepositoryError,
  type PaginationOptions,
} from "./base-repository";

export type PublicServiceSort =
  "display-asc" | "display-desc" | "title-asc" | "title-desc";

interface ServiceQueryOptions extends PaginationOptions {
  readonly categoryId?: string;
  readonly featured?: boolean;
  readonly query?: string;
  readonly sort?: PublicServiceSort;
  readonly status?: "published";
}

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

export class ServicesRepository {
  constructor(private readonly client: DatabaseClient) {}

  private throwIfError(error: PostgrestError | null): void {
    if (error) throw new DatabaseRepositoryError(error);
  }

  private getRange(options: PaginationOptions = {}) {
    const page = Math.max(1, options.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, options.pageSize ?? 20));
    const from = (page - 1) * pageSize;
    return { page, pageSize, from, to: from + pageSize - 1 } as const;
  }

  private paginateResult(
    data: readonly ServiceRow[],
    count: number | null,
    page: number,
    pageSize: number,
  ) {
    const total = count ?? 0;
    return {
      data,
      count: total,
      page,
      pageSize,
      totalPages: total === 0 ? 0 : Math.ceil(total / pageSize),
    };
  }

  private async findPage(options: ServiceQueryOptions = {}) {
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
    request = request.order("id", { ascending: true });
    const { data, count, error } = await request.range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
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
}
