// Operaciones de autenticación contra el backend (rutas /api/v1/auth/*).
import { apiRequest } from './api';
import { guardarSesion, obtenerSesion, cerrarSesion, actualizarUsuarioSesion } from '../utils/sesion';

// POST /auth/register -> 201 con el usuario creado (rol PACIENTE, lo asigna el servidor)
export const registrarPaciente = ({ rut, nombre, email, telefono, password }) =>
  apiRequest('/auth/register', {
    metodo: 'POST',
    conToken: false,
    cuerpo: {
      rut: rut.trim(),
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono?.trim() || null,
      password,
    },
  });

// POST /auth/login -> 200 { accessToken, tokenType, expiresIn, usuario }
// Guarda la sesión (token + datos del usuario) y devuelve el usuario.
export const iniciarSesion = async ({ email, password }) => {
  const respuesta = await apiRequest('/auth/login', {
    metodo: 'POST',
    conToken: false,
    cuerpo: { email: email.trim().toLowerCase(), password },
  });
  guardarSesion(respuesta);
  return respuesta.usuario;
};

// GET /auth/me -> datos del dueño del token
export const obtenerUsuarioActual = () => apiRequest('/auth/me');

// Revalida con el backend la sesión guardada en localStorage (se llama al cargar la app).
// - El backend confirma el token (200): se actualizan los datos guardados, por si cambió el rol.
// - El backend lo rechaza (401, 403, 404): se cierra la sesión y la app queda como visitante.
// - El servidor no responde (red o 5xx): se mantiene la sesión; cada ruta protegida
//   vuelve a validar el token en el backend de todas formas.
export const validarSesion = async () => {
  const sesion = obtenerSesion();
  if (!sesion) return null;
  try {
    const usuario = await obtenerUsuarioActual();
    return actualizarUsuarioSesion(usuario);
  } catch (error) {
    if (error.estado === 0 || error.estado >= 500) return sesion;
    cerrarSesion();
    return null;
  }
};
