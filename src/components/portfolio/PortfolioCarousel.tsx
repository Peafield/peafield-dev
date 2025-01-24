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

type PortfolioCarouselProps = {
  images: string[];
};

const PortfolioCarousel = ({ images }: PortfolioCarouselProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outerRef });
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [maxScrollDistance, setMaxScrollDistance] = useState<number>(0);

  useEffect(() => {
    if (outerRef.current && gridRef.current) {
      const containerWidth = outerRef.current.offsetWidth;
      const contentWidth = gridRef.current.scrollWidth;
      const totalShift = contentWidth - containerWidth;

      if (totalShift <= 0) {
        setContainerHeight(window.innerHeight);
        setMaxScrollDistance(0);
        return;
      }

      const newContainerHeight = window.innerHeight + totalShift;
      setContainerHeight(newContainerHeight);
      setMaxScrollDistance(totalShift);
    }
  }, [images]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollDistance]);
  return (
    // Carousel
    <div
      style={{ height: containerHeight ? `${containerHeight}px` : "100vh" }}
      ref={outerRef}
    >
      {/* Carousel Container */}
      <div className="h-dvh overflow-hidden sticky top-0 flex items-center justify-start">
        {/* Slides */}
        <motion.div
          ref={gridRef}
          variants={itemVariants}
          className="grid grid-flow-col auto-cols-auto gap-[1vw] py-8"
          style={{ x }}
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
