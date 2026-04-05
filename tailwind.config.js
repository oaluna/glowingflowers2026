/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // A sophisticated, natural botanical palette
        brandCream: "#FAF9F6", // Soft, warm off-white background
        brandEarth: "#4A403A", // Deep warm brown/gray for highly readable text
        brandRose: "#C87979", // Elegant muted rose/terracotta for buttons and accents
        brandSage: "#8BA88E", // Soft sage green for secondary accents
      },
      animation: {
        // Our custom animation to make elements gently float onto the screen
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
