"use client";

import { useTheme } from "next-themes";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="text-black dark:text-white"
      onClick={handleToggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <RiSunLine className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2 }}
          >
            <RiMoonLine className="size-6 hover:text-gray-700 hover:dark:text-gray-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default DarkModeToggle;
