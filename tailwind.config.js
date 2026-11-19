/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#161817',
        char: '#242724',
        paper: '#F4F1E9',
        paper2: '#EBE7DC',
        rust: '#C46A39',
        rustdark: '#A9552A',
        concrete: '#C7C6C0',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Arial Narrow', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1360px' },
      letterSpacing: { label: '0.16em' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
}
