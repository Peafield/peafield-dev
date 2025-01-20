import Image from "next/image";
import { useState } from "react";
import CarouselSlide from "./CarouselSlide";

type CarouselDirection = "next" | "prev" | null;

type CarouselProps = {
  images: string[];
};

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<CarouselDirection>(null);

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection("prev");

    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-96 mx-auto">
      {images.map((image, index) => (
        <CarouselSlide key={index} image={image} />
      ))}
    </div>
  );
};

export default Carousel;
