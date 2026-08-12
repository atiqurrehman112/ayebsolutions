import { Github, Linkedin, Twitter } from "lucide-react";

import type { NavigationSection, SocialChannel } from "@/types/global-settings";

export const footerNavigation = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/about#process" },
      { label: "Team", href: "/about#team-heading" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "SaaS Development", href: "/services/saas-development" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "E-commerce", href: "/services/ecommerce" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI Agents", href: "/solutions#ai-agents" },
      { label: "Workflow Automation", href: "/solutions#workflow-automation" },
      { label: "CRM Solutions", href: "/solutions#crm" },
      {
        label: "Digital Transformation",
        href: "/solutions#digital-transformation",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
] as const satisfies readonly NavigationSection[];

export const socialChannels = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: Linkedin,
    external: true,
  },
  {
    label: "X / Twitter",
    href: "https://x.com",
    icon: Twitter,
    external: true,
  },
  { label: "GitHub", href: "https://github.com", icon: Github, external: true },
] as const satisfies readonly SocialChannel[];
