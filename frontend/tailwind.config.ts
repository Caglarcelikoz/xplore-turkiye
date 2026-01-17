import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#faf9f7",
        foreground: "#182e32",
        primary: {
          DEFAULT: "#294d54",
          dark: "#182e32",
          light: "#3a6c76",
        },
        accent: {
          DEFAULT: "#d44e42",
          hover: "#b83a2f",
        },
        muted: {
          DEFAULT: "#eee8e3",
          foreground: "#3a6c76",
        },
        border: "#294d54",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
