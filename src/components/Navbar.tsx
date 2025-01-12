"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import DarkModeToggle from "./buttons/DarkModeToggle";
import { RiBlueskyLine, RiGithubFill } from "react-icons/ri";
const Navbar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const logoText = "Peafield.dev".split("");

  const navLinks = [
    { id: 1, text: "Blog", path: "/blog" },
    { id: 2, text: "Portfolio", path: "/portfolio" },
    { id: 3, text: "Contact", path: "/contact" },
  ];
  return (
    <nav className="bg-white dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Home */}
        <div>
          <Link href="/">
            <motion.span className="font-openSans font-medium text-black dark:text-white">
              {logoText.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 1, y: -20 }}
                  animate={{
                    opacity: [1, 0, 1],
                    y: [-20, 0, -20],
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 8,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </Link>
        </div>

        {/* Nav links */}
        <div>
          <ul className="flex gap-x-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.path}
                  className="font-openSans font-medium text-black dark:text-white hover:text-gray-700 hover:dark:text-gray-300"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Socials and utils */}
        <div className="flex gap-x-4 items-center justify-center">
          <Link href="https://bsky.app/profile/peafield.dev">
            <RiBlueskyLine className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
          </Link>
          <Link href="https://github.com/Peafield">
            <RiGithubFill className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
