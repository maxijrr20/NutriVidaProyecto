import React, { useState } from 'react';
import { listarServicios, crearServicio, eliminarServicio } from '../services/serviciosService';


export const AdminDashboardPage = () => {
  // Estado para controlar la pestaña activa del menú lateral
  const [seccionActiva, setSeccionActiva] = useState('resumen');
  
  // Sincronización del catálogo de servicios con la capa de datos local
  const [servicios, setServicios] = useState(listarServicios());
  
  // Estado del formulario para el registro de nuevos servicios
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: '',
    categoria: 'Consulta General',
    precio: '',
    duracion: '45 min'
  });

  // Nómina oficial de profesionales basada en el catálogo institucional
  const equipoNutricionistas = [
    {
      id: 'NUT001',
      nombre: 'Nut. Carolina Fuentes M.',
      especialidad: 'Obesidad y síndrome metabólico',
      horario: 'Lunes, Miércoles, Viernes | 09:00 - 17:00',
      estado: 'Activo'
    },
    {
      id: 'NUT002',
      nombre: 'Nut. Rodrigo Sepúlveda A.',
      especialidad: 'Nutrición deportiva y rendimiento',
      horario: 'Martes, Jueves, Sábado | 09:00 - 14:00',
      estado: 'Activo'
    },
    {
      id: 'NUT003',
      nombre: 'Nut. Daniela Morales C.',
      especialidad: 'Alimentación vegetariana, vegana y trastornos alimentarios',
      horario: 'Lunes a Viernes | 08:00 - 13:00',
      estado: 'Activo'
    },
    {
      id: 'NUT004',
      nombre: 'Nut. Felipe Araya R.',
      especialidad: 'Nutrición pediátrica y familiar',
      horario: 'Martes a Viernes | 14:00 - 19:00',
      estado: 'Activo'
    }
  ];

  // Controlador para el registro e incorporación de nuevos servicios al estado
  const handleCrearServicio = (e) => {
    e.preventDefault();
    if (!nuevoServicio.nombre.trim() || !nuevoServicio.precio) return;

    const servicioCreado = crearServicio({
      ...nuevoServicio,
      precio: Number(nuevoServicio.precio)
    });

    setServicios([...servicios, servicioCreado]);
    setNuevoServicio({ nombre: '', categoria: 'Consulta General', precio: '', duracion: '45 min' });
  };

  // Controlador para la baja de servicios existentes con confirmación de usuario
  const handleEliminarServicio = (id) => {
    if (window.confirm('¿Desea eliminar este servicio del catálogo activo?')) {
      eliminarServicio(id);
      setServicios(servicios.filter(s => s.id !== id));
    }
  };

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
                    <h4 className="fw-bold text-primary">12</h4>
                    <p className="text-muted small mb-0">Citas de la Semana</p>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="p-3 bg-light rounded border text-center">
                    <h4 className="fw-bold text-warning">{equipoNutricionistas.length}</h4>
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
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Paciente</th>
                      <th>RUT</th>
                      <th>Especialista</th>
                      <th>Fecha / Hora</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Maximiliano Valenzuela</td>
                      <td>12.345.678-5</td>
                      <td>Nut. Carolina Fuentes M.</td>
                      <td>2026-10-22 | 09:00 hrs</td>
                      <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                    </tr>
                    <tr>
                      <td>Ignacia Silva</td>
                      <td>19.876.543-2</td>
                      <td>Nut. Rodrigo Sepúlveda A.</td>
                      <td>2026-10-23 | 11:30 hrs</td>
                      <td><span className="badge bg-success">Confirmada</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Vista 3: Módulo de administración del catálogo (CRUD) */}
          {seccionActiva === 'catalogo' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3 text-dark">Administración del Catálogo de Servicios</h3>
              
              {/* Formularios para alta de nuevos ítems */}
              <form onSubmit={handleCrearServicio} className="row g-2 mb-4 p-3 bg-light rounded border">
                <div className="col-12 col-md-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nombre del servicio"
                    value={nuevoServicio.nombre}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Precio CLP"
                    value={nuevoServicio.precio}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <select
                    className="form-select form-select-sm"
                    value={nuevoServicio.categoria}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, categoria: e.target.value })}
                  >
                    <option value="Consulta General">Consulta General</option>
                    <option value="Nutrición Deportiva">Nutrición Deportiva</option>
                    <option value="Nutrición Infantil">Nutrición Infantil</option>
                  </select>
                </div>
                <div className="col-12 col-md-2">
                  <button type="submit" className="btn btn-success btn-sm w-100">
                    + Agregar
                  </button>
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
                        <td>
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
                {equipoNutricionistas.map((nut) => (
                  <li key={nut.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                    <div>
                      <strong>{nut.nombre}</strong> ({nut.id})
                      <br />
                      <small className="text-primary fw-semibold">{nut.especialidad}</small>
                      <br />
                      <small className="text-muted">{nut.horario}</small>
                    </div>
                    <span className="badge bg-primary rounded-pill">{nut.estado}</span>
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