"use client";

import { motion } from "framer-motion";
import { portfolioItems } from "@/data/portfolio";
import { containerVariants, itemVariants } from "@/constants/constants";
import { useUiStore } from "@/store/ui";
import PortfolioCard from "./PortfolioCards";
import PortfolioItemSections from "./PortfolioItemsSections";
import { section } from "framer-motion/client";
import PortfolioCardsSection from "./PortfolioCardsSection";

// TODO: When a card is clicked the the other cards shoot off screen and the main
// card exapnds and disappears, revealing the portfolioItemSection for the clicked card.

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
