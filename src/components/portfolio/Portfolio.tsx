"use client";

import { containerVariants } from "@/constants/constants";
import { motion } from "framer-motion";
import PortfolioSection from "./PortfolioSection";
import PortfolioContent from "./PortfolioContent";
import PortfolioCarousel from "./PortfolioCarousel";
import { RiScrollToBottomFill } from "react-icons/ri";
import PortfolioContentItem from "./PortfolioContentItem";
import { portfolioItems } from "@/data/portfolio";
import ScrollToBottom from "./ScrollToBottom";
import Divider from "../Divider";
import { useEffect, useRef } from "react";
import React from "react";

const Portfolio = () => {
  const containerRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    containerRefs.current = portfolioItems.map(
      (_, i) => containerRefs.current[i] ?? React.createRef<HTMLDivElement>()
    );
  }, [portfolioItems]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {portfolioItems.map((item, index) => (
        <div
          key={index}
          className="min-h-svh md:min-h-[180vh] pb-4 mb-8"
          ref={containerRefs.current[index]}
        >
          <PortfolioSection>
            <PortfolioContent>
              <PortfolioContentItem item={item} />
              <ScrollToBottom />
            </PortfolioContent>
          </PortfolioSection>
          <PortfolioCarousel
            images={item.image.images}
            containerRef={containerRefs.current[index]!}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default Portfolio;
