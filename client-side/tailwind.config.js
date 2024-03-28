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
    // spacing: {
    //   '1': '8px',
    //   '2': '12px',
    //   '3': '16px',
    //   '4': '24px',
    //   '5': '32px',
    //   '6': '48px',
    // },
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
      colors: {
        "spec-black-50": "#4A4A4A",
        "spec-black-75": "#1D1D1D",
        "spec-black-100": "#181818",
        "spec-black-125": "#101010",
        "spec-black-150": "#000000",

        "spec-blue-50": "#CAF0F8",
        "spec-blue-75": "#90EDEF",
        "spec-blue-100": "#00B4D8",
        "spec-blue-125": "#0077B6",
        "spec-blue-150": "#03045E",

        "spec-white-50": "#FFFFFF",
        "spec-white-75": "#F1F1F1",
        "spec-white-100": "#E7E7E7",
        "spec-white-125": "#B0B0B0",
        "spec-white-150": "#818181",

      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

