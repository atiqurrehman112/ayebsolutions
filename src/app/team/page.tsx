import type { Metadata } from "next";

import { getPublicSiteSettings } from "@/lib/site-settings/public-site-settings";
import { TeamPage } from "@/features/team";
import { getPublishedTeamMembers } from "@/lib/team/public-team";
import { getPublishedFounderProfile } from "@/lib/founder/public-founder";

const title = "Meet the Team";
const description =
  "Meet the people behind Ayeb Solutions and explore the engineering values, culture, and collaborative approach that shape our digital products.";

export async function generateMetadata(): Promise<Metadata> {
  const [founder, settings] = await Promise.all([
    getPublishedFounderProfile().catch(() => null),
    getPublicSiteSettings(),
  ]);
  const resolvedTitle = founder?.seo_title || title;
  const resolvedDescription = founder?.seo_description || description;
  const image = founder?.openGraphImage?.secure_url;
  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: "/team" },
    openGraph: {
      type: "website",
      url: "/team",
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: settings?.configuration.site_name,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description: resolvedDescription,
      images: image ? [image] : undefined,
    },
  };
}

export const revalidate = 300;

export default async function TeamRoute() {
  const [members, founder, settings] = await Promise.all([
    getPublishedTeamMembers().catch(() => []),
    getPublishedFounderProfile().catch(() => null),
    getPublicSiteSettings(),
  ]);
  return (
    <TeamPage
      founder={founder}
      members={members}
      settings={settings?.configuration ?? null}
    />
  );
}
