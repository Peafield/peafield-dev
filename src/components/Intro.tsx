"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Divider from "./Divider";
import {
  RiBlueskyLine,
  RiGithubFill,
  RiMastodonFill,
  RiPixelfedFill,
} from "react-icons/ri";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Intro = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div
        variants={itemVariants}
        className="prose dark:prose-invert m-auto p-8 md:py-8 md:px-0"
      >
        <h1 className="font-openSans font-medium">Peter J Coles</h1>
      </motion.div>
      <motion.article
        variants={itemVariants}
        className="prose dark:prose-invert m-auto p-8 md:py-8 md:px-0"
      >
        <p>Hello, I’m Peter J Coles, a developer and creative type.</p>
        <div className="prose dark:prose-invert flex items-center">
          <motion.div
            animate={{
              y: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🧶
          </motion.div>
          <p className="ml-2">
            Full-stack developer @{" "}
            <Link
              href="https://yarn.family"
              target="_blank"
              className="font-inter hover:text-gray-700 hover:dark:text-gray-300 no-underline"
            >
              yarn
            </Link>
          </p>
        </div>
        <div className="prose dark:prose-invert flex items-center">
          <motion.div
            animate={{
              y: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            📚️
          </motion.div>
          <p className="ml-2">
            <em>Building Book Kin (coming soon)</em>
          </p>
        </div>
        <div className="prose dark:prose-invert flex items-center mb-8">
          <motion.div
            animate={{
              y: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💻️
          </motion.div>
          <p className="ml-2">
            Making things with Typescript, React, Python, Golang
          </p>
        </div>
        <p>
          I discovered coding later in life and found that it was what I've
          always wanted to do. I'm currently a full-stack developer at{" "}
          <Link href="https://yarn.family" target="_blank">
            yarn
          </Link>
          —an AI story creation tool for kids—where I focus on writing the
          front-end with Next.js.
        </p>
        <p>
          In my spare time, I’m busy building Book Kin—a platform to share your
          home library with friends and family.
        </p>
        <p>
          Before all this, I did a bit of acting, studied Japanese for many
          years, then{" "}
          <Link
            href="https://www.spreadtheword.org.uk/announcing-the-london-writers-awards-winners-2019/"
            target="_blank"
          >
            creative writing
          </Link>{" "}
          for a few more. I co-created a literary{" "}
          <Link
            href="https://bricklanebookshop.org/blb-podcast-all-episodes/"
            target="_blank"
          >
            podcast
          </Link>{" "}
          and even tried my hand at being a{" "}
          <Link href="https://www.youtube.com/@peafield9711" target="_blank">
            Minecraft Youtuber
          </Link>
          .{" "}
        </p>
        <p>
          This space will be a place for me to test ideas and share my thoughts.
        </p>
        <Divider />
        <p>You can find me on </p>
        <div className="flex-wrap sm:flex sm:flex-row gap-x-4 m-auto">
          <Link
            href="https://bsky.app/profile/peafield.dev"
            target="_blank"
            className="flex items-center"
          >
            <RiBlueskyLine className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
            <span className="ml-2">Bluesky</span>
          </Link>
          <Link
            href="https://github.com/Peafield"
            target="_blank"
            className="flex items-center"
          >
            <RiGithubFill className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
            <span className="ml-2">Github</span>
          </Link>
          <Link
            href="https://mastodon.world/@peafield"
            target="_blank"
            className="flex items-center"
          >
            <RiMastodonFill className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
            <span className="ml-2">Mastodon</span>
          </Link>
          <Link
            href="https://pxlmo.com/peafield"
            target="_blank"
            className="flex items-center"
          >
            <RiPixelfedFill className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
            <span className="ml-2">Pixelfed</span>
          </Link>
        </div>
      </motion.article>
    </motion.div>
  );
};

export default Intro;
