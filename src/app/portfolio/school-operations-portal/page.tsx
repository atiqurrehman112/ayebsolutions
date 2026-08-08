import {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
} from "@/features/portfolio";

const slug = "school-operations-portal" as const;
export const metadata = getPortfolioProjectMetadata(slug);

export default function SchoolOperationsPortalRoute() {
  return <PortfolioProjectPage project={getPortfolioProject(slug)} />;
}
