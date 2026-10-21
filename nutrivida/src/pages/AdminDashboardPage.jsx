import React, { useState } from 'react';
import { useServicios } from '../context/ServiciosContext';
import { useCitas } from '../context/CitasContext';
import nutricionistasData from '../data/nutricionistas.json';

const CATEGORIAS = ['Consultas', 'Planes Especializados', 'Evaluaciones', 'Talleres'];

const FORM_VACIO = {
  nombre: '',
  categoria: CATEGORIAS[0],
  precio: '',
  duracion: '45 min',
  modalidad: 'Presencial',
  descripcion: ''
};

const colorEstado = (estado) =>
  estado === 'Cancelada' ? 'bg-danger' :
  estado === 'Confirmada' ? 'bg-success' :
  estado === 'Reprogramada' ? 'bg-info text-dark' : 'bg-warning text-dark';

export const AdminDashboardPage = () => {
  // Pestaña activa del menú lateral
  const [seccionActiva, setSeccionActiva] = useState('resumen');

  // Datos compartidos: lo que se cambia aquí se ve al tiro en el sitio público
  const { servicios, agregarServicio, editarServicio, eliminarServicio } = useServicios();
  const { citas, actualizarCita } = useCitas();

  // Formulario del catálogo: sirve para crear y para editar
  const [formServicio, setFormServicio] = useState(FORM_VACIO);
  const [idEditando, setIdEditando] = useState(null);

  const handleChangeServicio = (e) => {
    const { name, value } = e.target;
    setFormServicio((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarServicio = (e) => {
    e.preventDefault();
    if (!formServicio.nombre.trim() || !formServicio.precio) return;

    const datos = { ...formServicio, precio: Number(formServicio.precio) };

    if (idEditando) {
      editarServicio(idEditando, datos);
    } else {
      agregarServicio(datos);
    }
    setFormServicio(FORM_VACIO);
    setIdEditando(null);
  };

  const handleEditarServicio = (servicio) => {
    setIdEditando(servicio.id);
    setFormServicio({
      nombre: servicio.nombre || '',
      categoria: servicio.categoria || CATEGORIAS[0],
      precio: servicio.precio ?? '',
      duracion: servicio.duracion || '',
      modalidad: servicio.modalidad || 'Presencial',
      descripcion: servicio.descripcion || ''
    });
  };

  const handleCancelarEdicion = () => {
    setIdEditando(null);
    setFormServicio(FORM_VACIO);
  };

  const handleEliminarServicio = (id) => {
    if (window.confirm('¿Desea eliminar este servicio del catálogo activo?')) {
      eliminarServicio(id);
    }
  };

  const citasPendientes = citas.filter((c) => c.estado === 'Pendiente' || c.estado === 'Reprogramada');

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Navegación lateral del panel */}
        <div className="col-12 col-md-3 mb-4">
          <div className="list-group shadow-sm">
            <div className="list-group-item bg-success text-white fw-bold">
              Panel NutriVida
            </div>
            <button
              className={`list-group-item list-group-item-action ${seccionActiva === 'resumen' ? 'active' : ''}`}
              onClick={() => setSeccionActiva('resumen')}
            >
              Dashboard / Resumen
            </button>
            <button
              className={`list-group-item list-group-item-action ${seccionActiva === 'solicitudes' ? 'active' : ''}`}
              onClick={() => setSeccionActiva('solicitudes')}
            >
              Gestión de Solicitudes
            </button>
            <button
              className={`list-group-item list-group-item-action ${seccionActiva === 'catalogo' ? 'active' : ''}`}
              onClick={() => setSeccionActiva('catalogo')}
            >
              Catálogo / CRUD Servicios
            </button>
            <button
              className={`list-group-item list-group-item-action ${seccionActiva === 'usuarios' ? 'active' : ''}`}
              onClick={() => setSeccionActiva('usuarios')}
            >
              Nutricionistas y Usuarios
            </button>
          </div>
        </div>

        {/* Áreas de contenido dinámico según navegación */}
        <div className="col-12 col-md-9">
          
          {/* Vista 1: Resumen con métricas operativas de la clínica */}
          {seccionActiva === 'resumen' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3 text-dark">Resumen de la Clínica NutriVida</h3>
              <div className="row g-3">
                <div className="col-12 col-sm-4">
                  <div className="p-3 bg-light rounded border text-center">
                    <h4 className="fw-bold text-success">{servicios.length}</h4>
                    <p className="text-muted small mb-0">Servicios Activos</p>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="p-3 bg-light rounded border text-center">
                    <h4 className="fw-bold text-primary">{citasPendientes.length}</h4>
                    <p className="text-muted small mb-0">Citas por Confirmar</p>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="p-3 bg-light rounded border text-center">
                    <h4 className="fw-bold text-warning">{nutricionistasData.length}</h4>
                    <p className="text-muted small mb-0">Nutricionistas Registrados</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vista 2: Monitoreo de solicitudes y estados de atención */}
          {seccionActiva === 'solicitudes' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3 text-dark">Solicitudes de Cita Recientes</h3>
              {citas.length === 0 ? (
                <p className="text-muted mb-0">Aún no hay solicitudes registradas.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>N°</th>
                        <th>Paciente</th>
                        <th>Servicio</th>
                        <th>Especialista</th>
                        <th>Fecha / Hora</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {citas.map((cita) => (
                        <tr key={cita.id}>
                          <td>#{cita.id}</td>
                          <td>{cita.nombre}<br /><small className="text-muted">{cita.rut}</small></td>
                          <td>{cita.servicio || '—'}</td>
                          <td>{cita.nutricionista || 'Por asignar'}</td>
                          <td>{cita.fecha}{cita.hora ? ` | ${cita.hora} hrs` : ''}</td>
                          <td><span className={`badge ${colorEstado(cita.estado)}`}>{cita.estado}</span></td>
                          <td>
                            {cita.estado !== 'Confirmada' && cita.estado !== 'Cancelada' && (
                              <button
                                className="btn btn-outline-success btn-sm py-0 px-2"
                                onClick={() => actualizarCita(cita.id, { estado: 'Confirmada' })}
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

          {/* Vista 3: Módulo de administración del catálogo (CRUD) */}
          {seccionActiva === 'catalogo' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3 text-dark">Administración del Catálogo de Servicios</h3>
              
              {/* Formulario para crear o editar un servicio */}
              <form onSubmit={handleGuardarServicio} className="row g-2 mb-4 p-3 bg-light rounded border">
                <div className="col-12">
                  <strong>{idEditando ? `Editando servicio #${idEditando}` : 'Nuevo servicio'}</strong>
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control form-control-sm"
                    placeholder="Nombre del servicio"
                    value={formServicio.nombre}
                    onChange={handleChangeServicio}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <input
                    type="number"
                    name="precio"
                    className="form-control form-control-sm"
                    placeholder="Precio CLP"
                    value={formServicio.precio}
                    onChange={handleChangeServicio}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <input
                    type="text"
                    name="duracion"
                    className="form-control form-control-sm"
                    placeholder="Duración"
                    value={formServicio.duracion}
                    onChange={handleChangeServicio}
                  />
                </div>
                <div className="col-6 col-md-4">
                  <select
                    name="categoria"
                    className="form-select form-select-sm"
                    value={formServicio.categoria}
                    onChange={handleChangeServicio}
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6 col-md-4">
                  <select
                    name="modalidad"
                    className="form-select form-select-sm"
                    value={formServicio.modalidad}
                    onChange={handleChangeServicio}
                  >
                    <option value="Presencial">Presencial</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
                <div className="col-12 col-md-4 d-flex gap-2">
                  <button type="submit" className="btn btn-success btn-sm w-100">
                    {idEditando ? 'Guardar cambios' : '+ Agregar'}
                  </button>
                  {idEditando && (
                    <button type="button" className="btn btn-secondary btn-sm w-100" onClick={handleCancelarEdicion}>
                      Cancelar
                    </button>
                  )}
                </div>
                <div className="col-12">
                  <textarea
                    name="descripcion"
                    rows="2"
                    className="form-control form-control-sm"
                    placeholder="Descripción"
                    value={formServicio.descripcion}
                    onChange={handleChangeServicio}
                  />
                </div>
              </form>

              {/* Tabla de consulta y eliminación de prestaciones */}
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Servicio</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicios.map((s) => (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.nombre}</td>
                        <td>{s.categoria}</td>
                        <td>${s.precio?.toLocaleString('es-CL')} CLP</td>
                        <td className="d-flex gap-1">
                          <button
                            className="btn btn-outline-primary btn-sm py-0 px-2"
                            onClick={() => handleEditarServicio(s)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm py-0 px-2"
                            onClick={() => handleEliminarServicio(s.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Vista 4: Directorio del cuerpo médico registrado */}
          {seccionActiva === 'usuarios' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3 text-dark">Equipo de Nutricionistas NutriVida</h3>
              <ul className="list-group">
                {nutricionistasData.map((nut) => (
                  <li key={nut.codigo} className="list-group-item d-flex justify-content-between align-items-center py-3">
                    <div>
                      <strong>{nut.nombre}</strong> ({nut.codigo})
                      <br />
                      <small className="text-primary fw-semibold">{nut.especialidad}</small>
                      <br />
                      <small className="text-muted">{nut.dias} | {nut.horario}</small>
                    </div>
                    <span className="badge bg-primary rounded-pill">Activo</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;