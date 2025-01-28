"use client";

import { itemVariants } from "@/constants/constants";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CarouselSlide from "./CarouselSlide";
import { useUiStore } from "@/store/ui";
import clsx from "clsx";
import { div, style } from "framer-motion/client";

type PortfolioCarouselProps = {
  images: { src: string; description: string }[];
  containerRef: React.RefObject<HTMLDivElement>;
};

const PortfolioCarousel = ({
  images,
  containerRef,
}: PortfolioCarouselProps) => {
  const { isMobile } = useUiStore();
  const outerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);
  console.log("🚀 ~ maxScrollDistance:", maxScrollDistance);

  // TODO: this is not working!!
  // Calculate scroll distance on mount and resize
  useEffect(() => {
    if (isMobile || !outerRef.current || !contentRef.current) return;

    const updateScrollDistance = () => {
      const slideWidth = window.innerHeight * 0.8 * 1.5; // 80vh * 3/2 aspect
      const gapWidth = window.innerWidth * 0.03; // 3vw gap
      const contentWidth =
        images.length * slideWidth + (images.length - 1) * gapWidth;
      const containerWidth = outerRef.current!.offsetWidth;
      setMaxScrollDistance(contentWidth - containerWidth);
    };

    updateScrollDistance();
    window.addEventListener("resize", updateScrollDistance);
    return () => window.removeEventListener("resize", updateScrollDistance);
  }, [images, isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollDistance]);
  return (
    <div className="h-full">
      {/* Sticky viewport container */}
      <div
        ref={outerRef}
        className={clsx("h-full flex items-center", {
          "sticky top-0 overflow-hidden justify-start": !isMobile,
          "justify-center": isMobile,
        })}
      >
        <motion.div
          ref={contentRef}
          variants={itemVariants}
          className={clsx("h-full gap-[3vw]", {
            flex: !isMobile,
            "h-full grid grid-flow-row auto-rows-auto ": isMobile,
          })}
          style={!isMobile ? { x } : undefined}
        >
          <AnimatePresence>
            {images.map((image, index) => (
              <CarouselSlide key={index} image={image} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioCarousel;
