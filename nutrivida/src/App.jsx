import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import HomePage from './pages/HomePage';
import CategoriasPage from './pages/CategoriasPage';
import ServiciosPage from './pages/ServiciosPage';
import DetalleServicioPage from './pages/DetalleServicioPage';
import ContactoPage from './pages/ContactoPage';
import ConfirmacionSolicitudPage from './pages/ConfirmacionSolicitudPage';
import SolicitudEnCursoPage from './pages/SolicitudEnCursoPage';
import ResultadoPage from './pages/ResultadoPage';
import { LoginPage } from './pages/LoginPage';
function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/servicios/:id" element={<DetalleServicioPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/confirmacion-solicitud" element={<ConfirmacionSolicitudPage />} />
          <Route path="/solicitud-en-curso" element={<SolicitudEnCursoPage />} />
          <Route path="/resultado" element={<ResultadoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h2 className="p-5 text-center">404 - Página no encontrada</h2>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;