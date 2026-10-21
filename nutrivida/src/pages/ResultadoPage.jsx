import { useLocation, Link } from 'react-router-dom';

export default function ResultadoPage() {
  const location = useLocation();
  const solicitud = location.state?.solicitud;
  const esExito = location.state?.exito !== false && !!solicitud;

  return (
    <main className="container text-center my-5" style={{ maxWidth: '600px' }}>
      <div className="card p-4 shadow-sm border-0">
        {esExito ? (
          <>
            <h2 className="text-success mb-3">✔ Solicitud Procesada con Éxito</h2>
            <p className="lead">El detalle de tu cita guardada en el sistema es el siguiente:</p>
            <div className="text-start bg-light p-3 rounded mb-4">
              <p className="mb-1"><strong>Código de Solicitud:</strong> #{solicitud.id}</p>
              <p className="mb-1"><strong>Paciente:</strong> {solicitud.nombre}</p>
              <p className="mb-1"><strong>RUT:</strong> {solicitud.rut}</p>
              <p className="mb-1"><strong>Nutricionista:</strong> {solicitud.nutricionista}</p>
              <p className="mb-1"><strong>Servicio:</strong> {solicitud.servicio || 'Consulta nutricional'}</p>
              <p className="mb-1"><strong>Fecha Agendada:</strong> {solicitud.fecha} {solicitud.hora && `a las ${solicitud.hora} hrs`}</p>
              {solicitud.precio && (
                <p className="mb-1"><strong>Valor:</strong> ${Number(solicitud.precio).toLocaleString('es-CL')} CLP</p>
              )}
              <p className="mb-0">
                <strong>Estado Actual:</strong>{' '}
                <span className={`badge ${
                  solicitud.estado === 'Cancelada' ? 'bg-danger' :
                  solicitud.estado === 'Reprogramada' ? 'bg-info text-dark' : 'bg-success'
                }`}>
                  {solicitud.estado || 'Confirmada'}
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-danger mb-3">✖ No se encontró la Solicitud</h2>
            <div className="alert alert-danger my-3">
              Ocurrió un error o la solicitud consultada no existe en el sistema.
            </div>
            <Link to="/contacto" className="btn btn-danger mb-3">
              Volver a intentarlo
            </Link>
          </>
        )}

        <div className="d-flex gap-2 justify-content-center">
          <Link to="/solicitud-en-curso" className="btn btn-outline-primary w-100">
            Ver Solicitudes
          </Link>
          <Link to="/" className="btn btn-primary w-100">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}