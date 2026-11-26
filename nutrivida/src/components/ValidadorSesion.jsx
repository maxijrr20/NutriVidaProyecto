import { useEffect, useState } from 'react';
import { obtenerSesion } from '../utils/sesion';
import { validarSesion } from '../services/authService';

// Al cargar o recargar la página, si hay una sesión guardada en localStorage la confirma
// con el backend (GET /api/v1/auth/me) antes de mostrar la aplicación. Así, un token
// vencido, alterado o de una cuenta desactivada no deja ver pantallas privadas.
export default function ValidadorSesion({ children }) {
  const [listo, setListo] = useState(() => !obtenerSesion());

  useEffect(() => {
    if (listo) return undefined;
    let vigente = true;
    validarSesion().finally(() => {
      if (vigente) setListo(true);
    });
    return () => {
      vigente = false;
    };
  }, [listo]);

  if (!listo) {
    return (
      <div className="container py-5 text-center" role="status">
        <div className="spinner-border text-success mb-3" aria-hidden="true" />
        <p className="mb-0">Verificando sesión…</p>
      </div>
    );
  }

  return children;
}
