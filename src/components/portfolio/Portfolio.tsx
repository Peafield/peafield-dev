"use client";

import { containerVariants, itemVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import PortfolioSection from "./PortfolioSection";
import PortfolioContent from "./PortfolioContent";
import PortfolioCarousel from "./PortfolioCarousel";
import { PortfolioItem } from "@/types/portfolio";

const images: string[] = [
  "https://images.unsplash.com/photo-1736297150541-89378f055b96?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1737024251796-dd751b4d9365?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1733760125032-8a8b23769a0c?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const portfolioItems: PortfolioItem = [
  {
    name: "Yarn",
    images: images,
  },
  {
    name: "Wendi's Worminghall Whimsies",
    images: images,
  },
];

const Portfolio = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {portfolioItems.map((item, index) => (
        <>
          <PortfolioSection key={index}>
            <PortfolioContent>
              <h1 className="text-4xl text-center font-bold">{item.name}</h1>
            </PortfolioContent>
          </PortfolioSection>
          <PortfolioCarousel images={item.images} />
        </>
      ))}
    </motion.div>
  );
};

export default Portfolio;
