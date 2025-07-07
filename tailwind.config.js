/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add the new font family here
      fontFamily: {
        'covered-by-your-grace': ['"Covered By Your Grace"', 'cursive'],
        // You can keep old fonts here if you want to switch between them
        'indie-flower': ['"Indie Flower"', 'cursive'],
        'rubik-80s-fade': ['"Rubik 80s Fade"', 'system-ui'],
      },
    },
  },
  plugins: [],
}