import type {
  ContentStatus,
  ServiceInsert,
  ServiceRow,
  ServiceUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

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
    const term = query.trim().replaceAll(",", "");
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
  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
