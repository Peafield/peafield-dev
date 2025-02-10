import { containerVariants, itemVariants } from "@/constants/constants";
import { useUiStore } from "@/store/ui";
import { PortfolioItem } from "@/types/portfolio";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiExternalLinkLine, RiGithubFill } from "react-icons/ri";
import ImageDescription from "../portfolio/ImageDescription";
import YarnHeader from "../portfolio/YarnHeader";

type PortfolioHeaderProps = {
  item: PortfolioItem;
};
const PortfolioHeader = ({ item }: PortfolioHeaderProps) => {
  const { isMobile } = useUiStore();

  return (
    // Header Container
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[70vh] flex md:items-center md:justify-center md:p-16 relative"
    >
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
