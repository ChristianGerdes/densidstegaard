module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#c05552",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
