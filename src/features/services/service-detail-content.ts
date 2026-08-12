import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  BarChart3,
  Bot,
  Boxes,
  Braces,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  Layers3,
  LockKeyhole,
  Palette,
  PlugZap,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

export interface ServiceDetailContent {
  readonly badge: string;
  readonly overview: string;
  readonly benefits: readonly ContentItem[];
  readonly idealCustomers: readonly ContentItem[];
  readonly process: readonly ContentItem[];
  readonly technologies: readonly TechnologyItem[];
  readonly features: readonly ContentItem[];
  readonly deliverables: readonly string[];
  readonly faqs: readonly FaqItem[];
  readonly illustrationLabels: readonly [string, string, string];
}

interface ContentItem {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

interface TechnologyItem {
  readonly name: string;
  readonly purpose: string;
}

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

const process = [
  [
    "Discovery",
    "Clarify goals, users, constraints, current systems, evidence, and decision ownership.",
    Search,
  ],
  [
    "Planning",
    "Define scope, priorities, dependencies, milestones, and the smallest responsible release.",
    Workflow,
  ],
  [
    "Architecture",
    "Map data, integrations, security boundaries, environments, and long-term ownership.",
    Layers3,
  ],
  [
    "Development",
    "Build through visible, reviewable increments with typed implementation and clear states.",
    Code2,
  ],
  [
    "Testing",
    "Review behavior, accessibility, performance, security considerations, and failure paths.",
    CheckCircle2,
  ],
  [
    "Launch",
    "Deploy through controlled environments and verify production behavior and handoff.",
    Cloud,
  ],
  [
    "Optimization",
    "Use production context to plan maintenance, monitoring, and responsible improvements.",
    Gauge,
  ],
] as const satisfies readonly (readonly [string, string, LucideIcon])[];

const mappedProcess = process.map(([title, description, icon]) => ({
  title,
  description,
  icon,
}));

function technologyItems(
  items: readonly (readonly [name: string, purpose: string])[],
): readonly TechnologyItem[] {
  return items.map(([name, purpose]) => ({ name, purpose }));
}

export const serviceDetailContent: Readonly<
  Record<string, ServiceDetailContent>
> = {
  "web-development": {
    badge: "Web experiences built around business goals",
    overview:
      "Custom web development turns business requirements into a fast, accessible, maintainable digital experience. The work can range from a focused marketing site to a role-aware application, while preserving content clarity, technical ownership, and production quality.",
    benefits: [
      {
        title: "Performance",
        description:
          "Delivery, rendering, assets, and interaction are shaped around a responsive real-user experience.",
        icon: Gauge,
      },
      {
        title: "Accessible by default",
        description:
          "Semantic structure, keyboard use, focus, contrast, and assistive technology inform implementation.",
        icon: Accessibility,
      },
      {
        title: "Search foundations",
        description:
          "Metadata, structure, content hierarchy, canonical routes, and technical discoverability are considered early.",
        icon: Search,
      },
      {
        title: "Maintainable architecture",
        description:
          "Typed components and clear boundaries make future updates easier to understand and own.",
        icon: Layers3,
      },
    ],
    idealCustomers: [
      {
        title: "Growing businesses",
        description:
          "Teams whose current website no longer reflects their offer, operations, or customer journey.",
        icon: BarChart3,
      },
      {
        title: "Product teams",
        description:
          "Organizations building portals, dashboards, and web applications with real workflow needs.",
        icon: Users,
      },
      {
        title: "Established companies",
        description:
          "Businesses modernizing a high-value web property without losing useful content or context.",
        icon: RefreshCw,
      },
    ],
    process: mappedProcess,
    technologies: technologyItems([
      ["Next.js", "Application framework"],
      ["React", "Interface composition"],
      ["TypeScript", "Type-safe implementation"],
      ["Node.js", "Server functionality"],
      ["PostgreSQL", "Relational data"],
      ["Cloudinary", "Optimized media"],
      ["Vercel", "Web deployment"],
      ["Tailwind CSS", "Design-system styling"],
    ]),
    features: [
      {
        title: "Responsive interfaces",
        description:
          "Layouts and interactions adapt from compact mobile screens through wide displays.",
        icon: Layers3,
      },
      {
        title: "SEO-ready structure",
        description:
          "Semantic content, metadata, canonical URLs, and structured data establish a sound baseline.",
        icon: Search,
      },
      {
        title: "CMS integration",
        description:
          "Content ownership can be connected to an appropriate editing workflow when required.",
        icon: Braces,
      },
      {
        title: "Analytics readiness",
        description:
          "Measurement can be prepared around consent, useful events, and business questions.",
        icon: BarChart3,
      },
      {
        title: "Secure forms",
        description:
          "Validation, abuse controls, safe persistence, and delivery failure handling protect lead capture.",
        icon: ShieldCheck,
      },
      {
        title: "API integration",
        description:
          "Web experiences can connect to approved payment, CRM, content, and operational systems.",
        icon: PlugZap,
      },
    ],
    deliverables: [
      "Production-ready source code",
      "Responsive interface implementation",
      "Accessibility and performance review",
      "Metadata and SEO foundations",
      "Deployment configuration and verification",
      "Technical documentation and handoff",
      "Agreed analytics or integration setup",
      "Optional maintenance plan",
    ],
    faqs: [
      {
        question: "Why choose custom web development instead of a template?",
        answer:
          "Custom development is useful when brand, content, workflow, performance, integration, or ownership requirements exceed what a standard template supports responsibly. Discovery should confirm whether that additional investment is justified.",
      },
      {
        question: "Can you redesign an existing website?",
        answer:
          "Yes, after reviewing the current content, technology, analytics evidence, accessibility, performance, business priorities, and migration risks. Useful foundations can be preserved.",
      },
      {
        question: "Will the website work across mobile devices?",
        answer:
          "Responsive behavior is included in the implementation approach. Specific browser and device support should be agreed from audience needs and project constraints.",
      },
      {
        question: "Can the website include a CMS?",
        answer:
          "Yes, when editorial ownership requires it. The CMS choice depends on content structure, roles, workflows, integrations, and maintenance expectations.",
      },
      {
        question: "Is SEO included?",
        answer:
          "Technical and on-page foundations can be included, such as semantic structure, metadata, canonical URLs, structured data, performance, and crawlability. Search ranking outcomes are not guaranteed.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Production verification, documentation, monitoring, maintenance, security updates, and planned improvements can be included according to the agreed support scope.",
      },
    ],
    illustrationLabels: ["Content", "Experience", "Growth"],
  },
  "ai-automation": {
    badge: "Human-aware automation for real operations",
    overview:
      "AI automation combines language models, deterministic rules, integrations, and human approval to support work that requires interpretation. A responsible system makes confidence, exceptions, permissions, and escalation visible rather than treating AI output as automatically correct.",
    benefits: [
      {
        title: "Less repetitive work",
        description:
          "Move appropriate classification, extraction, drafting, and routing into reviewable flows.",
        icon: RefreshCw,
      },
      {
        title: "Consistent handling",
        description:
          "Apply shared instructions, validation, and escalation rules across recurring work.",
        icon: Workflow,
      },
      {
        title: "Connected systems",
        description:
          "Move approved context between CRM, email, support, documents, and internal tools.",
        icon: PlugZap,
      },
      {
        title: "Human oversight",
        description:
          "Confidence thresholds and approval paths preserve accountability for consequential decisions.",
        icon: Users,
      },
    ],
    idealCustomers: [
      {
        title: "Operations teams",
        description:
          "Teams processing repetitive documents, requests, updates, or coordination tasks.",
        icon: Workflow,
      },
      {
        title: "Sales teams",
        description:
          "Organizations needing lead enrichment, qualification support, follow-up drafting, and CRM routing.",
        icon: BarChart3,
      },
      {
        title: "Support teams",
        description:
          "Businesses organizing knowledge, triaging requests, and preparing reviewable responses.",
        icon: Bot,
      },
    ],
    process: mappedProcess,
    technologies: technologyItems([
      ["OpenAI", "Language-model capabilities"],
      ["Node.js", "Workflow orchestration"],
      ["TypeScript", "Typed automation logic"],
      ["PostgreSQL", "Durable business data"],
      ["Supabase", "Managed data and auth"],
      ["Webhooks", "Event-driven connections"],
      ["Docker", "Portable execution"],
      ["Next.js", "Human review interfaces"],
    ]),
    features: [
      {
        title: "AI agents",
        description:
          "Bounded assistants can use approved tools and instructions for a defined operational role.",
        icon: Bot,
      },
      {
        title: "Workflow automation",
        description:
          "Triggers, rules, steps, approvals, and exception paths make automation explicit.",
        icon: Workflow,
      },
      {
        title: "CRM automation",
        description:
          "Lead and customer context can move through validated assignment and follow-up stages.",
        icon: Users,
      },
      {
        title: "Data processing",
        description:
          "Documents and messages can be classified, extracted, summarized, or routed for review.",
        icon: Database,
      },
      {
        title: "System integrations",
        description:
          "Approved APIs and webhooks connect the workflow to existing business tools.",
        icon: PlugZap,
      },
      {
        title: "Auditability",
        description:
          "Inputs, outputs, decisions, exceptions, and human actions can remain reviewable.",
        icon: ShieldCheck,
      },
    ],
    deliverables: [
      "Workflow and risk map",
      "Automation architecture",
      "Configured AI and rule logic",
      "Human review interface where required",
      "Approved system integrations",
      "Validation and exception paths",
      "Deployment and monitoring setup",
      "Technical and operational documentation",
    ],
    faqs: [
      {
        question:
          "What is the difference between AI and traditional automation?",
        answer:
          "Traditional automation follows explicit rules. AI can support interpretation of less structured content. Reliable systems often combine both and use human review where uncertainty or consequence requires it.",
      },
      {
        question: "Will AI replace our team?",
        answer:
          "The focus is supporting people by reducing appropriate repetitive work and improving access to context. Roles, accountability, and approval should remain clear.",
      },
      {
        question: "Can automation connect to our CRM and email?",
        answer:
          "Often, when APIs, permissions, data quality, and provider constraints allow it. Feasibility is reviewed before an integration becomes part of scope.",
      },
      {
        question: "How are incorrect AI outputs handled?",
        answer:
          "The design can include validation, confidence thresholds, human approval, exception queues, source context, and audit records according to risk.",
      },
      {
        question: "Is our data used to train public models?",
        answer:
          "Data handling depends on the selected providers, configurations, and agreements. Privacy and retention requirements should be reviewed before implementation.",
      },
      {
        question: "How do we identify a useful first automation?",
        answer:
          "Start with a frequent, well-understood workflow where inputs, ownership, exceptions, and desired outputs can be mapped. High consequence and ambiguous processes may need more controls.",
      },
    ],
    illustrationLabels: ["Input", "AI + Rules", "Human Review"],
  },
  "custom-saas": {
    badge: "Purpose-built software products",
    overview:
      "SaaS development turns a validated product or operational model into a maintainable platform. The architecture brings together identity, roles, workflows, subscriptions, reporting, integrations, and administration without assuming every product needs the same complexity.",
    benefits: [
      {
        title: "Product ownership",
        description:
          "The platform is shaped around the product model instead of constrained by generic software.",
        icon: Layers3,
      },
      {
        title: "Scalable foundations",
        description:
          "Roles, tenancy, data, and operations are structured for realistic future change.",
        icon: Boxes,
      },
      {
        title: "Secure access",
        description:
          "Authentication and authorization reflect product roles and sensitive boundaries.",
        icon: LockKeyhole,
      },
      {
        title: "Maintainability",
        description:
          "Typed code, documentation, and repeatable deployment support long-term ownership.",
        icon: Wrench,
      },
    ],
    idealCustomers: [
      {
        title: "Product founders",
        description:
          "Teams moving from validated concept toward a focused, production-ready first product.",
        icon: Sparkles,
      },
      {
        title: "Growing SaaS teams",
        description:
          "Products that need stronger architecture, operational tools, roles, or integrations.",
        icon: BarChart3,
      },
      {
        title: "Internal product teams",
        description:
          "Organizations turning a repeatable internal workflow into a managed platform.",
        icon: Users,
      },
    ],
    process: mappedProcess,
    technologies: technologyItems([
      ["Next.js", "Product framework"],
      ["React", "Interactive interfaces"],
      ["TypeScript", "Type-safe product logic"],
      ["Node.js", "Server workflows"],
      ["PostgreSQL", "Relational product data"],
      ["Supabase", "Managed data and auth"],
      ["Docker", "Portable environments"],
      ["Vercel", "Web deployment"],
    ]),
    features: [
      {
        title: "Authentication",
        description:
          "Secure identity flows can support invitation, recovery, and account lifecycle needs.",
        icon: LockKeyhole,
      },
      {
        title: "Role management",
        description:
          "Permissions align product capabilities with customer, team, and administrative roles.",
        icon: Users,
      },
      {
        title: "Dashboards",
        description:
          "Role-specific views make tasks, state, and relevant product information visible.",
        icon: BarChart3,
      },
      {
        title: "Subscription workflows",
        description:
          "Plans, entitlements, billing events, and account state can be integrated where needed.",
        icon: RefreshCw,
      },
      {
        title: "Reporting",
        description:
          "Useful operational and customer reporting can be designed around real decisions.",
        icon: Gauge,
      },
      {
        title: "Integrations",
        description:
          "Approved APIs connect the product to payments, communication, media, and operations.",
        icon: PlugZap,
      },
    ],
    deliverables: [
      "Product and architecture plan",
      "Responsive application interface",
      "Frontend and backend source code",
      "Database and access model",
      "Approved integrations",
      "Admin and operational tooling",
      "Deployment environments and verification",
      "Documentation and support options",
    ],
    faqs: [
      {
        question: "Can you build an MVP?",
        answer:
          "Yes. A responsible MVP focuses on the smallest coherent product that tests important assumptions without creating avoidable security, data, or ownership debt.",
      },
      {
        question: "Does every SaaS product need multi-tenancy?",
        answer:
          "No. Tenancy should follow the product model, isolation needs, roles, and expected customer structure rather than being included automatically.",
      },
      {
        question: "Can subscriptions and payments be included?",
        answer:
          "Yes, when the product requires them and the selected provider supports the business, region, billing model, and compliance context.",
      },
      {
        question: "How do you plan for scale?",
        answer:
          "Architecture considers realistic usage, data boundaries, expensive operations, caching, deployment, monitoring, and likely change without adding premature complexity.",
      },
      {
        question: "Who owns the source code?",
        answer:
          "Ownership and licensing terms should be stated explicitly in the project agreement. The default assumption should never be left ambiguous.",
      },
      {
        question: "Can an existing SaaS product be improved?",
        answer:
          "Potentially, after reviewing architecture, code, data, environments, usage evidence, constraints, and current operational risks.",
      },
    ],
    illustrationLabels: ["Users", "Product Core", "Operations"],
  },
  "ui-ux-design": {
    badge: "Interfaces shaped around users and decisions",
    overview:
      "UI/UX design turns business requirements and user needs into clear flows, responsive interfaces, and reusable patterns. The process reduces ambiguity before development while considering accessibility, content, performance, and how the experience will be maintained.",
    benefits: [
      {
        title: "Clearer journeys",
        description:
          "Information and actions follow user goals instead of internal organizational complexity.",
        icon: Workflow,
      },
      {
        title: "Consistent systems",
        description:
          "Reusable components and rules reduce visual and interaction drift across a product.",
        icon: Layers3,
      },
      {
        title: "Accessibility",
        description:
          "Keyboard use, focus, contrast, semantics, states, and content are considered during design.",
        icon: Accessibility,
      },
      {
        title: "Development clarity",
        description:
          "Detailed states, behavior, responsive rules, and handoff reduce avoidable implementation assumptions.",
        icon: Code2,
      },
    ],
    idealCustomers: [
      {
        title: "Product teams",
        description:
          "Teams planning a new application, feature, dashboard, or customer journey before development.",
        icon: Users,
      },
      {
        title: "Growing companies",
        description:
          "Businesses whose product has accumulated inconsistent flows, patterns, and visual decisions.",
        icon: BarChart3,
      },
      {
        title: "Internal teams",
        description:
          "Organizations improving complex operational interfaces used repeatedly by staff.",
        icon: Workflow,
      },
    ],
    process: mappedProcess,
    technologies: technologyItems([
      ["Figma", "Interface design"],
      ["FigJam", "Flows and workshops"],
      ["Storybook", "Component documentation"],
      ["React", "Implementation-aware patterns"],
      ["Next.js", "Web experience context"],
      ["Tailwind CSS", "Token-driven styling"],
      ["TypeScript", "Component contracts"],
      ["Framer Motion", "Motion prototyping"],
    ]),
    features: [
      {
        title: "User flows",
        description:
          "Map decisions, tasks, alternate paths, and failure states before polishing screens.",
        icon: Workflow,
      },
      {
        title: "Wireframes",
        description:
          "Test hierarchy, content, and interaction structure at the right level of fidelity.",
        icon: Braces,
      },
      {
        title: "High-fidelity UI",
        description:
          "Create responsive visual systems with deliberate type, spacing, color, and state treatment.",
        icon: Palette,
      },
      {
        title: "Interactive prototypes",
        description:
          "Communicate key transitions, states, and flows before implementation.",
        icon: Sparkles,
      },
      {
        title: "Design systems",
        description:
          "Reusable tokens, components, guidance, and patterns support consistent product change.",
        icon: Layers3,
      },
      {
        title: "Accessibility review",
        description:
          "Design decisions are checked for perceivability, operation, comprehension, and resilience.",
        icon: Accessibility,
      },
    ],
    deliverables: [
      "Discovery and experience brief",
      "User flows and information architecture",
      "Wireframes",
      "Responsive high-fidelity designs",
      "Interactive prototype for key journeys",
      "Component and design-system guidance",
      "Accessibility annotations",
      "Development handoff and review",
    ],
    faqs: [
      {
        question: "What is the difference between UI and UX?",
        answer:
          "UX considers the overall task, information, behavior, and usability. UI focuses on the visual and interactive expression. Effective product design treats them as connected concerns.",
      },
      {
        question: "Do you conduct user research?",
        answer:
          "Research can be included when access, scope, timing, and the decision being investigated are clear. Existing evidence and stakeholder knowledge can also inform discovery.",
      },
      {
        question: "Will designs be responsive?",
        answer:
          "Responsive behavior, hierarchy, navigation, and component adaptation are considered across agreed viewport needs rather than treating mobile as a later resize.",
      },
      {
        question: "Can you improve an existing design system?",
        answer:
          "Yes, after reviewing current tokens, components, accessibility, usage, implementation alignment, governance, and sources of inconsistency.",
      },
      {
        question: "Do prototypes include every screen?",
        answer:
          "Not necessarily. Prototypes should focus on the journeys and interactions where behavior needs validation or clear communication.",
      },
      {
        question: "Can you work with our developers?",
        answer:
          "Yes. Handoff is stronger when design and engineering share component constraints, responsive rules, state behavior, accessibility needs, and review checkpoints.",
      },
    ],
    illustrationLabels: ["Research", "System", "Experience"],
  },
  ecommerce: {
    badge: "Commerce experiences connected to operations",
    overview:
      "E-commerce development connects product discovery, content, checkout, payment, inventory, fulfillment, and customer service into one maintainable experience. The right architecture reflects the catalogue, operational model, market, and integrations rather than assuming every store works alike.",
    benefits: [
      {
        title: "Clear buying journeys",
        description:
          "Navigation, product information, cart, checkout, and account flows reduce avoidable friction.",
        icon: ShoppingCart,
      },
      {
        title: "Operational connection",
        description:
          "Inventory, orders, payments, fulfillment, and customer context can move between approved systems.",
        icon: PlugZap,
      },
      {
        title: "Performance",
        description:
          "Media, rendering, caching, and interaction are designed for responsive browsing and purchasing.",
        icon: Gauge,
      },
      {
        title: "Maintainability",
        description:
          "Commerce logic and presentation use clear boundaries that support catalogue and workflow changes.",
        icon: Wrench,
      },
    ],
    idealCustomers: [
      {
        title: "Growing retailers",
        description:
          "Brands that need more control over experience, content, integration, and performance.",
        icon: BarChart3,
      },
      {
        title: "Specialized sellers",
        description:
          "Businesses with product, pricing, configuration, or fulfillment needs beyond a basic store.",
        icon: ShoppingCart,
      },
      {
        title: "Established commerce teams",
        description:
          "Organizations modernizing a storefront while preserving valuable catalogue and operational systems.",
        icon: RefreshCw,
      },
    ],
    process: mappedProcess,
    technologies: technologyItems([
      ["Next.js", "Storefront framework"],
      ["React", "Interactive commerce UI"],
      ["TypeScript", "Typed commerce logic"],
      ["Stripe", "Payment workflows"],
      ["PostgreSQL", "Operational data"],
      ["Cloudinary", "Product media"],
      ["Node.js", "Integrations"],
      ["Vercel", "Web deployment"],
    ]),
    features: [
      {
        title: "Product catalogues",
        description:
          "Structure products, variants, content, categories, availability, and discovery around the offer.",
        icon: Boxes,
      },
      {
        title: "Checkout flows",
        description:
          "Create clear cart, customer, delivery, payment, confirmation, and failure states.",
        icon: ShoppingCart,
      },
      {
        title: "Payment integration",
        description:
          "Connect an appropriate provider with secure server-side handling and event verification.",
        icon: LockKeyhole,
      },
      {
        title: "Inventory workflows",
        description:
          "Synchronize availability where system APIs, ownership, and data quality support it.",
        icon: RefreshCw,
      },
      {
        title: "Order management",
        description:
          "Make status, fulfillment, exceptions, and customer communication visible to the right roles.",
        icon: Workflow,
      },
      {
        title: "Analytics readiness",
        description:
          "Prepare measurement around consent, funnel questions, catalogue behavior, and operations.",
        icon: BarChart3,
      },
    ],
    deliverables: [
      "Commerce architecture and journey map",
      "Responsive storefront",
      "Catalogue and content implementation",
      "Cart and checkout flows",
      "Approved payment and operational integrations",
      "Order-management context",
      "Deployment and production verification",
      "Documentation and support options",
    ],
    faqs: [
      {
        question: "Can you build a custom storefront?",
        answer:
          "Yes, when experience, catalogue, performance, content, or integration needs justify custom implementation. The commerce backend can be selected separately where appropriate.",
      },
      {
        question: "Which payment gateway do you use?",
        answer:
          "The choice depends on country, currency, business model, risk, payout, subscription, and integration requirements. Provider availability must be verified.",
      },
      {
        question: "Can inventory connect to an existing system?",
        answer:
          "Potentially, when the inventory source has suitable APIs, permissions, reliable identifiers, and an agreed system of record.",
      },
      {
        question: "How do you approach checkout security?",
        answer:
          "Sensitive payment data should be handled through approved provider flows. Server-side validation, signed events, authorization, secrets, and error handling remain important.",
      },
      {
        question: "Can the store support international customers?",
        answer:
          "Internationalization may involve currency, tax, delivery, content, legal, payment, and locale requirements. These need explicit planning.",
      },
      {
        question: "Is analytics included?",
        answer:
          "Analytics readiness can be included around consent and useful business questions. Tracking scope and providers should be agreed rather than added indiscriminately.",
      },
    ],
    illustrationLabels: ["Catalogue", "Checkout", "Operations"],
  },
  "custom-software": {
    badge: "Software designed around real workflows",
    overview:
      "Custom software replaces fragmented manual work or ill-fitting generic tools with a system shaped around actual users, rules, data, and integrations. The value comes from fit, ownership, and maintainability—not custom code for its own sake.",
    benefits: [
      {
        title: "Workflow fit",
        description:
          "The product reflects the roles, decisions, exceptions, and information your operation requires.",
        icon: Workflow,
      },
      {
        title: "Connected data",
        description:
          "Approved systems can share validated information without uncontrolled duplication.",
        icon: Database,
      },
      {
        title: "Scalable architecture",
        description:
          "Boundaries support realistic operational change without unnecessary initial complexity.",
        icon: Layers3,
      },
      {
        title: "Long-term ownership",
        description:
          "Source, documentation, deployment, and support expectations are made explicit.",
        icon: Wrench,
      },
    ],
    idealCustomers: [
      {
        title: "Operational teams",
        description:
          "Organizations managing critical work across spreadsheets, inboxes, and disconnected applications.",
        icon: Workflow,
      },
      {
        title: "Growing companies",
        description:
          "Businesses whose current tools cannot represent changing roles, rules, data, or reporting.",
        icon: BarChart3,
      },
      {
        title: "Enterprise teams",
        description:
          "Departments that need controlled internal platforms and integration with established systems.",
        icon: ShieldCheck,
      },
    ],
    process: mappedProcess,
    technologies: technologyItems([
      ["React", "Application interfaces"],
      ["Next.js", "Web application framework"],
      ["TypeScript", "Typed business rules"],
      ["Node.js", "Server workflows"],
      ["PostgreSQL", "Relational operational data"],
      ["Supabase", "Managed data and auth"],
      ["Docker", "Portable environments"],
      ["OpenAI", "Appropriate AI assistance"],
    ]),
    features: [
      {
        title: "Business workflows",
        description:
          "Represent real states, assignments, approvals, exceptions, and completion criteria.",
        icon: Workflow,
      },
      {
        title: "Role-based access",
        description:
          "Capabilities and information align with organizational responsibilities.",
        icon: Users,
      },
      {
        title: "Internal dashboards",
        description:
          "Make tasks, status, operational context, and reporting easier to act upon.",
        icon: BarChart3,
      },
      {
        title: "API integrations",
        description:
          "Connect approved third-party and internal systems through explicit boundaries.",
        icon: PlugZap,
      },
      {
        title: "Automation",
        description:
          "Reduce appropriate repetitive steps while preserving validation and human approval.",
        icon: RefreshCw,
      },
      {
        title: "Audit history",
        description:
          "Important status, ownership, and action changes can remain reviewable.",
        icon: ShieldCheck,
      },
    ],
    deliverables: [
      "Workflow and requirements map",
      "Technical architecture",
      "Responsive application interface",
      "Frontend and backend source code",
      "Database and permission model",
      "Approved integrations and automation",
      "Deployment and production verification",
      "Documentation, training, and support options",
    ],
    faqs: [
      {
        question: "When is custom software appropriate?",
        answer:
          "It is appropriate when a valuable workflow cannot be supported responsibly by existing tools or configuration, and the expected ownership justifies development and maintenance.",
      },
      {
        question: "Can custom software replace spreadsheets?",
        answer:
          "Often, but the spreadsheet may contain important business knowledge. Discovery should understand formulas, exceptions, ownership, and downstream processes before replacement.",
      },
      {
        question: "Can it integrate with existing systems?",
        answer:
          "Potentially, when APIs, permissions, data quality, security, and ownership allow it. Integration constraints should be assessed early.",
      },
      {
        question: "How is access controlled?",
        answer:
          "Authentication, roles, permissions, data boundaries, and audit requirements are designed around the users and sensitivity of the system.",
      },
      {
        question: "Can the software evolve after launch?",
        answer:
          "Yes, when architecture, documentation, testing, and deployment make change manageable. Future work should still be prioritized against evidence and business value.",
      },
      {
        question: "Do you provide training and support?",
        answer:
          "Training, documentation, maintenance, monitoring, and improvement can be included according to the agreed delivery and support model.",
      },
    ],
    illustrationLabels: ["Workflow", "Business Logic", "Ownership"],
  },
};
