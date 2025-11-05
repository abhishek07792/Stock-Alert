/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#0e141b',
        primary: '#6366f1', // Indigo
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 15px rgba(99,102,241,0.5)',
      },
    },
  },
  plugins: [],
};

