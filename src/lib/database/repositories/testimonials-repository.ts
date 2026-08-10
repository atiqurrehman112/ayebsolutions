import type {
  ContentStatus,
  TestimonialInsert,
  TestimonialRow,
  TestimonialUpdate,
  TestimonialApprovalStatus,
  MediaLibraryRow,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

export type TestimonialSort =
  "display-asc" | "display-desc" | "name-asc" | "rating-desc" | "updated-desc";
export interface TestimonialQueryOptions extends PaginationOptions {
  readonly approval?: TestimonialApprovalStatus;
  readonly featured?: boolean;
  readonly query?: string;
  readonly sort?: TestimonialSort;
  readonly status?: ContentStatus;
}
export type PublicTestimonialSort = "display" | "highest-rating" | "newest";
export interface PublicTestimonialQuery extends PaginationOptions {
  readonly featured?: boolean;
  readonly industry?: string;
  readonly query?: string;
  readonly rating?: number;
  readonly sort?: PublicTestimonialSort;
}
export interface PublicTestimonial extends TestimonialRow {
  readonly avatar: MediaLibraryRow | null;
  readonly companyLogo: MediaLibraryRow | null;
}
function normalizeSearchTerm(query: string) {
  return query
    .trim()
    .replace(/[,%().]/g, " ")
    .replace(/\s+/g, " ");
}

export class TestimonialsRepository extends ContentRepository<
  TestimonialRow,
  TestimonialInsert,
  TestimonialUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }
  async findAll() {
    const { data, error } = await this.client
      .from("testimonials")
      .select("*")
      .order("updated_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }
  async findById(id: string) {
    const { data, error } = await this.client
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }
  async create(input: TestimonialInsert) {
    const { data, error } = await this.client
      .from("testimonials")
      .insert(input)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async update(id: string, input: TestimonialUpdate) {
    const { data, error } = await this.client
      .from("testimonials")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async delete(id: string) {
    const { error } = await this.client
      .from("testimonials")
      .delete()
      .eq("id", id);
    this.throwIfError(error);
  }
  async search(query: string) {
    const term = normalizeSearchTerm(query);
    if (!term) return this.findAll();
    const { data, error } = await this.client
      .from("testimonials")
      .select("*")
      .or(
        `reviewer_name.ilike.%${term}%,company_name.ilike.%${term}%,quote.ilike.%${term}%`,
      )
      .order("updated_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }
  async paginate(options: PaginationOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const { data, count, error } = await this.client
      .from("testimonials")
      .select("*", { count: "exact" })
      .order("updated_at", { ascending: false })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  async findPage(options: TestimonialQueryOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const term = options.query ? normalizeSearchTerm(options.query) : "";
    let request = this.client
      .from("testimonials")
      .select("*", { count: "exact" });
    if (term)
      request = request.or(
        `reviewer_name.ilike.%${term}%,company_name.ilike.%${term}%,reviewer_role.ilike.%${term}%,quote.ilike.%${term}%`,
      );
    if (options.status) request = request.eq("status", options.status);
    if (options.approval)
      request = request.eq("approval_status", options.approval);
    if (options.featured !== undefined)
      request = request.eq("is_featured", options.featured);
    const sort = options.sort ?? "display-asc";
    if (sort === "display-asc")
      request = request.order("display_order", { ascending: true });
    if (sort === "display-desc")
      request = request.order("display_order", { ascending: false });
    if (sort === "name-asc")
      request = request.order("reviewer_name", { ascending: true });
    if (sort === "rating-desc")
      request = request.order("rating", {
        ascending: false,
        nullsFirst: false,
      });
    if (sort === "updated-desc")
      request = request.order("updated_at", { ascending: false });
    const { data, count, error } = await request
      .order("id", { ascending: true })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  async findPublishedApproved(limit = 6) {
    const { data, error } = await this.client
      .from("testimonials")
      .select("*")
      .eq("status", "published")
      .eq("approval_status", "approved")
      .eq("consent_verified", true)
      .order("is_featured", { ascending: false })
      .order("display_order", { ascending: true })
      .order("id", { ascending: true })
      .limit(limit);
    this.throwIfError(error);
    return data ?? [];
  }
  async findPublicPage(options: PublicTestimonialQuery = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const term = options.query ? normalizeSearchTerm(options.query) : "";
    let request = this.client
      .from("testimonials")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .eq("approval_status", "approved")
      .eq("consent_verified", true);
    if (term)
      request = request.or(
        `reviewer_name.ilike.%${term}%,company_name.ilike.%${term}%,reviewer_role.ilike.%${term}%,quote.ilike.%${term}%,industry.ilike.%${term}%`,
      );
    if (options.rating) request = request.eq("rating", options.rating);
    if (options.featured !== undefined)
      request = request.eq("is_featured", options.featured);
    if (options.industry) request = request.eq("industry", options.industry);
    const sort = options.sort ?? "display";
    if (sort === "display")
      request = request.order("display_order", { ascending: true });
    if (sort === "highest-rating")
      request = request.order("rating", {
        ascending: false,
        nullsFirst: false,
      });
    if (sort === "newest")
      request = request.order("published_at", {
        ascending: false,
        nullsFirst: false,
      });
    const { data, count, error } = await request
      .order("id", { ascending: true })
      .range(from, to);
    this.throwIfError(error);
    const rows = data ?? [];
    const mediaIds = [
      ...new Set(
        rows
          .flatMap((item) => [item.avatar_media_id, item.company_logo_media_id])
          .filter((id): id is string => Boolean(id)),
      ),
    ];
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
    const enriched: readonly PublicTestimonial[] = rows.map((item) => ({
      ...item,
      avatar: item.avatar_media_id
        ? (byId.get(item.avatar_media_id) ?? null)
        : null,
      companyLogo: item.company_logo_media_id
        ? (byId.get(item.company_logo_media_id) ?? null)
        : null,
    }));
    return {
      data: enriched,
      count: count ?? 0,
      page,
      pageSize,
      totalPages: Math.ceil((count ?? 0) / pageSize),
    };
  }
  async findPublicIndustries() {
    const { data, error } = await this.client
      .from("testimonials")
      .select("industry")
      .eq("status", "published")
      .eq("approval_status", "approved")
      .eq("consent_verified", true)
      .not("industry", "is", null)
      .order("industry");
    this.throwIfError(error);
    return [
      ...new Set(
        (data ?? []).flatMap((item) => (item.industry ? [item.industry] : [])),
      ),
    ];
  }
  approve(id: string, approverId: string) {
    return this.update(id, {
      approval_status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: approverId,
    });
  }
  reject(id: string) {
    return this.update(id, {
      approval_status: "rejected",
      approved_at: null,
      approved_by: null,
      published_at: null,
      status: "draft",
    });
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
  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
