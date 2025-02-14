import PortfolioItemSections from "@/components/portfolio/PortfolioItemsSections";
import { portfolioItems } from "@/data/portfolio";

// TODO: display portfolio cards which link to the portfolio item page
export default function PortfolioPage() {
  return <PortfolioItemSections portfolioItem={portfolioItems[0]} />;
}
