/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '420px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
       sans: ["Graphik", "sans-serif"],
       serif: ["Merriweather", 'serif'] 
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      margin: {
        1: "16px",
        2: "16px",
        3: "18px",
        4: "20px",
      },
      colors: {}
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

