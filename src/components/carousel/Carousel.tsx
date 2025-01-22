import { useEffect, useRef, useState } from "react";
import CarouselSlide from "./CarouselSlide";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";

type CarouselDirection = "next" | "prev" | null;

type CarouselProps = {
  images: string[];
};

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<CarouselDirection>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const endOfSlides = images.length - 1 === currentIndex;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const slideWidth = carouselRef.current?.children[0]?.clientWidth || 0;
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * slideWidth
      }px)`;
    }
  }, [currentIndex]);

  // TODO: Redo animations with framer-motion
  return (
    <div className="relative w-full h-96 mx-auto overflow-hidden">
      {/* Container */}
      <div
        ref={carouselRef}
        role="slider"
        aria-label="carousel"
        className="flex size-full cursor-pointer transition-transform duration-500 ease-in-out"
        style={{
          width: `${images.length * 100}%`,
        }}
      >
        {/* Slides */}
        {images.map((image, index) => (
          <CarouselSlide key={index} image={image} />
        ))}
      </div>
      {/* Navigation */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:animate-pulse"
          onClick={prevSlide}
        >
          <RiArrowLeftWideLine className="mobile:size-8 md:size-16" />
        </button>
      )}
      {!endOfSlides && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:animate-pulse"
          onClick={nextSlide}
        >
          <RiArrowRightWideLine className="mobile:size-8 md:size-16" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
