// Molécula: tarjeta con un número grande y una etiqueta (usada en Dashboard y Reportes).
export const StatCard = ({ valor, etiqueta, color = 'text-success' }) => (
  <div className="p-3 bg-light rounded border text-center h-100">
    <h4 className={`fw-bold mb-1 ${color}`}>{valor}</h4>
    <p className="text-muted small mb-0">{etiqueta}</p>
  </div>
);

export default StatCard;
