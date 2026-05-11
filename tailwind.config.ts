import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pixley brand palette (from ui-design-notes.md)
        cream: "#FFF6E8",
        sand: "#F6E4C6",
        coral: "#F25F5C",
        teal: "#2EC4A2",
        sunshine: "#FFC857",
        cocoa: "#2B1D12",
        warmbrown: "#7A5F4B",
        coraltint: "#FCEBEB",
        bluetint: "#E6F1FB",
        greentint: "#EAF3DE",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        video: "20px",
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
