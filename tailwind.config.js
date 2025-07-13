/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      light: '#f7f7f7',
      black: '#000000',
      grey: '#333e48',
      accent: '#007298',
      active: '#016486',
      placeholder: '#cfcfcf',
      border: 'rgba(0, 0, 0, 0.12)',
      error: '#ff0000',
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        tablet: '32px',
        laptop: '48px',
        desktop: '160px',
      },
    },
    boxShadow: {
      s: '1px 1px 4px 0px rgba(0, 0, 0, 0.15)',
      l: '2px 0px 8px 0px rgba(0, 0, 0, 0.25)',
      inside:
        'rgba(0, 0, 0, 0.30) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.20) -3px -3px 6px 1px inset',
    },
    fontFamily: {
      'open-sans': ['"Open Sans"', 'sans-serif'],
    },
    transitionDuration: {
      DEFAULT: '250ms',
    },
  },
  plugins: [],
};
