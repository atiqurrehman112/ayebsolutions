import type {
  ContentStatus,
  PortfolioProjectInsert,
  PortfolioProjectRow,
  PortfolioProjectUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

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
    const term = query.trim().replaceAll(",", "");
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

  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
