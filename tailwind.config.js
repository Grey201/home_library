/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, ts,tsx}"],
  theme: {
    colors: {
      textcolor: "#6c757d",
      primary: "#fff",
      secondary: "#153D77",
      accent: "#E9ECEF",
      black: "#1E293B",
      white: "#F3F6FB",
    },

    fontFamily: {
      sans: ["Hind Vadodara", "sans-serif"],
      serif: ["Jost", "serif"],
    },

    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
