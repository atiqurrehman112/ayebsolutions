import type {
  AnnouncementConfig,
  CookieConsentConfig,
} from "@/types/global-settings";

export const announcementConfig = {
  enabled: true,
  id: "consultation-availability-2026-08",
  message:
    "Now accepting a limited number of new product and automation engagements.",
  actionLabel: "Book a consultation",
  actionHref: "/contact#contact-form",
} as const satisfies AnnouncementConfig;

export const cookieConsentConfig = {
  storageKey: "ayeb-cookie-consent-v1",
  title: "Your privacy matters",
  description:
    "We use essential storage to remember preferences. Optional analytics can be enabled with your consent.",
  policyHref: "/cookies",
} as const satisfies CookieConsentConfig;
