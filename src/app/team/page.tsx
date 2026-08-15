import type { Metadata } from "next";

import { company } from "@/config/company";
import { TeamPage } from "@/features/team";
import { getPublishedTeamMembers } from "@/lib/team/public-team";
import { getPublishedFounderProfile } from "@/lib/founder/public-founder";

const title = "Meet the Team";
const description =
  "Meet the people behind Ayeb Solutions and explore the engineering values, culture, and collaborative approach that shape our digital products.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    url: "/team",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary", title, description },
};

export const revalidate = 300;

export default async function TeamRoute() {
  const [members, founder] = await Promise.all([
    getPublishedTeamMembers().catch(() => []),
    getPublishedFounderProfile().catch(() => null),
  ]);
  return <TeamPage founder={founder} members={members} />;
}
