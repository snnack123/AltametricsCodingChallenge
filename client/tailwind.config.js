/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7E4590',
        secondary: '#F3F2FE',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

