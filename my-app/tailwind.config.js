/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#bfd732",
      },
      fontFamily: {
        sans: ["Heebo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
