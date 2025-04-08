/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        custom:{
          grey:'#91969E',
          blackOverlay: 'rgba(0,0,0,0.5)',
          borderGrey: '#E2E8F0',
          yellow:'#EBCC00',
          textGrey:'#64748B'
        }
      },
      fontFamily:{
        ubuntuL: ['Ubuntu-Light'],
        ubuntu: ['Ubuntu-Regular'],
        ubuntuM: ['Ubuntu-Medium'],
        ubuntuB: ['Ubuntu-Bold']
      }
    },
  },
  plugins: [],
}