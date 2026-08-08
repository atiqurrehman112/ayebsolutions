import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Layers3,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container, Eyebrow } from "@/components/layout/primitives";
import { CTALayout } from "@/components/layout/templates";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteBreadcrumbs } from "@/components/shell/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import styles from "./blog-article-page.module.css";

type ArticleDifficulty = "Beginner" | "Intermediate" | "Advanced";

interface ArticleSection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly points?: readonly string[];
}

interface ArticleFaq {
  readonly question: string;
  readonly answer: string;
}

interface RelatedService {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

interface BlogArticle {
  readonly slug: BlogArticleSlug;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly difficulty: ArticleDifficulty;
  readonly readingTime: string;
  readonly keywords: readonly string[];
  readonly summary: string;
  readonly introduction: readonly string[];
  readonly sections: readonly ArticleSection[];
  readonly takeaways: readonly string[];
  readonly relatedServices: readonly RelatedService[];
  readonly relatedArticles: readonly BlogArticleSlug[];
  readonly faqs: readonly ArticleFaq[];
}

const articleSlugs = [
  "why-custom-software-beats-off-the-shelf-tools",
  "how-ai-automation-saves-business-hours",
  "designing-accessible-web-applications",
  "api-integration-best-practices",
  "choosing-the-right-tech-stack",
  "building-scalable-saas-products",
  "improving-website-performance",
  "planning-a-successful-digital-project",
] as const;

type BlogArticleSlug = (typeof articleSlugs)[number];

const articles = {
  "why-custom-software-beats-off-the-shelf-tools": {
    slug: "why-custom-software-beats-off-the-shelf-tools",
    title:
      "Why Custom Software Beats Off-the-Shelf Tools—When the Problem Justifies It",
    description:
      "Learn how to compare custom software with off-the-shelf tools using workflow fit, ownership, integration, cost, and long-term operating needs.",
    category: "Custom Software",
    difficulty: "Intermediate",
    readingTime: "9 minute read",
    keywords: [
      "custom software",
      "off-the-shelf software",
      "software planning",
      "digital transformation",
    ],
    summary:
      "Custom software can create meaningful leverage when a business has distinctive workflows, integration needs, or ownership requirements. It is not automatically the better choice.",
    introduction: [
      "The most useful software decision is rarely “custom or packaged?” in isolation. It is whether a system fits the work, risk, ownership model, and change expected around it.",
      "A packaged product can be faster to adopt and easier to replace. Custom software can provide tighter workflow fit and control, but it also creates responsibilities for discovery, delivery, security, operation, and maintenance.",
    ],
    sections: [
      {
        id: "start-with-workflow",
        title: "Start with the workflow, not the category",
        paragraphs: [
          "Map who performs the work, what triggers it, which decisions matter, where exceptions occur, and what evidence must be retained. A useful comparison begins with this operating reality.",
          "If a packaged tool supports the essential flow with acceptable configuration, its speed and established operating model may outweigh the value of custom code.",
        ],
        points: [
          "Identify critical and optional steps",
          "Document exceptions and approvals",
          "Separate inconvenience from true differentiation",
        ],
      },
      {
        id: "where-packaged-tools-fit",
        title: "Where off-the-shelf tools fit well",
        paragraphs: [
          "Established tools are often appropriate for common capabilities such as accounting, scheduling, document collaboration, or standard customer management.",
          "The decision should account for licensing, configuration limits, export options, provider stability, permissions, and how much surrounding process must change.",
        ],
        points: [
          "Common, well-understood workflows",
          "Limited differentiation needed",
          "Acceptable provider and data constraints",
        ],
      },
      {
        id: "where-custom-earns-place",
        title: "Where custom software can earn its place",
        paragraphs: [
          "Custom development becomes easier to justify when the workflow is strategically distinctive, several systems must behave as one, or ownership and extensibility materially affect the business.",
          "A strong case explains what cannot be achieved responsibly through configuration or integration alone.",
        ],
        points: [
          "Distinct operational logic",
          "Complex cross-system coordination",
          "Long-term product ownership",
        ],
      },
      {
        id: "total-cost",
        title: "Compare total operating cost",
        paragraphs: [
          "License price and development cost are only part of the picture. Consider migration, training, support, hosting, security review, maintenance, vendor changes, and the cost of manual work around limitations.",
          "Use ranges and scenarios rather than pretending uncertain future costs can be reduced to one exact number.",
        ],
        points: [
          "Implementation and migration",
          "Ongoing operation and support",
          "Change, exit, and replacement cost",
        ],
      },
      {
        id: "ownership-and-risk",
        title: "Make ownership and risk explicit",
        paragraphs: [
          "Custom software gives an organization more control over behavior and evolution, but ownership also means decisions about security, accessibility, data, deployment, monitoring, and continuity.",
          "Packaged software transfers some responsibilities to a provider while introducing dependency on its roadmap, terms, interfaces, and service boundaries.",
        ],
        points: [
          "Name decision owners",
          "Define data and access responsibilities",
          "Plan maintenance before launch",
        ],
      },
      {
        id: "decision-framework",
        title: "Use a staged decision framework",
        paragraphs: [
          "Begin with discovery, shortlist credible packaged options, test configuration and integration paths, and estimate the custom scope only after the gaps are understood.",
          "A prototype or bounded first release can validate the highest-risk assumptions before a larger commitment.",
        ],
        points: ["Discover", "Compare", "Validate", "Commit proportionately"],
      },
    ],
    takeaways: [
      "Custom is justified by fit and ownership—not prestige.",
      "Packaged tools are often the responsible default for common workflows.",
      "Compare total operating responsibility, not only purchase price.",
      "Validate the riskiest assumption before expanding scope.",
    ],
    relatedServices: [
      {
        title: "Custom SaaS",
        description: "Purpose-built platforms, portals, and internal systems.",
        href: "/services/custom-saas",
      },
      {
        title: "API Integration",
        description: "Connect existing products before replacing them.",
        href: "/services/api-integration",
      },
    ],
    relatedArticles: [
      "choosing-the-right-tech-stack",
      "planning-a-successful-digital-project",
    ],
    faqs: [
      {
        question: "Is custom software always better than packaged software?",
        answer:
          "No. Packaged software may provide faster adoption, established support, and lower ownership burden for common workflows. Custom development should solve a justified fit, integration, control, or product need.",
      },
      {
        question: "What is the strongest reason to build custom software?",
        answer:
          "A strong reason is a valuable workflow or product capability that available tools cannot support responsibly through configuration or integration.",
      },
      {
        question: "Is custom software cheaper over time?",
        answer:
          "Not necessarily. Long-term cost depends on scope, maintenance, hosting, security, team ownership, provider fees, change, and the useful life of the system.",
      },
      {
        question: "Can packaged software be integrated instead of replaced?",
        answer:
          "Often. APIs, webhooks, exports, and automation may close important gaps, subject to provider capabilities, permissions, reliability, and terms.",
      },
      {
        question: "Who owns custom software?",
        answer:
          "Ownership, licensing, source access, infrastructure, data, and third-party dependencies should be defined contractually for the specific engagement.",
      },
      {
        question: "How should requirements be gathered?",
        answer:
          "Start with users, workflows, decisions, data, exceptions, dependencies, risks, and acceptance criteria rather than a feature wishlist alone.",
      },
      {
        question: "Does custom software remove vendor dependency?",
        answer:
          "It can reduce dependence on one packaged product, but custom systems still rely on hosting, libraries, platforms, integrations, and people who operate them.",
      },
      {
        question: "Can custom software begin as a small release?",
        answer:
          "Yes. A bounded release can validate workflow fit and technical assumptions before expanding, provided the first scope is coherent and supportable.",
      },
      {
        question: "What should be evaluated after launch?",
        answer:
          "Review user behavior, workflow exceptions, reliability, accessibility, security assumptions, support needs, and evidence about which improvements matter.",
      },
      {
        question: "How do I decide which path fits my business?",
        answer:
          "Compare credible packaged, configured, integrated, and custom options during discovery using the same workflow, risk, ownership, and cost criteria.",
      },
    ],
  },
  "how-ai-automation-saves-business-hours": {
    slug: "how-ai-automation-saves-business-hours",
    title:
      "How AI Automation Can Save Business Hours Without Removing Human Judgment",
    description:
      "Understand where AI-assisted automation may reduce repetitive work while preserving validation, approval, privacy, and exception handling.",
    category: "AI Automation",
    difficulty: "Intermediate",
    readingTime: "8 minute read",
    keywords: [
      "AI automation",
      "workflow automation",
      "human oversight",
      "business operations",
    ],
    summary:
      "Useful automation reduces avoidable handling around a well-understood workflow. The goal is dependable support for people, not unchecked autonomy or guaranteed time savings.",
    introduction: [
      "AI can classify, summarize, draft, extract, and route information inside a workflow. Traditional automation can then apply deterministic rules around those outputs.",
      "The value depends on volume, repetition, data quality, exception rates, integration access, and the cost of errors. Human review remains essential where consequences or uncertainty are material.",
    ],
    sections: [
      {
        id: "map-the-work",
        title: "Map work before introducing AI",
        paragraphs: [
          "Document the trigger, inputs, decisions, systems, owners, exceptions, and desired outcome. Automation applied to an unclear process tends to move confusion faster.",
          "Separate repetitive handling from judgment that depends on context, accountability, or relationship.",
        ],
        points: [
          "Triggers and inputs",
          "Decision owners",
          "Exceptions and escalation",
        ],
      },
      {
        id: "rules-and-ai",
        title: "Separate rules from AI assistance",
        paragraphs: [
          "Use deterministic rules for known conditions and AI for bounded interpretation tasks where probabilistic output is acceptable.",
          "A clear boundary makes testing, explanation, fallback, and change easier than one opaque automated chain.",
        ],
        points: [
          "Rules enforce known policy",
          "AI assists interpretation",
          "Humans own consequential decisions",
        ],
      },
      {
        id: "time-opportunities",
        title: "Find credible time-saving opportunities",
        paragraphs: [
          "High-volume routing, data entry, document extraction, first-draft responses, and status updates may reduce repetitive handling.",
          "Estimate opportunity using observed workflow volume and review effort, then validate with a pilot instead of marketing statistics.",
        ],
        points: [
          "Repeated manual transfer",
          "Consistent classification",
          "Drafting with review",
        ],
      },
      {
        id: "human-review",
        title: "Design human review intentionally",
        paragraphs: [
          "Review should be placed according to confidence, consequence, reversibility, sensitivity, and policy—not added as a vague final step.",
          "The interface should show source context, uncertainty, proposed action, and a clear approve, revise, or reject path.",
        ],
        points: [
          "Confidence thresholds",
          "Visible source context",
          "Escalation ownership",
        ],
      },
      {
        id: "exceptions",
        title: "Plan for exceptions and failure",
        paragraphs: [
          "APIs fail, data arrives incomplete, models behave inconsistently, and business rules change. A production workflow needs queues, retries, timeouts, logs, and a manual path.",
          "Failing visibly and recoverably is more useful than appearing autonomous while losing work.",
        ],
        points: [
          "Retry only safe operations",
          "Preserve audit context",
          "Provide manual recovery",
        ],
      },
      {
        id: "measure-and-improve",
        title: "Measure the workflow, not the demo",
        paragraphs: [
          "Evaluate handling time, review burden, exception patterns, correction rate, user experience, and operational cost using representative cases.",
          "Evidence should guide expansion, narrower scope, model changes, or removal of automation that does not help.",
        ],
        points: [
          "Baseline current work",
          "Pilot representative cases",
          "Review quality and burden together",
        ],
      },
    ],
    takeaways: [
      "Map the workflow before selecting AI.",
      "Keep deterministic rules and probabilistic assistance distinct.",
      "Place human approval according to risk.",
      "Measure real operating behavior before expanding.",
    ],
    relatedServices: [
      {
        title: "AI Automation",
        description: "Governed AI-assisted business workflows.",
        href: "/services/ai-automation",
      },
      {
        title: "API Integration",
        description: "Connect the systems an automation depends on.",
        href: "/services/api-integration",
      },
    ],
    relatedArticles: [
      "api-integration-best-practices",
      "planning-a-successful-digital-project",
    ],
    faqs: [
      {
        question: "What is AI automation?",
        answer:
          "AI automation combines bounded AI capabilities with workflow rules, integrations, validation, and human ownership to support a defined business process.",
      },
      {
        question: "Does AI automation guarantee saved time?",
        answer:
          "No. Any benefit depends on workflow volume, data, integration reliability, exception rates, review needs, adoption, and ongoing operation.",
      },
      {
        question: "Which tasks are suitable for AI assistance?",
        answer:
          "Classification, extraction, summarization, drafting, and routing may be suitable when outputs can be validated and failure consequences are understood.",
      },
      {
        question: "Which tasks should remain human decisions?",
        answer:
          "High-consequence, sensitive, ambiguous, regulated, relationship-dependent, or low-confidence decisions generally require accountable human judgment.",
      },
      {
        question: "How are uncertain AI outputs handled?",
        answer:
          "Use confidence thresholds, validation, source context, review queues, escalation, and a safe fallback rather than assuming every output is correct.",
      },
      {
        question: "Can automation connect existing tools?",
        answer:
          "Potentially, when providers expose suitable APIs or other approved integration methods and the required permissions and terms allow the workflow.",
      },
      {
        question: "What data should be sent to an AI provider?",
        answer:
          "Only data justified by the use case and permitted by applicable policy, contracts, privacy requirements, provider terms, and security review.",
      },
      {
        question: "How should an automation pilot begin?",
        answer:
          "Choose a bounded workflow, establish a baseline, define safe success and failure criteria, test representative exceptions, and retain human review.",
      },
      {
        question: "Does AI automation replace employees?",
        answer:
          "The responsible goal is to support a workflow, not promise workforce replacement. Roles, accountability, and organizational impact require deliberate human decisions.",
      },
      {
        question: "What happens after deployment?",
        answer:
          "Review logs, exceptions, provider changes, output quality, permissions, cost, user feedback, and whether the workflow still creates appropriate value.",
      },
    ],
  },
  "designing-accessible-web-applications": {
    slug: "designing-accessible-web-applications",
    title: "Designing Accessible Web Applications From the First Decision",
    description:
      "A practical guide to building accessibility into structure, content, interaction, responsive design, development, and testing.",
    category: "Accessibility",
    difficulty: "Intermediate",
    readingTime: "9 minute read",
    keywords: [
      "web accessibility",
      "accessible design",
      "keyboard navigation",
      "semantic HTML",
    ],
    summary:
      "Accessibility is a product-quality discipline spanning research, content, design, engineering, and verification—not a final visual checklist.",
    introduction: [
      "An accessible application helps people perceive, understand, navigate, and operate its content across different devices and assistive technologies.",
      "The strongest results come when accessibility influences requirements and component behavior before screens are polished or code is considered complete.",
    ],
    sections: [
      {
        id: "define-access-needs",
        title: "Define access needs during discovery",
        paragraphs: [
          "Understand user tasks, content, input methods, environments, and known barriers. Include accessibility in acceptance criteria and risk discussions.",
          "Standards provide a foundation, but product-specific workflows determine where deeper testing is needed.",
        ],
        points: [
          "User tasks and contexts",
          "Applicable standards",
          "Testable acceptance criteria",
        ],
      },
      {
        id: "semantic-foundation",
        title: "Start with semantic structure",
        paragraphs: [
          "Landmarks, headings, lists, labels, tables, buttons, and links communicate purpose before ARIA is considered.",
          "Use native elements whenever they provide the required behavior; custom widgets create additional keyboard and assistive-technology obligations.",
        ],
        points: [
          "One clear page hierarchy",
          "Native controls first",
          "ARIA only when needed",
        ],
      },
      {
        id: "keyboard-and-focus",
        title: "Design keyboard and focus behavior",
        paragraphs: [
          "Every interactive path should be operable without a pointer. Focus order should follow reading and task order, and focus must remain visible.",
          "Dialogs, menus, disclosures, errors, and dynamic updates require explicit focus and announcement decisions.",
        ],
        points: [
          "Logical tab sequence",
          "Visible focus",
          "Predictable modal behavior",
        ],
      },
      {
        id: "content-and-contrast",
        title: "Make content and visual states understandable",
        paragraphs: [
          "Readable language, helpful labels, sufficient contrast, useful error messages, and non-color-only status support more people.",
          "Zoom, reflow, text spacing, and narrow viewports should not hide information or force unnecessary two-dimensional scrolling.",
        ],
        points: [
          "Clear labels and instructions",
          "Text plus visual status",
          "Reflow without loss",
        ],
      },
      {
        id: "motion-and-media",
        title: "Respect motion and sensory differences",
        paragraphs: [
          "Nonessential animation should respond to reduced-motion preferences, and critical information should not depend on animation alone.",
          "Media needs appropriate alternatives, controls, captions, or transcripts according to its purpose.",
        ],
        points: [
          "Reduced-motion support",
          "No flashing hazards",
          "Equivalent media access",
        ],
      },
      {
        id: "test-and-maintain",
        title: "Test with multiple methods",
        paragraphs: [
          "Combine automated checks, keyboard review, screen-reader testing, zoom and reflow review, and task-based human evaluation.",
          "Accessibility can regress as content, dependencies, and product behavior change, so it belongs in ongoing review.",
        ],
        points: [
          "Automated checks",
          "Manual interaction review",
          "Representative assistive technology",
        ],
      },
    ],
    takeaways: [
      "Accessibility begins with requirements and semantics.",
      "Native HTML reduces unnecessary interaction risk.",
      "Keyboard, focus, content, contrast, reflow, and motion work together.",
      "Automated tools cannot replace manual and user-centered review.",
    ],
    relatedServices: [
      {
        title: "UI/UX Design",
        description: "Accessible flows, interfaces, and design systems.",
        href: "/services/ui-ux-design",
      },
      {
        title: "Web Development",
        description: "Semantic, responsive application implementation.",
        href: "/services/web-development",
      },
    ],
    relatedArticles: [
      "improving-website-performance",
      "planning-a-successful-digital-project",
    ],
    faqs: [
      {
        question: "What does web accessibility mean?",
        answer:
          "It means designing and building content and interaction so people with diverse disabilities, technologies, input methods, and environments can complete intended tasks.",
      },
      {
        question: "Is accessibility only for screen-reader users?",
        answer:
          "No. It includes visual, auditory, motor, speech, cognitive, vestibular, situational, and technology-related access needs.",
      },
      {
        question: "Can automated testing prove a site is accessible?",
        answer:
          "No. Automation can identify certain issues, but keyboard behavior, content meaning, focus, interaction, and assistive-technology experience require manual review.",
      },
      {
        question: "Should every application target the same compliance level?",
        answer:
          "Applicable legal and policy requirements depend on context and jurisdiction. A project should define its standard and obtain qualified advice where needed.",
      },
      {
        question: "Why prefer native HTML controls?",
        answer:
          "Native controls provide established semantics and interaction behavior. Custom controls must recreate those expectations correctly across keyboards and assistive technologies.",
      },
      {
        question: "What makes focus visible?",
        answer:
          "A clearly contrasting indicator that remains perceivable around the focused control and is not removed or hidden by surrounding content.",
      },
      {
        question: "How does responsive design affect accessibility?",
        answer:
          "Content must reflow, remain operable, preserve relationships, and avoid clipping or unnecessary horizontal scrolling under zoom and narrow widths.",
      },
      {
        question: "How should errors be communicated?",
        answer:
          "Identify the affected field, explain the issue in useful language, preserve entered data, and provide programmatic relationships and focus handling where appropriate.",
      },
      {
        question: "Does dark mode need separate accessibility review?",
        answer:
          "Yes. Contrast, focus, status, elevation, and control states should be reviewed in every supported theme rather than assumed from the light theme.",
      },
      {
        question: "How is accessibility maintained after launch?",
        answer:
          "Include it in component governance, content workflows, regression testing, dependency changes, design reviews, and periodic task-based audits.",
      },
    ],
  },
  "api-integration-best-practices": {
    slug: "api-integration-best-practices",
    title: "API Integration Best Practices for Reliable Business Systems",
    description:
      "Learn practical API integration principles for contracts, authentication, validation, idempotency, retries, observability, and provider change.",
    category: "API Integration",
    difficulty: "Advanced",
    readingTime: "10 minute read",
    keywords: [
      "API integration",
      "webhooks",
      "OAuth",
      "integration reliability",
    ],
    summary:
      "Reliable integrations treat external systems as changing, failure-prone boundaries and design explicit contracts, safeguards, and recovery paths around them.",
    introduction: [
      "An API connection is not complete when one successful request reaches a provider. Production integration includes authentication, validation, failure handling, reconciliation, monitoring, and ownership.",
      "The architecture should protect owned business logic from provider-specific details so change can be understood and contained.",
    ],
    sections: [
      {
        id: "contract-boundary",
        title: "Define an explicit contract boundary",
        paragraphs: [
          "Translate external payloads into owned application concepts at a dedicated adapter boundary. Do not let provider shapes spread through core business logic.",
          "Document required fields, optional fields, version assumptions, units, identifiers, and behavior when data is missing.",
        ],
        points: [
          "Provider adapter",
          "Owned domain contract",
          "Version assumptions",
        ],
      },
      {
        id: "authentication",
        title: "Handle authentication as a lifecycle",
        paragraphs: [
          "API keys, OAuth tokens, scopes, rotation, revocation, and environment separation need deliberate ownership.",
          "Grant only required access, protect secrets outside source code, and plan what happens when credentials expire or permissions change.",
        ],
        points: ["Least privilege", "Secret rotation", "Environment isolation"],
      },
      {
        id: "validation",
        title: "Validate both outgoing and incoming data",
        paragraphs: [
          "Validate requests before sending and provider responses before trusting them. A successful HTTP status does not prove business validity.",
          "Keep validation errors useful for operators without exposing secrets or sensitive payloads.",
        ],
        points: [
          "Schema validation",
          "Business-rule validation",
          "Safe diagnostic context",
        ],
      },
      {
        id: "idempotency-retries",
        title: "Make retries safe and intentional",
        paragraphs: [
          "Retry only failures likely to be transient, use bounded backoff, and honor provider guidance. Blind retries can duplicate payments, messages, or records.",
          "Use idempotency keys or an equivalent operation identity where the provider and workflow support it.",
        ],
        points: [
          "Classify transient failures",
          "Bound retry attempts",
          "Prevent duplicate effects",
        ],
      },
      {
        id: "webhooks-reconciliation",
        title: "Treat webhooks as untrusted asynchronous input",
        paragraphs: [
          "Verify signatures, handle duplicates and out-of-order events, acknowledge promptly, and process durable work separately.",
          "Periodic reconciliation can identify events that were delayed, missed, or could not be processed.",
        ],
        points: [
          "Verify origin",
          "Store operation state",
          "Reconcile important records",
        ],
      },
      {
        id: "observability-change",
        title: "Design for observation and provider change",
        paragraphs: [
          "Record correlation identifiers, state transitions, safe errors, latency context, and alert conditions that support investigation.",
          "Track deprecations, version changes, rate limits, commercial terms, and incident communication as operating responsibilities.",
        ],
        points: [
          "Structured logs",
          "Actionable monitoring",
          "Provider change ownership",
        ],
      },
    ],
    takeaways: [
      "Isolate provider contracts from business logic.",
      "Authentication includes rotation and revocation.",
      "Retries require idempotency and failure classification.",
      "Important integrations need monitoring and reconciliation.",
    ],
    relatedServices: [
      {
        title: "API Integration",
        description: "Secure, observable system connections.",
        href: "/services/api-integration",
      },
      {
        title: "Maintenance & Support",
        description: "Ongoing provider and reliability review.",
        href: "/services/maintenance-support",
      },
    ],
    relatedArticles: [
      "how-ai-automation-saves-business-hours",
      "building-scalable-saas-products",
    ],
    faqs: [
      {
        question: "What makes an API integration production ready?",
        answer:
          "A defined contract, secure authentication, validation, safe failure handling, idempotency where needed, logging, monitoring, reconciliation, documentation, and clear ownership.",
      },
      {
        question: "Should provider responses always be trusted?",
        answer:
          "No. Validate structure and business meaning before using data, even when the provider returns a successful status.",
      },
      {
        question: "When should a failed request be retried?",
        answer:
          "Only when the failure is likely transient and the operation can be repeated safely. Use bounded backoff and provider-specific guidance.",
      },
      {
        question: "What is idempotency?",
        answer:
          "It is the property that repeating the same logical operation does not create unintended duplicate effects. Implementation depends on the workflow and provider.",
      },
      {
        question: "How should webhook security be handled?",
        answer:
          "Use provider-supported signature verification, secure transport, replay considerations, validation, least privilege, and careful secret handling.",
      },
      {
        question: "Can webhooks arrive more than once?",
        answer:
          "Yes. Consumers should expect duplicates, delays, and potentially out-of-order delivery unless a provider contract explicitly guarantees otherwise.",
      },
      {
        question: "What should integration logs contain?",
        answer:
          "Useful operation identifiers, safe state transitions, timing, provider response categories, and errors—without leaking credentials or unjustified sensitive data.",
      },
      {
        question: "How are rate limits managed?",
        answer:
          "Understand provider limits, control concurrency, cache appropriately, queue work, respect retry guidance, and design graceful degradation.",
      },
      {
        question: "What if an external API changes?",
        answer:
          "Version adapters, monitor provider notices, test changes, preserve rollback or compatibility paths where practical, and assign ownership for upgrades.",
      },
      {
        question: "Are all third-party services compatible?",
        answer:
          "No. Feasibility depends on available APIs, permissions, terms, data requirements, reliability, regional constraints, and the business workflow.",
      },
    ],
  },
  "choosing-the-right-tech-stack": {
    slug: "choosing-the-right-tech-stack",
    title: "Choosing the Right Technology Stack Without Chasing Trends",
    description:
      "A decision framework for choosing technologies around product needs, team context, data, operations, risk, and long-term ownership.",
    category: "Software Architecture",
    difficulty: "Intermediate",
    readingTime: "8 minute read",
    keywords: [
      "technology stack",
      "software architecture",
      "Next.js",
      "technical decisions",
    ],
    summary:
      "The right stack is the one a team can use to satisfy product requirements and operate responsibly—not the one with the loudest current attention.",
    introduction: [
      "Technology choices shape delivery speed, runtime behavior, hiring, security, maintenance, infrastructure, and the cost of change.",
      "A responsible evaluation begins with constraints and decision criteria, then compares credible options using evidence appropriate to the product.",
    ],
    sections: [
      {
        id: "product-requirements",
        title: "Begin with product behavior",
        paragraphs: [
          "Clarify users, workflows, content, interaction, data, integrations, offline needs, latency sensitivity, and expected change.",
          "Avoid selecting tools from a generic checklist before the system's responsibilities are understood.",
        ],
        points: [
          "User and workflow needs",
          "Data and integration needs",
          "Delivery and operating context",
        ],
      },
      {
        id: "team-context",
        title: "Account for team capability and ownership",
        paragraphs: [
          "A familiar, well-supported tool can be safer than a theoretically ideal option no one can operate.",
          "Consider learning cost, hiring, documentation, ecosystem quality, debugging experience, and who owns the system after launch.",
        ],
        points: [
          "Current capability",
          "Learning and hiring",
          "Long-term ownership",
        ],
      },
      {
        id: "architecture-fit",
        title: "Evaluate architectural fit",
        paragraphs: [
          "Rendering, state, concurrency, consistency, data access, background work, and deployment constraints influence which tools fit.",
          "Use a small technical proof where a critical capability or provider assumption remains uncertain.",
        ],
        points: ["Runtime model", "Data guarantees", "Integration boundaries"],
      },
      {
        id: "operational-cost",
        title: "Include operational cost",
        paragraphs: [
          "Managed services can reduce operating burden while increasing provider dependency and variable cost. Self-managed systems offer control with additional responsibility.",
          "Model credible usage scenarios, failure handling, observability, backups, upgrades, and support—not only the initial development experience.",
        ],
        points: [
          "Hosting and delivery",
          "Monitoring and recovery",
          "Provider and exit considerations",
        ],
      },
      {
        id: "security-longevity",
        title: "Review security and ecosystem longevity",
        paragraphs: [
          "Assess maintenance activity, release policy, vulnerability response, dependency footprint, support horizon, and the maturity of required integrations.",
          "Popularity is useful context but not proof that a tool is appropriate or will remain stable.",
        ],
        points: ["Maintenance signals", "Upgrade path", "Dependency risk"],
      },
      {
        id: "document-decisions",
        title: "Document why the decision was made",
        paragraphs: [
          "Record the problem, options, criteria, evidence, trade-offs, risks, and review trigger. This helps future contributors understand rather than repeat the debate.",
          "Architecture decisions should be revisited when material assumptions change, not whenever a new trend appears.",
        ],
        points: [
          "Decision context",
          "Rejected alternatives",
          "Review conditions",
        ],
      },
    ],
    takeaways: [
      "Requirements and ownership come before tools.",
      "Operational responsibility belongs in stack evaluation.",
      "Prototype high-risk assumptions instead of debating them abstractly.",
      "Document decisions and the conditions that would change them.",
    ],
    relatedServices: [
      {
        title: "Custom Web Development",
        description: "Requirement-led web architecture and delivery.",
        href: "/services/web-development",
      },
      {
        title: "Custom SaaS",
        description: "Product architecture shaped around ownership.",
        href: "/services/custom-saas",
      },
    ],
    relatedArticles: [
      "why-custom-software-beats-off-the-shelf-tools",
      "building-scalable-saas-products",
    ],
    faqs: [
      {
        question: "Is there one best technology stack?",
        answer:
          "No. Fit depends on product behavior, team context, data, integrations, security, operations, cost, and expected change.",
      },
      {
        question: "Should a project use the newest framework?",
        answer:
          "Only when its benefits are relevant and its maturity, support, ecosystem, migration risk, and team readiness are acceptable.",
      },
      {
        question: "How important is team experience?",
        answer:
          "Very important, but not absolute. Existing capability affects delivery and maintenance, while training or specialist support may be justified for a material benefit.",
      },
      {
        question: "Are managed services always preferable?",
        answer:
          "No. They can reduce operational work but introduce provider constraints, variable cost, data considerations, and exit complexity.",
      },
      {
        question: "How should database technology be selected?",
        answer:
          "Start with data relationships, consistency, query patterns, scale characteristics, operational capability, backup needs, and integration requirements.",
      },
      {
        question: "Does scalability require complex infrastructure?",
        answer:
          "Not initially. Use evidence and credible growth scenarios to preserve useful boundaries without paying premature complexity costs.",
      },
      {
        question: "What is a technical proof of concept for?",
        answer:
          "It tests a specific high-risk assumption such as library capability, provider behavior, performance, or integration feasibility—not the entire product.",
      },
      {
        question: "How should vendor lock-in be evaluated?",
        answer:
          "Assess proprietary interfaces, data portability, replacement cost, contractual constraints, operational value, and whether abstraction would genuinely help.",
      },
      {
        question: "When should a stack decision be revisited?",
        answer:
          "When product requirements, risk, provider support, operating evidence, team ownership, or material cost assumptions change.",
      },
      {
        question: "What should an architecture decision record include?",
        answer:
          "Context, decision, alternatives, criteria, consequences, risks, evidence, owners, and conditions that would trigger review.",
      },
    ],
  },
  "building-scalable-saas-products": {
    slug: "building-scalable-saas-products",
    title: "Building Scalable SaaS Products Without Premature Complexity",
    description:
      "Explore practical SaaS foundations for tenancy, permissions, data, reliability, observability, billing, and responsible product evolution.",
    category: "Custom SaaS",
    difficulty: "Advanced",
    readingTime: "10 minute read",
    keywords: [
      "SaaS development",
      "multi-tenant architecture",
      "scalable software",
      "product architecture",
    ],
    summary:
      "Scalability is the ability to support credible change and load while preserving correctness and operability—not an excuse to build every enterprise pattern on day one.",
    introduction: [
      "A SaaS product combines customer experience, permissions, data boundaries, product logic, billing, support, and operations. Each dimension changes as the product matures.",
      "Strong foundations make those changes understandable while delaying complexity that current evidence does not justify.",
    ],
    sections: [
      {
        id: "define-tenancy",
        title: "Define the tenant model",
        paragraphs: [
          "Clarify what a tenant represents, whether users can belong to multiple tenants, how data is isolated, and which settings are global or tenant-specific.",
          "Tenant context should be explicit across authentication, authorization, queries, background jobs, exports, and logs.",
        ],
        points: ["Tenant identity", "Membership rules", "Data isolation"],
      },
      {
        id: "permissions",
        title: "Model permissions around actions",
        paragraphs: [
          "Role labels alone become vague as products grow. Define the resources and actions a user may perform within a tenant context.",
          "Centralized authorization policies, safe defaults, and auditable changes are easier to reason about than scattered interface checks.",
        ],
        points: [
          "Resource-action policies",
          "Server-side enforcement",
          "Permission change history",
        ],
      },
      {
        id: "data-evolution",
        title: "Plan for data evolution",
        paragraphs: [
          "Schemas, migrations, imports, exports, retention, and deletion need product and operational decisions.",
          "Prefer backward-compatible transitions and observable migration steps when data or application versions may coexist.",
        ],
        points: [
          "Migration strategy",
          "Lifecycle and retention",
          "Portability",
        ],
      },
      {
        id: "reliability",
        title: "Build reliability around critical workflows",
        paragraphs: [
          "Identify operations that must be durable, recoverable, idempotent, or auditable. Not every feature requires the same safeguards.",
          "Queues, retries, transactions, and reconciliation should be introduced where failure consequences justify them.",
        ],
        points: [
          "Critical operation map",
          "Safe retry behavior",
          "Recovery ownership",
        ],
      },
      {
        id: "observability-support",
        title: "Connect observability with support",
        paragraphs: [
          "Logs, traces, metrics, audit history, and product context should help answer what happened for a specific tenant without exposing unrelated data.",
          "Support tooling and documentation are part of product operability, not an afterthought.",
        ],
        points: [
          "Tenant-aware diagnostics",
          "Safe support access",
          "Actionable alerts",
        ],
      },
      {
        id: "scale-with-evidence",
        title: "Scale using measured constraints",
        paragraphs: [
          "Establish performance and capacity baselines, monitor representative usage, and identify the actual bottleneck before distributing components.",
          "Clear module and data boundaries can preserve future options without imposing premature infrastructure.",
        ],
        points: [
          "Measure first",
          "Optimize the limiting path",
          "Reassess architecture deliberately",
        ],
      },
    ],
    takeaways: [
      "Make tenant context explicit everywhere.",
      "Enforce permissions on the server around actions and resources.",
      "Apply reliability patterns according to consequence.",
      "Use evidence to introduce scaling complexity.",
    ],
    relatedServices: [
      {
        title: "Custom SaaS",
        description: "Multi-tenant platforms and internal products.",
        href: "/services/custom-saas",
      },
      {
        title: "Maintenance & Support",
        description: "Ongoing operational review and evolution.",
        href: "/services/maintenance-support",
      },
    ],
    relatedArticles: [
      "choosing-the-right-tech-stack",
      "api-integration-best-practices",
    ],
    faqs: [
      {
        question: "What makes a product SaaS?",
        answer:
          "A SaaS product is delivered as an ongoing service, usually combining shared software, customer access, operations, support, and an evolving product lifecycle.",
      },
      {
        question: "What is multi-tenancy?",
        answer:
          "It is an architecture where one product serves multiple customer or organizational contexts while preserving defined data, configuration, and access boundaries.",
      },
      {
        question: "Does every SaaS need microservices?",
        answer:
          "No. A well-structured modular application is often easier to deliver and operate. Distribution should answer demonstrated scaling or ownership needs.",
      },
      {
        question: "How should tenant data be isolated?",
        answer:
          "The approach depends on risk and scale, but tenant context must be enforced consistently in authorization, queries, jobs, storage, exports, and diagnostics.",
      },
      {
        question: "What is RBAC?",
        answer:
          "Role-based access control groups permissions into roles. Mature products may also need action, resource, tenant, ownership, or attribute context.",
      },
      {
        question: "When should billing be introduced?",
        answer:
          "When the commercial model and entitlements are sufficiently understood. Billing, access, refunds, taxes, provider events, and reconciliation require careful design.",
      },
      {
        question: "How can a SaaS prepare for growth?",
        answer:
          "Use clear boundaries, typed contracts, observable workflows, tested migrations, capacity evidence, and an architecture that can change without assuming speculative scale.",
      },
      {
        question: "What should be logged in a multi-tenant product?",
        answer:
          "Safe operation context, tenant identifiers, state changes, errors, and audit events needed for support and security—without exposing unnecessary sensitive data.",
      },
      {
        question: "How are SaaS upgrades handled?",
        answer:
          "Use tested migrations, staged deployment, compatibility planning, monitoring, rollback or recovery plans, and communication appropriate to the change.",
      },
      {
        question: "What happens after the first release?",
        answer:
          "Review product evidence, support patterns, reliability, accessibility, security assumptions, operating cost, and validated customer needs before expanding.",
      },
    ],
  },
  "improving-website-performance": {
    slug: "improving-website-performance",
    title: "Improving Website Performance With Evidence, Not Guesswork",
    description:
      "A practical performance approach covering measurement, rendering, assets, JavaScript, third parties, caching, and regression prevention.",
    category: "Web Performance",
    difficulty: "Intermediate",
    readingTime: "8 minute read",
    keywords: [
      "website performance",
      "Core Web Vitals",
      "web optimization",
      "Next.js performance",
    ],
    summary:
      "Performance work is most useful when it reflects real user conditions, identifies the limiting path, and prevents regressions instead of chasing an isolated score.",
    introduction: [
      "A fast experience depends on server response, rendering, assets, JavaScript, fonts, third-party services, device capability, network conditions, and interaction design.",
      "Measure representative journeys before changing code, then verify that an optimization improves user experience without damaging accessibility, correctness, or maintainability.",
    ],
    sections: [
      {
        id: "measure-context",
        title: "Measure with context",
        paragraphs: [
          "Combine field data where available with controlled lab testing. Segment by page, device, connection, geography, and user journey when the data supports it.",
          "One synthetic score cannot represent every visitor, but repeatable lab conditions remain useful for diagnosis and regression checks.",
        ],
        points: [
          "Field and lab evidence",
          "Representative journeys",
          "Consistent test conditions",
        ],
      },
      {
        id: "rendering",
        title: "Choose rendering and data paths deliberately",
        paragraphs: [
          "Static rendering, server rendering, streaming, caching, and client rendering each fit different freshness and interaction requirements.",
          "Avoid moving work to the browser by default; send only the code and data needed for the current experience.",
        ],
        points: [
          "Render near the data",
          "Cache according to freshness",
          "Limit client hydration",
        ],
      },
      {
        id: "assets",
        title: "Control images, fonts, and visual assets",
        paragraphs: [
          "Serve appropriately sized formats, reserve layout space, prioritize meaningful above-the-fold assets, and defer noncritical work.",
          "Font subsets, fallback metrics, and restrained weights can reduce transfer and layout instability.",
        ],
        points: [
          "Responsive asset sizing",
          "Stable dimensions",
          "Intentional font loading",
        ],
      },
      {
        id: "javascript",
        title: "Reduce unnecessary JavaScript",
        paragraphs: [
          "Prefer server-rendered content and native browser behavior where interaction does not require client state.",
          "Inspect bundle composition, split heavy boundaries, and avoid loading libraries for small effects that CSS or HTML can provide.",
        ],
        points: [
          "Server Components by default",
          "Narrow client boundaries",
          "Bundle ownership",
        ],
      },
      {
        id: "third-parties",
        title: "Budget third-party impact",
        paragraphs: [
          "Analytics, advertising, chat, embeds, consent tools, and provider SDKs can compete with product code for network and main-thread time.",
          "Require an owner and a measurable purpose for every third party, load it proportionately, and review it as requirements change.",
        ],
        points: [
          "Explicit business owner",
          "Deferred loading where safe",
          "Regular dependency review",
        ],
      },
      {
        id: "regressions",
        title: "Prevent performance regressions",
        paragraphs: [
          "Define budgets for relevant routes and assets, test representative builds, monitor field behavior, and connect regressions to release ownership.",
          "Performance is an ongoing product constraint because content, features, providers, and usage evolve.",
        ],
        points: [
          "Route-level budgets",
          "Build and field monitoring",
          "Review after meaningful change",
        ],
      },
    ],
    takeaways: [
      "Use field and lab evidence together.",
      "Rendering strategy should follow freshness and interaction needs.",
      "Native and server-rendered behavior can reduce hydration.",
      "Performance requires budgets and ongoing ownership.",
    ],
    relatedServices: [
      {
        title: "Custom Web Development",
        description: "Performance-aware modern web delivery.",
        href: "/services/web-development",
      },
      {
        title: "Maintenance & Support",
        description: "Audits, upgrades, and ongoing optimization.",
        href: "/services/maintenance-support",
      },
    ],
    relatedArticles: [
      "designing-accessible-web-applications",
      "choosing-the-right-tech-stack",
    ],
    faqs: [
      {
        question: "What does website performance include?",
        answer:
          "It includes loading, rendering, visual stability, responsiveness to input, server behavior, assets, JavaScript, third parties, and the conditions users experience.",
      },
      {
        question: "What are Core Web Vitals?",
        answer:
          "They are user-experience signals focused on loading, interaction responsiveness, and visual stability. They are useful evidence, not a complete measure of product quality.",
      },
      {
        question: "Can a performance score be guaranteed?",
        answer:
          "No. Scores vary with content, tools, devices, networks, test conditions, providers, and ongoing product changes.",
      },
      {
        question: "Should every page be statically generated?",
        answer:
          "No. Static generation is useful when freshness and personalization allow it. Other rendering strategies may better fit dynamic requirements.",
      },
      {
        question: "How do images affect performance?",
        answer:
          "Oversized files, unsuitable formats, missing dimensions, and poor loading priority can increase transfer, delay content, and cause layout movement.",
      },
      {
        question: "Why does JavaScript matter?",
        answer:
          "JavaScript must be downloaded, parsed, and executed. Excess client code can delay interaction and use significant resources on constrained devices.",
      },
      {
        question: "Are third-party scripts always harmful?",
        answer:
          "Not always, but each script has network, execution, privacy, security, and reliability costs that should be justified and measured.",
      },
      {
        question: "What is a performance budget?",
        answer:
          "It is a defined limit or threshold for relevant assets or experience signals used to identify regressions before or after release.",
      },
      {
        question: "How does accessibility relate to performance?",
        answer:
          "Both affect whether users can complete tasks. Optimizations must preserve semantics, zoom, focus, alternatives, motion preferences, and readable content.",
      },
      {
        question: "How often should performance be reviewed?",
        answer:
          "After meaningful content, feature, dependency, provider, or infrastructure changes and through ongoing monitoring appropriate to the product.",
      },
    ],
  },
  "planning-a-successful-digital-project": {
    slug: "planning-a-successful-digital-project",
    title: "Planning a Successful Digital Project Before Development Begins",
    description:
      "Learn how discovery, outcomes, users, scope, risk, architecture, content, and acceptance criteria create a clearer digital project plan.",
    category: "Project Strategy",
    difficulty: "Beginner",
    readingTime: "8 minute read",
    keywords: [
      "digital project planning",
      "software discovery",
      "project scope",
      "product strategy",
    ],
    summary:
      "Good planning reduces avoidable ambiguity by connecting a business decision with users, workflows, constraints, risks, scope, and evidence of completion.",
    introduction: [
      "A project plan is more than a feature list and target date. It is a shared model of the problem, the people affected, the boundaries of the work, and the decisions that remain uncertain.",
      "Planning does not eliminate change. It makes assumptions visible so change can be handled deliberately rather than discovered late.",
    ],
    sections: [
      {
        id: "problem-outcome",
        title: "Define the problem and useful outcome",
        paragraphs: [
          "Describe the current situation, who is affected, what evidence exists, and what decision or capability should improve.",
          "Avoid turning a preferred solution into the problem statement before alternatives and constraints are understood.",
        ],
        points: [
          "Current condition",
          "Affected users",
          "Observable useful change",
        ],
      },
      {
        id: "users-workflows",
        title: "Map users and workflows",
        paragraphs: [
          "Identify primary and supporting users, their tasks, inputs, decisions, exceptions, and handoffs.",
          "A workflow map helps reveal permissions, content, integrations, accessibility needs, and operational ownership.",
        ],
        points: [
          "User roles",
          "Happy and exception paths",
          "System and human handoffs",
        ],
      },
      {
        id: "scope-priorities",
        title: "Create a coherent first scope",
        paragraphs: [
          "Prioritize the smallest release that can complete a useful workflow and test the most important assumptions.",
          "Keep deferred items visible so exclusion is an explicit decision rather than forgotten context.",
        ],
        points: [
          "Required outcome",
          "Validation scope",
          "Documented exclusions",
        ],
      },
      {
        id: "constraints-risks",
        title: "Surface constraints and risks early",
        paragraphs: [
          "Discuss data, privacy, security, compliance, content, integrations, legacy systems, budget, availability, and decision dependencies.",
          "Rank uncertainty by consequence and cost of learning so discovery effort is proportionate.",
        ],
        points: [
          "Known constraints",
          "Critical assumptions",
          "Risk-reduction plan",
        ],
      },
      {
        id: "delivery-model",
        title: "Define collaboration and delivery",
        paragraphs: [
          "Agree on owners, review points, communication rhythm, environments, access, content responsibilities, and how scope decisions are recorded.",
          "Milestones should correspond to evidence and decisions rather than arbitrary percentages complete.",
        ],
        points: ["Decision ownership", "Review cadence", "Change process"],
      },
      {
        id: "acceptance-evolution",
        title: "Specify acceptance and what follows",
        paragraphs: [
          "Define functional behavior, accessibility, responsive conditions, performance expectations, security review, data handling, and deployment verification appropriate to the project.",
          "Launch is a transition into operation, monitoring, support, learning, and prioritized improvement—not the end of ownership.",
        ],
        points: [
          "Testable acceptance",
          "Production verification",
          "Post-launch ownership",
        ],
      },
    ],
    takeaways: [
      "State the problem before committing to a solution.",
      "Scope a complete useful workflow, not disconnected features.",
      "Make constraints, assumptions, and decision owners visible.",
      "Define acceptance and post-launch ownership during planning.",
    ],
    relatedServices: [
      {
        title: "UI/UX Design",
        description: "Research, flows, prototypes, and design systems.",
        href: "/services/ui-ux-design",
      },
      {
        title: "Custom Web Development",
        description: "Planned, accessible digital product delivery.",
        href: "/services/web-development",
      },
    ],
    relatedArticles: [
      "why-custom-software-beats-off-the-shelf-tools",
      "choosing-the-right-tech-stack",
    ],
    faqs: [
      {
        question: "What happens during project discovery?",
        answer:
          "Discovery clarifies the problem, users, workflows, evidence, constraints, dependencies, risks, options, and what a useful outcome should enable.",
      },
      {
        question: "Is a feature list enough to begin development?",
        answer:
          "Usually not. Features need context about users, states, permissions, content, data, exceptions, acceptance, and operational ownership.",
      },
      {
        question: "How should an MVP be defined?",
        answer:
          "As the smallest coherent release that completes a useful workflow and tests important assumptions—not simply the fewest possible screens.",
      },
      {
        question: "Can scope change after planning?",
        answer:
          "Yes. Planning should define how new evidence and requested changes are evaluated, documented, prioritized, and reflected in cost or delivery expectations.",
      },
      {
        question: "Who should participate in discovery?",
        answer:
          "People who understand business goals, user work, data, technical systems, policy, content, operations, and decision authority relevant to the project.",
      },
      {
        question: "How are project risks prioritized?",
        answer:
          "Consider likelihood, consequence, reversibility, uncertainty, dependency, and the cost of learning or mitigating the risk.",
      },
      {
        question: "When should technology be chosen?",
        answer:
          "After enough product and operating context is known to compare credible options, with targeted proofs for high-risk technical assumptions.",
      },
      {
        question: "What are acceptance criteria?",
        answer:
          "Specific, testable conditions describing expected behavior and quality across relevant functional, accessibility, responsive, performance, security, and operational concerns.",
      },
      {
        question: "Does planning guarantee a fixed timeline?",
        answer:
          "No. It improves visibility, but delivery still depends on scope, decisions, access, content, technical findings, change, and other project-specific factors.",
      },
      {
        question: "What should be planned for after launch?",
        answer:
          "Production verification, monitoring, support, incident ownership, documentation, maintenance, user feedback, measurement, and responsible improvement.",
      },
    ],
  },
} as const satisfies Record<BlogArticleSlug, BlogArticle>;

function getBlogArticle(slug: BlogArticleSlug): BlogArticle {
  return articles[slug];
}

function getBlogArticleMetadata(slug: BlogArticleSlug): Metadata {
  const article = getBlogArticle(slug);
  const canonical = `/blog/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    keywords: [...article.keywords],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.title,
      description: article.description,
      siteName: company.name,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function ArticlePage({ article }: { readonly article: BlogArticle }) {
  const pageUrl = new URL(`/blog/${article.slug}`, company.url).toString();
  const articleId = `${pageUrl}#article`;
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": articleId,
    headline: article.title,
    description: article.description,
    url: pageUrl,
    articleSection: article.category,
    keywords: article.keywords.join(", "),
    wordCount: article.sections.reduce(
      (count, section) =>
        count + section.paragraphs.join(" ").split(/\s+/u).length,
      article.introduction.join(" ").split(/\s+/u).length,
    ),
    author: { "@type": "Organization", name: company.name, url: company.url },
    publisher: {
      "@type": "Organization",
      name: company.name,
      url: company.url,
    },
    isPartOf: {
      "@type": "Blog",
      name: "Ayeb Solutions Insights & Resources",
      url: new URL("/blog", company.url).toString(),
    },
  } as const;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: article.title,
    description: article.description,
    url: pageUrl,
    mainEntity: { "@id": articleId },
    isPartOf: { "@type": "WebSite", name: company.name, url: company.url },
  } as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } as const;

  return (
    <>
      <article>
        <header
          className={cn(
            "relative overflow-hidden border-b py-16 sm:py-20 lg:py-28",
            styles.hero,
          )}
        >
          <Container className="relative z-10 max-w-[100rem]">
            <SiteBreadcrumbs
              items={[
                { label: "Insights", href: "/blog" },
                { label: article.title, href: `/blog/${article.slug}` },
              ]}
            />
            <div className="mt-12 grid min-w-0 gap-12 lg:grid-cols-[1fr_20rem] lg:items-end lg:gap-20">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Badge>{article.category}</Badge>
                  <Badge variant="outline">Ayeb editorial</Badge>
                </div>
                <h1 className="mt-7 text-balance break-words text-[clamp(2.6rem,7vw,6.25rem)] font-bold leading-[0.96] tracking-tight">
                  {article.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  {article.description}
                </p>
              </div>
              <dl className={styles.heroMeta}>
                <div>
                  <dt>
                    <Clock3 className="size-4" aria-hidden="true" />
                    Reading time
                  </dt>
                  <dd>{article.readingTime}</dd>
                </div>
                <div>
                  <dt>
                    <Layers3 className="size-4" aria-hidden="true" />
                    Difficulty
                  </dt>
                  <dd>{article.difficulty}</dd>
                </div>
                <div>
                  <dt>
                    <FileText className="size-4" aria-hidden="true" />
                    Status
                  </dt>
                  <dd>Knowledge article</dd>
                </div>
              </dl>
            </div>
          </Container>
        </header>

        <section
          aria-labelledby="introduction-heading"
          className="border-b py-16 sm:py-20"
        >
          <Container size="content">
            <Eyebrow className="mb-4 text-xs">Introduction</Eyebrow>
            <h2
              id="introduction-heading"
              className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
            >
              The decision behind the topic
            </h2>
            <p className={styles.summary}>{article.summary}</p>
            <div className={styles.prose}>
              {article.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>

        <div className="border-b py-16 sm:py-20 lg:py-24">
          <Container className="max-w-[100rem]">
            <div className="grid min-w-0 gap-14 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
              <aside className="min-w-0">
                <nav
                  aria-labelledby="contents-heading"
                  className={styles.contents}
                >
                  <Eyebrow className="mb-3 text-xs">On this page</Eyebrow>
                  <h2 id="contents-heading" className="text-xl font-bold">
                    Table of contents
                  </h2>
                  <ol className="mt-6 space-y-1">
                    {article.sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          className="focus-ring flex gap-3 rounded-lg px-2 py-2.5 text-sm text-muted-foreground hover:text-foreground"
                          href={`#${section.id}`}
                        >
                          <span className="font-mono text-[0.6rem]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
              <div className="min-w-0 divide-y">
                {article.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-heading`}
                    className="scroll-mt-28 py-12 first:pt-0"
                  >
                    <span className="font-mono text-[0.62rem] text-muted-foreground">
                      SECTION {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2
                      id={`${section.id}-heading`}
                      className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
                    >
                      {section.title}
                    </h2>
                    <div className={cn("mt-6", styles.prose)}>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.points ? (
                      <ul className={styles.pointList}>
                        {section.points.map((point) => (
                          <li key={point}>
                            <CheckCircle2
                              className="size-4 shrink-0"
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>
          </Container>
        </div>

        <section
          aria-labelledby="takeaways-heading"
          className={cn(
            "border-b py-20 text-primary-foreground sm:py-24",
            styles.takeaways,
          )}
        >
          <Container className="max-w-[100rem]">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <Eyebrow className="mb-4 text-xs text-primary-foreground/55">
                  Key takeaways
                </Eyebrow>
                <h2
                  id="takeaways-heading"
                  className="text-balance text-headline font-bold"
                >
                  What to carry into the next decision.
                </h2>
              </div>
              <ol className="grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2">
                {article.takeaways.map((takeaway, index) => (
                  <li key={takeaway} className="bg-primary p-6">
                    <span className="font-mono text-[0.58rem] text-primary-foreground/45">
                      0{index + 1}
                    </span>
                    <p className="mt-5 leading-7 text-primary-foreground/75">
                      {takeaway}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="related-services-heading"
          className="border-b py-20 sm:py-24"
        >
          <Container className="max-w-[100rem]">
            <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <Eyebrow className="mb-4 text-xs">Related services</Eyebrow>
                <h2
                  id="related-services-heading"
                  className="text-balance text-headline font-bold"
                >
                  Apply the thinking to a real workflow.
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  Educational guidance becomes useful project direction only
                  after discovery of actual users, constraints, systems, and
                  risks.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {article.relatedServices.map((service) => (
                  <section key={service.href} className={styles.relatedCard}>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {service.description}
                    </p>
                    <Button asChild variant="outline" className="mt-7">
                      <Link href={service.href}>
                        Explore {service.title}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </section>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="related-articles-heading"
          className="border-b bg-muted/[0.12] py-20 sm:py-24"
        >
          <Container className="max-w-[100rem]">
            <Eyebrow className="mb-4 text-xs">Continue learning</Eyebrow>
            <h2
              id="related-articles-heading"
              className="text-balance text-headline font-bold"
            >
              Related articles
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {article.relatedArticles.map((slug) => {
                const related = getBlogArticle(slug);
                return (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    className={cn(
                      "focus-ring group rounded-2xl border bg-card p-6",
                      styles.relatedArticle,
                    )}
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {related.category} · {related.readingTime}
                    </span>
                    <h3 className="mt-4 text-balance text-2xl font-bold tracking-tight">
                      {related.title}
                    </h3>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                      Read article{" "}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="article-faq-heading"
          className="border-b py-20 sm:py-24"
        >
          <Container size="content">
            <Eyebrow className="mb-4 text-xs">Article FAQ</Eyebrow>
            <h2
              id="article-faq-heading"
              className="text-balance text-headline font-bold"
            >
              Questions that often follow this topic.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              These answers provide general educational context.
              Project-specific recommendations require discovery and appropriate
              professional review.
            </p>
            <div className="mt-12 space-y-3">
              {article.faqs.map(({ question, answer }, index) => (
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
      </article>

      <CTALayout
        eyebrow={
          <Eyebrow className="mb-3 text-xs text-primary-foreground/55">
            From reading to discovery
          </Eyebrow>
        }
        title="Want to apply this thinking to your business context?"
        description={
          <p className="max-w-2xl leading-relaxed text-primary-foreground/70">
            Share the workflow, users, constraints, and decision you are working
            through. We can help define an appropriate discovery path without
            assuming the answer in advance.
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
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>
        }
        className={styles.finalCta}
      />
      <StructuredData data={blogPostingSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={faqSchema} />
    </>
  );
}

export {
  ArticlePage as BlogArticlePage,
  articleSlugs,
  getBlogArticle,
  getBlogArticleMetadata,
};
export type { BlogArticle, BlogArticleSlug };
