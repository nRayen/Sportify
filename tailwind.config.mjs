/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: "class",
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
          DEFAULT: "#4CAF50"
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#8996A9",
          error: ""
        }
      },
      fontFamily: {
        montreal: ['NeueMontreal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
