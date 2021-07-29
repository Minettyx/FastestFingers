module.exports = {
  important: true,
  darkMode: false, // or 'media' or 'class'
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {},
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active']
    }
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true
  }
}
