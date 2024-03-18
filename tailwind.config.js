/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,tsx}',
    './src/layouts/**/*.{js,ts,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        blue: {
          primary: {
            100: '#47C2E92E',
            500: '#202f34',
          },
        },
        gray: {
          primary: {
            100: '#BAC1CC',
            500: '#BAC1CC1A',
            700: '#2B2C36',
            900: '#BAC1CC',
          },
        },
      },
      lineClamp: {
        2: '2',
      },
      keyframes: {
        like: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
      },
      animation: {
        like: 'like .5s ease-in-out',
      },
    },
  },
  plugins: [],
}
