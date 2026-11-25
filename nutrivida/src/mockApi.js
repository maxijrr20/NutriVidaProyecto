// Simulador del backend para las pruebas: reemplaza el "adapter" de Axios (la pieza que hace la
// llamada HTTP real) por una función que responde según el método y la ruta. Ejemplo:
//   const llamadas = mockApi({ 'GET /citas': [cita], 'PATCH /citas/1/estado': (cuerpo) => ({ ...cita, ...cuerpo }) });
// Las rutas no definidas responden 404. `llamadas` es un vi.fn que registra cada llamada como
// (url, { method, headers, body }) para revisar en la prueba qué se envió.
import { vi } from 'vitest';
import { AxiosError } from 'axios';
import { http } from './services/api';

const responder = (config, status, data) => {
  const respuesta = { data, status, statusText: String(status), headers: {}, config, request: {} };
  if (status >= 200 && status < 300) return respuesta;
  throw new AxiosError(`Request failed with status code ${status}`, 'ERR_BAD_RESPONSE', config, {}, respuesta);
};

export const mockApi = (rutas = {}) => {
  const llamadas = vi.fn();

  http.defaults.adapter = async (config) => {
    const url = `${(config.baseURL || '').replace(/\/$/, '')}${config.url}`;
    const headers = config.headers?.toJSON ? config.headers.toJSON() : { ...config.headers };
    const method = (config.method || 'get').toUpperCase();
    llamadas(url, { method, headers, body: config.data });

    const ruta = url.replace(/^.*\/api\/v1/, '').split('?')[0];
    const clave = `${method} ${ruta}`;
    if (!(clave in rutas)) {
      return responder(config, 404, { estado: 404, mensaje: `Ruta no simulada: ${clave}` });
    }
    const definicion = rutas[clave];
    const cuerpo = config.data ? JSON.parse(config.data) : undefined;
    const resultado = typeof definicion === 'function' ? definicion(cuerpo) : definicion;
    // Una ruta puede responder con error: { status: 409, body: { mensaje: '...' } }
    if (resultado && resultado.status && resultado.body !== undefined) {
      return responder(config, resultado.status, resultado.body);
    }
    return responder(config, resultado === null ? 204 : 200, resultado === null ? '' : resultado);
  };

  return llamadas;
};

// Sin backend: cualquier llamada falla como si el servidor no respondiera (lo usa setupTests.js)
export const sinBackend = () => {
  http.defaults.adapter = async (config) => {
    throw new AxiosError('Network Error', 'ERR_NETWORK', config);
  };
};

// Guarda una sesión de prueba (como la deja el login) para las rutas que exigen token
export const iniciarSesionDePrueba = (usuario = {}) => {
  localStorage.setItem(
    'nutrivida_session',
    JSON.stringify({
      id: 2,
      nombre: 'Paciente Demo',
      rut: '18795997-7',
      email: 'paciente@nutrivida.cl',
      rol: 'PACIENTE',
      token: 'token-de-prueba',
      expiraEn: Date.now() + 60 * 60 * 1000,
      ...usuario,
    })
  );
};
