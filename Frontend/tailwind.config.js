import scrollbar from 'tailwind-scrollbar-hide';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [scrollbar],
}