module.exports = {
  purge: [
    "./public/**/*.html",
    "./src/**/*.vue"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '4/5': '80%',
      '9/10': '90%',
      'full': '100%'
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      transitionDelay: ['hover']
    },
  },
  plugins: [
  ],
}
