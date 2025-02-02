/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Set Inter as the default sans-serif font
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        customGreen: "#4C7766", // Define your custom color here
        customDarkGreen: "#181F1C",
        customLightGreen: "#8eb8a9",
        customLightStoneBg: "#EBE6E0",
        customDarkBg: "1E1E1E",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-stroke": {
          "-webkit-text-stroke-width": "2px",
          "-webkit-text-stroke-color": "#2F5A4F" /* Adjust color here */,
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
