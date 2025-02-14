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
          DEFAULT : "#F5F4F7",
          dark: "#0E0F11"
        },
        backgroundTone: {
          DEFAULT : "#FFFFFF",
          dark: "#161616"
        },

        backgroundItem: {
          DEFAULT: "#F4F4F5",
          dark: "#27272A"
        },

        foreground: {
          DEFAULT: "#FFFFFF"
        },
        primary: {
          // DEFAULT: "#4CAF50"
          // DEFAULT: "#9B5DE5"
          DEFAULT: "#10B981"
          // DEFAULT: "#64D8CB"
        },
        text: {
          primary: {
            DEFAULT :"#000000",
            dark: "#FFFFFF"
          },
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
