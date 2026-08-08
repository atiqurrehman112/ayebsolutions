import {
  Accessibility,
  ArrowRight,
  Blocks,
  Bot,
  Braces,
  Check,
  ChevronDown,
  CircleGauge,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe2,
  LayoutDashboard,
  Network,
  PanelsTopLeft,
  Search,
  ServerCog,
  Sparkles,
  TestTube2,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Card } from "@/components/cards/card";
import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import styles from "./portfolio-project-page.module.css";

type ProjectStatus =
  "Internal Concept" | "Prototype" | "Demo" | "Experimental" | "Case Study";

type PortfolioProjectSlug =
  | "school-operations-portal"
  | "ai-lead-routing-workflow"
  | "auction-marketplace-architecture"
  | "support-knowledge-assistant"
  | "commerce-analytics-workspace"
  | "saas-crm-workspace"
  | "accessible-booking-experience"
  | "api-operations-console";

interface DetailItem {
  readonly title: string;
  readonly description: string;
}

interface PortfolioProject {
  readonly slug: PortfolioProjectSlug;
  readonly title: string;
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly status: ProjectStatus;
  readonly category: string;
  readonly projectType: string;
  readonly origin: string;
  readonly disclosure: string;
  readonly summary: string;
  readonly challenge: string;
  readonly solution: string;
  readonly architecture: string;
  readonly technology: readonly [string, ...string[]];
  readonly features: readonly [
    DetailItem,
    DetailItem,
    DetailItem,
    DetailItem,
    DetailItem,
    DetailItem,
    DetailItem,
    DetailItem,
  ];
  readonly decisions: readonly [DetailItem, DetailItem, DetailItem, DetailItem];
  readonly modules: readonly [DetailItem, DetailItem, DetailItem, DetailItem];
  readonly lessons: readonly [string, string, string, string];
  readonly future: string;
  readonly icon: LucideIcon;
}

const projectDetails = {
  "school-operations-portal": {
    slug: "school-operations-portal",
    title: "School Operations Portal",
    seoTitle: "School Operations Portal — Internal SaaS Prototype",
    seoDescription:
      "Explore an internal school operations portal prototype covering role-aware dashboards, academic records, communication, and administration workflows.",
    status: "Prototype",
    category: "SaaS",
    projectType: "Internal product prototype",
    origin: "Created independently by Ayeb Solutions",
    disclosure:
      "This is an internal prototype, not commissioned client work. It contains no real school, student, staff, or performance data.",
    summary:
      "A role-aware product study for coordinating academic operations, records, communication, and daily administration in one understandable workspace.",
    challenge:
      "School operations involve students, guardians, teachers, administrators, schedules, attendance, results, and communication. When responsibility and record ownership are unclear, a portal can simply reproduce existing fragmentation behind a new interface.",
    solution:
      "The prototype organizes work around roles and tasks instead of presenting every user with the same dashboard. Important records expose ownership and state, while communication and administrative actions remain connected to the relevant academic context.",
    architecture:
      "The concept separates tenant context, identity, role permissions, academic records, communication events, and reporting views. Server-rendered product surfaces consume validated application contracts, while relational data models preserve explicit links between people, classes, terms, and activities.",
    technology: [
      "Next.js",
      "React",
      "TypeScript",
      "Postgres",
      "Prisma",
      "Docker",
    ],
    features: [
      {
        title: "Role-aware workspace",
        description:
          "Tailored navigation and tasks for administrators, teachers, students, and guardians.",
      },
      {
        title: "Academic records",
        description:
          "Structured terms, subjects, results, and record ownership with visible state.",
      },
      {
        title: "Attendance workflows",
        description:
          "Class-linked attendance entry, review, corrections, and history.",
      },
      {
        title: "Communication context",
        description:
          "Announcements and messages connected to relevant groups and activities.",
      },
      {
        title: "Student profiles",
        description:
          "Focused academic context without exposing unrelated administrative data.",
      },
      {
        title: "Operational dashboard",
        description:
          "Priority-led views that explain status and the next useful action.",
      },
      {
        title: "Document handling",
        description:
          "Controlled references to approved records and supporting files.",
      },
      {
        title: "Audit context",
        description:
          "Meaningful history for sensitive record and permission changes.",
      },
    ],
    decisions: [
      {
        title: "Tasks before metrics",
        description:
          "The primary dashboard emphasizes pending work and exceptions rather than decorative statistics.",
      },
      {
        title: "Roles are explicit",
        description:
          "Navigation and actions derive from responsibilities instead of hiding authorization only in backend logic.",
      },
      {
        title: "Records retain context",
        description:
          "Results and attendance remain connected to terms, classes, subjects, and accountable users.",
      },
      {
        title: "Complexity is progressive",
        description:
          "Common tasks remain direct while advanced administration appears only where needed.",
      },
    ],
    modules: [
      {
        title: "Operations overview",
        description: "Tasks, exceptions, schedules, and announcements.",
      },
      {
        title: "Academic workspace",
        description: "Classes, subjects, attendance, and assessment records.",
      },
      {
        title: "People directory",
        description: "Role-aware student, guardian, and staff context.",
      },
      {
        title: "Administration",
        description: "Terms, permissions, configuration, and change history.",
      },
    ],
    lessons: [
      "A school portal needs an ownership model before it needs a dashboard.",
      "Role differences should shape information architecture, not only permissions.",
      "Sensitive record corrections require context and history.",
      "Useful school software must accommodate operational exceptions without making every workflow complex.",
    ],
    future:
      "A production path would require institution-specific discovery, privacy and retention review, reporting rules, migration planning, identity requirements, accessibility testing, and operational ownership.",
    icon: PanelsTopLeft,
  },
  "ai-lead-routing-workflow": {
    slug: "ai-lead-routing-workflow",
    title: "AI Lead Routing Workflow",
    seoTitle: "AI Lead Routing Workflow — Internal Automation Demo",
    seoDescription:
      "Explore an internal AI lead-routing demonstration with validation, rules, AI assistance, confidence handling, human review, and CRM handoff.",
    status: "Demo",
    category: "AI Automation",
    projectType: "Internal technology demonstration",
    origin: "Created independently by Ayeb Solutions",
    disclosure:
      "This is an internal demonstration, not a client deployment. It uses no customer leads, conversion data, revenue figures, or claimed outcomes.",
    summary:
      "A governed workflow showing how structured rules, bounded AI assistance, and human approval can support enquiry triage without hiding uncertainty.",
    challenge:
      "Incoming enquiries may contain incomplete, inconsistent, or unstructured context. Routing everything manually creates repetitive work, while fully autonomous classification can conceal uncertainty and assign the wrong next action.",
    solution:
      "The workflow validates required fields, applies deterministic rules, uses AI only for bounded interpretation, records confidence, and routes uncertain cases to human review before approved CRM or notification actions occur.",
    architecture:
      "The demonstration isolates form validation, workflow state, rules, AI-provider calls, confidence policy, reviewer decisions, CRM adapters, and audit events. Each transition is explicit so provider output cannot silently become authoritative business state.",
    technology: [
      "Next.js",
      "TypeScript",
      "Node",
      "Postgres",
      "OpenAI",
      "Docker",
    ],
    features: [
      {
        title: "Input validation",
        description:
          "Required context is checked before classification begins.",
      },
      {
        title: "Deterministic rules",
        description:
          "Known routing conditions remain transparent and testable.",
      },
      {
        title: "Bounded AI analysis",
        description:
          "AI interprets approved fields for a defined task rather than controlling the workflow.",
      },
      {
        title: "Confidence policy",
        description: "Uncertain output follows an explicit review path.",
      },
      {
        title: "Human approval",
        description:
          "Reviewers can confirm, correct, or reject proposed classification.",
      },
      {
        title: "CRM adapter",
        description:
          "Approved data maps through a provider-specific integration boundary.",
      },
      {
        title: "Notification routing",
        description:
          "Relevant teams receive context after business state is confirmed.",
      },
      {
        title: "Decision history",
        description:
          "Inputs, proposals, reviews, and actions retain traceable context.",
      },
    ],
    decisions: [
      {
        title: "Rules precede AI",
        description:
          "Deterministic conditions handle what can be explained without probabilistic inference.",
      },
      {
        title: "Uncertainty stays visible",
        description:
          "Confidence and missing context affect workflow state instead of being hidden in logs.",
      },
      {
        title: "Humans own material actions",
        description:
          "The interface makes review an accountable product step rather than an informal workaround.",
      },
      {
        title: "Providers remain replaceable",
        description:
          "AI and CRM logic live behind adapters instead of spreading through application code.",
      },
    ],
    modules: [
      {
        title: "Capture queue",
        description: "Validated enquiries and missing-context states.",
      },
      {
        title: "Qualification review",
        description:
          "Proposed category, rationale, confidence, and corrections.",
      },
      {
        title: "Routing control",
        description:
          "Approved ownership, CRM destination, and notification plan.",
      },
      {
        title: "Audit timeline",
        description:
          "Workflow transitions, reviewer actions, and provider events.",
      },
    ],
    lessons: [
      "AI output should enter a workflow as a proposal, not a fact.",
      "Confidence only matters when it changes product behavior.",
      "Provider failures and missing context need first-class states.",
      "Human review is most useful when ownership and correction paths are explicit.",
    ],
    future:
      "Production exploration would require real workflow mapping, approved data policy, representative evaluation cases, cost controls, provider terms, CRM permissions, monitoring, and accountable human ownership.",
    icon: Workflow,
  },
  "auction-marketplace-architecture": {
    slug: "auction-marketplace-architecture",
    title: "Auction Marketplace Architecture",
    seoTitle: "Auction Marketplace Architecture — Internal Product Concept",
    seoDescription:
      "Explore an internal auction marketplace concept covering listing states, bidding events, identity, moderation, payments, and operational boundaries.",
    status: "Internal Concept",
    category: "Web Development",
    projectType: "Internal architecture concept",
    origin: "Created independently by Ayeb Solutions",
    disclosure:
      "This is an internal concept, not a live marketplace or client project. It contains no real sellers, buyers, vehicles, bids, payments, or transaction results.",
    summary:
      "A marketplace architecture study for time-sensitive listings, bidding state, participant trust, moderation, and controlled transaction boundaries.",
    challenge:
      "Auction products combine real-time expectations, financial intent, identity, moderation, listing quality, and irreversible state changes. An interface that treats bidding as a simple counter can hide important operational and trust requirements.",
    solution:
      "The concept defines explicit listing and auction states, server-authoritative bid acceptance, participant permissions, event history, moderation workflows, and a separate post-auction transaction path.",
    architecture:
      "The proposed system separates catalog records, media, auction state, bid commands, event history, identity, moderation, notifications, and payment-provider boundaries. Server-controlled timestamps and database constraints protect authoritative state while clients subscribe to approved updates.",
    technology: [
      "Next.js",
      "React",
      "TypeScript",
      "Node",
      "Postgres",
      "Stripe",
      "Cloudinary",
    ],
    features: [
      {
        title: "Listing lifecycle",
        description:
          "Draft, review, scheduled, active, completed, and withdrawn states.",
      },
      {
        title: "Server-authoritative bids",
        description:
          "Acceptance follows controlled time, eligibility, and ordering rules.",
      },
      {
        title: "Participant identity",
        description:
          "Account, verification, and permission context remain visible.",
      },
      {
        title: "Moderation workflow",
        description:
          "Listings and reports move through accountable review states.",
      },
      {
        title: "Media handling",
        description: "Controlled upload and transformation for listing assets.",
      },
      {
        title: "Event history",
        description:
          "Material auction transitions retain chronological context.",
      },
      {
        title: "Notification states",
        description:
          "Bid and auction events communicate delivery and failure context.",
      },
      {
        title: "Transaction boundary",
        description:
          "Payment intent remains separate from authoritative auction completion.",
      },
    ],
    decisions: [
      {
        title: "State is authoritative",
        description:
          "The server decides whether a bid is valid rather than trusting client timers or displays.",
      },
      {
        title: "Trust is contextual",
        description:
          "Verification, condition information, and moderation are part of product structure.",
      },
      {
        title: "Money stays bounded",
        description:
          "Payment-provider concerns do not define auction-domain rules.",
      },
      {
        title: "History explains outcomes",
        description:
          "Material transitions preserve enough context for support and dispute review.",
      },
    ],
    modules: [
      {
        title: "Auction catalog",
        description: "Search, filters, listing state, and schedule context.",
      },
      {
        title: "Live bidding room",
        description:
          "Authoritative state, bid entry, eligibility, and event feedback.",
      },
      {
        title: "Seller workspace",
        description: "Drafts, media, reviews, schedules, and listing outcomes.",
      },
      {
        title: "Moderation console",
        description: "Review queues, reports, decisions, and audit context.",
      },
    ],
    lessons: [
      "Real-time presentation does not replace authoritative server state.",
      "Marketplace trust requires workflow design, not only visual badges.",
      "Auction completion and payment completion are separate business events.",
      "Moderation and dispute context should be planned before public launch.",
    ],
    future:
      "Production planning would require market rules, identity and eligibility policy, payment and refund design, legal review, fraud controls, notification guarantees, load testing, moderation staffing, and recovery procedures.",
    icon: Globe2,
  },
  "support-knowledge-assistant": {
    slug: "support-knowledge-assistant",
    title: "Support Knowledge Assistant",
    seoTitle: "Support Knowledge Assistant — Internal AI Experiment",
    seoDescription:
      "Explore an internal support assistant experiment focused on cited knowledge, uncertainty, feedback, privacy boundaries, and human escalation.",
    status: "Experimental",
    category: "AI Automation",
    projectType: "Internal interface and engineering experiment",
    origin: "Created independently by Ayeb Solutions",
    disclosure:
      "This is an internal experiment, not a deployed support product. It uses fictional questions and contains no client knowledge base, customer conversation, or resolution metric.",
    summary:
      "An assistant interface study that treats sources, uncertainty, feedback, and human escalation as primary product features.",
    challenge:
      "Generated support answers can sound authoritative even when source material is missing, outdated, conflicting, or outside the assistant's approved scope. A polished chat surface can make these limits less visible.",
    solution:
      "The experiment requires approved source retrieval, displays citations and freshness context, distinguishes answer from uncertainty, captures correction feedback, and provides a structured escalation path.",
    architecture:
      "The design separates user input, content access policy, retrieval, prompt construction, model provider, citation mapping, response validation, conversation state, feedback, and human support handoff. Sensitive content remains behind explicit permissions.",
    technology: [
      "Next.js",
      "React",
      "TypeScript",
      "OpenAI",
      "Supabase",
      "Postgres",
    ],
    features: [
      {
        title: "Approved retrieval",
        description:
          "Only permitted knowledge sources enter assistant context.",
      },
      {
        title: "Visible citations",
        description:
          "Answers connect claims to identifiable supporting material.",
      },
      {
        title: "Freshness context",
        description:
          "Source recency and ownership remain available to the user.",
      },
      {
        title: "Uncertainty state",
        description:
          "Insufficient evidence produces a different interface and next action.",
      },
      {
        title: "Human escalation",
        description:
          "A structured handoff carries question and reviewed context.",
      },
      {
        title: "Correction feedback",
        description:
          "Users can identify unhelpful or inaccurate output for review.",
      },
      {
        title: "Permission boundaries",
        description: "Knowledge access follows the authenticated user's scope.",
      },
      {
        title: "Conversation controls",
        description: "Retention, reset, and context limits remain explicit.",
      },
    ],
    decisions: [
      {
        title: "Sources are interface content",
        description:
          "Citations remain visible near the answer instead of being hidden behind a generic confidence signal.",
      },
      {
        title: "No answer is a valid state",
        description:
          "The product can decline and escalate when evidence is inadequate.",
      },
      {
        title: "Access precedes retrieval",
        description:
          "Permission filters apply before content is sent to an external model.",
      },
      {
        title: "Feedback needs ownership",
        description:
          "Corrections enter a review workflow rather than disappearing into an unowned rating.",
      },
    ],
    modules: [
      {
        title: "Assistant workspace",
        description: "Question, cited response, uncertainty, and next actions.",
      },
      {
        title: "Source inspector",
        description:
          "Approved material, ownership, freshness, and access context.",
      },
      {
        title: "Escalation handoff",
        description: "Structured summary and transfer to accountable support.",
      },
      {
        title: "Quality review",
        description:
          "Feedback, corrections, evaluation cases, and content gaps.",
      },
    ],
    lessons: [
      "A fluent answer is not evidence of correctness.",
      "Citation quality depends on source quality and access policy.",
      "Escalation must preserve context without transferring unsupported claims.",
      "Assistant quality work includes content ownership, evaluation, and operating process.",
    ],
    future:
      "A production version would require approved content governance, privacy review, representative evaluation, adversarial testing, provider controls, retention policy, escalation ownership, monitoring, and an update process for source material.",
    icon: Bot,
  },
  "commerce-analytics-workspace": {
    slug: "commerce-analytics-workspace",
    title: "Commerce Analytics Workspace",
    seoTitle: "Commerce Analytics Workspace — Internal Dashboard Demo",
    seoDescription:
      "Explore an internal commerce analytics dashboard demonstration focused on hierarchy, context, data states, responsiveness, and operational decisions.",
    status: "Demo",
    category: "UI/UX",
    projectType: "Internal design demonstration",
    origin: "Created independently by Ayeb Solutions",
    disclosure:
      "This is an internal design demo using fictional interface states. It contains no client commerce data, revenue, conversion statistics, or performance results.",
    summary:
      "A decision-focused dashboard study for presenting product, order, and operational context without turning every value into a competing headline.",
    challenge:
      "Analytics interfaces often compress many unrelated values into one screen, omit data definitions, and make visual importance depend on chart size rather than the decisions users need to make.",
    solution:
      "The demo organizes information by operational question, pairs values with scope and freshness, separates monitoring from investigation, and adapts density without hiding essential context on smaller screens.",
    architecture:
      "The concept separates source data, transformation definitions, metric contracts, query services, cached views, access scope, and presentation components. Interface modules consume documented metrics rather than reconstructing business definitions in the browser.",
    technology: [
      "Figma",
      "Next.js",
      "React",
      "TypeScript",
      "Postgres",
      "Cloudflare",
    ],
    features: [
      {
        title: "Decision overview",
        description:
          "Priority areas and exceptions lead before secondary exploration.",
      },
      {
        title: "Metric context",
        description:
          "Scope, comparison basis, and freshness accompany displayed values.",
      },
      {
        title: "Filter ownership",
        description:
          "Active filters remain visible and understandable across modules.",
      },
      {
        title: "Investigation views",
        description:
          "Users can move from summary to contributing records and states.",
      },
      {
        title: "Empty states",
        description:
          "Missing, delayed, and unavailable data remain distinct conditions.",
      },
      {
        title: "Responsive density",
        description:
          "Content order changes with space without removing meaning.",
      },
      {
        title: "Accessible charts",
        description:
          "Text summaries and tabular context support nonvisual interpretation.",
      },
      {
        title: "Export context",
        description:
          "Generated outputs retain filters, timeframe, and metric definitions.",
      },
    ],
    decisions: [
      {
        title: "Questions define sections",
        description:
          "The dashboard is structured around decisions rather than available chart types.",
      },
      {
        title: "Context travels with values",
        description:
          "A number without timeframe, scope, or definition is treated as incomplete.",
      },
      {
        title: "States are not blank charts",
        description:
          "Loading, empty, stale, and failed data receive distinct explanations.",
      },
      {
        title: "Responsive means reprioritized",
        description:
          "Small screens preserve the decision path instead of shrinking a desktop grid.",
      },
    ],
    modules: [
      {
        title: "Executive overview",
        description:
          "Operational priorities, exceptions, and annotated trends.",
      },
      {
        title: "Product analysis",
        description: "Catalog state, availability, and product-level context.",
      },
      {
        title: "Order operations",
        description: "Fulfillment states, exceptions, and investigation paths.",
      },
      {
        title: "Report builder",
        description:
          "Documented metrics, filters, previews, and export context.",
      },
    ],
    lessons: [
      "More charts do not create better decision support.",
      "Metric definitions belong in the product experience.",
      "Accessible alternatives improve understanding for more than screen-reader users.",
      "Responsive dashboards need explicit content priorities.",
    ],
    future:
      "A production product would require source-system mapping, metric governance, access policy, data-quality controls, representative usability testing, query budgets, caching strategy, and accountable analytics ownership.",
    icon: LayoutDashboard,
  },
  "saas-crm-workspace": {
    slug: "saas-crm-workspace",
    title: "SaaS CRM Workspace",
    seoTitle: "SaaS CRM Workspace — Internal Multi-Tenant Prototype",
    seoDescription:
      "Explore an internal SaaS CRM prototype covering tenant boundaries, account context, activity history, permissions, and workflow states.",
    status: "Prototype",
    category: "SaaS",
    projectType: "Internal multi-tenant product prototype",
    origin: "Created independently by Ayeb Solutions",
    disclosure:
      "This is an internal prototype, not commissioned client work. It contains no real organizations, contacts, deals, communications, or sales results.",
    summary:
      "A multi-tenant relationship workspace exploring how accounts, activities, permissions, and pipeline context can remain understandable across teams.",
    challenge:
      "CRM systems accumulate fields and activity quickly. Without clear tenancy, ownership, and workflow state, users may see too much information while still lacking the context needed for the next action.",
    solution:
      "The prototype treats workspace boundaries, role permissions, account history, task ownership, and pipeline state as core product structures. Views emphasize relationship context before broad reporting.",
    architecture:
      "The proposed architecture separates tenants, memberships, permissions, contacts, organizations, activities, pipelines, tasks, integrations, and audit events. Every data query is scoped by workspace context before business filters are applied.",
    technology: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Postgres",
      "Docker",
    ],
    features: [
      {
        title: "Tenant boundaries",
        description:
          "Workspace context scopes records, memberships, and actions.",
      },
      {
        title: "Role permissions",
        description:
          "Capabilities connect to responsibilities and sensitive data.",
      },
      {
        title: "Account timeline",
        description:
          "Activities, changes, notes, and tasks retain chronological context.",
      },
      {
        title: "Pipeline states",
        description:
          "Explicit stages, ownership, and transition rules guide work.",
      },
      {
        title: "Task coordination",
        description:
          "Next actions remain connected to accounts and responsible users.",
      },
      {
        title: "Search and filters",
        description:
          "Scoped retrieval supports known records and operational questions.",
      },
      {
        title: "Integration boundary",
        description:
          "Email and external services connect through replaceable adapters.",
      },
      {
        title: "Audit events",
        description:
          "Sensitive changes preserve actor, workspace, and action context.",
      },
    ],
    decisions: [
      {
        title: "Workspace scope comes first",
        description:
          "Tenant context is established before any record lookup or business filter.",
      },
      {
        title: "Activity is not a feed",
        description:
          "Events are grouped by meaning and connected to accountable next steps.",
      },
      {
        title: "Permissions shape UX",
        description:
          "Unavailable actions and restricted data are designed intentionally rather than failing late.",
      },
      {
        title: "Pipeline states stay explicit",
        description:
          "Stage changes follow visible rules instead of arbitrary drag-and-drop behavior.",
      },
    ],
    modules: [
      {
        title: "Relationship overview",
        description: "Account context, ownership, activity, and next actions.",
      },
      {
        title: "Pipeline workspace",
        description: "Stages, opportunities, transitions, and exceptions.",
      },
      {
        title: "Team activity",
        description: "Tasks, assignments, communication context, and review.",
      },
      {
        title: "Workspace settings",
        description: "Members, roles, fields, integrations, and audit history.",
      },
    ],
    lessons: [
      "Multi-tenancy is a data-access boundary, not a visual workspace switcher.",
      "CRM flexibility needs governance or it becomes inconsistency.",
      "Activity views should explain responsibility and next action.",
      "Permissions are part of product design as well as backend security.",
    ],
    future:
      "Production planning would require organization-specific workflows, migration and deduplication rules, identity design, permission review, integration requirements, retention policy, field governance, reporting definitions, and operational support.",
    icon: Users,
  },
  "accessible-booking-experience": {
    slug: "accessible-booking-experience",
    title: "Accessible Booking Experience",
    seoTitle: "Accessible Booking Experience — Independent Design Case Study",
    seoDescription:
      "Explore an independent accessibility case study for a fictional booking journey covering semantics, keyboard paths, validation, touch targets, and responsive content.",
    status: "Case Study",
    category: "UI/UX",
    projectType: "Independent internal design case study",
    origin: "Created independently by Ayeb Solutions",
    disclosure:
      "This is an independent internal case study based on a fictional booking scenario. It is not client work and includes no real users, appointments, business data, or measured outcomes.",
    summary:
      "A design case study examining how a booking journey can communicate availability, progress, validation, and confirmation across input methods and screen sizes.",
    challenge:
      "Booking flows frequently defer important conditions, use visually ambiguous selection states, trap keyboard users in complex controls, and reveal validation only after several steps have been completed.",
    solution:
      "The study restructures the journey around semantic steps, explicit selection, visible constraints, inline validation, recoverable state, generous touch targets, and a review stage before confirmation.",
    architecture:
      "The interaction model separates service selection, availability queries, user details, validation, reservation state, review, and confirmation. Native semantics lead where possible, while application state preserves progress without turning visual controls into inaccessible custom widgets.",
    technology: ["Figma", "React", "Next.js", "TypeScript", "Storybook"],
    features: [
      {
        title: "Semantic step structure",
        description:
          "Landmarks, headings, and progress explain position and purpose.",
      },
      {
        title: "Keyboard selection",
        description:
          "Availability and options remain operable without pointer input.",
      },
      {
        title: "Visible constraints",
        description:
          "Requirements and availability context appear before commitment.",
      },
      {
        title: "Inline validation",
        description: "Errors identify the field, problem, and recovery action.",
      },
      {
        title: "Review stage",
        description:
          "Users can verify choices before an irreversible confirmation.",
      },
      {
        title: "Touch-aware controls",
        description:
          "Targets and spacing support smaller screens and motor needs.",
      },
      {
        title: "Reduced motion",
        description:
          "Progress remains understandable without spatial transitions.",
      },
      {
        title: "Confirmation context",
        description:
          "The final state explains what happened and what comes next.",
      },
    ],
    decisions: [
      {
        title: "Native semantics lead",
        description:
          "Standard controls are preferred where they already provide a robust interaction model.",
      },
      {
        title: "Availability is explained",
        description:
          "Unavailable choices retain context instead of simply disappearing.",
      },
      {
        title: "Errors support recovery",
        description:
          "Validation communicates what to correct without relying on color or timing.",
      },
      {
        title: "Progress is informational",
        description:
          "Step state remains useful to screen readers and does not imply a fixed completion time.",
      },
    ],
    modules: [
      {
        title: "Service selection",
        description:
          "Clearly labeled choices, requirements, and comparison context.",
      },
      {
        title: "Availability picker",
        description:
          "Keyboard-operable dates, times, and unavailable-state explanations.",
      },
      {
        title: "Details and validation",
        description:
          "Accessible fields, errors, guidance, and preserved input.",
      },
      {
        title: "Review and confirmation",
        description: "Editable summary, consent context, and next steps.",
      },
    ],
    lessons: [
      "Accessibility improves the clarity of the core booking model.",
      "Disabled and unavailable are different product states.",
      "Validation should appear close to the decision that caused it.",
      "A confirmation screen needs operational next steps, not only celebration.",
    ],
    future:
      "A production study would require research with representative users, assistive-technology testing, real availability rules, localization, consent and privacy review, service-specific constraints, failure recovery, and implementation verification.",
    icon: Accessibility,
  },
  "api-operations-console": {
    slug: "api-operations-console",
    title: "API Operations Console",
    seoTitle: "API Operations Console — Internal Integration Experiment",
    seoDescription:
      "Explore an internal API operations console experiment covering event traces, validation, provider state, retry eligibility, and investigation workflows.",
    status: "Experimental",
    category: "API Integrations",
    projectType: "Internal engineering and interface experiment",
    origin: "Created independently by Ayeb Solutions",
    disclosure:
      "This is an internal experiment, not connected to client systems. It contains no production events, provider accounts, customer records, uptime statistics, or incident results.",
    summary:
      "An operations interface study for understanding integration health, event state, retry eligibility, provider context, and accountable recovery actions.",
    challenge:
      "Integration failures can span queues, providers, credentials, validation, and downstream state. When logs are the only interface, operational teams may struggle to understand impact and decide whether an action is safe.",
    solution:
      "The console groups each event into a trace with validated input, state transitions, provider response, retry classification, ownership, and controlled recovery actions. Sensitive values remain masked by default.",
    architecture:
      "The concept separates event intake, validation, idempotency, orchestration, provider adapters, retry policy, dead-letter state, observability, permissions, and audit events. The console reads normalized operational records instead of querying providers directly from the browser.",
    technology: ["Next.js", "TypeScript", "Node", "Postgres", "Docker", "AWS"],
    features: [
      {
        title: "Event traces",
        description:
          "Related transitions and provider calls share one investigation context.",
      },
      {
        title: "Validation state",
        description:
          "Invalid data remains distinct from provider and infrastructure failures.",
      },
      {
        title: "Retry eligibility",
        description:
          "Policy explains whether and when an operation may be attempted again.",
      },
      {
        title: "Idempotency context",
        description:
          "Duplicate protection and processing state remain visible.",
      },
      {
        title: "Provider health",
        description:
          "External dependency state is separated from owned application health.",
      },
      {
        title: "Sensitive-data masking",
        description:
          "Operational visibility minimizes unnecessary secret and personal-data exposure.",
      },
      {
        title: "Controlled actions",
        description:
          "Recovery requires suitable permission, confirmation, and audit context.",
      },
      {
        title: "Ownership and notes",
        description:
          "Investigations retain accountable users, findings, and follow-up.",
      },
    ],
    decisions: [
      {
        title: "Failures keep their type",
        description:
          "Validation, authorization, throttling, provider, and internal errors remain distinguishable.",
      },
      {
        title: "Retry is a policy decision",
        description:
          "A prominent button does not imply that repeating an action is safe.",
      },
      {
        title: "Secrets stay minimized",
        description:
          "The console reveals only the operational context needed for the task.",
      },
      {
        title: "Traces support learning",
        description:
          "Investigation notes and outcomes can improve adapters, alerts, and runbooks.",
      },
    ],
    modules: [
      {
        title: "Operations overview",
        description:
          "Integration state, queues, provider context, and review priorities.",
      },
      {
        title: "Trace explorer",
        description:
          "Event input, transitions, attempts, responses, and ownership.",
      },
      {
        title: "Recovery center",
        description:
          "Eligible actions, confirmation, permissions, and audit history.",
      },
      {
        title: "Provider registry",
        description:
          "Adapters, credentials status, limits, and operational notes.",
      },
    ],
    lessons: [
      "Operational tools should explain whether an action is safe, not only make it available.",
      "Failure taxonomy improves both support and software design.",
      "Provider health and application health need separate signals.",
      "Observability interfaces must balance useful context with data minimization.",
    ],
    future:
      "Production development would require actual integration inventory, incident roles, permission policy, retention rules, provider-specific runbooks, alert design, security review, representative failure testing, and recovery verification.",
    icon: Braces,
  },
} as const satisfies Record<PortfolioProjectSlug, PortfolioProject>;

const processStages = [
  ["Research", Search],
  ["Planning", GitBranch],
  ["Architecture", Blocks],
  ["Development", Code2],
  ["Testing", TestTube2],
  ["Optimization", CircleGauge],
  ["Deployment Planning", Cloud],
  ["Future Improvements", Sparkles],
] as const satisfies readonly (readonly [string, LucideIcon])[];

const processDescriptions = [
  "Clarify the problem, users, evidence, constraints, and unanswered questions.",
  "Define scope, priorities, risks, decisions, and a responsible exploration path.",
  "Separate responsibilities, trust boundaries, state, data, and external dependencies.",
  "Build typed, maintainable product surfaces and the behavior needed to demonstrate the concept.",
  "Review expected paths, failure states, accessibility, security assumptions, and regressions.",
  "Improve clarity and efficiency from evidence without inventing performance outcomes.",
  "Document configuration, operational needs, recovery concerns, and production gaps.",
  "Identify the research, controls, edge cases, and validation needed for a credible next version.",
] as const;

function buildFaqs(project: PortfolioProject) {
  return [
    {
      question: `What is the ${project.title}?`,
      answer: `${project.summary} It is presented as a ${project.status.toLowerCase()} and should be understood within that maturity and origin.`,
    },
    {
      question: `Is ${project.title} client work?`,
      answer: project.disclosure,
    },
    {
      question: `What problem does ${project.title} explore?`,
      answer: project.challenge,
    },
    {
      question: "What solution direction does the project propose?",
      answer: project.solution,
    },
    {
      question: "How is the project architecture approached?",
      answer: project.architecture,
    },
    {
      question: "Which technologies are represented?",
      answer: `The study references ${project.technology.join(", ")}. These choices support the concept but do not imply partnership, certification, production suitability, or a universal recommendation.`,
    },
    {
      question: "Is the project production-ready?",
      answer: `No. Its current project type is ${project.projectType.toLowerCase()}. A production system would require discovery, security and privacy review, representative testing, operational ownership, and requirements specific to the real use case.`,
    },
    {
      question: "How does the project consider accessibility?",
      answer:
        "The shared project approach considers semantic structure, keyboard operation, focus, contrast, motion, responsive content order, labels, and feedback. Production accessibility still requires implementation and assistive-technology testing.",
    },
    {
      question: "Does this page report project results or statistics?",
      answer:
        "No. The project contains no fabricated users, customers, revenue, performance numbers, conversion results, delivery timeline, testimonial, award, or other claimed outcome.",
    },
    {
      question: `What would be needed to develop ${project.title} further?`,
      answer: project.future,
    },
  ] as const;
}

function SectionIntroduction({
  eyebrow,
  id,
  title,
  description,
}: {
  readonly eyebrow: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow className="mb-4 text-xs">{eyebrow}</Eyebrow>
      <h2 id={id} className="text-balance text-headline font-bold">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function ProjectCanvas({ project }: { readonly project: PortfolioProject }) {
  const Icon = project.icon;
  return (
    <div
      className={cn(
        "relative rounded-2xl border p-4 sm:p-6",
        styles.heroCanvas,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
          project / system
        </span>
        <Badge variant="outline">{project.status}</Badge>
      </div>
      <div className="mt-5 grid grid-cols-[4rem_1fr] gap-3 sm:grid-cols-[5rem_1fr]">
        <div className="rounded-xl border bg-muted/35 p-3">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Icon className="size-4" />
          </span>
          {["w-full", "w-3/4", "w-1/2", "w-4/5"].map((width, index) => (
            <span
              key={`${width}-${index}`}
              className={cn("mt-4 block h-1.5 rounded bg-foreground/10", width)}
            />
          ))}
        </div>
        <div className="rounded-xl border bg-background p-4">
          <div className="flex justify-between">
            <span className="h-2 w-24 rounded bg-foreground/15" />
            <span className="h-6 w-16 rounded bg-primary/10" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <span className="h-14 rounded-lg border bg-muted/30" />
            <span className="h-14 rounded-lg border bg-muted/30" />
            <span className="col-span-2 h-14 rounded-lg border bg-primary/5 sm:col-span-1" />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1.3fr_0.7fr]">
            <span className="h-24 rounded-xl border bg-card" />
            <span className="h-24 rounded-xl border bg-muted/40" />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3 text-[0.58rem]">
        <span>{project.category}</span>
        <span className="font-mono text-muted-foreground">
          origin / disclosed
        </span>
      </div>
    </div>
  );
}

function Hero({ project }: { readonly project: PortfolioProject }) {
  return (
    <section
      aria-labelledby="project-title"
      className={cn(
        "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
        styles.hero,
      )}
    >
      <Container className="relative z-10 max-w-[100rem]">
        <SiteBreadcrumbs
          items={[
            { label: "Portfolio", href: "/portfolio" },
            { label: project.title, href: `/portfolio/${project.slug}` },
          ]}
        />
        <div className="mt-12 grid min-w-0 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow className="text-xs">Portfolio project</Eyebrow>
              <Badge variant="outline">{project.status}</Badge>
            </div>
            <h1
              id="project-title"
              className="mt-5 text-balance text-display font-bold"
            >
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {project.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group h-12">
                <Link href="#project-solution">
                  Explore the Project{" "}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12">
                <Link href="/book-consultation">Book Consultation</Link>
              </Button>
            </div>
            <p className="mt-8 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              {project.disclosure}
            </p>
          </div>
          <div className="min-w-0">
            <ProjectCanvas project={project} />
          </div>
        </div>
        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card p-5">
            <dt className="text-xs text-muted-foreground">Category</dt>
            <dd className="mt-2 font-semibold">{project.category}</dd>
          </div>
          <div className="bg-card p-5">
            <dt className="text-xs text-muted-foreground">Technology</dt>
            <dd className="mt-2 text-sm font-semibold">
              {project.technology.slice(0, 3).join(" · ")}
            </dd>
          </div>
          <div className="bg-card p-5">
            <dt className="text-xs text-muted-foreground">Project type</dt>
            <dd className="mt-2 font-semibold">{project.projectType}</dd>
          </div>
          <div className="bg-card p-5">
            <dt className="text-xs text-muted-foreground">Origin</dt>
            <dd className="mt-2 font-semibold">{project.origin}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}

function ChallengeSolution({
  project,
}: {
  readonly project: PortfolioProject;
}) {
  return (
    <section
      id="project-solution"
      aria-labelledby="challenge-heading"
      className="scroll-mt-28 border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <article>
            <Eyebrow className="mb-4 text-xs">Challenge</Eyebrow>
            <h2
              id="challenge-heading"
              className="text-balance text-headline font-bold"
            >
              The problem behind the interface.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {project.challenge}
            </p>
          </article>
          <article>
            <Eyebrow className="mb-4 text-xs">Solution</Eyebrow>
            <h2 className="text-balance text-headline font-bold">
              A direction designed around responsibility.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {project.solution}
            </p>
          </article>
        </div>
        <article
          className={cn(
            "mt-14 rounded-2xl border p-6 text-primary-foreground sm:p-8 lg:p-10",
            styles.architecturePanel,
          )}
        >
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <Eyebrow className="mb-4 text-xs text-primary-foreground/55">
                Architecture
              </Eyebrow>
              <h2 className="text-balance text-2xl font-bold sm:text-3xl">
                Boundaries before infrastructure.
              </h2>
            </div>
            <p className="text-primary-foreground/68 text-base leading-8 sm:text-lg">
              {project.architecture}
            </p>
          </div>
        </article>
      </Container>
    </section>
  );
}

function Features({ project }: { readonly project: PortfolioProject }) {
  return (
    <section
      aria-labelledby="features-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Features"
          id="features-heading"
          title="Eight capabilities shaped by the project problem."
          description="These features describe the concept's intended behavior. They are not a claim of production deployment, adoption, or measured performance."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {project.features.map(({ title, description }, index) => (
            <article key={title} className="bg-background p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-[0.58rem] text-muted-foreground">
                  F{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TechnicalStack({ project }: { readonly project: PortfolioProject }) {
  const icons = [
    Code2,
    Globe2,
    Braces,
    ServerCog,
    Database,
    Cloud,
    Network,
  ] as const;
  return (
    <section
      aria-labelledby="stack-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Technical stack"
          id="stack-heading"
          title="Technology roles, not partnership badges."
          description="The represented stack supports the study's architecture and interface. Final production selection would depend on actual requirements, constraints, and operating ownership."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {project.technology.map((technology, index) => {
            const Icon = icons[index % icons.length] ?? Code2;
            return (
              <li key={technology} className="bg-card p-6">
                <div className="flex items-center justify-between">
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="font-mono text-[0.58rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-semibold">{technology}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Selected for a defined role within this internal study.
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 max-w-3xl text-xs leading-6 text-muted-foreground">
          Technology references do not imply partnerships, certifications,
          endorsements, production readiness, or guaranteed suitability.
        </p>
      </Container>
    </section>
  );
}

function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      className={cn(
        "border-b py-20 text-primary-foreground sm:py-24 lg:py-30",
        styles.process,
      )}
    >
      <Container className="max-w-[100rem]">
        <div className="max-w-3xl">
          <Eyebrow className="mb-4 text-xs text-primary-foreground/55">
            Development process
          </Eyebrow>
          <h2
            id="process-heading"
            className="text-balance text-headline font-bold"
          >
            A disciplined study from question to credible next step.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-primary-foreground/65">
            The sequence explains our reasoning process. It is not a project
            duration, delivery promise, or claim that every stage has been
            completed for production.
          </p>
        </div>
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processStages.map(([title, Icon], index) => (
            <li
              key={title}
              className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-5"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary-foreground text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-6 block font-mono text-[0.55rem] text-primary-foreground/45">
                STAGE {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="text-primary-foreground/58 mt-2 text-xs leading-6">
                {processDescriptions[index]}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Decisions({ project }: { readonly project: PortfolioProject }) {
  return (
    <section
      aria-labelledby="decisions-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionIntroduction
            eyebrow="Design decisions"
            id="decisions-heading"
            title="Choices explained through product responsibility."
            description="Each decision connects interface behavior to architecture, users, risk, or operating context rather than subjective visual preference."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {project.decisions.map(({ title, description }, index) => (
              <Card key={title} className={cn("p-6", styles.decisionCard)}>
                <span className="font-mono text-[0.58rem] text-muted-foreground">
                  D{String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Modules({ project }: { readonly project: PortfolioProject }) {
  return (
    <section
      aria-labelledby="modules-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <SectionIntroduction
          eyebrow="Screens / modules"
          id="modules-heading"
          title="Four code-rendered views of the product system."
          description="These abstract interfaces communicate structure only. They are not screenshots, production screens, client assets, or evidence of a deployed product."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {project.modules.map(({ title, description }, index) => (
            <article
              key={title}
              className="rounded-2xl border bg-card p-4 sm:p-5"
            >
              <div
                className={cn(
                  "rounded-xl border bg-background p-4",
                  styles.moduleVisual,
                )}
                aria-hidden="true"
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="h-2 w-24 rounded bg-foreground/15" />
                  <span className="font-mono text-[0.52rem] text-muted-foreground">
                    MODULE {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-[0.7fr_1.3fr] gap-3">
                  <div className="rounded-lg bg-muted p-3">
                    {["w-full", "w-3/4", "w-1/2"].map((width) => (
                      <span
                        key={width}
                        className={cn(
                          "mb-3 block h-1.5 rounded bg-foreground/10",
                          width,
                        )}
                      />
                    ))}
                  </div>
                  <div>
                    <span className="bg-primary/8 block h-12 rounded-lg" />
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <span className="h-10 rounded-lg border" />
                      <span className="h-10 rounded-lg border bg-card" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2 pb-2 pt-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Lessons({ project }: { readonly project: PortfolioProject }) {
  return (
    <section
      aria-labelledby="lessons-heading"
      className="border-b py-20 sm:py-24 lg:py-30"
    >
      <Container className="max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionIntroduction
              eyebrow="Lessons learned"
              id="lessons-heading"
              title="What the study made clearer."
              description="These are design and engineering observations from internal exploration—not customer feedback, measured results, or claims of business impact."
            />
            <p className="mt-8 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
              <strong className="text-foreground">Future improvements:</strong>{" "}
              {project.future}
            </p>
          </div>
          <ol className="divide-y border-y">
            {project.lessons.map((lesson, index) => (
              <li
                key={lesson}
                className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr]"
              >
                <span className="font-mono text-[0.62rem] text-muted-foreground">
                  L{String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base font-medium leading-7">{lesson}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Faq({ project }: { readonly project: PortfolioProject }) {
  const faqs = buildFaqs(project);
  return (
    <section
      aria-labelledby="project-faq-heading"
      className="border-b bg-muted/[0.12] py-20 sm:py-24 lg:py-30"
    >
      <Container size="content">
        <SectionIntroduction
          eyebrow="Project FAQ"
          id="project-faq-heading"
          title={`Questions about ${project.title}.`}
          description="These answers clarify origin, maturity, architecture, technology, accessibility, production readiness, and the limits of this internal work."
        />
        <div className="mt-12 space-y-3">
          {faqs.map(({ question, answer }, index) => (
            <details
              key={question}
              className={cn(
                "group overflow-hidden rounded-xl border bg-card px-5 sm:px-6",
                styles.disclosure,
              )}
              open={index === 0}
            >
              <summary className="focus-ring flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-5 text-left text-base font-semibold sm:text-lg">
                <span className="flex items-start gap-4 pr-3">
                  <span className="font-mono text-[0.62rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {question}
                </span>
                <ChevronDown
                  className="size-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="ml-8 border-t pb-6 pt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PortfolioProjectPage({
  project,
}: {
  readonly project: PortfolioProject;
}) {
  const pageUrl = new URL(`/portfolio/${project.slug}`, company.url).toString();
  const faqs = buildFaqs(project);
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: pageUrl,
    creator: { "@type": "Organization", name: company.name, url: company.url },
    genre: project.category,
    keywords: [project.status, project.projectType, ...project.technology].join(
      ", ",
    ),
    abstract: project.disclosure,
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.seoTitle,
    description: project.seoDescription,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
    about: { "@type": "CreativeWork", name: project.title },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;
  return (
    <>
      <Hero project={project} />
      <ChallengeSolution project={project} />
      <Features project={project} />
      <TechnicalStack project={project} />
      <Process />
      <Decisions project={project} />
      <Modules project={project} />
      <Lessons project={project} />
      <Faq project={project} />
      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            Start with your own context
          </Eyebrow>
        }
        title="Have a real business problem worth designing around?"
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            This project is an internal study. Your solution should begin with
            your users, workflow, evidence, constraints, and accountable
            outcomes—not a copied interface.
          </p>
        }
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/book-consultation">
                Book Consultation{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={creativeWorkSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

function getPortfolioProject(slug: PortfolioProjectSlug): PortfolioProject {
  return projectDetails[slug];
}

function getPortfolioProjectMetadata(slug: PortfolioProjectSlug): Metadata {
  const project = getPortfolioProject(slug);
  const path = `/portfolio/${project.slug}`;
  return {
    title: project.seoTitle,
    description: project.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: project.seoTitle,
      description: project.seoDescription,
      siteName: company.name,
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.seoDescription,
    },
  };
}

export {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
};
export type { PortfolioProjectSlug };
