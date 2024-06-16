/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar")
  ],
  daisyui: {
    themes: [
      {
        blueblacktheme: {
          "primary": "#000000",      // Black shade
          "secondary": "#1e90ff",    // Blue shade
          "accent": "#1e3a8a",       // Dark Blue shade
          "neutral": "#2c2f33",      // Medium dark shade
          "base-100": "#ffffff",     // White for text
          "info": "#0096c7",         // Blue-Info
          "success": "#84cc16",      // Green
          "warning": "#ffba08",      // Dark Yellow
          "error": "#d00000",        // Dark Red
        },
      }
    ]
  }
}
