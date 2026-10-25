import { useState } from 'react';
import { EstadoBadge } from '../../atoms/EstadoBadge';

// Agrupa las citas por correo del paciente: { 'ana@x.cl': [cita, cita], ... }
export const agruparPorUsuario = (citas = []) =>
  citas.reduce((acc, cita) => {
    const clave = (cita.email || cita.rut || 'Sin identificar').toLowerCase();
    acc[clave] = acc[clave] ? [...acc[clave], cita] : [cita];
    return acc;
  }, {});

// Historial de solicitudes de un usuario: se elige el paciente y se ve todo lo que ha pedido.
export const AdminHistorial = ({ citas }) => {
  const grupos = agruparPorUsuario(citas);
  const usuarios = Object.keys(grupos);
  const [usuarioElegido, setUsuarioElegido] = useState(usuarios[0] || '');
  const lista = grupos[usuarioElegido] || [];

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold mb-3">Historial de solicitudes por usuario</h3>
      {usuarios.length === 0 ? (
        <p className="text-muted">No hay historial disponible.</p>
      ) : (
        <>
          <select aria-label="Elegir paciente" className="form-select mb-3" value={usuarioElegido} onChange={(e) => setUsuarioElegido(e.target.value)}>
            {usuarios.map((u) => (
              <option key={u} value={u}>{grupos[u][0].nombre ? `${grupos[u][0].nombre} (${u})` : u}</option>
            ))}
          </select>
          <p className="small text-muted">{lista.length} solicitud(es)</p>
          <ul className="list-group">
            {lista.map((cita) => (
              <li key={cita.id} className="list-group-item d-flex flex-wrap justify-content-between gap-2">
                <span>#{cita.id} · {cita.fecha} {cita.hora} · {cita.servicio || 'Consulta nutricional'}</span>
                <EstadoBadge estado={cita.estado} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminHistorial;
