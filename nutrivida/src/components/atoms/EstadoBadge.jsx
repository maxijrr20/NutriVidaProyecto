// Átomo: etiqueta de color según el estado de una solicitud de cita.
const COLORES = {
  Confirmada: 'bg-success',
  Cancelada: 'bg-danger',
  Rechazada: 'bg-danger',
  Reprogramada: 'bg-info text-dark',
  Pendiente: 'bg-warning text-dark',
};

export const EstadoBadge = ({ estado = 'Pendiente' }) => (
  <span className={`badge ${COLORES[estado] || 'bg-secondary'}`}>{estado}</span>
);

export default EstadoBadge;
