import React, { useState } from 'react';
import { ServiceCard } from '../molecules/ServiceCard';
import serviciosData from '../../data/servicios.json';

const CATEGORIAS = ['Todos', 'Consultas', 'Planes Especializados', 'Evaluaciones', 'Talleres'];

export const ServicesCatalogSection = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  // Filtrado de la lista según categoría
  const serviciosFiltrados = categoriaSeleccionada === 'Todos'
    ? serviciosData
    : serviciosData.filter((item) => item.categoria === categoriaSeleccionada);

  return (
    <section className="catalogo-servicios-seccion">
      <div className="seccion-header text-center mb-4">
        <h2>Nuestros Servicios</h2>
        <p className="introduccion-servicios">
          Explora nuestros planes y consultas adaptados a cada etapa y necesidad nutricional.
        </p>
      </div>

      {/* Botones de filtro de categorías */}
      <div className="filtros-categorias">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filtro-btn ${categoriaSeleccionada === cat ? 'activo' : ''}`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grilla con los servicios filtrados */}
      <div className="grilla-servicios">
        {serviciosFiltrados.map((servicio) => (
          <ServiceCard
            key={servicio.id}
            titulo={servicio.nombre || servicio.titulo}
            descripcion={servicio.descripcion}
            precio={servicio.precio}
            categoria={servicio.categoria}
          />
        ))}
      </div>
    </section>
  );
};