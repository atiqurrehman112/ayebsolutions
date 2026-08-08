import {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
} from "@/features/portfolio";

const slug = "saas-crm-workspace" as const;
export const metadata = getPortfolioProjectMetadata(slug);

export default function SaasCrmWorkspaceRoute() {
  return <PortfolioProjectPage project={getPortfolioProject(slug)} />;
}
