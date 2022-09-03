/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '1/2': '50%',
      },
      minHeight: {
        '1/2': '50%',
      }
    },
  },
  plugins: [],
}
