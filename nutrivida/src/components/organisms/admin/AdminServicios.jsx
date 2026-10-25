import { useState } from 'react';
import { Link } from 'react-router-dom';

const FORM_VACIO = {
  nombre: '',
  categoria: '',
  precio: '',
  duracion: '',
  modalidad: 'Presencial',
  descripcion: '',
};

// Valida el formulario y devuelve un objeto con los errores (vacío = todo bien)
export const validarServicio = (datos) => {
  const errores = {};
  if (!datos.nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
  if (!datos.categoria) errores.categoria = 'Selecciona una categoría.';
  if (!datos.precio || Number(datos.precio) <= 0) errores.precio = 'El precio debe ser mayor a 0.';
  return errores;
};

// CRUD completo del catálogo: crear, mostrar (listado + enlace al detalle), editar y eliminar.
// Los datos y las funciones llegan por props desde AdminDashboardPage (que usa ServiciosContext).
export const AdminServicios = ({ servicios, categorias, onCrear, onEditar, onEliminar }) => {
  const [formulario, setFormulario] = useState({ ...FORM_VACIO, categoria: categorias[0] || '' });
  const [editandoId, setEditandoId] = useState(null); // null = creando; un id = editando
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const limpiar = () => {
    setFormulario({ ...FORM_VACIO, categoria: categorias[0] || '' });
    setEditandoId(null);
    setErrores({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarServicio(formulario);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const datos = {
      ...formulario,
      nombre: formulario.nombre.trim(),
      precio: Number(formulario.precio),
      descripcion: formulario.descripcion.trim() || 'Atención nutricional especializada y personalizada.',
    };

    if (editandoId === null) onCrear(datos);
    else onEditar(editandoId, datos);
    limpiar();
  };

  const comenzarEdicion = (servicio) => {
    setEditandoId(servicio.id);
    setErrores({});
    setFormulario({
      nombre: servicio.nombre || '',
      categoria: servicio.categoria || categorias[0] || '',
      precio: servicio.precio ?? '',
      duracion: servicio.duracion || '',
      modalidad: servicio.modalidad || 'Presencial',
      descripcion: servicio.descripcion || '',
    });
  };

  const confirmarEliminar = (servicio) => {
    if (window.confirm(`¿Eliminar "${servicio.nombre}" del catálogo?`)) onEliminar(servicio.id);
  };

  const claseCampo = (campo) => `form-control form-control-sm ${errores[campo] ? 'is-invalid' : ''}`;

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold mb-3">Catálogo de Servicios</h3>

      <form onSubmit={handleSubmit} noValidate className="row g-2 mb-4 p-3 bg-light rounded border">
        <h6 className="col-12 fw-bold mb-1">{editandoId === null ? 'Nuevo servicio' : `Editando servicio #${editandoId}`}</h6>
        <div className="col-12 col-md-6">
          <input name="nombre" aria-label="Nombre del servicio" className={claseCampo('nombre')} placeholder="Nombre del servicio" value={formulario.nombre} onChange={handleChange} />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>
        <div className="col-6 col-md-3">
          <select name="categoria" aria-label="Categoría" className={`form-select form-select-sm ${errores.categoria ? 'is-invalid' : ''}`} value={formulario.categoria} onChange={handleChange}>
            {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
        </div>
        <div className="col-6 col-md-3">
          <input name="precio" type="number" min="0" aria-label="Precio CLP" className={claseCampo('precio')} placeholder="Precio CLP" value={formulario.precio} onChange={handleChange} />
          {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>
        <div className="col-6 col-md-3">
          <input name="duracion" aria-label="Duración" className="form-control form-control-sm" placeholder="Duración (ej: 30 min)" value={formulario.duracion} onChange={handleChange} />
        </div>
        <div className="col-6 col-md-3">
          <select name="modalidad" aria-label="Modalidad" className="form-select form-select-sm" value={formulario.modalidad} onChange={handleChange}>
            <option>Presencial</option>
            <option>Online (video)</option>
            <option>Presencial (grupo)</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <input name="descripcion" aria-label="Descripción" className="form-control form-control-sm" placeholder="Descripción" value={formulario.descripcion} onChange={handleChange} />
        </div>
        <div className="col-12 d-flex gap-2 justify-content-end">
          {editandoId !== null && (
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={limpiar}>Cancelar</button>
          )}
          <button type="submit" className="btn btn-success btn-sm">
            {editandoId === null ? '+ Agregar' : 'Guardar cambios'}
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr><th>Servicio</th><th className="d-none d-md-table-cell">Categoría</th><th>Precio</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id}>
                <td>{s.nombre}</td>
                <td className="d-none d-md-table-cell">{s.categoria}</td>
                <td className="text-nowrap">${Number(s.precio).toLocaleString('es-CL')}</td>
                <td className="text-nowrap">
                  <Link to={`/servicios/${s.id}`} className="btn btn-sm btn-outline-secondary me-1">Ver</Link>
                  <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => comenzarEdicion(s)}>Editar</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => confirmarEliminar(s)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServicios;
