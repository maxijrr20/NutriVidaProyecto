import React from 'react';
import { ServicesCatalogSection } from '../components/organisms/ServicesCatalogSection';
import { TeamDirectorySection } from '../components/organisms/TeamDirectorySection';

export const ServiciosPage = () => {
  return (
    <main className="pagina-servicios py-4">
      {/* 1. Catálogo interactivo de servicios con filtros */}
      <ServicesCatalogSection />

      <hr className="separador-secciones my-5" />

      {/* 2. Directorio completo del equipo médico */}
      <TeamDirectorySection />
    </main>
  );
};

export default ServiciosPage;