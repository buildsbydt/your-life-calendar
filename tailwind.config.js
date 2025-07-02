/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1) Tell Tailwind where to find your templates:
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],

  // 2) (Optional) Extend the default theme here:
  theme: {
    extend: {},
  },

  // 3) No extra plugins needed for now:
  plugins: [],
}
