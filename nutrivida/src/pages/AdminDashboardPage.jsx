import React, { useEffect, useState, useContext } from 'react';
import nutricionistasData from '../data/nutricionistas.json';
import { useServicios } from '../context/ServiciosContext';
import { CitasContext } from '../context/CitasContext';

const CLAVE_USUARIOS = 'nutrivida_usuarios_admin';

const leerUsuariosAdmin = () => {
  try {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);
    return guardados ? JSON.parse(guardados) : [
      { id: 1, nombre: 'Paciente Demo', email: 'demo@nutrivida.cl', rol: 'PACIENTE' },
      { id: 2, nombre: 'Usuario Prueba', email: 'prueba@nutrivida.cl', rol: 'PACIENTE' }
    ];
  } catch {
    return [];
  }
};

export const AdminDashboardPage = () => {
  const [seccionActiva, setSeccionActiva] = useState('resumen');

  // Hook del catálogo de servicios
  const { servicios, agregarServicio, editarServicio, eliminarServicio } = useServicios();
  
  // Contexto de Citas
  const contextoCitas = useContext(CitasContext);

  // Estado local para Citas con respaldo en localStorage para la confirmación rápida
  const [citasLocales, setCitasLocales] = useState(() => {
    try {
      const guardadas = localStorage.getItem('nutrivida_citas');
      if (guardadas) return JSON.parse(guardadas);
    } catch {}
    return contextoCitas && contextoCitas.citas ? contextoCitas.citas : [];
  });

  useEffect(() => {
    if (contextoCitas && Array.isArray(contextoCitas.citas) && contextoCitas.citas.length > 0) {
      setCitasLocales(contextoCitas.citas);
    }
  }, [contextoCitas?.citas]);

  const handleConfirmarCita = (id) => {
    const listaActualizada = citasLocales.map((c) =>
      c.id === id ? { ...c, estado: 'Confirmada' } : c
    );
    setCitasLocales(listaActualizada);
    localStorage.setItem('nutrivida_citas', JSON.stringify(listaActualizada));

    if (contextoCitas && typeof contextoCitas.actualizarEstadoCita === 'function') {
      contextoCitas.actualizarEstadoCita(id, 'Confirmada');
    } else if (contextoCitas && typeof contextoCitas.setCitas === 'function') {
      contextoCitas.setCitas(listaActualizada);
    }
  };

  const [editandoId, setEditandoId] = useState(null);
  const [precioEditado, setPrecioEditado] = useState('');
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', categoria: 'Consultas', precio: '' });

  const nutricionistasCriticos = (nutricionistasData || []).filter(
    (nut) => nut.horario && (nut.horario.includes('13:00') || nut.horario.includes('14:00'))
  );

  const resumenCategorias = [...new Set((servicios || []).map((s) => s.categoria))].map(
    (categoria) => ({
      categoria,
      total: servicios.filter((s) => s.categoria === categoria).length,
    })
  );

  const [usuariosAdmin, setUsuariosAdmin] = useState(leerUsuariosAdmin);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', rol: 'PACIENTE' });

  useEffect(() => {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosAdmin));
  }, [usuariosAdmin]);

  const agregarUsuarioAdmin = (e) => {
    e.preventDefault();
    if (!nuevoUsuario.nombre.trim() || !nuevoUsuario.email.trim()) return;
    setUsuariosAdmin((prev) => [...prev, { ...nuevoUsuario, id: Date.now() }]);
    setNuevoUsuario({ nombre: '', email: '', rol: 'PACIENTE' });
  };

  const eliminarUsuarioAdmin = (id) => {
    setUsuariosAdmin((prev) => prev.filter((u) => u.id !== id));
  };

  const historialPorUsuario = (citasLocales || []).reduce((acc, cita) => {
    const clave = cita.email || cita.rut || cita.nombre || 'Sin identificar';
    if (!acc[clave]) acc[clave] = [];
    acc[clave].push(cita);
    return acc;
  }, {});

  const totalConfirmadas = (citasLocales || []).filter((c) => c.estado === 'Confirmada').length;
  const totalCanceladas = (citasLocales || []).filter((c) => c.estado === 'Cancelada').length;

  const handleAgregarServicio = (e) => {
    if (e) e.preventDefault();
    if (!nuevoServicio.nombre.trim() || !nuevoServicio.precio) return;
    
    agregarServicio({
      nombre: nuevoServicio.nombre.trim(),
      categoria: nuevoServicio.categoria,
      precio: Number(nuevoServicio.precio),
      descripcion: 'Atención nutricional especializada y personalizada.'
    });

    setNuevoServicio({ nombre: '', categoria: 'Consultas', precio: '' });
  };

  const handleEliminarServicio = (id) => {
    eliminarServicio(id);
  };

  const handleGuardarEdicionServicio = (id) => {
    editarServicio(id, { precio: Number(precioEditado) });
    setEditandoId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('nutrivida_session');
    window.location.href = '/login';
  };

  const colorEstado = (estado) => {
    switch (estado) {
      case 'Confirmada': return 'bg-success';
      case 'Cancelada': return 'bg-danger';
      default: return 'bg-warning text-dark';
    }
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-12 col-md-3 mb-4">
          <div className="list-group shadow-sm">
            <div className="list-group-item bg-success text-white fw-bold d-flex justify-content-between align-items-center">
              <span>Panel NutriVida</span>
              <button className="btn btn-sm btn-outline-light py-0 px-2" onClick={handleLogout}>Salir</button>
            </div>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'resumen' ? 'active' : ''}`} onClick={() => setSeccionActiva('resumen')}>Dashboard / Resumen</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'solicitudes' ? 'active' : ''}`} onClick={() => setSeccionActiva('solicitudes')}>Gestión de Solicitudes</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'servicios' ? 'active' : ''}`} onClick={() => setSeccionActiva('servicios')}>Catálogo / CRUD Servicios</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'criticos' ? 'active' : ''}`} onClick={() => setSeccionActiva('criticos')}>Ítems críticos</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'categoriasAdmin' ? 'active' : ''}`} onClick={() => setSeccionActiva('categoriasAdmin')}>Gestión de Categorías</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'usuariosCrud' ? 'active' : ''}`} onClick={() => setSeccionActiva('usuariosCrud')}>CRUD de Usuarios</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'historial' ? 'active' : ''}`} onClick={() => setSeccionActiva('historial')}>Historial por Usuario</button>
            <button className={`list-group-item list-group-item-action ${seccionActiva === 'reportes' ? 'active' : ''}`} onClick={() => setSeccionActiva('reportes')}>Reportes y Perfil</button>
          </div>
        </div>

        <div className="col-12 col-md-9">

          {seccionActiva === 'resumen' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3">Resumen de la Clínica NutriVida</h3>
              <div className="row g-3">
                <div className="col-12 col-sm-4"><div className="p-3 bg-light rounded border text-center"><h4 className="fw-bold text-success">{servicios.length}</h4><p className="text-muted small mb-0">Servicios Activos</p></div></div>
                <div className="col-12 col-sm-4"><div className="p-3 bg-light rounded border text-center"><h4 className="fw-bold text-primary">{citasLocales.length}</h4><p className="text-muted small mb-0">Solicitudes Totales</p></div></div>
                <div className="col-12 col-sm-4"><div className="p-3 bg-light rounded border text-center"><h4 className="fw-bold text-info">{(nutricionistasData || []).length}</h4><p className="text-muted small mb-0">Nutricionistas</p></div></div>
              </div>
            </div>
          )}

          {seccionActiva === 'solicitudes' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3">Gestión de Solicitudes y Citas</h3>
              {citasLocales.length === 0 ? (
                <p className="text-muted">No hay solicitudes registradas.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Paciente</th>
                        <th>Servicio</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {citasLocales.map((c) => (
                        <tr key={c.id}>
                          <td>{c.nombre || c.paciente || c.email || 'Paciente'}</td>
                          <td>{c.servicio || 'Consulta nutricional'}</td>
                          <td>{c.fecha}</td>
                          <td>
                            <span className={`badge ${colorEstado(c.estado)}`}>
                              {c.estado}
                            </span>
                          </td>
                          <td>
                            {c.estado !== 'Confirmada' && (
                              <button
                                className="btn btn-sm btn-success me-1"
                                onClick={() => handleConfirmarCita(c.id)}
                              >
                                Confirmar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {seccionActiva === 'servicios' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3">Catálogo de Servicios</h3>
              <form onSubmit={handleAgregarServicio} className="row g-2 mb-4 p-3 bg-light rounded border">
                <div className="col-12 col-md-4">
                  <input type="text" className="form-control form-control-sm" placeholder="Nombre del servicio" value={nuevoServicio.nombre} onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })} />
                </div>
                <div className="col-12 col-md-3">
                  <select className="form-select form-select-sm" value={nuevoServicio.categoria} onChange={(e) => setNuevoServicio({ ...nuevoServicio, categoria: e.target.value })}>
                    <option value="Consultas">Consultas</option>
                    <option value="Planes Especializados">Planes Especializados</option>
                    <option value="Evaluaciones">Evaluaciones</option>
                    <option value="Talleres">Talleres</option>
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <input type="number" className="form-control form-control-sm" placeholder="Precio CLP" value={nuevoServicio.precio} onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: e.target.value })} />
                </div>
                <div className="col-12 col-md-2">
                  <button type="submit" className="btn btn-success btn-sm w-100">+ Agregar</button>
                </div>
              </form>

              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr><th>Servicio</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {servicios.map((s) => (
                      <tr key={s.id}>
                        <td>{s.nombre}</td>
                        <td>{s.categoria}</td>
                        <td>
                          {editandoId === s.id ? (
                            <input type="number" className="form-control form-control-sm" placeholder="Precio Edición" value={precioEditado} onChange={(e) => setPrecioEditado(e.target.value)} />
                          ) : (
                            `$${Number(s.precio).toLocaleString('de-DE')} CLP`
                          )}
                        </td>
                        <td>
                          {editandoId === s.id ? (
                            <button className="btn btn-sm btn-success me-1" onClick={() => handleGuardarEdicionServicio(s.id)}>Guardar cambios</button>
                          ) : (
                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => { setEditandoId(s.id); setPrecioEditado(s.precio); }}>Editar</button>
                          )}
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminarServicio(s.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {seccionActiva === 'criticos' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3">Ítems críticos</h3>
              <p className="text-muted">Horarios con disponibilidad más acotada.</p>
              <div className="list-group">
                {nutricionistasCriticos.map((nut) => (
                  <div key={nut.codigo || nut.id} className="list-group-item">
                    <strong>{nut.nombre}</strong>
                    <div>{nut.dias}</div>
                    <small className="text-danger">Horario acotado: {nut.horario}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {seccionActiva === 'categoriasAdmin' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3">Gestión de Categorías</h3>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr><th>Categoría</th><th>Servicios asociados</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    {resumenCategorias.map((item) => (
                      <tr key={item.categoria}>
                        <td>{item.categoria}</td>
                        <td>{item.total}</td>
                        <td><span className="badge bg-success">Activa</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {seccionActiva === 'usuariosCrud' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3">CRUD de Usuarios</h3>
              <form onSubmit={agregarUsuarioAdmin} className="row g-2 mb-4 p-3 bg-light rounded border">
                <div className="col-12 col-md-4">
                  <input type="text" className="form-control form-control-sm" placeholder="Nombre completo" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
                </div>
                <div className="col-12 col-md-4">
                  <input type="email" className="form-control form-control-sm" placeholder="Correo electrónico" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
                </div>
                <div className="col-12 col-md-2">
                  <select className="form-select form-select-sm" value={nuevoUsuario.rol} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}>
                    <option value="PACIENTE">PACIENTE</option>
                    <option value="NUTRICIONISTA">NUTRICIONISTA</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="col-12 col-md-2">
                  <button type="submit" className="btn btn-primary btn-sm w-100">Agregar</button>
                </div>
              </form>
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Acción</th></tr>
                  </thead>
                  <tbody>
                    {usuariosAdmin.map((u) => (
                      <tr key={u.id}>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                        <td><span className="badge bg-secondary">{u.rol}</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarUsuarioAdmin(u.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {seccionActiva === 'historial' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3">Historial de solicitudes por usuario</h3>
              {Object.keys(historialPorUsuario).length === 0 ? (
                <p className="text-muted">No hay historial disponible.</p>
              ) : (
                Object.entries(historialPorUsuario).map(([usuario, lista]) => (
                  <div key={usuario} className="mb-4">
                    <h5>{usuario}</h5>
                    <ul className="list-group">
                      {lista.map((cita) => (
                        <li key={cita.id} className="list-group-item d-flex justify-content-between">
                          <span>{cita.fecha} - {cita.servicio || 'Consulta nutricional'}</span>
                          <span className={`badge ${colorEstado(cita.estado)}`}>{cita.estado}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}

          {seccionActiva === 'reportes' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-4">Reportes y Perfil</h3>
              <div className="row g-3 mb-4">
                <div className="col-md-4"><div className="border rounded p-3 text-center"><strong>{citasLocales.length}</strong><br/>Total solicitudes</div></div>
                <div className="col-md-4"><div className="border rounded p-3 text-center"><strong>{totalConfirmadas}</strong><br/>Confirmadas</div></div>
                <div className="col-md-4"><div className="border rounded p-3 text-center"><strong>{totalCanceladas}</strong><br/>Canceladas</div></div>
              </div>
              <div className="border rounded p-3 bg-light">
                <h5>Perfil administrador</h5>
                <p className="mb-1"><strong>Nombre:</strong> Administrador NutriVida</p>
                <p className="mb-1"><strong>Rol:</strong> ADMIN</p>
                <p className="mb-0"><strong>Acceso:</strong> Gestión general de la clínica</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;