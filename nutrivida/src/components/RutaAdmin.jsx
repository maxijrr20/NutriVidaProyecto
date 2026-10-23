import { Navigate } from 'react-router-dom';
import { obtenerSesion } from '../utils/sesion';

export default function RutaAdmin({ children }) {
  const sesion = obtenerSesion();

  if (!sesion || sesion.rol !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return children;
}