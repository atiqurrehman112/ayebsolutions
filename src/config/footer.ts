import { Github, Linkedin, Twitter } from "lucide-react";

import type { NavigationSection, SocialChannel } from "@/types/global-settings";

export const footerNavigation = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
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
      { label: "AI Agents", href: "/solutions/ai-agents" },
      { label: "Workflow Automation", href: "/solutions/workflow-automation" },
      { label: "CRM Solutions", href: "/solutions/crm" },
      {
        label: "Digital Transformation",
        href: "/solutions/digital-transformation",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/resources/guides" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal/accessibility" },
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
