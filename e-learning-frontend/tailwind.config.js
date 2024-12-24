/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add any other paths that will use Tailwind
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e90ff',  // Example color
        secondary: '#f6f8fa',
      },
      // You can add custom fonts, breakpoints, etc. here
    },
  },
  plugins: [],
};
