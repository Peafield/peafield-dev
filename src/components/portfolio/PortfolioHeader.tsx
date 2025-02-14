import { containerVariants, itemVariants } from "@/constants/constants";
import { useUiStore } from "@/store/ui";
import { PortfolioItem } from "@/types/portfolio";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RiExternalLinkLine, RiGithubFill } from "react-icons/ri";
import ImageDescription from "./ImageDescription";
import YarnHeader from "./YarnHeader";

type PortfolioHeaderProps = {
  item: PortfolioItem;
};
const PortfolioHeader = ({ item }: PortfolioHeaderProps) => {
  const { isMobile } = useUiStore();
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    // Header Container
    <motion.header
      ref={headerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[70vh] flex xl:items-center xl:justify-center xl:px-16 relative"
    >
      {/* Header Items Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex p-4 xl:w-1/2 xl:p-16 xl:items-center xl:justify-center"
      >
        <section className="flex flex-col xl:items-start xl:justify-center gap-y-4">
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
            className="flex items-center justify-start gap-[2vw] xl:prose xl:dark:prose-invert"
          >
            <p className="text-start xl:text-xl dark:font-light pt-1 text-lime-700 dark:text-lime-300">
              <span className="text-black dark:text-white font-medium">
                Made with:
              </span>{" "}
              {item.technologies.join("   ")}
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="font-light flex items-center xl:prose xl:dark:prose-invert"
          >
            <p className="xl:text-xl">{item.projectOverview}</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-start gap-4 xl:prose xl:dark:prose-invert"
          >
            <p className="text-start xl:text-xl font-light pt-1">
              <span className="text-black dark:text-white font-medium">
                Role:
              </span>{" "}
              {item.roles}
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href={item.links.live} target="_blank">
              <p className="text-start font-light xl:text-xl text-lime-700 dark:text-lime-300 hover:text-gray-700 hover:dark:text-gray-300 flex items-center gap-1">
                <RiExternalLinkLine />
                Live
              </p>
            </Link>
          </motion.div>
          {item.links.repo && (
            <motion.div variants={itemVariants}>
              <Link href={item.links.repo} target="_blank">
                <p className="text-start font-light xl:text-xl text-lime-700 dark:text-lime-300 hover:text-gray-700 hover:dark:text-gray-300 flex items-center gap-1">
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
          className="w-1/2 h-full p-4 flex flex-none flex-col items-center justify-start"
        >
          <motion.figure className="size-full flex items-center justify-center">
            <div className="relative">
              <img
                className="aspect-3/2 object-cover rounded-xl shadow-xl dark:shadow-none"
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
