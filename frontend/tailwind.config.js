/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'false',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    
    
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000",
          'primary': "#495057",
          'secondary': "#868e96",
        },
        blue: {
          primary: "rgb(34, 139, 230)"
        },
        purple: {
          primary: "#6C60F6"
        },
        green: {
          primary: "#007a5a",
        },
        red:{
          primary:"#ef4444"
        },
        slack: {
          200: "#482B4F",
          300: "#522653",
          DEFAULT: "#3F0E40",
        },
        slack_blue: {
          DEFAULT: "#1164A3",
        }
      },
      fontSize: {
        'xxs': ['10px', '12px']
      },
      animation: {
        'text': 'text 5s ease infinite',
      },
      keyframes: {
        'text': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
      }
    },
  },
  plugins: [],
}
