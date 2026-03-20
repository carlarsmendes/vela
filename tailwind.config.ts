import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f5eee7",
        bone: "#f8f3ed",
        rosewater: "#ece2db",
        stone: "#665f59",
        ink: "#201c19",
        mist: "#fcfaf7",
        line: "#ddd1c7",
        pine: "#54685a",
        moss: "#3f5646",
        clay: "#9e7765",
      },
      boxShadow: {
        card: "0 18px 40px rgba(32, 28, 25, 0.07)",
        panel: "0 10px 24px rgba(63, 86, 70, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        app: "32rem",
      },
    },
  },
  plugins: [],
};

export default config;
