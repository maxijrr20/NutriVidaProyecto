export const CLAVE_SESION = 'nutrivida_session';

// Devuelve el usuario que inició sesión (o null si no hay sesión)
export const obtenerSesion = () => {
  try {
    const guardada = localStorage.getItem(CLAVE_SESION);
    return guardada ? JSON.parse(guardada) : null;
  } catch {
    return null;
  }
};
