import { containerVariants, itemVariants } from "@/constants/constants";
import { useUiStore } from "@/store/ui";
import { PortfolioItem } from "@/types/portfolio";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiExternalLinkLine, RiGithubFill } from "react-icons/ri";
import ImageDescription from "../portfolio/ImageDescription";
import YarnHeader from "../portfolio/YarnHeader";
import { useEffect, useRef, useState } from "react";
import { p } from "framer-motion/client";
import { set } from "zod";

type PortfolioHeaderProps = {
  item: PortfolioItem;
};
const PortfolioHeader = ({ item }: PortfolioHeaderProps) => {
  const { isMobile } = useUiStore();
  const headerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [pathData, setPathData] = useState("");
  const [leftV, setLeftV] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [rightV, setRightV] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 5,
        ease: "easeInOut",
      },
    },
  };

  const lineVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1,
          ease: "easeInOut",
          delay: 5,
        },
        opacity: {
          duration: 0.01,
          delay: 5,
        },
      },
    },
  };

  useEffect(() => {
    const updatePath = () => {
      if (headerRef.current) {
        const { width, height } = headerRef.current.getBoundingClientRect();
        const startX = 0;
        const startY = height * 0.99;
        const maxStart = width * 0.02;
        const nextY = height * 0.1;
        const maxEnd = width * 0.99;
        const mid = width / 2;
        const maxHeight = height * 0.95;
        const turnIn = height * 0.8;
        const leftX2 = mid - 50;
        const leftY2 = maxHeight - 50;
        const rightX2 = mid + 50;
        const rightY2 = maxHeight - 50;
        const newPath = `M${startX},${startY} L${maxStart},${startY} L${maxStart},${nextY} L${maxEnd},${nextY} L${maxEnd},${turnIn} L${mid}, ${turnIn} L${mid}, ${maxHeight}`;
        setPathData(newPath);
        setLeftV({ x1: mid, y1: maxHeight, x2: leftX2, y2: leftY2 });
        setRightV({ x1: mid, y1: maxHeight, x2: rightX2, y2: rightY2 });

        // Optionally update the viewBox too
        if (svgRef.current) {
          svgRef.current.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }
      }
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, []);

  return (
    // Header Container
    <motion.header
      ref={headerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[70vh] flex md:items-center md:justify-center md:p-16 relative"
    >
      <motion.svg
        ref={svgRef}
        className="absolute w-full h-full pointer-events-none"
        preserveAspectRatio={"xMinYmin meet"}
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
          d={pathData}
          fill="none"
          stroke="url(#gradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
          variants={pathVariants}
        />
        {/* Left side of the V */}
        <motion.line
          x1={leftV.x1}
          y1={leftV.y1}
          x2={leftV.x2}
          y2={leftV.y2}
          stroke="#7bba56"
          strokeWidth="16"
          strokeLinecap="round"
          variants={lineVariants}
        />
        {/* Right side of the V*/}
        <motion.line
          x1={rightV.x1}
          y1={rightV.y1}
          x2={rightV.x2}
          y2={rightV.y2}
          stroke="#7bba56"
          strokeWidth="16"
          strokeLinecap="round"
          variants={lineVariants}
        />
      </motion.svg>
      {/* Header Items Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex p-4 md:w-1/2 md:p-16 md:items-center md:justify-center"
      >
        <section className="flex flex-col md:items-start md:justify-center gap-y-4">
          <motion.div variants={itemVariants}>
            <Link href={item.links.other || ""} target="_blank">
              {item.name === "Yarn" ? (
                <YarnHeader />
              ) : (
                <h1 className="text-4xl text-start font-bold hover:text-gray-700 hover:dark:text-gray-300">
                  {item.name}
                </h1>
              )}
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-start gap-[2vw] md:prose md:dark:prose-invert"
          >
            <p className="text-start md:text-2xl dark:font-light pt-1 text-lime-700 dark:text-lime-300">
              <span className="text-black dark:text-white font-medium">
                Made with:
              </span>{" "}
              {item.technologies.join("   ")}
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="font-light flex items-center md:prose md:dark:prose-invert"
          >
            <p className="md:text-2xl">{item.projectOverview}</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-start gap-4 md:prose md:dark:prose-invert"
          >
            <p className="text-start md:text-2xl font-light pt-1">
              <span className="text-black dark:text-white font-medium">
                Role:
              </span>{" "}
              {item.roles}
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href={item.links.live} target="_blank">
              <p className="text-start font-light md:text-2xl text-lime-700 dark:text-lime-300 hover:text-gray-700 hover:dark:text-gray-300 flex items-center gap-1">
                <RiExternalLinkLine />
                Live
              </p>
            </Link>
          </motion.div>
          {item.links.repo && (
            <motion.div variants={itemVariants}>
              <Link href={item.links.repo} target="_blank">
                <p className="text-start font-light md:text-2xl text-lime-700 dark:text-lime-300 hover:text-gray-700 hover:dark:text-gray-300 flex items-center gap-1">
                  <RiGithubFill />
                  Repo
                </p>
              </Link>
            </motion.div>
          )}
        </section>
      </motion.div>
      {!isMobile && (
        // Header Image Container
        <motion.section
          variants={itemVariants}
          className="w-1/2 h-full p-4 flex flex-none flex-col items-center justify-center"
        >
          <motion.figure className="size-full flex items-center justify-center">
            <div className="relative">
              <img
                className="aspect-3/2 object-cover rounded-lg shadow-lg dark:shadow-none"
                src={item.image.hero.src}
                alt={item.image.hero.description}
              />
              <ImageDescription description={item.image.hero.description} />
            </div>
          </motion.figure>
          .
        </motion.section>
      )}
    </motion.header>
  );
};

export default PortfolioHeader;
