import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import {
  AutomationShowcaseSection,
  FaqShowcaseSection,
  FinalCtaSection,
  HeroSection,
  IndustriesShowcaseSection,
  PortfolioPreviewSection,
  ProcessShowcaseSection,
  ServicesOverviewSection,
  TrustSocialProofSection,
} from "@/features/home";

const title = "AI Automation & Premium Web Solutions";
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const description = settings.default_meta_description;
  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      title,
      description,
      siteName: settings.site_name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const settings = await getPublicSiteSettings();
  const description = settings.default_meta_description;
  return (
    <>
      <HeroSection brandName={settings.site_name} />
      <TrustSocialProofSection />
      <ServicesOverviewSection />
      <PortfolioPreviewSection />
      {settings.enable_ai_features ? <AutomationShowcaseSection /> : null}
      <ProcessShowcaseSection />
      <IndustriesShowcaseSection />
      <FaqShowcaseSection />
      <FinalCtaSection />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: settings.site_url,
          isPartOf: {
            "@type": "WebSite",
            name: settings.site_name,
            url: settings.site_url,
          },
          about: [
            "AI automation",
            "Web development",
            "SaaS solutions",
            "Custom software",
          ],
        }}
      />
    </>
  );
}
