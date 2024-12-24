/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2f70c1",
          secondary: "#7461c3",
          alternative: "#137886",
        },
        text: {
          body: "#36313d",
          highContrast: "#313131",
          mediumContrast: "#635e69",
          lowContrast: "#746d76",
        },
      },
      fontFamily: {
        spaceMono: ["SpaceMono", "monospace"],
        dmSansLight: ["DMSansLight", "sans-serif"],
        dmSansRegular: ["DMSansRegular", "sans-serif"],
        dmSansMedium: ["DMSansMedium", "sans-serif"],
        dmSansBold: ["DMSansBold", "sans-serif"],
        dmSansExtraBold: ["DMSansExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}