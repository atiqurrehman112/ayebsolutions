import {
  Blocks,
  Bot,
  Building2,
  ChartNoAxesCombined,
  CircleHelp,
  CodeXml,
  Cpu,
  Globe2,
  Handshake,
  Layers3,
  Lightbulb,
  Network,
  Newspaper,
  Palette,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import type {
  FeaturedNavigationItem,
  NavigationSection,
  ShellLink,
} from "@/types/global-settings";

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly ShellLink[];

export const solutionNavigation = [
  {
    label: "AI Agents",
    href: "/solutions#ai-agents",
    description: "Purpose-built autonomous assistants.",
    icon: Cpu,
  },
  {
    label: "Workflow Automation",
    href: "/solutions#workflow-automation",
    description: "Connect teams, tools, and data.",
    icon: Workflow,
  },
  {
    label: "CRM Solutions",
    href: "/solutions#crm-solutions",
    description: "Customer operations without friction.",
    icon: Network,
  },
  {
    label: "Digital Transformation",
    href: "/solutions#digital-transformation",
    description: "Modernize systems with confidence.",
    icon: Rocket,
  },
  {
    label: "For Startups",
    href: "/solutions#startups",
    description: "Launch and scale with a focused product team.",
    icon: Lightbulb,
  },
  {
    label: "For Enterprises",
    href: "/solutions#enterprises",
    description: "Secure modernization for complex operations.",
    icon: ShieldCheck,
  },
  {
    label: "For Local Businesses",
    href: "/solutions#local-businesses",
    description: "Digital systems that create practical growth.",
    icon: Globe2,
  },
  {
    label: "Technology Partnerships",
    href: "/solutions#technology-partnerships",
    description: "Flexible delivery for agencies and product teams.",
    icon: Handshake,
  },
] as const satisfies readonly ShellLink[];

export const megaMenuSections = [
  {
    title: "Services",
    links: [
      {
        label: "Web Development",
        href: "/services/web-development",
        description: "Fast, scalable digital experiences.",
        icon: CodeXml,
      },
      {
        label: "AI Automation",
        href: "/services/ai-automation",
        description: "Intelligent workflows that save time.",
        icon: Bot,
      },
      {
        label: "SaaS Development",
        href: "/services/saas-development",
        description: "Production-ready platforms and products.",
        icon: Layers3,
      },
      {
        label: "UI/UX Design",
        href: "/services/ui-ux-design",
        description: "Clear interfaces built around outcomes.",
        icon: Palette,
      },
      {
        label: "E-commerce",
        href: "/services/ecommerce",
        description: "Conversion-focused commerce systems.",
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: "Solutions",
    links: solutionNavigation,
  },
  {
    title: "Resources",
    links: [
      {
        label: "Case Studies",
        href: "/portfolio",
        description: "Results from real engagements.",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Blog",
        href: "/blog",
        description: "Practical product and automation insights.",
        icon: Newspaper,
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Common engagement questions.",
        icon: CircleHelp,
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about",
        description: "How we work and what we value.",
        icon: Building2,
      },
      {
        label: "Our Process",
        href: "/about#process",
        description: "A transparent delivery framework.",
        icon: Blocks,
      },
      {
        label: "Team",
        href: "/about#team-heading",
        description: "Meet the people behind the work.",
        icon: Users,
      },
    ],
  },
] as const satisfies readonly NavigationSection[];

export const featuredNavigation = {
  eyebrow: "Featured",
  title: "Turn repetitive work into an intelligent system",
  description:
    "Explore how AI automation can create faster, more reliable operations.",
  href: "/services/ai-automation",
  actionLabel: "Explore AI automation",
} as const satisfies FeaturedNavigationItem;

function flattenNavigationSections(
  sections: readonly NavigationSection[],
): ShellLink[] {
  return sections.flatMap((section) => [...section.links]);
}

function uniqueNavigationLinks(links: readonly ShellLink[]): ShellLink[] {
  return [...new Map(links.map((link) => [link.href, link])).values()];
}

export const searchNavigation: readonly ShellLink[] = uniqueNavigationLinks([
  ...primaryNavigation,
  ...flattenNavigationSections(megaMenuSections),
]);

export const consultationLink = {
  label: "Book Consultation",
  href: "/contact#contact-form",
  icon: Sparkles,
} as const satisfies ShellLink;
