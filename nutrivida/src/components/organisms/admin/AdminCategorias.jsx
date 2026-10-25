import { useState } from 'react';

// Gestión de categorías: crear una nueva y renombrar (editar) una existente.
// Al renombrar, todos los servicios de esa categoría se actualizan.
export const AdminCategorias = ({ resumen, onCrear, onRenombrar }) => {
  const [nueva, setNueva] = useState('');
  const [editando, setEditando] = useState(null); // nombre de la categoría en edición
  const [nombreEditado, setNombreEditado] = useState('');
  const [error, setError] = useState('');

  const existe = (nombre) =>
    resumen.some((r) => r.categoria.toLowerCase() === nombre.trim().toLowerCase());

  const handleCrear = (e) => {
    e.preventDefault();
    if (!nueva.trim()) return setError('Escribe un nombre para la categoría.');
    if (existe(nueva)) return setError('Esa categoría ya existe.');
    onCrear(nueva.trim());
    setNueva('');
    setError('');
  };

  const handleGuardar = (anterior) => {
    if (!nombreEditado.trim()) return setError('El nombre no puede quedar vacío.');
    if (nombreEditado.trim() !== anterior && existe(nombreEditado)) return setError('Esa categoría ya existe.');
    onRenombrar(anterior, nombreEditado.trim());
    setEditando(null);
    setError('');
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold mb-3">Gestión de Categorías</h3>

      <form onSubmit={handleCrear} className="row g-2 mb-3">
        <div className="col-8 col-md-6">
          <input aria-label="Nueva categoría" className="form-control form-control-sm" placeholder="Nueva categoría" value={nueva} onChange={(e) => setNueva(e.target.value)} />
        </div>
        <div className="col-4 col-md-3">
          <button type="submit" className="btn btn-success btn-sm w-100">Crear</button>
        </div>
      </form>
      {error && <div className="alert alert-warning py-2" role="alert">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr><th>Categoría</th><th>Servicios asociados</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {resumen.map((item) => (
              <tr key={item.categoria}>
                <td>
                  {editando === item.categoria ? (
                    <input aria-label="Nuevo nombre" className="form-control form-control-sm" value={nombreEditado} onChange={(e) => setNombreEditado(e.target.value)} />
                  ) : (
                    item.categoria
                  )}
                </td>
                <td>{item.total}</td>
                <td className="text-nowrap">
                  {editando === item.categoria ? (
                    <>
                      <button type="button" className="btn btn-sm btn-success me-1" onClick={() => handleGuardar(item.categoria)}>Guardar</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setEditando(null)}>Cancelar</button>
                    </>
                  ) : (
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { setEditando(item.categoria); setNombreEditado(item.categoria); }}>
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategorias;
