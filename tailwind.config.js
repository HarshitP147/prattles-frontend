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
        darktheme: {
          "primary": "#1a1a1a", // Black shade
          "secondary": "#1e90ff", // Blue shade
          "accent": "#8a2be2", // Violet shade
          "neutral": "#2f2f2f", // Medium dark shade
          "base-100": "#ffffff", // White for text
          "info": "#00cfff", // Light blue
          "success": "#84cc16", // Green
          "warning": "#ffc300", // Yellow
          "error": "#dc2626", // Red
        },
      }
    ]
  }
}
