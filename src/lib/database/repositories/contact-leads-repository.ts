import type {
  ContactLeadInsert,
  ContactLeadRow,
  ContactLeadUpdate,
  LeadEmailHistoryRow,
  LeadStatus,
  LeadStatusHistoryRow,
  ProfileRow,
  EmailTemplateInsert,
  EmailTemplateRow,
  LeadFollowUpRow,
  LeadNoteHistoryRow,
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
  readonly service?: string;
  readonly budget?: string;
  readonly hasReply?: boolean;
  readonly needsFollowUp?: boolean;
}
export interface LeadContext {
  readonly emails: readonly LeadEmailHistoryRow[];
  readonly statuses: readonly LeadStatusHistoryRow[];
  readonly followUps: readonly LeadFollowUpRow[];
  readonly notes: readonly LeadNoteHistoryRow[];
}
export interface AnalyticsDatum {
  readonly label: string;
  readonly value: number;
}
export interface CrmAnalytics {
  readonly activity: readonly {
    readonly id: string;
    readonly kind: string;
    readonly label: string;
    readonly lead_id: string;
    readonly occurred_at: string;
  }[];
  readonly followUps: {
    readonly nextSevenDays: number;
    readonly overdue: number;
    readonly today: number;
    readonly tomorrow: number;
  };
  readonly kpis: {
    readonly averageCloseHours: number | null;
    readonly averageResponseHours: number | null;
    readonly conversionRate: number | null;
    readonly replyRate: number | null;
    readonly winRate: number | null;
  };
  readonly leadSources: readonly AnalyticsDatum[];
  readonly leaderboard: readonly {
    readonly id: string;
    readonly leads_handled: number;
    readonly name: string;
    readonly response_hours: number | null;
    readonly won: number;
  }[];
  readonly monthlyLeads: readonly AnalyticsDatum[];
  readonly smart: {
    readonly biggestBudget: {
      readonly budget_range: string;
      readonly id: string;
      readonly name: string;
    } | null;
    readonly highestPriorityLead: {
      readonly id: string;
      readonly name: string;
      readonly priority: string;
    } | null;
    readonly longestInactiveLead: {
      readonly id: string;
      readonly last_activity: string;
      readonly name: string;
    } | null;
    readonly mostRequestedService: AnalyticsDatum | null;
    readonly newestLead: {
      readonly company: string | null;
      readonly created_at: string;
      readonly id: string;
      readonly name: string;
    } | null;
  };
  readonly statistics: {
    readonly active: number;
    readonly archived: number;
    readonly emailsSent: number;
    readonly estimatedRevenue: number | null;
    readonly lost: number;
    readonly new: number;
    readonly pendingFollowUps: number;
    readonly todaysFollowUps: number;
    readonly total: number;
    readonly won: number;
  };
  readonly statusDistribution: readonly AnalyticsDatum[];
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
  readonly country: string | null;
  readonly referrer: string | null;
  readonly userAgent: string | null;
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
  async getDashboardAnalytics(from: string, to: string): Promise<CrmAnalytics> {
    const { data, error } = await this.client.rpc("crm_dashboard_analytics", {
      p_from: from,
      p_to: to,
    });
    this.throwIfError(error);
    return data as unknown as CrmAnalytics;
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
  async findByIds(ids: readonly string[]) {
    if (!ids.length) return [];
    const { data, error } = await this.client
      .from("contact_leads")
      .select("*")
      .in("id", [...ids]);
    this.throwIfError(error);
    return data ?? [];
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
    await this.update(data, {
      country: input.country,
      ip_hash: input.ipHash,
      referrer: input.referrer,
      user_agent: input.userAgent,
    }).catch(() => undefined);
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

  async updateMany(ids: readonly string[], input: ContactLeadUpdate) {
    if (!ids.length) return;
    const { error } = await this.client
      .from("contact_leads")
      .update(input)
      .in("id", [...ids]);
    this.throwIfError(error);
  }

  async deleteMany(ids: readonly string[]) {
    if (!ids.length) return;
    const { error } = await this.client
      .from("contact_leads")
      .delete()
      .in("id", [...ids]);
    this.throwIfError(error);
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
    const term = options.query?.trim().replace(/[,%()]/g, "");
    let conversationLeadIds: readonly string[] = [];
    if (term) {
      const [emails, notes] = await Promise.all([
        this.client
          .from("lead_email_history")
          .select("lead_id")
          .or(`subject.ilike.%${term}%,body.ilike.%${term}%`),
        this.client
          .from("lead_note_history")
          .select("lead_id")
          .ilike("body", `%${term}%`),
      ]);
      this.throwIfError(emails.error);
      this.throwIfError(notes.error);
      conversationLeadIds = [
        ...new Set([
          ...(emails.data ?? []).map((item) => item.lead_id),
          ...(notes.data ?? []).map((item) => item.lead_id),
        ]),
      ];
      query = query.or(
        `name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%,subject.ilike.%${term}%,message.ilike.%${term}%${conversationLeadIds.length ? `,id.in.(${conversationLeadIds.join(",")})` : ""}`,
      );
    }
    if (options.status) query = query.eq("status", options.status);
    if (options.priority) query = query.eq("priority", options.priority);
    if (options.service) query = query.eq("project_type", options.service);
    if (options.budget) query = query.eq("budget_range", options.budget);
    if (options.assignedTo)
      query =
        options.assignedTo === "unassigned"
          ? query.is("assigned_to", null)
          : query.eq("assigned_to", options.assignedTo);
    if (options.dateFrom) query = query.gte("created_at", options.dateFrom);
    if (options.dateTo)
      query = query.lte("created_at", `${options.dateTo}T23:59:59.999Z`);
    if (options.hasReply !== undefined)
      query = options.hasReply
        ? query.not("replied_at", "is", null)
        : query.is("replied_at", null);
    if (options.needsFollowUp !== undefined)
      query = options.needsFollowUp
        ? query.not("next_follow_up_at", "is", null)
        : query.is("next_follow_up_at", null);
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
  async findFilterOptions() {
    const { data, error } = await this.client
      .from("contact_leads")
      .select("project_type,budget_range");
    this.throwIfError(error);
    return {
      budgets: [
        ...new Set(
          (data ?? [])
            .map((item) => item.budget_range)
            .filter((value): value is string => Boolean(value)),
        ),
      ].sort(),
      services: [
        ...new Set(
          (data ?? []).map((item) => item.project_type).filter(Boolean),
        ),
      ].sort(),
    };
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
    const [statuses, emails, followUps, notes] = await Promise.all([
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
      this.client
        .from("lead_follow_ups")
        .select("*")
        .in("lead_id", [...leadIds])
        .order("scheduled_for", { ascending: false }),
      this.client
        .from("lead_note_history")
        .select("*")
        .in("lead_id", [...leadIds])
        .order("created_at", { ascending: false }),
    ]);
    this.throwIfError(statuses.error);
    this.throwIfError(emails.error);
    this.throwIfError(followUps.error);
    this.throwIfError(notes.error);
    return Object.fromEntries(
      leadIds.map((id) => [
        id,
        {
          statuses: (statuses.data ?? []).filter((item) => item.lead_id === id),
          emails: (emails.data ?? []).filter((item) => item.lead_id === id),
          followUps: (followUps.data ?? []).filter(
            (item) => item.lead_id === id,
          ),
          notes: (notes.data ?? []).filter((item) => item.lead_id === id),
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
  async recordStatuses(
    changes: readonly {
      readonly leadId: string;
      readonly fromStatus: LeadStatus;
      readonly toStatus: LeadStatus;
    }[],
    userId: string,
  ) {
    if (!changes.length) return;
    const { error } = await this.client.from("lead_status_history").insert(
      changes.map((change) => ({
        changed_by: userId,
        from_status: change.fromStatus,
        lead_id: change.leadId,
        to_status: change.toStatus,
      })),
    );
    this.throwIfError(error);
  }
  async recordEmail(input: {
    readonly body: string;
    readonly bcc?: readonly string[];
    readonly cc?: readonly string[];
    readonly emailType: string;
    readonly leadId: string;
    readonly providerId: string | null;
    readonly htmlBody?: string;
    readonly replyTo?: string | null;
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
      message_id: input.providerId,
      direction: "outgoing",
      status: input.providerId ? "sent" : "failed",
      delivery_status: input.providerId ? "accepted" : "failed",
      reply_to: input.replyTo ?? null,
      cc: [...(input.cc ?? [])],
      bcc: [...(input.bcc ?? [])],
      html_body: input.htmlBody ?? null,
      sent_by: input.sentBy,
    });
    this.throwIfError(error);
  }

  async countRecentOutgoing(userId: string, since: string) {
    const { count, error } = await this.client
      .from("lead_email_history")
      .select("id", { count: "exact", head: true })
      .eq("sent_by", userId)
      .eq("direction", "outgoing")
      .gte("sent_at", since);
    this.throwIfError(error);
    return count ?? 0;
  }

  async findTemplates(): Promise<readonly EmailTemplateRow[]> {
    const { data, error } = await this.client
      .from("email_templates")
      .select("*")
      .eq("is_active", true)
      .order("is_system", { ascending: false })
      .order("name");
    this.throwIfError(error);
    return data ?? [];
  }

  async saveTemplate(input: EmailTemplateInsert) {
    const { id: candidateId, ...values } = input;
    const id = typeof candidateId === "string" ? candidateId : undefined;
    const request = id
      ? this.client.from("email_templates").update(values).eq("id", id)
      : this.client.from("email_templates").insert(values);
    const { error } = await request;
    this.throwIfError(error);
  }

  async deleteTemplate(id: string) {
    const { error } = await this.client
      .from("email_templates")
      .delete()
      .eq("id", id)
      .eq("is_system", false);
    this.throwIfError(error);
  }

  async scheduleFollowUp(input: {
    readonly leadId: string;
    readonly scheduledFor: string;
    readonly note: string | null;
    readonly userId: string;
  }) {
    const { error } = await this.client.from("lead_follow_ups").insert({
      lead_id: input.leadId,
      scheduled_for: input.scheduledFor,
      note: input.note,
      assigned_to: input.userId,
      created_by: input.userId,
      updated_by: input.userId,
    });
    this.throwIfError(error);
    await this.update(input.leadId, {
      next_follow_up_at: input.scheduledFor,
      follow_up_completed_at: null,
      updated_by: input.userId,
    });
  }

  async completeFollowUp(id: string, leadId: string, userId: string) {
    const completedAt = new Date().toISOString();
    const { error } = await this.client
      .from("lead_follow_ups")
      .update({
        status: "completed",
        completed_at: completedAt,
        completed_by: userId,
        updated_by: userId,
      })
      .eq("id", id)
      .eq("lead_id", leadId);
    this.throwIfError(error);
    await this.update(leadId, {
      next_follow_up_at: null,
      follow_up_completed_at: completedAt,
      updated_by: userId,
    });
  }

  async recordNote(leadId: string, body: string, userId: string) {
    const { error } = await this.client.from("lead_note_history").insert({
      lead_id: leadId,
      body,
      created_by: userId,
    });
    this.throwIfError(error);
  }

  async findDueFollowUps(limit = 8): Promise<readonly LeadFollowUpRow[]> {
    const { data, error } = await this.client
      .from("lead_follow_ups")
      .select("*")
      .eq("status", "scheduled")
      .lte("scheduled_for", new Date(Date.now() + 86_400_000).toISOString())
      .order("scheduled_for")
      .limit(limit);
    this.throwIfError(error);
    return data ?? [];
  }

  async getEmailCenterMetrics() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todayIso = today.toISOString();
    const count = async (
      table: "contact_leads" | "lead_email_history" | "lead_follow_ups",
      apply: (
        query: ReturnType<DatabaseClient["from"]>,
      ) => ReturnType<DatabaseClient["from"]>,
    ) => {
      const query = this.client
        .from(table)
        .select("id", { count: "exact", head: true });
      const { count: value, error } = await apply(query);
      this.throwIfError(error);
      return value ?? 0;
    };
    const [
      emailsSent,
      incomingReplies,
      unreadReplies,
      todaysFollowUps,
      pendingReplies,
      wonToday,
      lostToday,
      openLeads,
      responseRows,
    ] = await Promise.all([
      count("lead_email_history", (query) => query.eq("direction", "outgoing")),
      count("lead_email_history", (query) => query.eq("direction", "incoming")),
      count("lead_email_history", (query) =>
        query.eq("direction", "incoming").is("read_at", null),
      ),
      count("lead_follow_ups", (query) =>
        query
          .eq("status", "scheduled")
          .gte("scheduled_for", todayIso)
          .lte(
            "scheduled_for",
            new Date(today.getTime() + 86_400_000).toISOString(),
          ),
      ),
      count("contact_leads", (query) =>
        query.is("replied_at", null).not("status", "in", "(won,lost,archived)"),
      ),
      count("contact_leads", (query) =>
        query.eq("status", "won").gte("status_changed_at", todayIso),
      ),
      count("contact_leads", (query) =>
        query.eq("status", "lost").gte("status_changed_at", todayIso),
      ),
      count("contact_leads", (query) =>
        query.not("status", "in", "(won,lost,archived)"),
      ),
      this.client
        .from("contact_leads")
        .select("created_at,replied_at")
        .not("replied_at", "is", null),
    ]);
    this.throwIfError(responseRows.error);
    const responseHours = (responseRows.data ?? []).map(
      (row) =>
        (new Date(row.replied_at as string).getTime() -
          new Date(row.created_at).getTime()) /
        3_600_000,
    );
    return {
      averageResponseHours: responseHours.length
        ? responseHours.reduce((total, value) => total + value, 0) /
          responseHours.length
        : null,
      emailsSent,
      lostToday,
      openLeads,
      pendingReplies,
      replyRate: emailsSent ? (incomingReplies / emailsSent) * 100 : null,
      todaysFollowUps,
      unreadReplies,
      wonToday,
    };
  }
}
