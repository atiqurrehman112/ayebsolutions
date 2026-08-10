import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import {
  BlogPreviewSection,
  FinalCtaSection,
  HeroSection,
  PortfolioPreviewSection,
  ServicesOverviewSection,
  TestimonialsPreviewSection,
} from "@/features/home";
import { getPublishedBlogPage } from "@/lib/blog/public-blog";
import {
  getHomepageServices,
  getHomepageTestimonials,
} from "@/lib/homepage/homepage-data";
import { getPublishedPortfolioPage } from "@/lib/portfolio/public-portfolio";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
import { mediaSeoUrl } from "@/lib/media/media";

export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const title = settings.default_meta_title;
  const description = settings.default_meta_description;
  const image = settings.openGraphImage;
  const imageUrl = mediaSeoUrl(image);
  return {
    title,
    description,
    keywords: [...settings.default_keywords],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      title,
      description,
      siteName: settings.site_name,
      images: imageUrl
        ? [{ url: imageUrl, alt: image?.alt ?? settings.site_name }]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function HomePage() {
  const settings = await getPublicSiteSettings();
  const [services, portfolio, blog, testimonials] = await Promise.all([
    getHomepageServices(settings.homepage_services_limit).catch(() => []),
    getPublishedPortfolioPage({
      featured: true,
      pageSize: settings.homepage_portfolio_limit,
      sort: "featured",
    }).catch(() => ({
      data: [],
      count: 0,
      page: 1,
      pageSize: settings.homepage_portfolio_limit,
      totalPages: 0,
    })),
    settings.enable_blog
      ? getPublishedBlogPage({
          pageSize: settings.homepage_blog_limit,
          sort: "newest",
        }).catch(() => ({
          data: [],
          count: 0,
          page: 1,
          pageSize: settings.homepage_blog_limit,
          totalPages: 0,
        }))
      : Promise.resolve({
          data: [],
          count: 0,
          page: 1,
          pageSize: settings.homepage_blog_limit,
          totalPages: 0,
        }),
    settings.enable_testimonials
      ? getHomepageTestimonials(settings.homepage_testimonials_limit).catch(
          () => [],
        )
      : Promise.resolve([]),
  ]);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.site_name,
    url: settings.site_url,
    email: settings.contact_email ?? undefined,
    telephone: settings.contact_phone ?? undefined,
    logo: mediaSeoUrl(settings.logo),
    sameAs: [
      settings.facebook_url,
      settings.instagram_url,
      settings.linkedin_url,
      settings.github_url,
      settings.x_url,
      settings.youtube_url,
    ].filter((value): value is string => Boolean(value)),
  } as const;
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.site_name,
    url: settings.site_url,
    description: settings.default_meta_description,
    inLanguage: settings.default_language,
  } as const;
  const localBusiness =
    settings.address || settings.contact_phone || settings.working_hours
      ? {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: settings.site_name,
          url: settings.site_url,
          address: settings.address ?? undefined,
          telephone: settings.contact_phone ?? undefined,
          email: settings.contact_email ?? undefined,
          openingHours: settings.working_hours ?? undefined,
        }
      : null;
  return (
    <>
      <HeroSection settings={settings} />
      <ServicesOverviewSection services={services} />
      <PortfolioPreviewSection projects={portfolio.data} />
      <BlogPreviewSection articles={blog.data} />
      <TestimonialsPreviewSection testimonials={testimonials} />
      <FinalCtaSection settings={settings} />
      <StructuredData data={organization} />
      <StructuredData data={website} />
      {localBusiness ? <StructuredData data={localBusiness} /> : null}
    </>
  );
}
