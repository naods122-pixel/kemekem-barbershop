/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // App uses zinc-850 (between zinc-800 and zinc-900) in a few places —
      // add it so Tailwind includes it in the build.
      colors: {
        zinc: {
          750: '#333338',
          850: '#1e1e23',
        },
      },
      // Smooth font-rendering throughout
      fontFamily: {
        sans: [
          'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
      },
      // Extended animation for the booking modal fade
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out both',
      },
    },
  },
  plugins: [],
}
