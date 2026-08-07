import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly icon?: LucideIcon;
  readonly children?: readonly NavigationItem[];
}
export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
}
