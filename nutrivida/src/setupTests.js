// Se ejecuta antes de cada archivo de pruebas (configurado en vite.config.js -> test.setupFiles)
import '@testing-library/jest-dom/vitest'; // agrega matchers como toBeInTheDocument()
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpieza después de cada prueba: desmonta lo renderizado y borra localStorage,
// así una prueba no afecta a la siguiente.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
