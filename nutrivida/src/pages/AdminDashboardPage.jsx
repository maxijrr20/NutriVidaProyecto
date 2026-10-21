import React, { useState } from 'react';

export const AdminDashboardPage = () => {
  const [seccionActiva, setSeccionActiva] = useState('resumen');

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Sidebar / Menú Lateral */}
        <div className="col-12 col-md-3 mb-4">
          <div className="list-group shadow-sm">
            <div className="list-group-item bg-success text-white fw-bold">
              ⚙️ Panel NutriVida
            </div>
            <button
              className={`list-group-item list-group-item-action ${seccionActiva === 'resumen' ? 'active' : ''}`}
              onClick={() => setSeccionActiva('resumen')}
            >
              📊 Dashboard / Resumen
            </button>
            <button
              className={`list-group-item list-group-item-action ${seccionActiva === 'solicitudes' ? 'active' : ''}`}
              onClick={() => setSeccionActiva('solicitudes')}
            >
              📅 Gestión de Solicitudes
            </button>
            <button
              className={`list-group-item list-group-item-action ${seccionActiva === 'catalogo' ? 'active' : ''}`}
              onClick={() => setSeccionActiva('catalogo')}
            >
              🥗 Catálogo / CRUD Servicios
            </button>
            <button
              className={`list-group-item list-group-item-action ${seccionActiva === 'usuarios' ? 'active' : ''}`}
              onClick={() => setSeccionActiva('usuarios')}
            >
              👥 Nutricionistas y Usuarios
            </button>
          </div>
        </div>

        {/* Panel Principal */}
        <div className="col-12 col-md-9">
          {seccionActiva === 'resumen' && (
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-3 text-dark">Resumen de la Clínica NutriVida</h3>
              <div className="row g-3">
                <div className="col-12 col-sm-4">
                  <div className="p-3 bg-light rounded border text-center">
                    <h4 className="fw-bold text-success">18</h4>
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
                    <h4 className="fw-bold text-warning">4</h4>
                    <p className="text-muted small mb-0">Nutricionistas Registrados</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;