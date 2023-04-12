const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brokman: ["var(--font-Brokman)", ...fontFamily.sans],
        righteous: ["var(--font-Righteous)", ...fontFamily.sans],
        hammersmith: ["var(--font-Hammersmith)", ...fontFamily.sans],
        laila: ["var(--font-Laila)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
