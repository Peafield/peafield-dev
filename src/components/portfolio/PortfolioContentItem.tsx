import { PortfolioItem } from "@/types/portfolio";
import Link from "next/link";
import YarnHeader from "./YarnHeader";
import { RiExternalLinkLine, RiGithubFill } from "react-icons/ri";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/constants/constants";
import image from "next/image";
import ImageDescription from "./ImageDescription";
import { useUiStore } from "@/store/ui";

type PortfolioContentItemProps = {
  item: PortfolioItem[number];
};

const PortfolioContentItem = ({ item }: PortfolioContentItemProps) => {
  const { isMobile } = useUiStore();
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-y-4 p-4"
      >
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
          className="prose dark:prose-invert flex items-center justify-start gap-[2vw]"
        >
          <p className="text-start dark:font-light pt-1 text-lime-700 dark:text-lime-300">
            <span className="text-black dark:text-white font-medium">
              Made with:
            </span>{" "}
            {item.technologies.join("   ")}
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="prose dark:prose-invert font-light flex items-center"
        >
          <p>{item.projectOverview}</p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="prose dark:prose-invert flex items-center justify-start gap-4"
        >
          <p className="text-start font-light pt-1">
            <span className="text-black dark:text-white font-medium">
              Role:
            </span>{" "}
            {item.roles}
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href={item.links.live} target="_blank">
            <p className="text-start font-light text-lime-700 dark:text-lime-300 hover:text-gray-700 hover:dark:text-gray-300 flex items-center gap-1">
              <RiExternalLinkLine />
              Live
            </p>
          </Link>
        </motion.div>
        {item.links.repo && (
          <motion.div variants={itemVariants}>
            <Link href={item.links.repo} target="_blank">
              <p className="text-start font-light text-lime-700 dark:text-lime-300 hover:text-gray-700 hover:dark:text-gray-300 flex items-center gap-1">
                <RiGithubFill />
                Repo
              </p>
            </Link>
          </motion.div>
        )}
      </motion.div>
      {!isMobile && (
        <motion.div
          variants={itemVariants}
          className="relative w-full aspect-[3/2] md:max-h-[calc(100svh-160px)]"
        >
          <Image
            src={item.image.hero.src}
            alt=""
            fill
            className="object-contain rounded-lg"
          />
          <ImageDescription description={item.image.hero.description} />
        </motion.div>
      )}
    </>
  );
};

export default PortfolioContentItem;
