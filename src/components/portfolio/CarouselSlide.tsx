"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type CarouselSlideProps = {
  image: string;
};

const CarouselSlide = ({ image }: CarouselSlideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    >
      <div className="relative w-dvw xl:w-full h-full xl:p-8 flex items-center justify-center">
        <div className="relative w-full aspect-[3/2] max-h-[calc(100svh-160px)]">
          <Image
            src={image}
            alt=""
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselSlide;
