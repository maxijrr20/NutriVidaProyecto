import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';

import { HomePage } from './pages/HomePage';
import { ServiciosPage } from './pages/ServiciosPage';
import { LoginPage } from './pages/LoginPage';
import { ContactoPage } from './pages/ContactoPage';

import AdminDashboardPage from './pages/AdminDashboardPage';
import CategoriasPage from './pages/CategoriasPage';
import CategoriaDetallePage from './pages/CategoriaDetallePage';
import DetalleServicioPage from './pages/DetalleServicioPage';
import ServiciosDestacadosPage from './pages/ServiciosDestacadosPage';

import ConfirmacionSolicitudPage from './pages/ConfirmacionSolicitudPage';
import SolicitudEnCursoPage from './pages/SolicitudEnCursoPage';
import ResultadoPage from './pages/ResultadoPage';

import NosotrosPage from './pages/NosotrosPage';
import BlogPage from './pages/BlogPage';
import BlogDetallePage from './pages/BlogDetallePage';
import RegistroPage from './pages/RegistroPage';

import RutaAdmin from './components/RutaAdmin';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          {/* Inicio */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Servicios */}
          <Route
            path="/servicios"
            element={<ServiciosPage />}
          />

          <Route
            path="/servicios/:id"
            element={<DetalleServicioPage />}
          />

          {/* Categorías */}
          <Route
            path="/categorias"
            element={<CategoriasPage />}
          />

          <Route
            path="/categorias/:categoria"
            element={<CategoriaDetallePage />}
          />

          {/* Servicios destacados */}
          <Route
            path="/destacados"
            element={<ServiciosDestacadosPage />}
          />

          {/* Nosotros */}
          <Route
            path="/nosotros"
            element={<NosotrosPage />}
          />

          {/* Blog */}
          <Route
            path="/blog"
            element={<BlogPage />}
          />

          <Route
            path="/blog/:id"
            element={<BlogDetallePage />}
          />

          {/* Agendamiento */}
          <Route
            path="/contacto"
            element={<ContactoPage />}
          />

          <Route
            path="/confirmacion-solicitud"
            element={<ConfirmacionSolicitudPage />}
          />

          <Route
            path="/solicitud-en-curso"
            element={<SolicitudEnCursoPage />}
          />

          <Route
            path="/resultado"
            element={<ResultadoPage />}
          />

          {/* Registro e inicio de sesión */}
          <Route
            path="/registro"
            element={<RegistroPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* Panel de administración protegido */}
          <Route
            path="/admin"
            element={
              <RutaAdmin>
                <AdminDashboardPage />
              </RutaAdmin>
            }
          />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;