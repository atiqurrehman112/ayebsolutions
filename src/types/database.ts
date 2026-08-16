export type ContentStatus = "draft" | "review" | "published" | "archived";
type ProfileStatus = "active" | "suspended" | "invited";
export type LeadStatus =
  "new" | "read" | "in_progress" | "replied" | "won" | "lost" | "archived";
export type AppRole = "admin" | "editor" | "viewer";
type CategoryKind = "portfolio" | "blog" | "service";
type MediaVisibility = "public" | "private";
export type TestimonialApprovalStatus = "pending" | "approved" | "rejected";

export type Json =
  | string
  | number
  | boolean
  | null
  | { readonly [key: string]: Json | undefined }
  | readonly Json[];

interface AuditColumns {
  readonly id: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly created_by: string | null;
  readonly updated_by: string | null;
}

export interface ProfileRow extends Record<string, unknown> {
  readonly id: string;
  readonly display_name: string | null;
  readonly role: AppRole;
  readonly status: ProfileStatus;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface CategoryRow extends AuditColumns, Record<string, unknown> {
  readonly name: string;
  readonly slug: string;
  readonly description: string | null;
  readonly kind: CategoryKind;
  readonly status: ContentStatus;
}

export interface TagRow extends AuditColumns, Record<string, unknown> {
  readonly name: string;
  readonly slug: string;
  readonly status: ContentStatus;
}

export interface PortfolioProjectRow
  extends AuditColumns, Record<string, unknown> {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly challenge: string | null;
  readonly solution: string | null;
  readonly category_id: string | null;
  readonly project_type: string;
  readonly technologies: readonly string[];
  readonly features: Json;
  readonly content: Json;
  readonly status: ContentStatus;
  readonly is_featured: boolean;
  readonly published_at: string | null;
  readonly meta_title: string | null;
  readonly meta_description: string | null;
  readonly client_goals: readonly string[];
  readonly results: readonly string[];
  readonly faq: Json;
}
interface PortfolioProjectMediaRow extends Record<string, unknown> {
  readonly project_id: string;
  readonly media_id: string;
  readonly sort_order: number;
  readonly caption: string | null;
  readonly created_at: string;
  readonly created_by: string | null;
}

export interface BlogArticleRow extends AuditColumns, Record<string, unknown> {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly excerpt: string;
  readonly content: Json;
  readonly category_id: string | null;
  readonly reading_time_minutes: number | null;
  readonly difficulty: string | null;
  readonly keywords: readonly string[];
  readonly is_featured: boolean;
  readonly search_text: string;
  readonly status: ContentStatus;
  readonly published_at: string | null;
  readonly meta_title: string | null;
  readonly meta_description: string | null;
  readonly author_name: string | null;
  readonly featured_media_id: string | null;
  readonly faq: Json;
}

export interface ServiceRow extends AuditColumns, Record<string, unknown> {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly description: string;
  readonly category_id: string | null;
  readonly icon: string | null;
  readonly keywords: readonly string[];
  readonly features: readonly string[];
  readonly technologies: readonly string[];
  readonly status: ContentStatus;
  readonly is_featured: boolean;
  readonly sort_order: number;
  readonly meta_title: string | null;
  readonly meta_description: string | null;
  readonly subtitle: string | null;
  readonly benefits: readonly string[];
  readonly process: Json;
  readonly deliverables: readonly string[];
  readonly faq: Json;
}

interface ServiceMediaRow extends Record<string, unknown> {
  readonly service_id: string;
  readonly media_id: string;
  readonly sort_order: number;
  readonly caption: string | null;
  readonly created_at: string;
  readonly created_by: string | null;
}

export interface TestimonialRow extends AuditColumns, Record<string, unknown> {
  readonly reviewer_name: string;
  readonly company_name: string | null;
  readonly reviewer_role: string | null;
  readonly quote: string;
  readonly rating: number | null;
  readonly related_service_id: string | null;
  readonly consent_verified: boolean;
  readonly is_featured: boolean;
  readonly approval_status: TestimonialApprovalStatus;
  readonly display_order: number;
  readonly published_at: string | null;
  readonly approved_at: string | null;
  readonly approved_by: string | null;
  readonly meta_title: string | null;
  readonly meta_description: string | null;
  readonly status: ContentStatus;
  readonly industry: string | null;
  readonly avatar_media_id: string | null;
  readonly company_logo_media_id: string | null;
}

export interface TeamMemberRow extends AuditColumns, Record<string, unknown> {
  readonly name: string;
  readonly slug: string;
  readonly profile_image: string | null;
  readonly role: string;
  readonly department: string | null;
  readonly short_bio: string;
  readonly full_bio: string | null;
  readonly skills: readonly string[];
  readonly years_experience: number | null;
  readonly email: string | null;
  readonly linkedin_url: string | null;
  readonly github_url: string | null;
  readonly twitter_url: string | null;
  readonly portfolio_url: string | null;
  readonly featured: boolean;
  readonly display_order: number;
  readonly status: "draft" | "published";
}

export interface FounderProfileRow
  extends AuditColumns, Record<string, unknown> {
  readonly singleton_key: boolean;
  readonly full_name: string;
  readonly role_title: string;
  readonly professional_headline: string;
  readonly short_introduction: string;
  readonly biography: string;
  readonly profile_photo: string | null;
  readonly cover_image: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly location: string | null;
  readonly linkedin_url: string | null;
  readonly github_url: string | null;
  readonly twitter_url: string | null;
  readonly facebook_url: string | null;
  readonly instagram_url: string | null;
  readonly portfolio_url: string | null;
  readonly resume_url: string | null;
  readonly years_experience: number | null;
  readonly projects_completed: number | null;
  readonly happy_clients: number | null;
  readonly technologies: readonly string[];
  readonly certifications: readonly string[];
  readonly skills: readonly string[];
  readonly vision_statement: string | null;
  readonly mission_statement: string | null;
  readonly personal_quote: string | null;
  readonly availability_status: "available" | "busy" | "not_accepting" | null;
  readonly featured_badge: string | null;
  readonly display_order: number;
  readonly seo_title: string | null;
  readonly seo_description: string | null;
  readonly open_graph_image: string | null;
  readonly status: "draft" | "published";
}

export interface SiteConfigurationRow
  extends AuditColumns, Record<string, unknown> {
  readonly site_name: string;
  readonly tagline: string;
  readonly short_description: string | null;
  readonly long_description: string | null;
  readonly site_url: string;
  readonly canonical_base_url: string;
  readonly default_language: string;
  readonly timezone: string;
  readonly logo_media_id: string | null;
  readonly white_logo_media_id: string | null;
  readonly favicon_media_id: string | null;
  readonly default_share_media_id: string | null;
  readonly contact_email: string | null;
  readonly secondary_email: string | null;
  readonly contact_phone: string | null;
  readonly whatsapp: string | null;
  readonly address: string | null;
  readonly google_maps_url: string | null;
  readonly business_hours: string | null;
  readonly linkedin_url: string | null;
  readonly github_url: string | null;
  readonly facebook_url: string | null;
  readonly instagram_url: string | null;
  readonly x_url: string | null;
  readonly youtube_url: string | null;
  readonly default_meta_title: string;
  readonly default_meta_description: string;
  readonly default_keywords: readonly string[];
  readonly open_graph_media_id: string | null;
  readonly twitter_media_id: string | null;
  readonly google_analytics_id: string | null;
  readonly google_tag_manager_id: string | null;
  readonly meta_pixel_id: string | null;
  readonly microsoft_clarity_id: string | null;
  readonly footer_copyright: string;
  readonly footer_description: string | null;
  readonly footer_cta: string | null;
  readonly footer_button_text: string | null;
  readonly footer_button_link: string | null;
  readonly announcement_enabled: boolean;
  readonly announcement_text: string | null;
  readonly announcement_button_text: string | null;
  readonly announcement_button_url: string | null;
  readonly maintenance_mode: boolean;
  readonly maintenance_message: string;
  readonly status: ContentStatus;
}

export interface ContactLeadRow extends AuditColumns, Record<string, unknown> {
  readonly name: string;
  readonly email: string;
  readonly phone: string | null;
  readonly company: string | null;
  readonly project_type: string;
  readonly budget_range: string | null;
  readonly estimated_budget: string | null;
  readonly subject: string | null;
  readonly timeline: string | null;
  readonly message: string;
  readonly interested_services: readonly string[];
  readonly priority: string;
  readonly priority_rank: number;
  readonly status: LeadStatus;
  readonly source: string;
  readonly assigned_to: string | null;
  readonly notes: string | null;
  readonly last_contacted_at: string | null;
  readonly status_changed_at: string;
  readonly is_important: boolean;
  readonly read_at: string | null;
  readonly replied_at: string | null;
  readonly country: string | null;
  readonly ip_hash: string | null;
  readonly referrer: string | null;
  readonly user_agent: string | null;
  readonly next_follow_up_at: string | null;
  readonly follow_up_completed_at: string | null;
}
export interface LeadStatusHistoryRow extends Record<string, unknown> {
  readonly id: string;
  readonly lead_id: string;
  readonly from_status: LeadStatus | null;
  readonly to_status: LeadStatus;
  readonly changed_by: string | null;
  readonly created_at: string;
}
export interface LeadEmailHistoryRow extends Record<string, unknown> {
  readonly id: string;
  readonly lead_id: string;
  readonly email_type: string;
  readonly recipient: string;
  readonly subject: string;
  readonly body: string;
  readonly provider_id: string | null;
  readonly sent_by: string | null;
  readonly sent_at: string;
  readonly direction: "incoming" | "outgoing";
  readonly status: "queued" | "sent" | "failed" | "received";
  readonly delivery_status:
    "pending" | "accepted" | "delivered" | "failed" | "bounced" | "received";
  readonly message_id: string | null;
  readonly reply_to: string | null;
  readonly cc: readonly string[];
  readonly bcc: readonly string[];
  readonly html_body: string | null;
  readonly attachments: Json;
  readonly read_at: string | null;
}

export interface EmailTemplateRow
  extends AuditColumns, Record<string, unknown> {
  readonly name: string;
  readonly category:
    | "thank_you"
    | "proposal"
    | "meeting"
    | "discovery_call"
    | "project_started"
    | "quote"
    | "follow_up"
    | "custom";
  readonly subject: string;
  readonly body_html: string;
  readonly body_text: string;
  readonly variables: readonly string[];
  readonly is_system: boolean;
  readonly is_active: boolean;
}

export interface LeadFollowUpRow extends AuditColumns, Record<string, unknown> {
  readonly lead_id: string;
  readonly scheduled_for: string;
  readonly status: "scheduled" | "completed" | "cancelled";
  readonly note: string | null;
  readonly assigned_to: string | null;
  readonly completed_at: string | null;
  readonly completed_by: string | null;
}

export interface LeadNoteHistoryRow extends Record<string, unknown> {
  readonly id: string;
  readonly lead_id: string;
  readonly body: string;
  readonly created_by: string | null;
  readonly created_at: string;
}

export interface MediaLibraryRow extends AuditColumns, Record<string, unknown> {
  readonly file_name: string;
  readonly public_id: string;
  readonly secure_url: string;
  readonly resource_type: "image" | "video" | "raw";
  readonly format: string;
  readonly mime_type: string;
  readonly bytes: number;
  readonly width: number | null;
  readonly height: number | null;
  readonly duration: number | null;
  readonly folder: string;
  readonly alt: string | null;
  readonly tags: readonly string[];
  readonly visibility: MediaVisibility;
  readonly usage_locations: readonly string[];
  readonly metadata: Json;
  readonly status: ContentStatus;
}

interface ArticleTagRow extends Record<string, unknown> {
  readonly article_id: string;
  readonly tag_id: string;
  readonly created_at: string;
  readonly created_by: string | null;
}

interface ProjectTagRow extends Record<string, unknown> {
  readonly project_id: string;
  readonly tag_id: string;
  readonly created_at: string;
  readonly created_by: string | null;
}

type InsertShape<Row, RequiredKeys extends keyof Row> = Pick<
  Row,
  RequiredKeys
> &
  Partial<Omit<Row, RequiredKeys>>;
type UpdateShape<Row> = Partial<Omit<Row, "id" | "created_at" | "created_by">>;

type ProfileInsert = InsertShape<ProfileRow, "id">;
type ProfileUpdate = UpdateShape<ProfileRow>;
type CategoryInsert = InsertShape<CategoryRow, "name" | "slug" | "kind">;
type CategoryUpdate = UpdateShape<CategoryRow>;
type TagInsert = InsertShape<TagRow, "name" | "slug">;
type TagUpdate = UpdateShape<TagRow>;
export type PortfolioProjectInsert = InsertShape<
  PortfolioProjectRow,
  "title" | "slug" | "summary" | "project_type"
>;
export type PortfolioProjectUpdate = UpdateShape<PortfolioProjectRow>;
type PortfolioProjectMediaInsert = Omit<PortfolioProjectMediaRow, "created_at">;
type PortfolioProjectMediaUpdate = Partial<
  Pick<PortfolioProjectMediaRow, "caption" | "sort_order">
>;
export type BlogArticleInsert = InsertShape<
  BlogArticleRow,
  "title" | "slug" | "description" | "excerpt" | "content"
>;
export type BlogArticleUpdate = UpdateShape<BlogArticleRow>;
type ServiceInsert = InsertShape<
  ServiceRow,
  "title" | "slug" | "summary" | "description"
>;
type ServiceUpdate = UpdateShape<ServiceRow>;
type ServiceMediaInsert = Omit<ServiceMediaRow, "created_at">;
type ServiceMediaUpdate = Partial<
  Pick<ServiceMediaRow, "caption" | "sort_order">
>;
export type TestimonialInsert = InsertShape<
  TestimonialRow,
  "reviewer_name" | "quote"
>;
export type TestimonialUpdate = UpdateShape<TestimonialRow>;
export type TeamMemberInsert = InsertShape<
  TeamMemberRow,
  "name" | "slug" | "role" | "short_bio"
>;
export type TeamMemberUpdate = UpdateShape<TeamMemberRow>;
export type FounderProfileInsert = InsertShape<
  FounderProfileRow,
  "full_name" | "role_title" | "professional_headline" | "biography"
>;
export type FounderProfileUpdate = UpdateShape<FounderProfileRow>;
export type SiteConfigurationInsert = InsertShape<
  SiteConfigurationRow,
  "site_name" | "tagline" | "site_url" | "canonical_base_url"
>;
export type SiteConfigurationUpdate = UpdateShape<SiteConfigurationRow>;
export type ContactLeadInsert = InsertShape<
  ContactLeadRow,
  "name" | "email" | "project_type" | "message"
>;
export type ContactLeadUpdate = UpdateShape<ContactLeadRow>;
export type MediaLibraryInsert = InsertShape<
  MediaLibraryRow,
  | "file_name"
  | "public_id"
  | "secure_url"
  | "resource_type"
  | "format"
  | "mime_type"
  | "bytes"
  | "folder"
>;
export type MediaLibraryUpdate = UpdateShape<MediaLibraryRow>;
type ArticleTagInsert = ArticleTagRow;
type ArticleTagUpdate = Partial<Pick<ArticleTagRow, "created_by">>;
type ProjectTagInsert = ProjectTagRow;
type ProjectTagUpdate = Partial<Pick<ProjectTagRow, "created_by">>;
type LeadStatusHistoryInsert = Omit<LeadStatusHistoryRow, "id" | "created_at">;
type LeadStatusHistoryUpdate = Partial<LeadStatusHistoryInsert>;
type LeadEmailHistoryInsert = Omit<LeadEmailHistoryRow, "id" | "sent_at">;
type LeadEmailHistoryUpdate = Partial<LeadEmailHistoryInsert>;
export type EmailTemplateInsert = InsertShape<
  EmailTemplateRow,
  "name" | "subject" | "body_html" | "body_text"
>;
export type EmailTemplateUpdate = UpdateShape<EmailTemplateRow>;
export type LeadFollowUpInsert = InsertShape<
  LeadFollowUpRow,
  "lead_id" | "scheduled_for"
>;
export type LeadFollowUpUpdate = UpdateShape<LeadFollowUpRow>;
type LeadNoteHistoryInsert = Omit<LeadNoteHistoryRow, "id" | "created_at">;
type LeadNoteHistoryUpdate = Partial<LeadNoteHistoryInsert>;

interface TableDefinition<Row, Insert, Update> {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
}

export interface Database {
  public: {
    Tables: {
      profiles: TableDefinition<ProfileRow, ProfileInsert, ProfileUpdate>;
      categories: TableDefinition<CategoryRow, CategoryInsert, CategoryUpdate>;
      tags: TableDefinition<TagRow, TagInsert, TagUpdate>;
      portfolio_projects: TableDefinition<
        PortfolioProjectRow,
        PortfolioProjectInsert,
        PortfolioProjectUpdate
      >;
      portfolio_project_media: TableDefinition<
        PortfolioProjectMediaRow,
        PortfolioProjectMediaInsert,
        PortfolioProjectMediaUpdate
      >;
      blog_articles: TableDefinition<
        BlogArticleRow,
        BlogArticleInsert,
        BlogArticleUpdate
      >;
      services: TableDefinition<ServiceRow, ServiceInsert, ServiceUpdate>;
      service_media: TableDefinition<
        ServiceMediaRow,
        ServiceMediaInsert,
        ServiceMediaUpdate
      >;
      testimonials: TableDefinition<
        TestimonialRow,
        TestimonialInsert,
        TestimonialUpdate
      >;
      team_members: TableDefinition<
        TeamMemberRow,
        TeamMemberInsert,
        TeamMemberUpdate
      >;
      founder_profile: TableDefinition<
        FounderProfileRow,
        FounderProfileInsert,
        FounderProfileUpdate
      >;
      site_configuration: TableDefinition<
        SiteConfigurationRow,
        SiteConfigurationInsert,
        SiteConfigurationUpdate
      >;
      contact_leads: TableDefinition<
        ContactLeadRow,
        ContactLeadInsert,
        ContactLeadUpdate
      >;
      lead_status_history: TableDefinition<
        LeadStatusHistoryRow,
        LeadStatusHistoryInsert,
        LeadStatusHistoryUpdate
      >;
      lead_email_history: TableDefinition<
        LeadEmailHistoryRow,
        LeadEmailHistoryInsert,
        LeadEmailHistoryUpdate
      >;
      email_templates: TableDefinition<
        EmailTemplateRow,
        EmailTemplateInsert,
        EmailTemplateUpdate
      >;
      lead_follow_ups: TableDefinition<
        LeadFollowUpRow,
        LeadFollowUpInsert,
        LeadFollowUpUpdate
      >;
      lead_note_history: TableDefinition<
        LeadNoteHistoryRow,
        LeadNoteHistoryInsert,
        LeadNoteHistoryUpdate
      >;
      media_library: TableDefinition<
        MediaLibraryRow,
        MediaLibraryInsert,
        MediaLibraryUpdate
      >;
      article_tags: TableDefinition<
        ArticleTagRow,
        ArticleTagInsert,
        ArticleTagUpdate
      >;
      project_tags: TableDefinition<
        ProjectTagRow,
        ProjectTagInsert,
        ProjectTagUpdate
      >;
    };
    Views: Record<never, never>;
    Functions: {
      current_app_role: {
        Args: Record<string, never>;
        Returns: AppRole | null;
      };
      can_view_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      can_edit_content: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      crm_dashboard_analytics: {
        Args: { p_from: string; p_to: string };
        Returns: Json;
      };
      submit_contact_lead: {
        Args: {
          p_budget: string | null;
          p_company: string | null;
          p_email: string;
          p_ip_hash: string;
          p_interests: string[];
          p_message: string;
          p_name: string;
          p_payload_hash: string;
          p_phone: string | null;
          p_service: string;
          p_timeline: string | null;
        };
        Returns: string;
      };
    };
    Enums: {
      app_role: AppRole;
      category_kind: CategoryKind;
      content_status: ContentStatus;
      lead_crm_status: LeadStatus;
      media_visibility: MediaVisibility;
      profile_status: ProfileStatus;
    };
    CompositeTypes: Record<never, never>;
  };
}
