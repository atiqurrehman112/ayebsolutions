import type { Metadata } from "next";

import { ContactPage } from "@/features/contact";
import { getPublicSiteSettings } from "@/lib/site-settings/public-site-settings";

const title = "Contact Ayeb Solutions";
const description =
  "Tell Ayeb Solutions about your website, software, AI automation, design, integration, or maintenance project and explore an appropriate next step.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    openGraph: {
      type: "website",
      url: "/contact",
      title,
      description,
      siteName: settings?.configuration.site_name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ContactRoute() {
  const settings = await getPublicSiteSettings();
  return <ContactPage heroMedia={null} settings={settings?.configuration} />;
}
