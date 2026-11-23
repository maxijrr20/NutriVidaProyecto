import { Link, useNavigate } from 'react-router-dom';
import { cerrarSesion, obtenerSesion } from '../utils/sesion';

// Se muestra cuando alguien con sesión intenta abrir una ruta que su rol no permite
// (por ejemplo, un PACIENTE que escribe /admin en la barra de direcciones).
export default function SinPermisoPage() {
  const navigate = useNavigate();
  const sesion = obtenerSesion();

  const cambiarDeCuenta = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <main className="container py-5 text-center">
      <p className="display-4 fw-bold text-danger mb-2">403</p>
      <h1 className="h3 fw-bold">No tienes permiso para ver esta página</h1>
      <p className="text-muted">
        {sesion
          ? `Tu cuenta (${sesion.email}) tiene el rol ${sesion.rol}, que no puede acceder a esta sección.`
          : 'Esta sección requiere una cuenta con otro rol.'}
      </p>
      <div className="d-flex gap-2 justify-content-center">
        <Link to="/" className="btn btn-success">Volver al inicio</Link>
        <button type="button" className="btn btn-outline-secondary" onClick={cambiarDeCuenta}>
          Ingresar con otra cuenta
        </button>
      </div>
    </main>
  );
}
