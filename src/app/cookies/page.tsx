import type { Metadata } from "next";
import {
  LegalPage,
  type LegalSection,
} from "@/components/marketing/legal-page";
const title = "Cookie Policy";
const description =
  "How essential storage and optional measurement technologies may be used on the Ayeb Solutions website.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookies" },
  openGraph: { type: "website", url: "/cookies", title, description },
  twitter: { card: "summary", title, description },
};
const sections: readonly LegalSection[] = [
  {
    heading: "Essential storage",
    paragraphs: [
      "The website may use essential browser storage to remember interface preferences, theme selection, and consent choices. These functions support the requested experience.",
    ],
  },
  {
    heading: "Optional analytics",
    paragraphs: [
      "Measurement tools may be enabled only when configured and permitted. They can help understand aggregate usage and technical performance without changing the core website experience.",
    ],
  },
  {
    heading: "Managing preferences",
    paragraphs: [
      "You can use the website consent controls and browser settings to manage storage. Blocking essential storage may prevent preferences from being remembered.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "This explanation may be updated when website technology or operational requirements change. Material choices should remain understandable through the consent interface.",
    ],
  },
];
export default function CookiesRoute() {
  return (
    <LegalPage
      description={description}
      path="/cookies"
      sections={sections}
      title={title}
    />
  );
}
