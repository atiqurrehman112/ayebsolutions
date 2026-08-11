import type { Metadata } from "next";
import {
  LegalPage,
  type LegalSection,
} from "@/components/marketing/legal-page";
const title = "Privacy Policy";
const description =
  "How Ayeb Solutions approaches personal information submitted through this website.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", title, description },
  twitter: { card: "summary", title, description },
};
const sections: readonly LegalSection[] = [
  {
    heading: "Information you provide",
    paragraphs: [
      "When you submit a project inquiry, the website may collect the contact and project information shown in the form. Provide only information relevant to the inquiry and that you are authorized to share.",
    ],
  },
  {
    heading: "How information is used",
    paragraphs: [
      "Submitted information is used to review the inquiry, communicate about potential work, maintain an internal lead record, prevent abuse, and meet reasonable operational or legal requirements.",
    ],
  },
  {
    heading: "Service providers",
    paragraphs: [
      "Hosting, database, email, security, and analytics providers may process limited information as necessary to operate the website. Their availability and configuration can change over time.",
    ],
  },
  {
    heading: "Retention and choices",
    paragraphs: [
      "Information is retained only as reasonably needed for the inquiry, operational records, security, and applicable obligations. Privacy questions or appropriate access and deletion requests can be sent to the published contact email.",
    ],
  },
];
export default function PrivacyRoute() {
  return (
    <LegalPage
      description={description}
      path="/privacy"
      sections={sections}
      title={title}
    />
  );
}
