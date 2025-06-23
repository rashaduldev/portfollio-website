module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        circleFloat: "circleFloat 12s ease-in-out infinite",
        circleFloatReverse: "circleFloatReverse 14s ease-in-out infinite",
        imageFloat: "imageFloat 10s ease-in-out infinite",
      },
      keyframes: {
        circleFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        circleFloatReverse: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(10px) rotate(-5deg)" },
        },
        imageFloat: {
          "0%, 100%": { transform: "scale(1) translateY(0)" },
          "50%": { transform: "scale(1.02) translateY(-5px)" },
        },
      },
    },
  },

  plugins: [],
};
