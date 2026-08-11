import type { Metadata } from "next";
import {
  Bot,
  Building2,
  ChartNoAxesCombined,
  Network,
  Rocket,
  Workflow,
} from "lucide-react";
import {
  StaticMarketingPage,
  type MarketingCard,
} from "@/components/marketing/static-marketing-page";
import { company } from "@/config/company";
const title = "Solutions for Modern Business Workflows";
const description =
  "Explore practical digital solutions for connected operations, customer experiences, automation, and sustainable product growth.";
export const metadata: Metadata = {
  title: "Digital Solutions",
  description,
  alternates: { canonical: "/solutions" },
  openGraph: {
    type: "website",
    url: "/solutions",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary", title, description },
};
const cards: readonly MarketingCard[] = [
  {
    title: "Workflow Automation",
    description:
      "Connect repetitive processes across the tools your team already uses.",
    icon: Workflow,
    points: ["Workflow mapping", "Human approval", "Exception handling"],
  },
  {
    title: "AI-Assisted Operations",
    description:
      "Use AI where interpretation helps while keeping review and accountability visible.",
    icon: Bot,
    points: ["Assisted decisions", "Confidence thresholds", "Auditability"],
  },
  {
    title: "Connected Systems",
    description:
      "Create reliable data flow between websites, internal tools, and third-party services.",
    icon: Network,
    points: ["API integration", "Data validation", "Monitoring"],
  },
  {
    title: "Business Platforms",
    description:
      "Build portals and dashboards around real roles, permissions, and operational needs.",
    icon: Building2,
    points: ["Role-based access", "Reporting", "Maintainable architecture"],
  },
  {
    title: "Digital Modernization",
    description:
      "Improve an existing product incrementally without discarding useful foundations.",
    icon: Rocket,
    points: ["Technical assessment", "Phased delivery", "Migration planning"],
  },
  {
    title: "Operational Visibility",
    description:
      "Make useful business information easier to understand and act upon.",
    icon: ChartNoAxesCombined,
    points: ["Dashboards", "Structured reporting", "Clear interfaces"],
  },
];
export default function SolutionsRoute() {
  return (
    <StaticMarketingPage
      cards={cards}
      description={description}
      eyebrow="Solutions"
      title={title}
    />
  );
}
