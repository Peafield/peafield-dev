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
    >
      <div className="relative w-screen aspect-video">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover rounded-lg"
        />
      </div>
    </motion.div>
  );
};

export default CarouselSlide;
