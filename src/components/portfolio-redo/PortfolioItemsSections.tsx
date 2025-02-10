"use client";

import { PortfolioItem } from "@/types/portfolio";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PortfolioCarousel from "./PortfolioCarousel";
import PortfolioHeader from "./PortfolioHeader";
import SVGAnimation from "./SVGPortfolioArrowAnimation";
import { useUiStore } from "@/store/ui";
import SVGPortfolioArrowAnimation from "./SVGPortfolioArrowAnimation";

type PortfolioItemSectionsProps = {
  portfolioItem: PortfolioItem;
};

const PortfolioItemSections = ({
  portfolioItem,
}: PortfolioItemSectionsProps) => {
  const { isMobile } = useUiStore();
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
      {/* {!isMobile && <SVGPortfolioArrowAnimation />} */}
      {/* Portfolio */}
      <article className="w-[98vw]">
        {/* Header */}
        <PortfolioHeader item={portfolioItem} />
        {/* Portfolion Group Container */}
        <section ref={scrollContainerRef} className="h-[500vh] ">
          {/* Portfolio Img Sticky Container */}
          <PortfolioCarousel x={x} images={portfolioItem.image.images} />
          {/* Portfolio Content */}
        </section>
        {/* Bottom Info */}
        <footer className="h-[70vh] flex items-center justify-center">
          <p>Some info</p>
        </footer>
      </article>
      {/* Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 h-2 bg-orange-600 bottom-12 translate-x-0"
        style={{ scaleX }}
      />
    </>
  );
};
export default PortfolioItemSections;
