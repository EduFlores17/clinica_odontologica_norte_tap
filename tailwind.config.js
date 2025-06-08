/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
  extend: {
    colors: {
      'dental-blue': '#2E86C1',
      'dental-orange': '#E67E22',
    }
  }
}, // <-- ¡Esta coma faltaba!
  plugins: [], // Lista de plugins (puede estar vacía)
}