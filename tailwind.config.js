/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#CD5C08',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      }, 
    },
  },
  plugins: [],
}
