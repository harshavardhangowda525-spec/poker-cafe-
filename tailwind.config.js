/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0C0B',
        forest: '#102A20',
        emerald: { DEFAULT: '#0E8F61', bright: '#16B57D' },
        ivory: '#F5F1E8',
        gold: '#C5A66A',
        mist: '#9AA39E',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.045em', label: '0.28em' },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
};
