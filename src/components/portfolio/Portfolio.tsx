"use client";

import { useUiStore } from "@/store/ui";
import PortfolioCardsSection from "./PortfolioCardsSection";
import PortfolioItemSections from "./PortfolioItemsSections";

const Portfolio = () => {
  const { isCardClicked, clickedCard } = useUiStore();
  return (
    <>
      {!isCardClicked ? (
        <PortfolioCardsSection />
      ) : (
        <PortfolioItemSections portfolioItem={clickedCard} />
      )}
    </>
  );
};
export default Portfolio;
