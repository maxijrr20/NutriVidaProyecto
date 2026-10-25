import { useState } from 'react';
import { EstadoBadge } from '../../atoms/EstadoBadge';
import { ComprobanteSolicitud } from './ComprobanteSolicitud';

// Listado de solicitudes de cita + ficha (comprobante) de la seleccionada.
// La secretaria/admin puede confirmar o rechazar una solicitud pendiente.
export const AdminSolicitudes = ({ citas, onCambiarEstado }) => {
  // Estado local: qué solicitud se está mirando en detalle (null = ninguna)
  const [seleccionadaId, setSeleccionadaId] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('Todas');

  const seleccionada = citas.find((c) => String(c.id) === String(seleccionadaId));
  const citasFiltradas =
    filtroEstado === 'Todas' ? citas : citas.filter((c) => (c.estado || 'Pendiente') === filtroEstado);

  if (seleccionada) {
    return (
      <ComprobanteSolicitud
        solicitud={seleccionada}
        onVolver={() => setSeleccionadaId(null)}
        onCambiarEstado={onCambiarEstado}
      />
    );
  }

  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h3 className="fw-bold mb-0">Gestión de Solicitudes y Citas</h3>
        <select
          aria-label="Filtrar por estado"
          className="form-select form-select-sm w-auto"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          {['Todas', 'Pendiente', 'Confirmada', 'Reprogramada', 'Cancelada', 'Rechazada'].map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>

      {citasFiltradas.length === 0 ? (
        <p className="text-muted">No hay solicitudes registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>N°</th>
                <th>Paciente</th>
                <th className="d-none d-md-table-cell">Servicio</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((c) => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td>{c.nombre || c.email || 'Paciente'}</td>
                  <td className="d-none d-md-table-cell">{c.servicio || 'Consulta nutricional'}</td>
                  <td>{c.fecha} {c.hora}</td>
                  <td><EstadoBadge estado={c.estado} /></td>
                  <td className="text-nowrap">
                    <button type="button" className="btn btn-sm btn-outline-secondary me-1" onClick={() => setSeleccionadaId(c.id)}>
                      Ver ficha
                    </button>
                    {(c.estado === 'Pendiente' || c.estado === 'Reprogramada') && (
                      <button type="button" className="btn btn-sm btn-success" onClick={() => onCambiarEstado(c.id, 'Confirmada')}>
                        Confirmar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSolicitudes;
