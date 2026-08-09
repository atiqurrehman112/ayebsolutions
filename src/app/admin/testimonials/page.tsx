import type { Metadata } from "next";

import { AdminTestimonials } from "@/features/admin";

export const metadata: Metadata = {
  title: "Testimonials Management",
  description: "Static testimonials management CMS preview for Ayeb Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminTestimonialsRoute() {
  return <AdminTestimonials />;
}
