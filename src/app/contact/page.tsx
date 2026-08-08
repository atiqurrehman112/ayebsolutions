import type { Metadata } from "next";

import { company } from "@/config/company";
import { ContactPage } from "@/features/contact";

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
  twitter: { card: "summary_large_image", title, description },
};

export default function ContactRoute() {
  return <ContactPage />;
}
