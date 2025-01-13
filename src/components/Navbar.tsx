"use client";

import useOutsideMenuClick from "@/hooks/useOutsideMenuClick";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  RiBlueskyLine,
  RiGithubFill,
  RiCloseFill,
  RiMenuFill,
} from "react-icons/ri";
import DarkModeToggle from "./buttons/DarkModeToggle";
const Navbar = () => {
  const [, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useOutsideMenuClick([menuRef, buttonRef], () => setIsMenuOpen(false));

  const logoText = "Peafield.dev".split("");

  const navLinks = [
    { id: 1, text: "Blog", path: "/blog" },
    { id: 2, text: "Portfolio", path: "/portfolio" },
    { id: 3, text: "Contact", path: "/contact" },
  ];
  return (
    <header>
      <nav>
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Home */}
          <div>
            <Link href="/">
              <motion.span className="font-openSans font-medium">
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
          <div className="flex gap-x-4">
            {/* Burger Menu */}
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center sm:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="X"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RiCloseFill className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="SquareMenu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RiMenuFill className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop Menu */}
            <div className="hidden sm:block">
              <ul className="flex gap-x-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.path}
                      className="font-openSans font-medium hover:text-gray-700 hover:dark:text-gray-300"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute top-16 left-0 right-0 bg-white dark:bg-black shadow-lg sm:hidden"
                >
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col p-4"
                  >
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: i * 0.1 }}
                        className="py-2"
                      >
                        <Link
                          href={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="font-openSans font-medium hover:text-gray-700 hover:dark:text-gray-300"
                          aria-disabled={true}
                        >
                          {link.text}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Socials and utils */}
            <div className="flex gap-x-4 items-center justify-center">
              <Link
                href="https://bsky.app/profile/peafield.dev"
                target="_blank"
              >
                <RiBlueskyLine className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
              </Link>
              <Link href="https://github.com/Peafield" target="_blank">
                <RiGithubFill className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
              </Link>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
