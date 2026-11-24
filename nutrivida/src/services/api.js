// Cliente HTTP común para hablar con el backend Spring Boot (nutrivida-backend).
// - La dirección base sale de la variable VITE_API_URL (archivo .env); si no existe,
//   se usa el backend local en el puerto 8080.
// - Si hay sesión, agrega el encabezado "Authorization: Bearer <token>".
// - Si el backend responde con error, lanza un ApiError con el estado HTTP,
//   el mensaje del servidor y los errores por campo (cuando es un 400 de validación).

import { obtenerToken, cerrarSesion } from '../utils/sesion';

export const API_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'
).replace(/\/$/, '');

export class ApiError extends Error {
  constructor(estado, mensaje, errores = {}) {
    super(mensaje);
    this.name = 'ApiError';
    this.estado = estado; // 0 = no se pudo conectar con el backend
    this.errores = errores; // { campo: 'mensaje' } que devuelve el backend en los 400
  }
}

export const apiFetch = async (ruta, { metodo = 'GET', cuerpo, conToken = true } = {}) => {
  const encabezados = { Accept: 'application/json' };
  if (cuerpo !== undefined) encabezados['Content-Type'] = 'application/json';

  const token = conToken ? obtenerToken() : null;
  if (token) encabezados.Authorization = `Bearer ${token}`;

  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method: metodo,
      headers: encabezados,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new ApiError(
      0,
      'No se pudo conectar con el servidor. Inténtalo nuevamente en unos minutos.'
    );
  }

  // 204 No Content (por ejemplo, al desactivar un usuario)
  if (respuesta.status === 204) return null;

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    // Token vencido o cuenta desactivada: se borra la sesión local
    if (respuesta.status === 401 && token) cerrarSesion();

    // Sin mensaje del backend y con un 5xx: el servidor está apagado, reiniciándose o falló
    const mensajePorDefecto =
      respuesta.status >= 500
        ? 'El servidor no respondió correctamente. Revisa que el backend esté encendido e inténtalo de nuevo.'
        : 'Ocurrió un error inesperado.';

    throw new ApiError(respuesta.status, datos?.mensaje || mensajePorDefecto, datos?.errores || {});
  }

  return datos;
};
