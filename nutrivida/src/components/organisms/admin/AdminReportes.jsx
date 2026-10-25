import { StatCard } from '../../molecules/StatCard';

// Calcula los números del reporte a partir de las citas (función pura, fácil de probar)
export const calcularReporte = (citas = []) => {
  const contar = (estado) => citas.filter((c) => c.estado === estado).length;
  const conteoServicios = citas.reduce((acc, c) => {
    const nombre = c.servicio || 'Consulta nutricional';
    acc[nombre] = (acc[nombre] || 0) + 1;
    return acc;
  }, {});
  const [servicioTop = '—'] =
    Object.entries(conteoServicios).sort((a, b) => b[1] - a[1])[0] || [];

  return {
    total: citas.length,
    pendientes: contar('Pendiente'),
    confirmadas: contar('Confirmada'),
    canceladas: contar('Cancelada') + contar('Rechazada'),
    ingresosConfirmados: citas
      .filter((c) => c.estado === 'Confirmada')
      .reduce((suma, c) => suma + (Number(c.precio) || 0), 0),
    servicioTop,
  };
};

// Reportes de las operaciones y perfil de quien administra.
export const AdminReportes = ({ citas, perfil }) => {
  const r = calcularReporte(citas);

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold mb-4">Reportes y Perfil</h3>
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3"><StatCard valor={r.total} etiqueta="Total solicitudes" color="text-primary" /></div>
        <div className="col-6 col-md-3"><StatCard valor={r.confirmadas} etiqueta="Confirmadas" /></div>
        <div className="col-6 col-md-3"><StatCard valor={r.pendientes} etiqueta="Pendientes" color="text-warning" /></div>
        <div className="col-6 col-md-3"><StatCard valor={r.canceladas} etiqueta="Canceladas / rechazadas" color="text-danger" /></div>
      </div>
      <ul className="list-group mb-4">
        <li className="list-group-item"><strong>Ingresos de citas confirmadas:</strong> ${r.ingresosConfirmados.toLocaleString('es-CL')} CLP</li>
        <li className="list-group-item"><strong>Servicio más solicitado:</strong> {r.servicioTop}</li>
      </ul>
      <div className="border rounded p-3 bg-light">
        <h5>Perfil administrador</h5>
        <p className="mb-1"><strong>Nombre:</strong> {perfil?.nombre || 'Administrador NutriVida'}</p>
        <p className="mb-1"><strong>Correo:</strong> {perfil?.email || '—'}</p>
        <p className="mb-1"><strong>Rol:</strong> {perfil?.rol || 'ADMIN'}</p>
        <p className="mb-0"><strong>Acceso:</strong> Gestión general de la clínica</p>
      </div>
    </div>
  );
};

export default AdminReportes;
