import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { homepage } from "@/config/homepage";
import { marketingServices } from "@/config/marketing";
import {
  BlogPreviewSection,
  FinalCtaSection,
  HeroSection,
  PortfolioPreviewSection,
  ProcessTechnologySection,
  ServicesOverviewSection,
  StatisticsSection,
  TechnologyStrip,
  TestimonialsPreviewSection,
} from "@/features/home";
import { getPublishedBlogPage } from "@/lib/blog/public-blog";
import { getHomepageTestimonials } from "@/lib/homepage/homepage-data";
import { getPublishedPortfolioPage } from "@/lib/portfolio/public-portfolio";
import { getPublicSiteSettings } from "@/lib/site-settings/public-site-settings";

export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const config = settings?.configuration;
  const title = config?.default_meta_title ?? "Digital product studio";
  const description =
    config?.default_meta_description ?? "Modern digital product engineering.";
  return {
    title,
    description,
    keywords: config?.default_keywords ? [...config.default_keywords] : [],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      title,
      description,
      siteName: config?.site_name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const [portfolio, blog, testimonials, settings] = await Promise.all([
    getPublishedPortfolioPage({
      featured: true,
      pageSize: 6,
      sort: "featured",
    }).catch(() => ({
      data: [],
      count: 0,
      page: 1,
      pageSize: 6,
      totalPages: 0,
    })),
    getPublishedBlogPage({
      pageSize: 3,
      sort: "newest",
    }).catch(() => ({
      data: [],
      count: 0,
      page: 1,
      pageSize: 3,
      totalPages: 0,
    })),
    getHomepageTestimonials(6).catch(() => []),
    getPublicSiteSettings(),
  ]);
  const config = settings?.configuration;
  const siteUrl =
    config?.canonical_base_url ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config?.site_name,
    url: siteUrl,
    email: config?.contact_email,
  } as const;
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config?.site_name,
    url: siteUrl,
    description: config?.short_description,
    inLanguage: config?.default_language ?? "en",
  } as const;
  return (
    <>
      <HeroSection content={homepage.hero} />
      <TechnologyStrip technologies={homepage.technologies} />
      <StatisticsSection statistics={homepage.statistics} />
      <ServicesOverviewSection services={marketingServices} />
      <PortfolioPreviewSection projects={portfolio.data} />
      <ProcessTechnologySection
        process={homepage.process}
        technologies={homepage.technologies}
      />
      <BlogPreviewSection articles={blog.data} />
      <TestimonialsPreviewSection testimonials={testimonials} />
      <FinalCtaSection content={homepage.finalCta} />
      <StructuredData data={organization} />
      <StructuredData data={website} />
    </>
  );
}
