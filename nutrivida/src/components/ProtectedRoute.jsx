import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente Guard para restringir el acceso al panel administrativo.
 * Verifica si existe una sesión activa con rol 'ADMIN' en localStorage.
 */
export const ProtectedRoute = ({ children }) => {
  const sessionRaw = localStorage.getItem('nutrivida_session');
  const session = sessionRaw ? JSON.parse(sessionRaw) : null;

  if (!session || session.rol !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;