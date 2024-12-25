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
        },
        text: {
          body: "#36313d",
        },
        default_bg: "#e6e6e6"
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