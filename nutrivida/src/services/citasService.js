// Solicitudes de cita contra el backend (/api/v1/citas). Todas exigen sesión (JWT).
// El backend decide qué ve cada uno: el PACIENTE solo sus solicitudes; ADMIN y NUTRICIONISTA todas.
import { apiRequest } from './api';

export const listarCitas = () => apiRequest('/citas');

// Datos que entrega AppointmentFormSection -> cuerpo que espera el backend (CitaRequest)
export const crearCita = (datos) =>
  apiRequest('/citas', {
    metodo: 'POST',
    cuerpo: {
      nombre: datos.nombre.trim(),
      rut: datos.rut.trim(),
      email: datos.email.trim().toLowerCase(),
      telefono: datos.telefono?.replace(/\s/g, '') || null,
      servicioId: Number(datos.servicioId),
      nutricionistaCodigo: datos.nutricionistaCodigo,
      fecha: datos.fecha,
      hora: datos.hora,
      motivo: datos.motivo?.trim() || null,
    },
  });

export const cancelarCita = (id) => apiRequest(`/citas/${id}/cancelar`, { metodo: 'PATCH' });

export const reprogramarCita = (id, fecha, hora) =>
  apiRequest(`/citas/${id}/reprogramar`, { metodo: 'PATCH', cuerpo: { fecha, hora } });

// Solo ADMIN: Confirmada, Rechazada, Pendiente...
export const cambiarEstadoCita = (id, estado) =>
  apiRequest(`/citas/${id}/estado`, { metodo: 'PATCH', cuerpo: { estado } });
