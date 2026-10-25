// Menú lateral del panel. No guarda estado: recibe la sección activa por props
// y avisa al padre (AdminDashboardPage) cuando el usuario elige otra.
export const SECCIONES_ADMIN = [
  { id: 'resumen', texto: 'Dashboard / Resumen' },
  { id: 'solicitudes', texto: 'Gestión de Solicitudes' },
  { id: 'servicios', texto: 'Catálogo / CRUD Servicios' },
  { id: 'criticos', texto: 'Ítems críticos' },
  { id: 'categoriasAdmin', texto: 'Gestión de Categorías' },
  { id: 'usuariosCrud', texto: 'CRUD de Usuarios' },
  { id: 'historial', texto: 'Historial por Usuario' },
  { id: 'reportes', texto: 'Reportes y Perfil' },
];

export const AdminSidebar = ({ seccionActiva, onCambiarSeccion, onLogout }) => (
  <div className="list-group shadow-sm">
    <div className="list-group-item bg-success text-white fw-bold d-flex justify-content-between align-items-center">
      <span>Panel NutriVida</span>
      <button type="button" className="btn btn-sm btn-outline-light py-0 px-2" onClick={onLogout}>
        Salir
      </button>
    </div>
    {SECCIONES_ADMIN.map((seccion) => (
      <button
        key={seccion.id}
        type="button"
        className={`list-group-item list-group-item-action ${seccionActiva === seccion.id ? 'active' : ''}`}
        onClick={() => onCambiarSeccion(seccion.id)}
      >
        {seccion.texto}
      </button>
    ))}
  </div>
);

export default AdminSidebar;
