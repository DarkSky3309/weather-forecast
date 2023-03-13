/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage:{
        'cold': "url('/src/assets/bc-cold.png')",
      },
      colors:{
        'deep-cold': '#4D7A98'
      },
      spacing:{
        'header': '88px',
        'current-weather': "363px",
        'mobile-current-weather': "315px"
      }
    },
  },
  plugins: [],
}