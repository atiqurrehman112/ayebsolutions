import type { LucideIcon } from "lucide-react";

export interface CompanyInformation {
  readonly name: string;
  readonly legalName: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly description: string;
  readonly email: string;
  readonly location: string;
  readonly url: string;
}

export interface ShellLink {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly icon?: LucideIcon;
  readonly external?: boolean;
}

export interface NavigationSection {
  readonly title: string;
  readonly links: readonly ShellLink[];
}

export interface FeaturedNavigationItem {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly actionLabel: string;
}

export interface SocialChannel extends ShellLink {
  readonly icon: LucideIcon;
}

export interface AnnouncementConfig {
  readonly enabled: boolean;
  readonly id: string;
  readonly message: string;
  readonly actionLabel?: string;
  readonly actionHref?: string;
}

export interface CookieConsentConfig {
  readonly storageKey: string;
  readonly title: string;
  readonly description: string;
  readonly policyHref: string;
}
