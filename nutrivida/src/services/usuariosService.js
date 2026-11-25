// CRUD de usuarios contra el backend (rutas /api/v1/usuarios).
// Todas las rutas exigen el JWT: apiRequest lo agrega en "Authorization: Bearer <token>".
// El backend comprueba el rol en cada solicitud (@PreAuthorize): si quien llama no es ADMIN, responde 403.
import { apiRequest } from './api';

// GET /usuarios -> lista de usuarios (solo ADMIN)
export const listarUsuarios = () => apiRequest('/usuarios');

// POST /usuarios -> 201 con el usuario creado (solo ADMIN; el admin elige el rol)
export const crearUsuario = ({ rut, nombre, email, telefono, password, rol }) =>
  apiRequest('/usuarios', {
    metodo: 'POST',
    cuerpo: {
      rut: rut.trim(),
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono?.trim() || null,
      password,
      rol,
    },
  });

// PUT /usuarios/{id} -> datos de la cuenta (el RUT y el rol no se cambian aquí)
export const actualizarUsuario = (id, { nombre, email, telefono, password }) =>
  apiRequest(`/usuarios/${id}`, {
    metodo: 'PUT',
    cuerpo: {
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono?.trim() || null,
      // Solo se envía si se quiere cambiar la contraseña
      ...(password ? { password } : {}),
    },
  });

// PATCH /usuarios/{id}/rol -> cambio de rol (solo ADMIN)
export const cambiarRolUsuario = (id, rol) =>
  apiRequest(`/usuarios/${id}/rol`, { metodo: 'PATCH', cuerpo: { rol } });

// DELETE /usuarios/{id} -> 204: desactivación lógica (activo = false), solo ADMIN
export const desactivarUsuario = (id) => apiRequest(`/usuarios/${id}`, { metodo: 'DELETE' });
