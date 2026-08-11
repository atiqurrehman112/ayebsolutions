import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { company } from "@/config/company";
import { marketingServices } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import {
  BlogPreviewSection,
  FinalCtaSection,
  HeroSection,
  PortfolioPreviewSection,
  ServicesOverviewSection,
  TestimonialsPreviewSection,
} from "@/features/home";
import { getPublishedBlogPage } from "@/lib/blog/public-blog";
import { getHomepageTestimonials } from "@/lib/homepage/homepage-data";
import { getPublishedPortfolioPage } from "@/lib/portfolio/public-portfolio";
import { fallbackSiteSettings } from "@/lib/settings/site-settings";

export const revalidate = 300;
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: company.name,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default async function HomePage() {
  const [portfolio, blog, testimonials] = await Promise.all([
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
  ]);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.url,
    email: company.email,
  } as const;
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: company.url,
    description: company.description,
    inLanguage: "en",
  } as const;
  return (
    <>
      <HeroSection settings={fallbackSiteSettings} />
      <ServicesOverviewSection services={marketingServices} />
      <PortfolioPreviewSection projects={portfolio.data} />
      <BlogPreviewSection articles={blog.data} />
      <TestimonialsPreviewSection testimonials={testimonials} />
      <FinalCtaSection settings={fallbackSiteSettings} />
      <StructuredData data={organization} />
      <StructuredData data={website} />
    </>
  );
}
