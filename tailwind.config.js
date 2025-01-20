/** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#76b1c4', // Azul claro
            DEFAULT: '#2a6478', // Azul oscuro profesional
            dark: '#1b3d4b', // Azul más oscuro
          },
          secondary: {
            light: '#a7d6a5', // Verde claro
            DEFAULT: '#4a8751', // Verde oscuro profesional
            dark: '#2b5c36', // Verde más oscuro
          },
        },
      },
    },
    plugins: [],
  }
  