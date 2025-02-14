"use client";

import { PortfolioItem } from "@/types/portfolio";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollToBottom from "./ScrollToBottom";
import PortfolioCarousel from "./PortfolioCarousel";
import PortfolioFooter from "./PortfolioFooter";
import PortfolioHeader from "./PortfolioHeader";

type PortfolioItemSectionsProps = {
  portfolioItem: PortfolioItem;
};

const PortfolioItemSections = ({
  portfolioItem,
}: PortfolioItemSectionsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const numItems = portfolioItem.image.images.length;
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const xRange = -((numItems - 1) * vw);
  const x = useTransform(scrollYProgress, [0, 1], [0, xRange]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <>
      {/* Portfolio */}
      <article className="w-[98vw]">
        <PortfolioHeader item={portfolioItem} />
        <ScrollToBottom />
        {/* Portfolio Carousel Container */}
        <section ref={scrollContainerRef} className="h-[500vh] ">
          <PortfolioCarousel x={x} images={portfolioItem.image.images} />
        </section>
        <PortfolioFooter portfolioItem={portfolioItem} />
      </article>
      {/* Portfolio Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 h-2 bg-terminal bottom-12 translate-x-0"
        style={{ scaleX }}
      />
    </>
  );
};
export default PortfolioItemSections;
