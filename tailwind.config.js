/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        loginBg: "url('/images/loginBg.jpg')",
      },
      boxShadow: {
        'inner-upper': '0px 25px 50px 0px rgba(15,15,15,0.9) inset',
        'inner-lower': '0px -75px 50px 0px rgba(15,15,15,0.9) inset',
      },
    },
  },
  plugins: [],
};
