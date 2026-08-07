import type { SiteConfig } from "@/types/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Ayeb Solutions",
  description:
    "Premium web development and AI automation solutions engineered for ambitious businesses.",
  url: siteUrl,
  keywords: [
    "web development",
    "AI automation",
    "software agency",
    "Ayeb Solutions",
  ],
} as const satisfies SiteConfig;
