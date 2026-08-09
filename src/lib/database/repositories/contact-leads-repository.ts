import type {
  ContactLeadInsert,
  ContactLeadRow,
  ContactLeadUpdate,
  LeadStatus,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { type PaginationOptions, LeadRepository } from "./base-repository";

export class ContactLeadsRepository extends LeadRepository<
  ContactLeadRow,
  ContactLeadInsert,
  ContactLeadUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }

  async findAll() {
    const { data, error } = await this.client
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from("contact_leads")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    this.throwIfError(error);
    return data;
  }

  async create(input: ContactLeadInsert) {
    const { data, error } = await this.client
      .from("contact_leads")
      .insert(input)
      .select("*")
      .single()
      .overrideTypes<ContactLeadRow, { merge: false }>();
    this.throwIfError(error);
    return this.requireData(data);
  }

  async update(id: string, input: ContactLeadUpdate) {
    const { data, error } = await this.client
      .from("contact_leads")
      .update(input)
      .eq("id", id)
      .select("*")
      .single()
      .overrideTypes<ContactLeadRow, { merge: false }>();
    this.throwIfError(error);
    return this.requireData(data);
  }

  async delete(id: string) {
    const { error } = await this.client
      .from("contact_leads")
      .delete()
      .eq("id", id);
    this.throwIfError(error);
  }

  async search(query: string) {
    const term = query.trim().replaceAll(",", "");
    if (!term) return this.findAll();
    const { data, error } = await this.client
      .from("contact_leads")
      .select("*")
      .or(`name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%`)
      .order("created_at", { ascending: false });
    this.throwIfError(error);
    return data ?? [];
  }

  async paginate(options: PaginationOptions = {}) {
    const { page, pageSize, from, to } = this.getRange(options);
    const { data, count, error } = await this.client
      .from("contact_leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }

  setStatus(id: string, status: LeadStatus) {
    return this.update(id, { status });
  }
}
