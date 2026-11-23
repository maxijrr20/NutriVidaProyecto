import { Navigate, useLocation } from 'react-router-dom';
import { obtenerSesion } from '../utils/sesion';

// Protege una ruta del frontend.
// - Sin sesión (o con el token vencido): manda al login y recuerda la página pedida.
// - Con sesión, pero con un rol que no está en "roles": manda a /sin-permiso.
// Esto solo decide qué se muestra en la interfaz: el backend vuelve a comprobar
// el JWT y el rol en cada solicitud (401 / 403), así que ocultar una pantalla no es la única protección.
export default function RutaPrivada({ children, roles }) {
  const location = useLocation();
  const sesion = obtenerSesion();

  if (!sesion) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  if (roles && !roles.includes(sesion.rol)) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return children;
}
