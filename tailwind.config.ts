import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: "var(--font-open-sans)",
        inter: "var(--font-inter)",
      },
    },
  },
  plugins: [],
} satisfies Config;
