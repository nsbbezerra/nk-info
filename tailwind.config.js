/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Fira Sans", "sans-serif"],
      serif: ["Fira Sans", "serif"],
    },
    extend: {},
    backgroundImage: {
      backgroundBulbs: "url('../public/img/bulbs.jpg')",
    },
  },
  plugins: [],
};
