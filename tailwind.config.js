// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        '230': '230px',
      },
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
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
