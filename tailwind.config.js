module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: '#f0f7fa',
        primary: '#5493e7',
        'primary-dark': '#132338',
        accent: '#1cc589',
        success: {
          '200': '#D3F9BE',
          '600': '#40AF3C',
          '800': '#1A7625'
        },
        danger: {
          '200': '#FFDBC4',
          '600': '#DB594F',
          '800': '#93222C'
        },

      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
