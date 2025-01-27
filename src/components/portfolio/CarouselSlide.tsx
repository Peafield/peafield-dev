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
      <div className="relative w-dvw xl:w-full h-full xl:p-8 flex items-center justify-center">
        <div className="relative w-full aspect-[3/2] max-h-[calc(100vh-160px)]">
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-contain rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselSlide;
