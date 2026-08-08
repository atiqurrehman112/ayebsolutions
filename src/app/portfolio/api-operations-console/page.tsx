import {
  getPortfolioProject,
  getPortfolioProjectMetadata,
  PortfolioProjectPage,
} from "@/features/portfolio";

const slug = "api-operations-console" as const;
export const metadata = getPortfolioProjectMetadata(slug);

export default function ApiOperationsConsoleRoute() {
  return <PortfolioProjectPage project={getPortfolioProject(slug)} />;
}
