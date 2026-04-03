/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // We can add custom theme colors here later!
        brandDark: "#1a1a1a",
        brandPink: "#ec4899",
      },
    },
  },
  plugins: [],
};
