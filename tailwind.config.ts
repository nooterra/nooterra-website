import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base
        void: "#030711",
        substrate: "#0a1128",
        horizon: "#141b3a",

        // Semantic
        signal: "#00d9ff",
        execute: "#7c3aed",
        settle: "#06ffa5",
        warn: "#ff6b9d",

        // Text
        primary: "#f8fafc",
        secondary: "#cbd5e1",
        tertiary: "#64748b",
        code: "#e879f9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
export default config;