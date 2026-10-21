import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SolicitudEnCursoPage() {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('nutrivida_citas')) || [];
    setSolicitudes(guardadas);
  }, []);

  const cancelarSolicitud = (id) => {
    const actualizadas = solicitudes.filter((s) => s.id !== id);
    setSolicitudes(actualizadas);
    localStorage.setItem('nutrivida_citas', JSON.stringify(actualizadas));
  };

  return (
    <main className="container my-5">
      <h2>Solicitudes en Curso</h2>
      {solicitudes.length === 0 ? (
        <p className="mt-3">No hay solicitudes activas.</p>
      ) : (
        <div className="row mt-4">
          {solicitudes.map((sol) => (
            <div key={sol.id} className="col-md-6 mb-3">
              <div className="card p-3 shadow-sm">
                <h5>{sol.nutricionista}</h5>
                <p className="mb-1"><strong>Paciente:</strong> {sol.nombre} ({sol.rut})</p>
                <p className="mb-1"><strong>Motivo:</strong> {sol.motivo}</p>
                <p className="mb-1"><strong>Fecha:</strong> {sol.fecha}</p>
                <p className="mb-3">
                  <strong>Estado:</strong> <span className="badge bg-warning text-dark">{sol.estado}</span>
                </p>
                <button
                  onClick={() => cancelarSolicitud(sol.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Cancelar Solicitud
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/contacto" className="btn btn-secondary mt-3">Nueva Solicitud</Link>
    </main>
  );
}