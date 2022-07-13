module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './store/**/*.{js,ts,jsx,tsx}', './services/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {},
  },
  background: {
    iconbg : '#f98a8d',
  },
  variants: {
    extend: {},
  },
  plugins: [],
}