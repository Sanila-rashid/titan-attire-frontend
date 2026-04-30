/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",      // classic gold
        beige: "#F5F5DC",     // light beige background
        darkblack: "#111111", // deep black for cards/sidebar
      },
    },
  },
  plugins: [],
}
