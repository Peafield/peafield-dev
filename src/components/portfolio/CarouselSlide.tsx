"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ImageDescription from "./ImageDescription";

type CarouselSlideProps = {
  image: { src: string; description: string };
};

const CarouselSlide = ({ image }: CarouselSlideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      className="flex-shrink-0"
    >
      <div className="relative w-dvw aspect-[3/2] md:h-[80vh] md:w-[calc(80vh*1.5)]">
        <Image
          src={image.src}
          alt=""
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <ImageDescription description={image.description} />
      </div>
    </motion.div>
  );
};

export default CarouselSlide;
