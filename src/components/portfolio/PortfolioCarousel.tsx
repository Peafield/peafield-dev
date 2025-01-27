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

type PortfolioCarouselProps = {
  images: string[];
};

const PortfolioCarousel = ({ images }: PortfolioCarouselProps) => {
  const { isMobile } = useUiStore();
  const outerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    layoutEffect: false,
  });
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [maxScrollDistance, setMaxScrollDistance] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (outerRef.current && gridRef.current) {
      const containerWidth = outerRef.current.offsetWidth;
      const contentWidth = gridRef.current.scrollWidth;
      const totalShift = contentWidth - containerWidth;
      const baseHeight = window.innerHeight;
      const scrollableOverflow = Math.min(totalShift, containerWidth);
      const newContainerHeight = baseHeight + Math.max(0, scrollableOverflow);
      setContainerHeight(Math.min(newContainerHeight, baseHeight * 2));
      setMaxScrollDistance(Math.max(0, totalShift));
    }
  }, [images]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollDistance]);
  if (!isMounted) return null;
  return (
    // Carousel
    <div
      className="mb-8"
      style={{ height: containerHeight ? `${containerHeight}px` : "100svh" }}
      ref={outerRef}
    >
      {/* Carousel Container */}
      <div className="h-svh md:overflow-hidden md:sticky md:top-0 flex items-center justify-center xl:justify-start">
        {/* Slides */}
        <motion.div
          ref={gridRef}
          variants={itemVariants}
          className="grid grid-flow-row auto-rows-auto md:grid-flow-col md:auto-cols-[min(100vw,calc((100svh-160px)*1.5))] gap-[2vw]"
          style={isMobile ? {} : { x }}
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
