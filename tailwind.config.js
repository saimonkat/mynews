/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        gray: {
          primary: {
            700: '#2B2C36',
          },
        },
      },
      keyframes: {
        like: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
        },
      },
      animation: {
        like: 'like .5s ease-in-out',
      },
    },
  },
  plugins: [],
}
