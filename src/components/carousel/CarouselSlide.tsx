import { motion } from "framer-motion";
import Image from "next/image";

type CarouselSlideProps = {
  image: string;
  imgIndex: number;
  currentIndex: number;
};

const CarouselSlide = ({
  image,
  imgIndex,
  currentIndex,
}: CarouselSlideProps) => {
  return (
    <motion.div
      className="aspect-video w-[80%] lg:w-full shrink-0 rounded-xl object-cover"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      animate={{
        scale: imgIndex === currentIndex ? 0.95 : 0.85,
        opacity: imgIndex === currentIndex ? 1 : 0.5,
      }}
    />
  );
};
export default CarouselSlide;
