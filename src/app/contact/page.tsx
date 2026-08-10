import type { Metadata } from "next";

import { ContactPage } from "@/features/contact";
import { mediaSeoUrl } from "@/lib/media/media";
import { getPublicMediaByRole } from "@/lib/media/public-media";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";

const title = "Contact Ayeb Solutions";
const description =
  "Tell Ayeb Solutions about your website, software, AI automation, design, integration, or maintenance project and explore an appropriate next step.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const media = await getPublicMediaByRole(["contact.hero", "contact.og"]);
  const image = mediaSeoUrl(
    media["contact.og"] ?? media["contact.hero"] ?? settings.openGraphImage,
  );
  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    openGraph: {
      type: "website",
      url: "/contact",
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

export default async function ContactRoute() {
  const media = await getPublicMediaByRole(["contact.hero"]);
  return <ContactPage heroMedia={media["contact.hero"]} />;
}
