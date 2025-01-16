import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: "var(--font-open-sans)",
        inter: "var(--font-inter)",
      },
      colors: {
        terminal: "#7bba56",
        hoverColor: "#9556ba",
        error: "#BA567B",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
