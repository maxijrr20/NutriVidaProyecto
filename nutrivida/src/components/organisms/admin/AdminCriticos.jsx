// "Ítems críticos" en NutriVida = poca disponibilidad:
// nutricionistas con jornada corta (5 horas o menos) y cuántas citas activas tienen.

// "09:00 – 17:00" -> 8 (horas de jornada)
export const horasDeJornada = (horario = '') => {
  const horas = horario.match(/\d{2}:\d{2}/g);
  if (!horas || horas.length < 2) return 0;
  const aMinutos = (h) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3));
  return (aMinutos(horas[1]) - aMinutos(horas[0])) / 60;
};

export const LIMITE_HORAS = 5;

export const AdminCriticos = ({ nutricionistas, citas }) => {
  const activas = citas.filter((c) => c.estado !== 'Cancelada' && c.estado !== 'Rechazada');

  const criticos = nutricionistas
    .map((n) => ({
      ...n,
      horas: horasDeJornada(n.horario),
      citasActivas: activas.filter((c) => c.nutricionistaCodigo === n.codigo).length,
    }))
    .filter((n) => n.horas <= LIMITE_HORAS);

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold mb-3">Ítems críticos</h3>
      <p className="text-muted">
        Nutricionistas con disponibilidad acotada (jornada de {LIMITE_HORAS} horas o menos).
      </p>
      <div className="list-group">
        {criticos.map((nut) => (
          <div key={nut.codigo} className="list-group-item d-flex flex-wrap justify-content-between gap-2">
            <div>
              <strong>{nut.nombre}</strong>
              <div className="small">{nut.dias}</div>
              <small className="text-danger">Horario acotado: {nut.horario} ({nut.horas} h)</small>
            </div>
            <span className="badge bg-warning text-dark align-self-center">{nut.citasActivas} citas activas</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCriticos;
