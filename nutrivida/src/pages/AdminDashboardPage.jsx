import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServicios } from '../context/ServiciosContext';
import { useCitas } from '../context/CitasContext';
import { cerrarSesion, obtenerSesion } from '../utils/sesion';
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  cambiarRolUsuario,
  desactivarUsuario,
} from '../services/usuariosService';

import { AdminSidebar } from '../components/organisms/admin/AdminSidebar';
import { AdminResumen } from '../components/organisms/admin/AdminResumen';
import { AdminSolicitudes } from '../components/organisms/admin/AdminSolicitudes';
import { AdminServicios } from '../components/organisms/admin/AdminServicios';
import { AdminCriticos } from '../components/organisms/admin/AdminCriticos';
import { AdminCategorias } from '../components/organisms/admin/AdminCategorias';
import { AdminUsuarios } from '../components/organisms/admin/AdminUsuarios';
import { AdminHistorial } from '../components/organisms/admin/AdminHistorial';
import { AdminReportes } from '../components/organisms/admin/AdminReportes';

/**
 * Página del panel de administración.
 * Responsabilidad: obtener los datos (contextos y servicios) y repartirlos por props
 * a cada organismo. Cada organismo se encarga de UNA sección del panel.
 */
export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [seccionActiva, setSeccionActiva] = useState('resumen');

  // Datos compartidos por contexto (los mismos que ve el sitio público)
  const {
    servicios,
    categorias: listaCategorias,
    nutricionistas,
    origen,
    error: errorCatalogo,
    agregarServicio,
    editarServicio,
    eliminarServicio,
    crearCategoria,
    renombrarCategoria,
  } = useServicios();
  const { citas, error: errorCitas, recargar: recargarCitas, cambiarEstadoCita } = useCitas();
  const [avisoCitas, setAvisoCitas] = useState('');

  // Las solicitudes dependen de la sesión: se piden al backend al abrir el panel
  useEffect(() => {
    recargarCitas();
  }, [recargarCitas]);

  // Usuarios: vienen del backend (GET /api/v1/usuarios, solo ADMIN)
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [errorUsuarios, setErrorUsuarios] = useState('');

  // Si el token venció o la cuenta se desactivó (401), el interceptor de Axios borra la sesión: se vuelve al login
  const manejarErrorApi = useCallback((err) => {
    if (err.estado === 401) navigate('/login', { replace: true });
    throw err;
  }, [navigate]);

  const cargarUsuarios = useCallback(
    () =>
      listarUsuarios()
        .then((lista) => {
          setUsuarios(lista);
          setErrorUsuarios('');
        })
        .catch((err) => {
          if (err.estado === 401) navigate('/login', { replace: true });
          setErrorUsuarios(err.message);
        })
        .finally(() => setCargandoUsuarios(false)),
    [navigate]
  );

  useEffect(() => {
    cargarUsuarios();
  }, [cargarUsuarios]);

  // Cada operación llama al endpoint y luego vuelve a pedir la lista, así la tabla muestra lo que quedó en la base de datos
  const crearUsuarioApi = (datos) =>
    crearUsuario(datos).then(cargarUsuarios).catch(manejarErrorApi);

  const editarUsuarioApi = async (usuario, datos) => {
    try {
      await actualizarUsuario(usuario.id, datos);
      if (datos.rol !== usuario.rol) await cambiarRolUsuario(usuario.id, datos.rol);
    } catch (err) {
      manejarErrorApi(err);
    } finally {
      await cargarUsuarios();
    }
  };

  const desactivarUsuarioApi = (usuario) =>
    desactivarUsuario(usuario.id).then(cargarUsuarios).catch(manejarErrorApi);

  // Categorías del backend: nombres para el formulario de servicios y totales para la tabla
  const categorias = listaCategorias.map((c) => c.nombre);
  const resumenCategorias = listaCategorias.map((c) => ({ categoria: c.nombre, total: c.totalServicios }));

  // Confirmar / rechazar: PATCH /citas/{id}/estado (solo ADMIN). Si falla, se muestra el motivo.
  const cambiarEstado = (id, estado) => {
    setAvisoCitas('');
    return cambiarEstadoCita(id, estado).catch((err) => {
      if (err.estado === 401) navigate('/login', { replace: true });
      setAvisoCitas(`No se pudo cambiar el estado de la cita #${id}: ${err.message}`);
    });
  };

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  const secciones = {
    resumen: (
      <AdminResumen
        totalServicios={servicios.length}
        totalSolicitudes={citas.length}
        pendientes={citas.filter((c) => c.estado === 'Pendiente').length}
        totalUsuarios={usuarios.length}
        totalNutricionistas={nutricionistas.length}
        onIrA={setSeccionActiva}
      />
    ),
    solicitudes: (
      <>
        {(avisoCitas || errorCitas) && (
          <div className="alert alert-danger" role="alert">{avisoCitas || `No se pudieron cargar las solicitudes: ${errorCitas}`}</div>
        )}
        <AdminSolicitudes citas={citas} onCambiarEstado={cambiarEstado} />
      </>
    ),
    servicios: (
      <AdminServicios
        servicios={servicios}
        categorias={categorias}
        onCrear={agregarServicio}
        onEditar={editarServicio}
        onEliminar={eliminarServicio}
      />
    ),
    criticos: <AdminCriticos nutricionistas={nutricionistas} citas={citas} />,
    categoriasAdmin: (
      <AdminCategorias
        resumen={resumenCategorias}
        onCrear={crearCategoria}
        onRenombrar={renombrarCategoria}
      />
    ),
    usuariosCrud: (
      <AdminUsuarios
        usuarios={usuarios}
        cargando={cargandoUsuarios}
        errorCarga={errorUsuarios}
        idActual={obtenerSesion()?.id}
        // Si el backend responde con error (400, 403, 409), AdminUsuarios muestra el mensaje
        onCrear={crearUsuarioApi}
        onEditar={editarUsuarioApi}
        onDesactivar={desactivarUsuarioApi}
      />
    ),
    historial: <AdminHistorial citas={citas} />,
    reportes: <AdminReportes citas={citas} perfil={obtenerSesion()} />,
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3 mb-4">
          <AdminSidebar
            seccionActiva={seccionActiva}
            onCambiarSeccion={setSeccionActiva}
            onLogout={handleLogout}
          />
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          {origen !== 'api' && errorCatalogo && (
            <div className="alert alert-warning" role="alert">
              {errorCatalogo}. Se muestran datos de respaldo y los cambios del catálogo no se guardarán.
            </div>
          )}
          {secciones[seccionActiva]}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
