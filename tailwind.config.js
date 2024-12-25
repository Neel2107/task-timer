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
          primary: "#7F3DFF",
          disabled_primary: "#9b6ff4",  
          secondary: "#7461c3",
          disabled_secondary: "#9c87d0",  
          alternative: "#137886",
          disabled_alternative: "#3d919b",  
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