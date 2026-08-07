import type { SiteConfig } from "@/types/site";

import { company } from "@/config/company";

export const siteConfig = {
  name: company.name,
  description: company.description,
  url: company.url,
  keywords: [
    "web development",
    "AI automation",
    "software agency",
    "Ayeb Solutions",
  ],
} as const satisfies SiteConfig;
