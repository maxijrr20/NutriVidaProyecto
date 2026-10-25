import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { CLAVE_SESION, obtenerSesion } from '../../utils/sesion';

// Enlaces públicos del menú. Se recorren con .map() para no repetir el mismo JSX.
const ENLACES = [
  { to: '/', texto: 'Inicio' },
  { to: '/servicios', texto: 'Servicios y Equipo' },
  { to: '/destacados', texto: 'Destacados' },
  { to: '/categorias', texto: 'Categorías' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/blog', texto: 'Blog' },
  { to: '/contacto', texto: 'Agendar Cita' },
];

// NavLink agrega la clase "activo" al enlace de la página actual
const claseActiva = ({ isActive }) => (isActive ? 'nav-link activo' : 'nav-link');

/**
 * Barra de navegación responsive (Bootstrap Navbar).
 * - expand="lg": en escritorio se ven todos los enlaces;
 *   en móvil y tableta se colapsan en el botón "hamburguesa".
 * - Muestra enlaces distintos según la sesión (paciente o administrador).
 */
export const NavbarNutriVida = () => {
  const location = useLocation();
  const [sesion, setSesion] = useState(() => obtenerSesion());
  const [abierto, setAbierto] = useState(false);

  // Cada vez que cambia la ruta se vuelve a leer la sesión y se cierra el menú móvil
  useEffect(() => {
    setSesion(obtenerSesion());
    setAbierto(false);
  }, [location.pathname]);

  const cerrarSesion = () => {
    localStorage.removeItem(CLAVE_SESION);
    setSesion(null);
  };

  const esAdmin = sesion?.rol === 'ADMIN';

  return (
    <Navbar
      expand="lg"
      bg="white"
      sticky="top"
      expanded={abierto}
      onToggle={setAbierto}
      className="navbar-nutrivida border-bottom shadow-sm"
    >
      <Container fluid className="px-3 px-lg-4">
        <Navbar.Brand as={Link} to="/" className="marca-nutrivida">
          Clínica Nutricional NutriVida
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" label="Abrir menú" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-lg-center gap-1">
            {ENLACES.map((enlace) => (
              <NavLink key={enlace.to} to={enlace.to} end={enlace.to === '/'} className={claseActiva}>
                {enlace.texto}
              </NavLink>
            ))}

            {sesion && !esAdmin && (
              <NavLink to="/solicitud-en-curso" className={claseActiva}>
                Mis Solicitudes
              </NavLink>
            )}

            {esAdmin && (
              <NavLink to="/admin" className={claseActiva}>
                Panel Admin
              </NavLink>
            )}

            {!sesion ? (
              <NavLink to="/login" className={claseActiva}>
                Acceso
              </NavLink>
            ) : (
              <NavLink to="/login" className="nav-link" onClick={cerrarSesion}>
                Cerrar sesión
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarNutriVida;
