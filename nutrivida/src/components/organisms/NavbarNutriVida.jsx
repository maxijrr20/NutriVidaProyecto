import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CLAVE_SESION, obtenerSesion } from '../../utils/sesion';

export const NavbarNutriVida = () => {
  const location = useLocation();
  const [sesion, setSesion] = useState(() => obtenerSesion());

  // Revisa nuevamente la sesión cada vez que cambia la página
  useEffect(() => {
    setSesion(obtenerSesion());
  }, [location.pathname]);

  const cerrarSesion = () => {
    // Borra solamente la sesión.
    // Las citas permanecen guardadas en localStorage.
    localStorage.removeItem(CLAVE_SESION);
    setSesion(null);
  };

  return (
    <header className="header-nutrivida">
      <h1>Clínica Nutricional NutriVida</h1>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/servicios"
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Servicios y Equipo
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/destacados"
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Destacados
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contacto"
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Agendar Cita
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/categorias"
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Categorías
            </NavLink>
          </li>

          {sesion && (
            <li>
              <NavLink
                to="/solicitud-en-curso"
                className={({ isActive }) => (isActive ? 'activo' : '')}
              >
                Mis Solicitudes
              </NavLink>
            </li>
          )}

          {!sesion ? (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'activo' : '')}
              >
                Acceso
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/login"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};