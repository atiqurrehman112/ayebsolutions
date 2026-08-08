import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { company } from "@/config/company";
import {
  AutomationShowcaseSection,
  HeroSection,
  PortfolioPreviewSection,
  ProcessShowcaseSection,
  ServicesOverviewSection,
  TrustSocialProofSection,
} from "@/features/home";

const title = "AI Automation & Premium Web Solutions";
const description =
  "Build smarter and scale faster with premium websites, AI automation, custom software, and intelligent digital solutions from Ayeb Solutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: company.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSocialProofSection />
      <ServicesOverviewSection />
      <PortfolioPreviewSection />
      <AutomationShowcaseSection />
      <ProcessShowcaseSection />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: company.url,
          isPartOf: {
            "@type": "WebSite",
            name: company.name,
            url: company.url,
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
