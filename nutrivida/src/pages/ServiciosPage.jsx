import React from 'react';
import { ServicesCatalogSection } from '../components/organisms/ServicesCatalogSection';

export const ServiciosPage = () => {
  return (
    <main className="pagina-servicios">
      {/* 1. Catálogo interactivo de servicios */}
      <ServicesCatalogSection />

      <hr className="separador-secciones my-5" />

      {/* 2. Sección reservada para que la desarrolle tu compañera */}
      <section className="equipo-nutricionistas-seccion text-center p-4">
        <h2>Equipo de Nutricionistas</h2>
        <p className="text-muted">
          (En desarrollo por equipo: listado de especialistas certificados)
        </p>
      </section>
    </main>
  );
};