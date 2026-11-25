// Cliente HTTP común para hablar con el backend Spring Boot (nutrivida-backend), hecho con Axios.
// - `http` es una instancia de Axios con la dirección base del backend (VITE_API_URL del archivo .env;
//   si no existe, el backend local en el puerto 8080).
// - Interceptor de solicitud: si hay sesión, agrega "Authorization: Bearer <token>".
// - Interceptor de respuesta: convierte cualquier error en un ApiError con el estado HTTP,
//   el mensaje del servidor y los errores por campo (cuando es un 400 de validación).
// - `apiRequest(ruta, opciones)` es lo que usan los servicios (authService, usuariosService, ...).

import axios from 'axios';
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

// Instancia de Axios: Axios convierte el cuerpo a JSON y la respuesta JSON a objeto automáticamente
export const http = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15 s sin respuesta = error de conexión
  headers: { Accept: 'application/json' },
});

// Interceptor de solicitud: agrega el JWT de la sesión (salvo en rutas públicas: conToken = false)
http.interceptors.request.use((config) => {
  const token = config.conToken === false ? null : obtenerToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de respuesta: todos los errores salen como ApiError, con un mensaje para mostrar en pantalla
http.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const respuesta = error.response;

    // Sin respuesta: el backend está apagado, no hay red o se agotó el tiempo
    if (!respuesta) {
      return Promise.reject(
        new ApiError(0, 'No se pudo conectar con el servidor. Inténtalo nuevamente en unos minutos.')
      );
    }

    const datos = respuesta.data && typeof respuesta.data === 'object' ? respuesta.data : null;

    // Token vencido o cuenta desactivada: se borra la sesión local
    if (respuesta.status === 401 && error.config?.headers?.Authorization) cerrarSesion();

    // Sin mensaje del backend y con un 5xx: el servidor está apagado, reiniciándose o falló
    const mensajePorDefecto =
      respuesta.status >= 500
        ? 'El servidor no respondió correctamente. Revisa que el backend esté encendido e inténtalo de nuevo.'
        : 'Ocurrió un error inesperado.';

    return Promise.reject(
      new ApiError(respuesta.status, datos?.mensaje || mensajePorDefecto, datos?.errores || {})
    );
  }
);

// Llamada al backend. Devuelve los datos de la respuesta (null en un 204 No Content).
// Ejemplo: apiRequest('/usuarios', { metodo: 'POST', cuerpo: { ... } })
export const apiRequest = async (ruta, { metodo = 'GET', cuerpo, conToken = true } = {}) => {
  const respuesta = await http.request({ url: ruta, method: metodo, data: cuerpo, conToken });
  return respuesta.status === 204 || respuesta.data === '' ? null : respuesta.data;
};
