import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Ruta base requerida para GitHub Pages
  base: '/NutriVidaProyecto/',

  // Solo en desarrollo (npm run dev): las llamadas a /api se reenvían al backend
  // Spring Boot. Así el navegador habla con un solo origen (localhost:5173).
  // Para usarlo: VITE_API_URL=/api/v1 en el archivo .env
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },

  // Configuración de Vitest (entorno de pruebas)
  test: {
    environment: 'jsdom', // simula el navegador (document, window, localStorage)
    globals: true, // permite usar describe/it/expect sin importarlos
    setupFiles: './src/setupTests.js', // se ejecuta antes de cada archivo de pruebas
    css: false, // no procesa CSS en las pruebas (más rápido)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'], // tabla en la terminal + reporte HTML en /coverage
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/test-utils.jsx', 'src/setupTests.js', 'src/**/*.test.{js,jsx}'],
    },
  },
})
