"use client";

import { motion } from "framer-motion";
import { portfolioItems } from "@/data/portfolio";
import { containerVariants, itemVariants } from "@/constants/constants";
import { useUiStore } from "@/store/ui";
import PortfolioCard from "./PortfolioCards";
import PortfolioItemSections from "./PortfolioItemsSections";
import { section } from "framer-motion/client";

// TODO: When a card is clicked the the other cards shoot off screen and the main
// card exapnds and disappears, revealing the portfolioItemSection for the clicked card.

const Portfolio = () => {
  const { isCardClicked, clickedCard } = useUiStore();
  return (
    <>
      {!isCardClicked ? (
        <section className="w-[98vw] ">
          <motion.div
            variants={itemVariants}
            className="prose dark:prose-invert m-auto p-8 md:py-8 md:px-0"
          >
            <h1 className="font-openSans font-medium">Portfolio</h1>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {portfolioItems.map((item, index) => (
              <PortfolioCard key={index} item={item} />
            ))}
          </motion.div>
        </section>
      ) : (
        <PortfolioItemSections portfolioItem={clickedCard} />
      )}
    </>
  );
};
export default Portfolio;
