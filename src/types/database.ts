export type ContentStatus = "draft" | "review" | "published" | "archived";
export type ProfileStatus = "active" | "suspended" | "invited";
export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "won"
  | "lost"
  | "archived";
export type AppRole = "admin" | "editor" | "viewer";
export type CategoryKind = "portfolio" | "blog" | "service";
export type MediaVisibility = "public" | "private";
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
export interface PortfolioProjectMediaRow extends Record<string, unknown> {
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

export interface ServiceMediaRow extends Record<string, unknown> {
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

export interface ArticleTagRow extends Record<string, unknown> {
  readonly article_id: string;
  readonly tag_id: string;
  readonly created_at: string;
  readonly created_by: string | null;
}

export interface ProjectTagRow extends Record<string, unknown> {
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

export type ProfileInsert = InsertShape<ProfileRow, "id">;
export type ProfileUpdate = UpdateShape<ProfileRow>;
export type CategoryInsert = InsertShape<CategoryRow, "name" | "slug" | "kind">;
export type CategoryUpdate = UpdateShape<CategoryRow>;
export type TagInsert = InsertShape<TagRow, "name" | "slug">;
export type TagUpdate = UpdateShape<TagRow>;
export type PortfolioProjectInsert = InsertShape<
  PortfolioProjectRow,
  "title" | "slug" | "summary" | "project_type"
>;
export type PortfolioProjectUpdate = UpdateShape<PortfolioProjectRow>;
export type PortfolioProjectMediaInsert = Omit<
  PortfolioProjectMediaRow,
  "created_at"
>;
export type PortfolioProjectMediaUpdate = Partial<
  Pick<PortfolioProjectMediaRow, "caption" | "sort_order">
>;
export type BlogArticleInsert = InsertShape<
  BlogArticleRow,
  "title" | "slug" | "description" | "excerpt" | "content"
>;
export type BlogArticleUpdate = UpdateShape<BlogArticleRow>;
export type ServiceInsert = InsertShape<
  ServiceRow,
  "title" | "slug" | "summary" | "description"
>;
export type ServiceUpdate = UpdateShape<ServiceRow>;
export type ServiceMediaInsert = Omit<ServiceMediaRow, "created_at">;
export type ServiceMediaUpdate = Partial<
  Pick<ServiceMediaRow, "caption" | "sort_order">
>;
export type TestimonialInsert = InsertShape<
  TestimonialRow,
  "reviewer_name" | "quote"
>;
export type TestimonialUpdate = UpdateShape<TestimonialRow>;
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
export type ArticleTagInsert = ArticleTagRow;
export type ArticleTagUpdate = Partial<Pick<ArticleTagRow, "created_by">>;
export type ProjectTagInsert = ProjectTagRow;
export type ProjectTagUpdate = Partial<Pick<ProjectTagRow, "created_by">>;
export type LeadStatusHistoryInsert = Omit<
  LeadStatusHistoryRow,
  "id" | "created_at"
>;
export type LeadStatusHistoryUpdate = Partial<LeadStatusHistoryInsert>;
export type LeadEmailHistoryInsert = Omit<
  LeadEmailHistoryRow,
  "id" | "sent_at"
>;
export type LeadEmailHistoryUpdate = Partial<LeadEmailHistoryInsert>;

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

export interface PortfolioProject {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly status: ContentStatus;
  readonly isFeatured: boolean;
}

export interface BlogArticle {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly status: ContentStatus;
  readonly publishedAt: string | null;
}

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly status: ContentStatus;
}

export interface Testimonial {
  readonly id: string;
  readonly reviewerName: string;
  readonly companyName: string | null;
  readonly quote: string;
  readonly status: ContentStatus;
}

export interface ContactLead {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly projectType: string;
  readonly status: LeadStatus;
}

export interface MediaAsset {
  readonly id: string;
  readonly fileName: string;
  readonly storagePath: string;
  readonly mimeType: string;
  readonly visibility: MediaVisibility;
}
