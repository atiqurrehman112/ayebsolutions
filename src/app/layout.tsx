import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "@/app/globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { Providers } from "@/components/providers/providers";
import { StructuredData } from "@/components/seo/structured-data";
import { getPublicSiteSettings } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const index = settings.robots === "index,follow";
  return {
    metadataBase: new URL(settings.canonical_base_url),
    title: {
      default: settings.default_meta_title,
      template: `%s | ${settings.site_name}`,
    },
    description: settings.default_meta_description,
    applicationName: settings.site_name,
    authors: [{ name: settings.site_name, url: settings.site_url }],
    creator: settings.site_name,
    publisher: settings.site_name,
    category: "technology",
    keywords: [...settings.default_keywords],
    alternates: { canonical: "/" },
    robots: { index, follow: index },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: settings.site_url,
      siteName: settings.site_name,
      title: settings.default_meta_title,
      description: settings.default_meta_description,
      images: settings.openGraphImage
        ? [
            {
              url: settings.openGraphImage.secure_url,
              alt: settings.openGraphImage.alt ?? settings.site_name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.default_meta_title,
      description: settings.default_meta_description,
      images: settings.openGraphImage
        ? [settings.openGraphImage.secure_url]
        : undefined,
    },
    icons: { icon: settings.favicon?.secure_url ?? "/favicon.svg" },
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

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const settings = await getPublicSiteSettings();
  return (
    <html lang={settings.default_language} suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <Providers>
          <SiteShell settings={settings}>{children}</SiteShell>
        </Providers>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: settings.site_name,
            legalName: settings.site_name,
            url: settings.site_url,
            email: settings.contact_email ?? undefined,
            description: settings.default_meta_description,
            areaServed: "Worldwide",
          }}
        />
      </body>
    </html>
  );
}
