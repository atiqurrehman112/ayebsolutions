import {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
} from "@/features/portfolio";

const slug = "accessible-booking-experience" as const;
export const metadata = getPortfolioProjectMetadata(slug);

export default function AccessibleBookingExperienceRoute() {
  return <PortfolioProjectPage project={getPortfolioProject(slug)} />;
}
