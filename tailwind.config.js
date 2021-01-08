module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      cursor: {
        'ew-resize': 'ew-resize',
        'ns-resize': 'ns-resize',
        'sw-resize': 'sw-resize',
        'se-resize': 'se-resize',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
