import type { CompanyInformation } from "@/types/global-settings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const company = {
  name: "Ayeb Solutions",
  legalName: "Ayeb Solutions",
  shortName: "Ayeb",
  tagline: "Engineering intelligent digital growth.",
  description:
    "Premium web development, AI automation, and digital product engineering for ambitious businesses.",
  email: "hello@ayebsolutions.com",
  location: "Pakistan · Serving clients worldwide",
  url: siteUrl,
} as const satisfies CompanyInformation;
