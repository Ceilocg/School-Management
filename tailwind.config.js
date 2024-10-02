/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ensure you're scanning the correct files for Tailwind classes
  ],
  theme: {
    extend: {
      // Extend the theme here if needed (e.g., custom colors for dark/light modes)
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [],
}
