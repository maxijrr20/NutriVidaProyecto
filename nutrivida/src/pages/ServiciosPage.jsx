import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServicesCatalogSection } from '../components/organisms/ServicesCatalogSection';
import { TeamDirectorySection } from '../components/organisms/TeamDirectorySection';
import { useServicios } from '../context/ServiciosContext';

// Página: obtiene los servicios del contexto y la navegación del router,
// y se los entrega por props a los organismos.
export const ServiciosPage = () => {
  const navigate = useNavigate();
  const { servicios, nutricionistas } = useServicios();

  return (
    <main className="pagina-servicios py-4">
      {/* 1. Catálogo interactivo de servicios con filtros */}
      <ServicesCatalogSection
        servicios={servicios}
        onVerDetalle={(id) => navigate(`/servicios/${id}`)}
        onAgendar={() => navigate('/contacto')}
      />

      <hr className="separador-secciones my-5" />

      {/* 2. Directorio completo del equipo médico */}
      <TeamDirectorySection
        nutricionistas={nutricionistas}
        onAgendar={() => navigate('/contacto')}
      />
    </main>
  );
};

export default ServiciosPage;