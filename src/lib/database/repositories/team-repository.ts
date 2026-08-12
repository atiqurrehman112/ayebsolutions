import type {
  ContentStatus,
  TeamMemberInsert,
  TeamMemberRow,
  TeamMemberUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

export type TeamMemberSort =
  "order-asc" | "order-desc" | "name-asc" | "updated-desc";
export interface TeamMemberQueryOptions extends PaginationOptions {
  readonly department?: string;
  readonly featured?: boolean;
  readonly query?: string;
  readonly sort?: TeamMemberSort;
  readonly status?: "draft" | "published";
}

function searchTerm(value: string) {
  return value
    .trim()
    .replace(/[,%().]/g, " ")
    .replace(/\s+/g, " ");
}

export class TeamRepository extends ContentRepository<
  TeamMemberRow,
  TeamMemberInsert,
  TeamMemberUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }
  async findAll() {
    const { data, error } = await this.client
      .from("team_members")
      .select("*")
      .order("display_order")
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }
  async findById(id: string) {
    const { data, error } = await this.client
      .from("team_members")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }
  async create(input: TeamMemberInsert) {
    const { data, error } = await this.client
      .from("team_members")
      .insert(input)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async update(id: string, input: TeamMemberUpdate) {
    const { data, error } = await this.client
      .from("team_members")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();
    this.throwIfError(error);
    return this.requireData(data);
  }
  async delete(id: string) {
    const { error } = await this.client
      .from("team_members")
      .delete()
      .eq("id", id);
    this.throwIfError(error);
  }
  async search(query: string) {
    const term = searchTerm(query);
    const { data, error } = await this.client
      .from("team_members")
      .select("*")
      .or(
        `name.ilike.%${term}%,role.ilike.%${term}%,department.ilike.%${term}%,short_bio.ilike.%${term}%`,
      )
      .order("display_order");
    this.throwIfError(error);
    return data ?? [];
  }
  async paginate(options: PaginationOptions = {}) {
    return this.findPage(options);
  }
  async findPage(options: TeamMemberQueryOptions = {}) {
    const range = this.getRange(options);
    let query = this.client
      .from("team_members")
      .select("*", { count: "exact" });
    if (options.query) {
      const term = searchTerm(options.query);
      query = query.or(
        `name.ilike.%${term}%,role.ilike.%${term}%,department.ilike.%${term}%,short_bio.ilike.%${term}%`,
      );
    }
    if (options.status) query = query.eq("status", options.status);
    if (options.department) query = query.eq("department", options.department);
    if (options.featured !== undefined)
      query = query.eq("featured", options.featured);
    const sort = options.sort ?? "order-asc";
    if (sort === "order-asc")
      query = query.order("display_order").order("name");
    else if (sort === "order-desc")
      query = query.order("display_order", { ascending: false }).order("name");
    else if (sort === "name-asc") query = query.order("name");
    else query = query.order("updated_at", { ascending: false });
    const { data, error, count } = await query.range(range.from, range.to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, range.page, range.pageSize);
  }
  async departments() {
    const { data, error } = await this.client
      .from("team_members")
      .select("department")
      .not("department", "is", null)
      .order("department");
    this.throwIfError(error);
    return [
      ...new Set(
        (data ?? [])
          .map((item) => item.department)
          .filter((value): value is string => Boolean(value)),
      ),
    ];
  }
  async setStatus(id: string, status: ContentStatus) {
    if (status !== "draft" && status !== "published")
      throw new Error("Team members support draft and published states only.");
    return this.update(id, { status });
  }
  async reorder(ids: readonly string[], updatedBy: string) {
    await Promise.all(
      ids.map((id, index) =>
        this.update(id, { display_order: index, updated_by: updatedBy }),
      ),
    );
  }
}
