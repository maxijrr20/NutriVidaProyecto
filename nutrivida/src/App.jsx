import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import { HomePage } from './pages/HomePage';
import { ServiciosPage } from './pages/ServiciosPage';
import { LoginPage } from './pages/LoginPage';
import CategoriasPage from './pages/CategoriasPage';
import DetalleServicioPage from './pages/DetalleServicioPage';

const ContactoPage = () => (
  <main className="p-5 text-center">
    <h2>Agendar Cita (En construcción)</h2>
  </main>
);

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/servicios/:id" element={<DetalleServicioPage />} />     
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;