import { useState } from 'react';
import { validarCampo } from '../../../utils/validaciones';

const FORM_VACIO = { nombre: '', email: '', rut: '', rol: 'PACIENTE', password: '' };

// CRUD de usuarios: nuevo, mostrar (listado) y editar. Usa la misma lista que el Registro.
export const AdminUsuarios = ({ usuarios, onCrear, onEditar, onEliminar }) => {
  const [formulario, setFormulario] = useState(FORM_VACIO);
  const [editandoEmail, setEditandoEmail] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormulario((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const limpiar = () => {
    setFormulario(FORM_VACIO);
    setEditandoEmail(null);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formulario.nombre.trim().length < 3) return setError('Ingresa un nombre válido.');
    const errorEmail = validarCampo('email', formulario.email);
    if (errorEmail) return setError(errorEmail);
    if (editandoEmail === null && formulario.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }

    try {
      if (editandoEmail === null) {
        onCrear({ ...formulario, nombre: formulario.nombre.trim() });
      } else {
        // Al editar no se cambia la contraseña (eso lo haría el propio usuario)
        const datos = { ...formulario, nombre: formulario.nombre.trim() };
        delete datos.password;
        onEditar(editandoEmail, datos);
      }
      limpiar();
    } catch (err) {
      setError(err.message);
    }
  };

  const comenzarEdicion = (usuario) => {
    setEditandoEmail(usuario.email);
    setFormulario({ ...FORM_VACIO, ...usuario, password: '' });
    setError('');
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold mb-3">CRUD de Usuarios</h3>
      <form onSubmit={handleSubmit} noValidate className="row g-2 mb-3 p-3 bg-light rounded border">
        <h6 className="col-12 fw-bold mb-1">{editandoEmail ? `Editando ${editandoEmail}` : 'Nuevo usuario'}</h6>
        <div className="col-12 col-md-4">
          <input name="nombre" aria-label="Nombre completo" className="form-control form-control-sm" placeholder="Nombre completo" value={formulario.nombre} onChange={handleChange} />
        </div>
        <div className="col-12 col-md-4">
          <input name="email" type="email" aria-label="Correo electrónico" className="form-control form-control-sm" placeholder="Correo electrónico" value={formulario.email} onChange={handleChange} />
        </div>
        <div className="col-6 col-md-2">
          <input name="rut" aria-label="RUT" className="form-control form-control-sm" placeholder="RUT" value={formulario.rut} onChange={handleChange} />
        </div>
        <div className="col-6 col-md-2">
          <select name="rol" aria-label="Rol" className="form-select form-select-sm" value={formulario.rol} onChange={handleChange}>
            <option value="PACIENTE">PACIENTE</option>
            <option value="NUTRICIONISTA">NUTRICIONISTA</option>
            <option value="SECRETARIA">SECRETARIA</option>
          </select>
        </div>
        {editandoEmail === null && (
          <div className="col-12 col-md-4">
            <input name="password" type="password" aria-label="Contraseña" className="form-control form-control-sm" placeholder="Contraseña (mín. 6)" value={formulario.password} onChange={handleChange} />
          </div>
        )}
        <div className="col-12 col-md d-flex gap-2 justify-content-end">
          {editandoEmail && <button type="button" className="btn btn-outline-secondary btn-sm" onClick={limpiar}>Cancelar</button>}
          <button type="submit" className="btn btn-primary btn-sm">{editandoEmail ? 'Guardar cambios' : 'Agregar'}</button>
        </div>
      </form>
      {error && <div className="alert alert-warning py-2" role="alert">{error}</div>}

      {usuarios.length === 0 ? (
        <p className="text-muted">Aún no hay usuarios registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr><th>Nombre</th><th>Email</th><th className="d-none d-md-table-cell">RUT</th><th>Rol</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.email}>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td className="d-none d-md-table-cell">{u.rut || '—'}</td>
                  <td><span className="badge bg-secondary">{u.rol || 'PACIENTE'}</span></td>
                  <td className="text-nowrap">
                    <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => comenzarEdicion(u)}>Editar</button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(u.email)}>Eliminar</button>
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

export default AdminUsuarios;
