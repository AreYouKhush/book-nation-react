/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01231f",
        secondary: "#294f4a",
      },
      fontFamily: {
        fira: ['Fira Sans'],
        oxygen: ['Oxygen'],
        radio: ['Radio Canada']
      },
      screens:{
        xs: '475px'
      }
    },
  },
  plugins: [],
}