import { StatCard } from '../../molecules/StatCard';

// Dashboard: resumen de solicitudes, catálogo y usuarios, con accesos a cada módulo.
export const AdminResumen = ({ totalServicios, totalSolicitudes, pendientes, totalUsuarios, totalNutricionistas, onIrA }) => (
  <div className="card shadow-sm p-4">
    <h3 className="fw-bold mb-3">Resumen de la Clínica NutriVida</h3>
    <div className="row g-3">
      <div className="col-6 col-lg-3"><StatCard valor={totalServicios} etiqueta="Servicios Activos" /></div>
      <div className="col-6 col-lg-3"><StatCard valor={totalSolicitudes} etiqueta="Solicitudes Totales" color="text-primary" /></div>
      <div className="col-6 col-lg-3"><StatCard valor={pendientes} etiqueta="Pendientes de confirmar" color="text-warning" /></div>
      <div className="col-6 col-lg-3"><StatCard valor={totalUsuarios} etiqueta="Usuarios registrados" color="text-info" /></div>
    </div>
    <p className="text-muted small mt-3 mb-2">Equipo: {totalNutricionistas} nutricionistas.</p>
    <div className="d-flex flex-wrap gap-2">
      <button type="button" className="btn btn-outline-success btn-sm" onClick={() => onIrA('solicitudes')}>Ir a solicitudes</button>
      <button type="button" className="btn btn-outline-success btn-sm" onClick={() => onIrA('servicios')}>Ir al catálogo</button>
      <button type="button" className="btn btn-outline-success btn-sm" onClick={() => onIrA('usuariosCrud')}>Ir a usuarios</button>
    </div>
  </div>
);

export default AdminResumen;
