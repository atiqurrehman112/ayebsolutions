import type { Metadata } from "next";

import { company } from "@/config/company";
import { AiAutomationPage } from "@/features/services/ai-automation";

const title = "AI Automation Services";
const description =
  "AI automation systems that connect workflows, business tools, human review, and bounded AI assistance with clear operational safeguards.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ai-automation" },
  openGraph: {
    type: "website",
    url: "/services/ai-automation",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function AiAutomationRoute() {
  return <AiAutomationPage />;
}
