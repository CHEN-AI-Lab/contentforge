import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36aaf5",
          500: "#0c8ee7",
          600: "#0070c4",
          700: "#015a9f",
          800: "#064c83",
          900: "#0b406d",
          950: "#072849",
        },
        accent: {
          50: "#fef6ff",
          100: "#fceaff",
          200: "#f9d4ff",
          300: "#f4adff",
          400: "#ed7aff",
          500: "#db3dff",
          600: "#c016f0",
          700: "#a10dd2",
          800: "#870fad",
          900: "#70118c",
          950: "#4b0068",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
} satisfies Config;