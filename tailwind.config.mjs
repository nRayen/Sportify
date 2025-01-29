/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0E0F11"
        },
        foreground: {
          DEFAULT: "#FFFFFF"
        },
        primary: {
          // DEFAULT: "#ECF15E"
          DEFAULT: "#4CAF50"
          // DEFAULT: "#FF2200"
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#8996A9"
        }
      },
      fontFamily: {
        montreal: ['NeueMontreal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
