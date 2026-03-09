/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#217F93',
          50: '#e6f4f7',
          100: '#b3dde5',
          200: '#80c6d3',
          300: '#4dafc1',
          400: '#2698af',
          500: '#217F93',
          600: '#1b6777',
          700: '#154f5b',
          800: '#0f373f',
          900: '#091f23',
        },
        navy: {
          DEFAULT: '#0D3B49',
          50: '#e5eef1',
          100: '#b3cdd6',
          200: '#80acbb',
          300: '#4d8ba0',
          400: '#266a85',
          500: '#0D3B49',
          600: '#0b313d',
          700: '#092731',
          800: '#071d25',
          900: '#051319',
        },
        purple: {
          DEFAULT: '#7200F3',
          50: '#f0e5fe',
          100: '#d1b3fc',
          200: '#b280fa',
          300: '#934df8',
          400: '#7a26f6',
          500: '#7200F3',
          600: '#5e00c8',
          700: '#4a009d',
          800: '#360072',
          900: '#220047',
        },
        cream: {
          DEFAULT: '#FFFDF8',
          50: '#FFFDF8',
          100: '#FFF9ED',
        },
      },
    },
  },
  plugins: [],
};
