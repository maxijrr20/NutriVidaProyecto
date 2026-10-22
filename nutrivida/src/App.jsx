import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';

import { HomePage } from './pages/HomePage';
import { ServiciosPage } from './pages/ServiciosPage';
import { LoginPage } from './pages/LoginPage';
import { ContactoPage } from './pages/ContactoPage';

import CategoriasPage from './pages/CategoriasPage';
import CategoriaDetallePage from './pages/CategoriaDetallePage';
import DetalleServicioPage from './pages/DetalleServicioPage';
import ServiciosDestacadosPage from './pages/ServiciosDestacadosPage';
import RegistroPage from './pages/RegistroPage';

import ConfirmacionSolicitudPage from './pages/ConfirmacionSolicitudPage';
import SolicitudEnCursoPage from './pages/SolicitudEnCursoPage';
import ResultadoPage from './pages/ResultadoPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/servicios/:id" element={<DetalleServicioPage />} />

          <Route path="/categorias" element={<CategoriasPage />} />
          <Route
            path="/categorias/:categoria"
            element={<CategoriaDetallePage />}
          />

          <Route
            path="/destacados"
            element={<ServiciosDestacadosPage />}
          />

          <Route path="/contacto" element={<ContactoPage />} />

          <Route
            path="/confirmacion-solicitud"
            element={<ConfirmacionSolicitudPage />}
          />

          <Route
            path="/solicitud-en-curso"
            element={<SolicitudEnCursoPage />}
          />

          <Route path="/resultado" element={<ResultadoPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />

          <Route path="*" element={<h2 className="p-5 text-center">404 - Página no encontrada</h2>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;