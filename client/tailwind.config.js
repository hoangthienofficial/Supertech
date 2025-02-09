/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: 'var(--custom-color)',
      }
    },
    screens: {

      
      sm: '320px',
      sxm:"370px",
      ssm:"400px",
      ssm2:"428px",
      xmd:"640px",
      md: '768px',
      mdl:"820px",
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'xll':"1600px"
      
    },
  },
  plugins: [],
}

