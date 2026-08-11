import type { Metadata } from "next";

import { ContactPage } from "@/features/contact";
import { company } from "@/config/company";

const title = "Contact Ayeb Solutions";
const description =
  "Tell Ayeb Solutions about your website, software, AI automation, design, integration, or maintenance project and explore an appropriate next step.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title,
    description,
    siteName: company.name,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function ContactRoute() {
  return <ContactPage heroMedia={null} />;
}
