import { motion } from "framer-motion";

const SVGPortfolioArrowAnimation = () => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const lineVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0, // Add opacity: 0 to make lines completely invisible
    },
    visible: {
      pathLength: 1,
      opacity: 1, // Fade in the lines
      transition: {
        pathLength: {
          duration: 1,
          ease: "easeInOut",
          delay: 2,
        },
        opacity: {
          duration: 0.01, // Quick opacity transition
          delay: 2, // Start showing when animation begins
        },
      },
    },
  };

  return (
    <motion.svg
      className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7bba56" />
          <stop offset="100%" stopColor="#9556ba" />
        </linearGradient>
      </defs>
      {/* Main animated path */}
      <motion.path
        d="M112,0 L112,60 L50,60 L50,90"
        fill="none"
        stroke="url(#gradient)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        variants={pathVariants}
      />
      {/* Left side of the V */}
      <motion.line
        x1="50"
        y1="90"
        x2="48"
        y2="88"
        stroke="#7bba56"
        strokeWidth="1"
        strokeLinecap="round"
        variants={lineVariants}
      />
      {/* Right side of the V*/}
      <motion.line
        x1="50"
        y1="90"
        x2="52"
        y2="88"
        stroke="#7bba56"
        strokeWidth="1"
        strokeLinecap="round"
        variants={lineVariants}
      />
    </motion.svg>
  );
};

export default SVGPortfolioArrowAnimation;
