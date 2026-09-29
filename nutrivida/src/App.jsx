import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

// Marcadores provisionales
const ServiciosPage = () => <main style={{ padding: '40px', textAlign: 'center' }}><h2>Módulo Servicios (En desarrollo)</h2></main>;
const ContactoPage = () => <main style={{ padding: '40px', textAlign: 'center' }}><h2>Módulo Agendar Cita (En desarrollo)</h2></main>;

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;