import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CLAVE_SESION, obtenerSesion } from '../../utils/sesion';

export const NavbarNutriVida = () => {
  const location = useLocation();
  const [sesion, setSesion] = useState(() => obtenerSesion());

  useEffect(() => {
    setSesion(obtenerSesion());
  }, [location.pathname]);

  const cerrarSesion = () => {
    localStorage.removeItem(CLAVE_SESION);
    setSesion(null);
  };

  return (
    <header
      className="header-nutrivida"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
        padding: '1rem 2rem',
        backgroundColor: '#ffffff',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        Clínica Nutricional NutriVida
      </h1>

      <nav style={{ flex: 1 }}>
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            gap: '0.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
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
              to="/categorias"
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Categorías
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/nosotros"
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Nosotros
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Blog
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