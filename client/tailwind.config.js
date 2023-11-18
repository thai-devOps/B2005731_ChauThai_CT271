/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          medium: '#845EC2'
        },
        blue: {
          cornFlower: '#2C73D2',
          azure: '#0081CF',
          teal: ' #0089BA'
        },
        green: {
          ocean: '#008E9B'
        },
        observatory: '"#008F7A',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        custom: {
          light: '#f6f6f9',
          primary: '#1976D2',
          lightprimary: '#CFE8FF',
          grey: '#eee',
          darkgrey: '#AAAAAA',
          dark: '#363949',
          danger: '#D32F2F',
          lightdanger: '#FECDD3',
          warning: '#FBC02D',
          lightwarning: '#FFF2C6',
          success: '#388E3C',
          lightsuccess: '#BBF7D0'
        }
      }
    }
  },
  plugins: []
}
