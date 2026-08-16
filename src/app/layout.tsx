import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "@/app/globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { Providers } from "@/components/providers/providers";
import { StructuredData } from "@/components/seo/structured-data";
import { getPublicSiteSettings } from "@/lib/site-settings/public-site-settings";

const fallbackUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const config = settings?.configuration;
  const name = config?.site_name ?? "Digital product studio";
  const description =
    config?.default_meta_description ?? "Modern digital product engineering.";
  const url = config?.canonical_base_url ?? fallbackUrl;
  const imageId = config?.open_graph_media_id ?? config?.default_share_media_id;
  const image = imageId ? settings?.media[imageId]?.secure_url : undefined;
  return {
    metadataBase: new URL(url),
    title: {
      default: config?.default_meta_title ?? name,
      template: `%s | ${name}`,
    },
    description,
    applicationName: name,
    authors: [{ name, url }],
    creator: name,
    publisher: name,
    category: "technology",
    keywords: config?.default_keywords ? [...config.default_keywords] : [],
    alternates: { canonical: "/", languages: { en: "/", "x-default": "/" } },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: name,
      title: config?.default_meta_title ?? name,
      description,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: config?.default_meta_title ?? name,
      description,
      images: image ? [image] : undefined,
    },
    icons:
      config?.favicon_media_id && settings?.media[config.favicon_media_id]
        ? { icon: settings.media[config.favicon_media_id]!.secure_url }
        : undefined,
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const settings = await getPublicSiteSettings();
  const config = settings?.configuration;
  const name = config?.site_name ?? "Digital product studio";
  const url = config?.canonical_base_url ?? fallbackUrl;
  const logo = config?.logo_media_id
    ? settings?.media[config.logo_media_id]?.secure_url
    : undefined;
  return (
    <html lang={config?.default_language ?? "en"} suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name,
            url,
            email: config?.contact_email ?? undefined,
            telephone: config?.contact_phone ?? undefined,
            address: config?.address ?? undefined,
            description:
              config?.long_description ??
              config?.short_description ??
              undefined,
            logo,
            sameAs: [
              config?.linkedin_url,
              config?.github_url,
              config?.facebook_url,
              config?.instagram_url,
              config?.x_url,
              config?.youtube_url,
            ].filter((value): value is string => Boolean(value)),
          }}
        />
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name,
            url,
            potentialAction: {
              "@type": "SearchAction",
              target: `${url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
      </body>
    </html>
  );
}
