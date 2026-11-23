import { useState } from 'react';
import { validarCampo } from '../../../utils/validaciones';

const ROLES = ['PACIENTE', 'NUTRICIONISTA', 'ADMIN'];
const FORM_VACIO = { nombre: '', email: '', rut: '', telefono: '', rol: 'PACIENTE', password: '' };

// CRUD de usuarios del panel admin. Los datos vienen del backend (los entrega la página por props).
// - onCrear(datos), onEditar(usuario, datos) y onDesactivar(usuario) devuelven una promesa:
//   si el backend responde con error, la promesa falla con el mensaje y los errores por campo.
export const AdminUsuarios = ({ usuarios = [], cargando = false, errorCarga = '', idActual, onCrear, onEditar, onDesactivar }) => {
  const [formulario, setFormulario] = useState(FORM_VACIO);
  const [editando, setEditando] = useState(null); // usuario que se está editando (o null)
  const [error, setError] = useState('');
  const [erroresCampo, setErroresCampo] = useState({});
  const [exito, setExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => setFormulario((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const limpiar = () => {
    setFormulario(FORM_VACIO);
    setEditando(null);
    setError('');
    setErroresCampo({});
  };

  // Validaciones de ayuda en el navegador. El backend vuelve a validar todo.
  const validar = () => {
    if (formulario.nombre.trim().length < 3) return 'Ingresa un nombre válido.';
    const errorEmail = validarCampo('email', formulario.email);
    if (errorEmail) return errorEmail;
    if (!editando && !formulario.rut.trim()) return 'El RUT es obligatorio.';
    if (!editando && formulario.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (editando && formulario.password && formulario.password.length < 8) {
      return 'La nueva contraseña debe tener al menos 8 caracteres.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExito('');
    setErroresCampo({});
    const errorLocal = validar();
    if (errorLocal) return setError(errorLocal);

    setError('');
    setEnviando(true);
    try {
      if (editando) {
        await onEditar(editando, formulario);
        setExito(`Se actualizó la cuenta de ${formulario.nombre.trim()}.`);
      } else {
        await onCrear(formulario);
        setExito(`Se creó la cuenta de ${formulario.nombre.trim()} con rol ${formulario.rol}.`);
      }
      limpiar();
    } catch (err) {
      // 400: errores por campo · 409: correo o RUT repetido · 403: sin permiso
      setError(err.message);
      setErroresCampo(err.errores || {});
    } finally {
      setEnviando(false);
    }
  };

  const comenzarEdicion = (usuario) => {
    setEditando(usuario);
    setFormulario({ ...FORM_VACIO, ...usuario, telefono: usuario.telefono || '', password: '' });
    setError('');
    setErroresCampo({});
    setExito('');
  };

  const desactivar = async (usuario) => {
    if (!window.confirm(`¿Desactivar la cuenta de ${usuario.nombre}? Ya no podrá iniciar sesión.`)) return;
    setExito('');
    setError('');
    try {
      await onDesactivar(usuario);
      setExito(`Se desactivó la cuenta de ${usuario.nombre}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const claseCampo = (campo) => `form-control form-control-sm${erroresCampo[campo] ? ' is-invalid' : ''}`;

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold mb-3">CRUD de Usuarios</h3>
      <form onSubmit={handleSubmit} noValidate className="row g-2 mb-3 p-3 bg-light rounded border">
        <h6 className="col-12 fw-bold mb-1">{editando ? `Editando ${editando.email}` : 'Nuevo usuario'}</h6>
        <div className="col-12 col-md-4">
          <input name="nombre" aria-label="Nombre completo" className={claseCampo('nombre')} placeholder="Nombre completo" value={formulario.nombre} onChange={handleChange} />
          {erroresCampo.nombre && <div className="invalid-feedback">{erroresCampo.nombre}</div>}
        </div>
        <div className="col-12 col-md-4">
          <input name="email" type="email" aria-label="Correo electrónico" className={claseCampo('email')} placeholder="Correo electrónico" value={formulario.email} onChange={handleChange} />
          {erroresCampo.email && <div className="invalid-feedback">{erroresCampo.email}</div>}
        </div>
        <div className="col-6 col-md-2">
          <input name="rut" aria-label="RUT" className={claseCampo('rut')} placeholder="RUT" value={formulario.rut} onChange={handleChange} disabled={Boolean(editando)} title={editando ? 'El RUT no se puede modificar' : undefined} />
          {erroresCampo.rut && <div className="invalid-feedback">{erroresCampo.rut}</div>}
        </div>
        <div className="col-6 col-md-2">
          <select name="rol" aria-label="Rol" className="form-select form-select-sm" value={formulario.rol} onChange={handleChange}>
            {ROLES.map((rol) => <option key={rol} value={rol}>{rol}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <input name="telefono" aria-label="Teléfono" className={claseCampo('telefono')} placeholder="Teléfono (opcional)" value={formulario.telefono} onChange={handleChange} />
          {erroresCampo.telefono && <div className="invalid-feedback">{erroresCampo.telefono}</div>}
        </div>
        <div className="col-12 col-md-4">
          <input name="password" type="password" aria-label="Contraseña" className={claseCampo('password')} placeholder={editando ? 'Nueva contraseña (opcional)' : 'Contraseña (mín. 8)'} value={formulario.password} onChange={handleChange} />
          {erroresCampo.password && <div className="invalid-feedback">{erroresCampo.password}</div>}
        </div>
        <div className="col-12 col-md d-flex gap-2 justify-content-end">
          {editando && <button type="button" className="btn btn-outline-secondary btn-sm" onClick={limpiar}>Cancelar</button>}
          <button type="submit" className="btn btn-primary btn-sm" disabled={enviando}>
            {enviando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Agregar'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-warning py-2" role="alert">{error}</div>}
      {exito && <div className="alert alert-success py-2" role="status">{exito}</div>}
      {errorCarga && <div className="alert alert-danger py-2" role="alert">{errorCarga}</div>}

      {cargando ? (
        <p className="text-muted" role="status">Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        !errorCarga && <p className="text-muted">Aún no hay usuarios registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Nombre</th><th>Email</th><th className="d-none d-md-table-cell">RUT</th><th>Rol</th><th>Estado</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td className="d-none d-md-table-cell">{u.rut}</td>
                  <td><span className="badge bg-secondary">{u.rol}</span></td>
                  <td>
                    <span className={`badge ${u.activo ? 'bg-success' : 'bg-danger'}`}>{u.activo ? 'Activo' : 'Inactivo'}</span>
                  </td>
                  <td className="text-nowrap">
                    <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => comenzarEdicion(u)}>Editar</button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => desactivar(u)}
                      disabled={!u.activo || u.id === idActual}
                      title={u.id === idActual ? 'No puedes desactivar tu propia cuenta' : undefined}
                    >
                      Desactivar
                    </button>
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
