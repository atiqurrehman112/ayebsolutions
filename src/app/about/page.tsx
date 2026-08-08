import type { Metadata } from "next";

import { company } from "@/config/company";
import { AboutPage } from "@/features/about";

const title = "About Ayeb Solutions";
const description =
  "Learn how Ayeb Solutions approaches modern software, thoughtful design, AI automation, accessibility, and maintainable digital product development.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title,
    description,
    siteName: company.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function AboutRoute() {
  return <AboutPage />;
}
