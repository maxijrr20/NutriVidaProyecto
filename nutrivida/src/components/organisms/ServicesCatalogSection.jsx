import React, { useState } from 'react';
import { ServiceCard } from '../molecules/ServiceCard';
import serviciosData from '../../data/servicios.json';

const CATEGORIAS = ['Todos', 'Consultas', 'Planes Especializados', 'Evaluaciones', 'Talleres'];

export const ServicesCatalogSection = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  // Normalizador para comparar sin líos de mayúsculas ni tildes
  const normalizar = (texto = '') =>
    texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  // Filtrado robusto
  const serviciosFiltrados = categoriaSeleccionada === 'Todos'
    ? serviciosData
    : serviciosData.filter((item) => {
        const catItem = normalizar(item.categoria || item.tipo || '');
        const catBoton = normalizar(categoriaSeleccionada);
        return catItem.includes(catBoton) || catBoton.includes(catItem);
      });

  return (
    <section className="catalogo-servicios-seccion mb-5">
      <div className="seccion-header text-center mb-4">
        <h2>Nuestros Servicios</h2>
        <p className="introduccion-servicios">
          Explora nuestros planes y consultas adaptados a cada etapa y necesidad nutricional.
        </p>
      </div>

      {/* Botones de filtro de categorías */}
      <div className="filtros-categorias mb-4">
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
      {serviciosFiltrados.length > 0 ? (
        <div className="grilla-servicios">
          {serviciosFiltrados.map((servicio) => (
            <ServiceCard
              key={servicio.id || servicio.codigo || servicio.nombre}
              titulo={servicio.nombre || servicio.titulo}
              descripcion={servicio.descripcion}
              precio={servicio.precio ?? servicio.valor}
              categoria={servicio.categoria || servicio.tipo}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">
            Pronto añadiremos nuevos servicios en la categoría <strong>{categoriaSeleccionada}</strong>.
          </p>
        </div>
      )}
    </section>
  );
};

export default ServicesCatalogSection;