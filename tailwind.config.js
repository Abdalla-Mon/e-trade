/** @type {import('tailwindcss').Config} */
export default {
  important: true,

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tab: "768px",
      // => @media (min-width: 768px) { ... }

      lap: "992px",
      // => @media (min-width: 992px) { ... }

      pc: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },

  plugins: [],
};
