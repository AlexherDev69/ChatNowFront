/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Bebas Neue', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    extend: {},
  },
  plugins: [],
}
