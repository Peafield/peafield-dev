type PortfolioCarouselSlideProps = {
  image: { src: string; description: string };
};

const PortfolioCarouselSlide = ({ image }: PortfolioCarouselSlideProps) => {
  return (
    <li className="w-[100vw] h-[100vh] flex flex-none flex-col items-center justify-center">
      <img className="w-96 h-80" src={image.src} alt={image.description} />
      <h3>{image.description}</h3>
    </li>
  );
};

export default PortfolioCarouselSlide;
