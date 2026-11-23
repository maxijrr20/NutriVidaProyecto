// Simulador del backend para las pruebas: reemplaza fetch por una función que responde
// según el método y la ruta. Ejemplo:
//   const fetchMock = mockApi({ 'GET /citas': [cita], 'PATCH /citas/1/estado': (cuerpo) => ({ ...cita, ...cuerpo }) });
// Las rutas no definidas responden 404. Devuelve el mock para revisar qué se llamó.
import { vi } from 'vitest';

const respuesta = (status, cuerpo) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(cuerpo),
});

export const mockApi = (rutas = {}) => {
  const fetchMock = vi.fn(async (url, opciones = {}) => {
    const ruta = String(url).replace(/^.*\/api\/v1/, '').split('?')[0];
    const clave = `${opciones.method || 'GET'} ${ruta}`;
    if (!(clave in rutas)) {
      return respuesta(404, { estado: 404, mensaje: `Ruta no simulada: ${clave}` });
    }
    const definicion = rutas[clave];
    const cuerpo = opciones.body ? JSON.parse(opciones.body) : undefined;
    const resultado = typeof definicion === 'function' ? definicion(cuerpo) : definicion;
    // Una ruta puede responder con error: { status: 409, body: { mensaje: '...' } }
    if (resultado && resultado.status && resultado.body !== undefined) {
      return respuesta(resultado.status, resultado.body);
    }
    return respuesta(resultado === null ? 204 : 200, resultado);
  });
  globalThis.fetch = fetchMock;
  return fetchMock;
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
