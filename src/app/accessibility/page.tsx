import type { Metadata } from "next";
import {
  LegalPage,
  type LegalSection,
} from "@/components/marketing/legal-page";
const title = "Accessibility Statement";
const description =
  "The accessibility principles guiding the Ayeb Solutions website and digital product work.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/accessibility" },
  openGraph: { type: "website", url: "/accessibility", title, description },
  twitter: { card: "summary", title, description },
};
const sections: readonly LegalSection[] = [
  {
    heading: "Our approach",
    paragraphs: [
      "We aim to make this website understandable and operable across keyboard, pointer, touch, and assistive-technology use. Accessibility is treated as an ongoing engineering and content responsibility.",
    ],
  },
  {
    heading: "Practices",
    paragraphs: [
      "The interface emphasizes semantic structure, visible focus, meaningful labels, responsive layouts, sufficient contrast, reduced-motion support, and alternatives for meaningful media.",
    ],
  },
  {
    heading: "Limitations",
    paragraphs: [
      "Technology, content, and third-party integrations can introduce limitations. When an issue is identified, it should be assessed in context and addressed through an appropriate improvement path.",
    ],
  },
  {
    heading: "Feedback",
    paragraphs: [
      "If you encounter an accessibility barrier, contact Ayeb Solutions with the affected page, the task you were attempting, and any assistive technology or browser context that may help investigation.",
    ],
  },
];
export default function AccessibilityRoute() {
  return (
    <LegalPage
      description={description}
      path="/accessibility"
      sections={sections}
      title={title}
    />
  );
}
