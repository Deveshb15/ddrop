module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-black' : '#111111',
        'light-black' : '#121212',
        'light-violet' :  '#D8B4FE',
        'light-blue' : '#818CF8',
        'blue-opaque' : '#101629',
        'purple-light' : '#6406CD'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
