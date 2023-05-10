const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  plugins: [require('tw-elements/dist/plugin.cjs')],
  theme: {
    colors: {
      transparent: 'transparent',
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      dark: '#000000',
      gray: '#8492a6',
      white: '#fff',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
});
