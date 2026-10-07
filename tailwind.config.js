/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F5",
        cream: "#F3EFE7",
        ink: "#10201A",
        pine: "#14342B",
        moss: "#5B6B62",
        line: "#E7E0D5",
        leaf: "#15803D",
        leafdark: "#166534",
        gold: "#C08A2C",
        goldsoft: "#FAF0D7",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: [
          "Inter",
          "Noto Sans Devanagari",
          "Noto Sans Tamil",
          "Noto Sans Telugu",
          "Noto Sans Bengali",
          "Noto Sans Kannada",
          "Noto Sans Malayalam",
          "Noto Sans Gujarati",
          "Noto Sans Gurmukhi",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,32,26,0.06), 0 8px 24px -12px rgba(16,32,26,0.18)",
        pop: "0 12px 40px -12px rgba(16,32,26,0.28)",
      },
    },
  },
  plugins: [],
};
