import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nutricionistasData from '../data/nutricionistas.json';
import { useServicios } from '../context/ServiciosContext';
import { useCitas } from '../context/CitasContext';
import { CLAVE_SESION, obtenerSesion } from '../utils/sesion';
import {
  listarUsuarios,
  guardarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../services/usuariosService';
import {
  listarCategoriasGuardadas,
  guardarCategorias,
  obtenerCategorias,
  contarPorCategoria,
} from '../services/categoriasService';

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
  const { servicios, agregarServicio, editarServicio, eliminarServicio, renombrarCategoria } = useServicios();
  const { citas, actualizarCita } = useCitas();

  // Usuarios: estado local sincronizado con localStorage
  const [usuarios, setUsuarios] = useState(listarUsuarios);
  useEffect(() => guardarUsuarios(usuarios), [usuarios]);

  // Categorías creadas por el admin que aún no tienen servicios
  const [categoriasExtra, setCategoriasExtra] = useState(listarCategoriasGuardadas);
  useEffect(() => guardarCategorias(categoriasExtra), [categoriasExtra]);

  const categorias = obtenerCategorias(servicios, categoriasExtra);

  // Confirmar / rechazar pasa por el contexto: así se actualiza en todas las vistas
  const cambiarEstadoCita = (id, estado) => actualizarCita(id, { estado });

  const renombrar = (anterior, nueva) => {
    renombrarCategoria(anterior, nueva);
    setCategoriasExtra((prev) => prev.map((c) => (c === anterior ? nueva : c)));
  };

  const handleLogout = () => {
    localStorage.removeItem(CLAVE_SESION);
    navigate('/login');
  };

  const secciones = {
    resumen: (
      <AdminResumen
        totalServicios={servicios.length}
        totalSolicitudes={citas.length}
        pendientes={citas.filter((c) => c.estado === 'Pendiente').length}
        totalUsuarios={usuarios.length}
        totalNutricionistas={nutricionistasData.length}
        onIrA={setSeccionActiva}
      />
    ),
    solicitudes: <AdminSolicitudes citas={citas} onCambiarEstado={cambiarEstadoCita} />,
    servicios: (
      <AdminServicios
        servicios={servicios}
        categorias={categorias}
        onCrear={agregarServicio}
        onEditar={editarServicio}
        onEliminar={eliminarServicio}
      />
    ),
    criticos: <AdminCriticos nutricionistas={nutricionistasData} citas={citas} />,
    categoriasAdmin: (
      <AdminCategorias
        resumen={contarPorCategoria(servicios, categorias)}
        onCrear={(nueva) => setCategoriasExtra((prev) => [...prev, nueva])}
        onRenombrar={renombrar}
      />
    ),
    usuariosCrud: (
      <AdminUsuarios
        usuarios={usuarios}
        // crearUsuario lanza un error si el correo ya existe; AdminUsuarios lo muestra
        onCrear={(nuevo) => setUsuarios(crearUsuario(usuarios, nuevo))}
        onEditar={(email, datos) => setUsuarios((prev) => actualizarUsuario(prev, email, datos))}
        onEliminar={(email) => setUsuarios((prev) => eliminarUsuario(prev, email))}
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
        <div className="col-12 col-md-8 col-lg-9">{secciones[seccionActiva]}</div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
