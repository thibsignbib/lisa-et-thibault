/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  safelist: [
    "font-wedding",
    "font-american",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-playfair)", "serif"],
        american: ['"AmericansClassy"', "sans-serif"],
        wedding: ['"WeddingSignature"', "cursive"],
      },
      colors: {
        primary: "#2c3e50",
        secondary: "#c8bfae",
        accent: "#9b8c6d",
      },
    },
  },
  plugins: [],
};
