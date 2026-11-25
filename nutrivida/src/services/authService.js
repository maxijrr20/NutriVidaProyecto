// Operaciones de autenticación contra el backend (rutas /api/v1/auth/*).
import { apiRequest } from './api';
import { guardarSesion } from '../utils/sesion';

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
