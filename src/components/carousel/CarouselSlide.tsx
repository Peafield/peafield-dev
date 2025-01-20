import Image from "next/image";

type CarouselSlideProps = {
  image: string;
};

const CarouselSlide = ({ image }: CarouselSlideProps) => {
  return (
    <div className="relative size-full">
      <Image src={image} alt="carousel image" fill className="object-cover" />
    </div>
  );
};
export default CarouselSlide;
