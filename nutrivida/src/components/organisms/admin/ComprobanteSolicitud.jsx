import { EstadoBadge } from '../../atoms/EstadoBadge';

const formatearCLP = (valor) =>
  valor || valor === 0 ? `$${Number(valor).toLocaleString('es-CL')} CLP` : '—';

// Ficha / comprobante de una solicitud de cita (lo que el admin ve al hacer clic en "Ver ficha").
export const ComprobanteSolicitud = ({ solicitud, onVolver, onCambiarEstado }) => {
  const filas = [
    ['N° de solicitud', `#${solicitud.id}`],
    ['Fecha de creación', solicitud.fechaCreacion || '—'],
    ['Paciente', solicitud.nombre],
    ['RUT', solicitud.rut || '—'],
    ['Correo', solicitud.email || '—'],
    ['Teléfono', solicitud.telefono || '—'],
    ['Servicio', solicitud.servicio || 'Consulta nutricional'],
    ['Nutricionista', solicitud.nutricionista || '—'],
    ['Fecha y hora', `${solicitud.fecha || '—'} ${solicitud.hora ? `a las ${solicitud.hora} hrs` : ''}`],
    ['Motivo', solicitud.motivo || 'No informado'],
    ['Valor', formatearCLP(solicitud.precio)],
  ];

  const puedeGestionar = solicitud.estado === 'Pendiente' || solicitud.estado === 'Reprogramada';

  return (
    <div className="card shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Ficha de la solicitud</h3>
        <EstadoBadge estado={solicitud.estado} />
      </div>

      <dl className="row mb-4">
        {filas.map(([etiqueta, valor]) => (
          <div className="col-12 col-md-6 d-flex border-bottom py-2" key={etiqueta}>
            <dt className="me-2">{etiqueta}:</dt>
            <dd className="mb-0">{valor}</dd>
          </div>
        ))}
      </dl>

      <div className="d-flex flex-wrap gap-2">
        <button type="button" className="btn btn-outline-secondary" onClick={onVolver}>
          ← Volver al listado
        </button>
        {puedeGestionar && (
          <>
            <button type="button" className="btn btn-success" onClick={() => onCambiarEstado(solicitud.id, 'Confirmada')}>
              Confirmar cita
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={() => onCambiarEstado(solicitud.id, 'Rechazada')}>
              Rechazar
            </button>
          </>
        )}
        <button type="button" className="btn btn-outline-primary ms-md-auto" onClick={() => window.print()}>
          Imprimir comprobante
        </button>
      </div>
    </div>
  );
};

export default ComprobanteSolicitud;
