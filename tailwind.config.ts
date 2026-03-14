import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f7f1eb",
        rosewater: "#efe6e1",
        stone: "#645d58",
        ink: "#1f1a17",
        mist: "#fbf9f7",
        line: "#e8ddd6",
        pine: "#52635c",
      },
      boxShadow: {
        card: "0 18px 40px rgba(31, 26, 23, 0.08)",
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
