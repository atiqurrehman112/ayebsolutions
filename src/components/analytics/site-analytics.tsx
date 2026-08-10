import Script from "next/script";
import type { PublicSiteSettings } from "@/types/settings";

export function SiteAnalytics({
  settings,
}: {
  readonly settings: PublicSiteSettings;
}) {
  return (
    <>
      {settings.google_tag_manager_id ? (
        <>
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(settings.google_tag_manager_id)}`}
          />
          <Script
            id="google-tag-manager-config"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${settings.google_tag_manager_id}');`}</Script>
        </>
      ) : settings.google_analytics_id ? (
        <>
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(settings.google_analytics_id)}`}
          />
          <Script
            id="google-analytics-config"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${settings.google_analytics_id}');`}</Script>
        </>
      ) : null}
      {settings.microsoft_clarity_id ? (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${settings.microsoft_clarity_id}');`}</Script>
      ) : null}
      {settings.plausible_domain ? (
        <Script
          defer
          data-domain={settings.plausible_domain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
      {settings.vercel_analytics_enabled ? (
        <Script
          defer
          src="/_vercel/insights/script.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
