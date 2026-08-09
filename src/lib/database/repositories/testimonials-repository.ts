import type {
  ContentStatus,
  TestimonialInsert,
  TestimonialRow,
  TestimonialUpdate,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { ContentRepository, type PaginationOptions } from "./base-repository";

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
    const term = query.trim().replaceAll(",", "");
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
  setStatus(id: string, status: ContentStatus) {
    return this.update(id, { status });
  }
}
