export const Price = ({ value }) => {
  return (
    <span className="fw-bold" style={{ color: '#0ea82f', fontSize: '1.2rem' }}>
      ${value.toLocaleString('es-CL')} CLP
    </span>
  );
};