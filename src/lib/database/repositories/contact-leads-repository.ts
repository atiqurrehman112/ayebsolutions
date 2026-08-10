import type {
  ContactLeadInsert,
  ContactLeadRow,
  ContactLeadUpdate,
  LeadEmailHistoryRow,
  LeadStatus,
  LeadStatusHistoryRow,
  ProfileRow,
} from "@/types/database";
import type { DatabaseClient } from "../client";
import { type PaginatedResult, LeadRepository } from "./base-repository";

export type LeadPriority = "high" | "low" | "medium" | "urgent";
export type LeadSort = "company" | "newest" | "oldest" | "priority" | "status";
export interface LeadQuery {
  readonly assignedTo?: string;
  readonly dateFrom?: string;
  readonly dateTo?: string;
  readonly page?: number;
  readonly pageSize?: 25 | 50 | 100;
  readonly priority?: LeadPriority;
  readonly query?: string;
  readonly sort?: LeadSort;
  readonly status?: LeadStatus;
}
export interface LeadContext {
  readonly emails: readonly LeadEmailHistoryRow[];
  readonly statuses: readonly LeadStatusHistoryRow[];
}
export interface PublicLeadSubmission {
  readonly budget: string | null;
  readonly company: string | null;
  readonly email: string;
  readonly ipHash: string;
  readonly interests: readonly string[];
  readonly message: string;
  readonly name: string;
  readonly payloadHash: string;
  readonly phone: string | null;
  readonly service: string;
  readonly timeline: string | null;
}
export class PublicLeadSubmissionError extends Error {
  constructor(readonly reason: "duplicate" | "rate_limit") {
    super(reason);
    this.name = "PublicLeadSubmissionError";
  }
}

export class ContactLeadsRepository extends LeadRepository<
  ContactLeadRow,
  ContactLeadInsert,
  ContactLeadUpdate
> {
  constructor(client: DatabaseClient) {
    super(client);
  }
  async findAll() {
    return (await this.findPage({ pageSize: 100 })).data;
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
  async createPublicSubmission(input: PublicLeadSubmission): Promise<string> {
    const { data, error } = await this.client.rpc("submit_contact_lead", {
      p_budget: input.budget,
      p_company: input.company,
      p_email: input.email,
      p_ip_hash: input.ipHash,
      p_interests: [...input.interests],
      p_message: input.message,
      p_name: input.name,
      p_payload_hash: input.payloadHash,
      p_phone: input.phone,
      p_service: input.service,
      p_timeline: input.timeline,
    });
    if (error?.message.includes("contact_rate_limited"))
      throw new PublicLeadSubmissionError("rate_limit");
    if (error?.message.includes("contact_duplicate"))
      throw new PublicLeadSubmissionError("duplicate");
    this.throwIfError(error);
    if (!data) throw new Error("The inquiry could not be created.");
    return data;
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
    return (await this.findPage({ query, pageSize: 100 })).data;
  }
  async paginate(
    options: { readonly page?: number; readonly pageSize?: number } = {},
  ) {
    const size =
      options.pageSize === 50 || options.pageSize === 100
        ? options.pageSize
        : 25;
    return this.findPage({ page: options.page, pageSize: size });
  }
  setStatus(id: string, status: LeadStatus) {
    return this.update(id, {
      status,
      status_changed_at: new Date().toISOString(),
    });
  }

  async findPage(
    options: LeadQuery = {},
  ): Promise<PaginatedResult<ContactLeadRow>> {
    const { page, pageSize, from, to } = this.getRange({
      page: options.page,
      pageSize: options.pageSize ?? 25,
    });
    let query = this.client
      .from("contact_leads")
      .select("*", { count: "exact" });
    const term = options.query?.trim().replaceAll(",", "");
    if (term)
      query = query.or(
        `name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%,subject.ilike.%${term}%,message.ilike.%${term}%`,
      );
    if (options.status) query = query.eq("status", options.status);
    if (options.priority) query = query.eq("priority", options.priority);
    if (options.assignedTo)
      query =
        options.assignedTo === "unassigned"
          ? query.is("assigned_to", null)
          : query.eq("assigned_to", options.assignedTo);
    if (options.dateFrom) query = query.gte("created_at", options.dateFrom);
    if (options.dateTo)
      query = query.lte("created_at", `${options.dateTo}T23:59:59.999Z`);
    const sort = options.sort ?? "newest";
    const order =
      sort === "company"
        ? (["company", true] as const)
        : sort === "priority"
          ? (["priority_rank", false] as const)
          : sort === "status"
            ? (["status", true] as const)
            : (["created_at", sort === "oldest"] as const);
    const { data, count, error } = await query
      .order(order[0], { ascending: order[1], nullsFirst: false })
      .range(from, to);
    this.throwIfError(error);
    return this.paginateResult(data ?? [], count, page, pageSize);
  }
  async findAssignees(): Promise<
    readonly Pick<ProfileRow, "display_name" | "id" | "role">[]
  > {
    const { data, error } = await this.client
      .from("profiles")
      .select("id,display_name,role")
      .eq("status", "active")
      .order("display_name");
    this.throwIfError(error);
    return data ?? [];
  }
  async findContext(
    leadIds: readonly string[],
  ): Promise<Readonly<Record<string, LeadContext>>> {
    if (!leadIds.length) return {};
    const [statuses, emails] = await Promise.all([
      this.client
        .from("lead_status_history")
        .select("*")
        .in("lead_id", [...leadIds])
        .order("created_at", { ascending: false }),
      this.client
        .from("lead_email_history")
        .select("*")
        .in("lead_id", [...leadIds])
        .order("sent_at", { ascending: false }),
    ]);
    this.throwIfError(statuses.error);
    this.throwIfError(emails.error);
    return Object.fromEntries(
      leadIds.map((id) => [
        id,
        {
          statuses: (statuses.data ?? []).filter((item) => item.lead_id === id),
          emails: (emails.data ?? []).filter((item) => item.lead_id === id),
        },
      ]),
    );
  }
  async recordStatus(
    leadId: string,
    fromStatus: LeadStatus,
    toStatus: LeadStatus,
    userId: string,
  ) {
    const { error } = await this.client.from("lead_status_history").insert({
      lead_id: leadId,
      from_status: fromStatus,
      to_status: toStatus,
      changed_by: userId,
    });
    this.throwIfError(error);
  }
  async recordEmail(input: {
    readonly body: string;
    readonly emailType: string;
    readonly leadId: string;
    readonly providerId: string | null;
    readonly recipient: string;
    readonly sentBy: string | null;
    readonly subject: string;
  }) {
    const { error } = await this.client.from("lead_email_history").insert({
      lead_id: input.leadId,
      email_type: input.emailType,
      recipient: input.recipient,
      subject: input.subject,
      body: input.body,
      provider_id: input.providerId,
      sent_by: input.sentBy,
    });
    this.throwIfError(error);
  }
}
