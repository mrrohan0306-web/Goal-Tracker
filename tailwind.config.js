/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Libre Baskerville', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Pastel month colors
        'month-jan': '#D4E6D4', // light green
        'month-feb': '#E8D4E8', // light purple
        'month-mar': '#FFE0CC', // light red/orange
        'month-apr': '#9E9E9E', // dark grey
        'month-may': '#5C6BC0', // dark blue
        'month-jun': '#E3F2FD', // light blue
        'month-jul': '#FFF9C4', // yellow
        'month-aug': '#FFE0B2', // peach
        'month-sep': '#E8F5E9', // soft green
        'month-oct': '#F3E5F5', // lavender
        'month-nov': '#FFE0CC', // coral
        'month-dec': '#B2DFDB', // teal
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
