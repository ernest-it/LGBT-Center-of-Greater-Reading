/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#217F93',
          light: '#A1CFD8',
          dark: '#1A6577',
        },
        secondary: {
          DEFAULT: '#0D3B49',
          dark: '#06232C',
        },
        accent: {
          DEFAULT: '#7200F3',
          light: '#8B2DF5',
        },
        green: {
          DEFAULT: '#4B916D',
        },
        cream: '#FFFDF8',
        dark: '#151414',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0D3B49 0%, #217F93 50%, #7200F3 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(13,59,73,0) 0%, rgba(13,59,73,0.8) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(33,127,147,0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(33,127,147,0.8), 0 0 40px rgba(114,0,243,0.3)' },
        },
      },
    },
  },
  plugins: [],
};
