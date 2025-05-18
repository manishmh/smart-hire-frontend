// tailwind.config.js
module.exports = {
  darkMode: 'class', // enables class-based dark mode
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#07080A',
        },
        foreground: {
          light: '#1f1f1f',
          dark: '#ffffff',
        },
        primary: {
          light: '#f4f4f5',
          dark: '#111827',
        },
        accent: {
          light: '#3b82f6',
          dark: '#2563eb',
        },
      },
    },
  },
  plugins: [],
};