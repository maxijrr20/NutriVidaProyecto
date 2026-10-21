import { useLocation, Link } from 'react-router-dom';

export default function ConfirmacionSolicitudPage() {
  const location = useLocation();
  const solicitud = location.state?.solicitud;

  return (
    <main className="container text-center my-5" style={{ maxWidth: '500px' }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-success mb-3">¡Solicitud Registrada!</h3>
        {solicitud && (
          <div className="text-start bg-light p-3 rounded mb-3">
            <p className="mb-1"><strong>Paciente:</strong> {solicitud.nombre}</p>
            <p className="mb-1"><strong>Nutricionista:</strong> {solicitud.nutricionista}</p>
            <p className="mb-1"><strong>Fecha:</strong> {solicitud.fecha}</p>
            <p className="mb-0"><strong>Estado:</strong> {solicitud.estado}</p>
          </div>
        )}
        <div className="d-flex gap-2 justify-content-center">
          <Link to="/solicitud-en-curso" className="btn btn-primary">Ver Solicitudes</Link>
          <Link to="/" className="btn btn-outline-secondary">Ir al Inicio</Link>
        </div>
      </div>
    </main>
  );
}