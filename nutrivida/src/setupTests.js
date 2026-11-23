// Se ejecuta antes de cada archivo de pruebas (configurado en vite.config.js -> test.setupFiles)
import '@testing-library/jest-dom/vitest'; // agrega matchers como toBeInTheDocument()
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Por defecto las pruebas corren SIN backend: fetch falla como si el servidor no respondiera.
// Así el catálogo usa sus datos de respaldo y ninguna prueba depende de un backend encendido.
// Las pruebas que necesitan respuestas del backend las simulan con mockApi() (src/mockApi.js).
beforeEach(() => {
  globalThis.fetch = vi.fn(() => Promise.reject(new TypeError('Sin backend en las pruebas')));
});

// Limpieza después de cada prueba: desmonta lo renderizado y borra localStorage,
// así una prueba no afecta a la siguiente.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
