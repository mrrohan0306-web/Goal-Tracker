/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ['Caveat', 'Patrick Hand', 'Indie Flower', 'cursive'],
      },
      colors: {
        // Month hover colors - soft, pastel tones
        'month-jan': '#E3F2FD', // light blue
        'month-feb': '#F3E5F5', // lavender
        'month-mar': '#E8F5E9', // soft green
        'month-apr': '#FFE0B2', // peach
        'month-may': '#B2F5EA', // mint
        'month-jun': '#FFF9C4', // yellow
        'month-jul': '#E1F5FE', // sky blue
        'month-aug': '#FFE0CC', // coral
        'month-sep': '#D4E6D4', // olive green
        'month-oct': '#FFD4A3', // orange
        'month-nov': '#E8D4E8', // plum
        'month-dec': '#B2DFDB', // teal
      },
    },
  },
  plugins: [],
}
