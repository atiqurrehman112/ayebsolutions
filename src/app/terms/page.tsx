import type { Metadata } from "next";
import {
  LegalPage,
  type LegalSection,
} from "@/components/marketing/legal-page";
const title = "Website Terms";
const description =
  "Terms governing informational use of the Ayeb Solutions public website.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", url: "/terms", title, description },
  twitter: { card: "summary", title, description },
};
const sections: readonly LegalSection[] = [
  {
    heading: "Informational purpose",
    paragraphs: [
      "Website content describes capabilities and working approaches in general terms. It is not a binding proposal, guarantee, professional advice, or commitment to specific availability, timing, price, or outcome.",
    ],
  },
  {
    heading: "Project agreements",
    paragraphs: [
      "Any engagement is governed by a separate written agreement defining scope, responsibilities, fees, intellectual property, acceptance, support, and other applicable terms.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "Do not misuse the website, attempt unauthorized access, interfere with operation, submit harmful material, or use content in a way that infringes the rights of others.",
    ],
  },
  {
    heading: "Content and availability",
    paragraphs: [
      "Reasonable care is taken with website content, but information may change and uninterrupted availability is not promised. External services and links remain subject to their respective operators.",
    ],
  },
];
export default function TermsRoute() {
  return (
    <LegalPage
      description={description}
      path="/terms"
      sections={sections}
      title={title}
    />
  );
}
