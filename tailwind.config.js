 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0088cc',
        'light-blue': '#54a9eb',
        'dark-blue': '#006bb3',
        'message-out': '#effdde',
        'message-in': '#ffffff',
        'dark': {
          'bg': '#1a1a1a',
          'surface': '#2d2d2d',
          'text': '#ffffff',
          'text-secondary': '#a0a0a0',
          'border': '#404040',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'bounce-dot': 'bounce-dots 1.4s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}