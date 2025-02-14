import { motion, useScroll, useTransform } from "framer-motion";

const SVGPortfolioCurveOnScroll = () => {
  // Get the scroll progress (0 = top, 1 = bottom)
  const { scrollYProgress } = useScroll();

  // Map scroll progress to a drawing progress (from 0 to 1)
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pathD = "M5 0 Q150 40 20 70 T60 140 T40 180 L40 200";

  return (
    <motion.svg
      className="absolute w-full h-full pointer-events-none"
      viewBox="0 0 100 200"
      preserveAspectRatio={"none"}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7bba56" />
          <stop offset="100%" stopColor="#9556ba" />
        </linearGradient>
      </defs>
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#gradient)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        style={{ pathLength }}
      />
    </motion.svg>
  );
};

export default SVGPortfolioCurveOnScroll;
