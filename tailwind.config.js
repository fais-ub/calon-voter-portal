/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ub: {
          blue: {
            50: '#F0F5FA',
            100: '#D9E6F3',
            200: '#B3CEE7',
            600: '#00438F',
            700: '#003573',
            800: '#002D62', // Official Biru Brawijaya
            900: '#001D40',
            950: '#001126',
          },
          gold: {
            50: '#FFFDF5',
            100: '#FDF6E2',
            200: '#FBEDB8',
            400: '#F0BC4A',
            500: '#E5A823', // Official Surya Majapahit Gold
            600: '#C88D15',
            700: '#A6720D',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
