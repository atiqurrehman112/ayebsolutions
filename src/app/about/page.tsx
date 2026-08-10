import type { Metadata } from "next";

import { AboutPage } from "@/features/about";
import { mediaSeoUrl } from "@/lib/media/media";
import { getPublicMediaByRole } from "@/lib/media/public-media";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";

const title = "About Ayeb Solutions";
const description =
  "Learn how Ayeb Solutions approaches modern software, thoughtful design, AI automation, accessibility, and maintainable digital product development.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const media = await getPublicMediaByRole(["about.hero", "about.og"]);
  const image = mediaSeoUrl(
    media["about.og"] ?? media["about.hero"] ?? settings.openGraphImage,
  );
  return {
    title,
    description,
    alternates: { canonical: "/about" },
    openGraph: {
      type: "website",
      url: "/about",
      title,
      description,
      siteName: settings.site_name,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function AboutRoute() {
  const media = await getPublicMediaByRole(["about.hero"]);
  return <AboutPage heroMedia={media["about.hero"]} />;
}
