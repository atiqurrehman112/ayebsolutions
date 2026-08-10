import type { Metadata } from "next";
import { TestimonialsPage } from "@/features/testimonials";
import type { PublicTestimonialSort } from "@/lib/database/repositories/testimonials-repository";
import {
  getPublishedTestimonialIndustries,
  getPublishedTestimonialsPage,
} from "@/lib/testimonials/public-testimonials";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";
export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const title = "Testimonials";
  const description =
    "Read approved, consent-verified feedback published by Ayeb Solutions.";
  return {
    title,
    description,
    alternates: { canonical: "/testimonials" },
    openGraph: {
      type: "website",
      url: "/testimonials",
      title,
      description,
      siteName: settings.site_name,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
interface Props {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;
const sorts: readonly PublicTestimonialSort[] = [
  "display",
  "highest-rating",
  "newest",
];
export default async function TestimonialsRoute({ searchParams }: Props) {
  const [params, industries, settings] = await Promise.all([
    searchParams,
    getPublishedTestimonialIndustries(),
    getPublicSiteSettings(),
  ]);
  const requestedSize = Number(first(params.pageSize));
  const pageSize = requestedSize === 24 ? 24 : requestedSize === 48 ? 48 : 12;
  const requestedSort = first(params.sort) as PublicTestimonialSort;
  const featured = first(params.featured);
  const rating = Number(first(params.rating));
  const filters = {
    featured:
      featured === "true" ? true : featured === "false" ? false : undefined,
    industry: first(params.industry) || undefined,
    pageSize,
    query: first(params.q)?.trim() || undefined,
    rating: [1, 2, 3, 4, 5].includes(rating) ? rating : undefined,
    sort: sorts.includes(requestedSort) ? requestedSort : ("display" as const),
  };
  const testimonials = await getPublishedTestimonialsPage({
    ...filters,
    page: Math.max(1, Number(first(params.page)) || 1),
  });
  return (
    <TestimonialsPage
      filters={filters}
      industries={industries}
      siteName={settings.site_name}
      siteUrl={settings.site_url}
      testimonials={testimonials}
    />
  );
}
