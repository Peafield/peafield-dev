import type { Config } from "tailwindcss";

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
        textLight: "#333333",
        textDark: "#00FF41",
      },
    },
  },
  plugins: [],
} satisfies Config;
