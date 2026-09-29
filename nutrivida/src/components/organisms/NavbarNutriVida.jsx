import { NavLink } from 'react-router-dom';

export const NavbarNutriVida = () => {
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
              to="/contacto" 
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Agendar Cita
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              Acceso
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};