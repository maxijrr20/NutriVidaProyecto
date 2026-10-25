import React, { useState } from 'react';
import { ServiceCard } from '../molecules/ServiceCard';
import { useServicios } from '../../context/ServiciosContext';
import { filtrarServicios } from '../../utils/filtros';

// Organismo: catálogo con buscador por texto + filtro por categoría.
export const ServicesCatalogSection = () => {
  const { servicios: serviciosData } = useServicios();

  // Estado local: lo que el usuario eligió para filtrar
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // Las categorías salen de los datos: si el admin crea una nueva, aparece aquí sola
  const categorias = ['Todos', ...new Set(serviciosData.map((s) => s.categoria).filter(Boolean))];

  const serviciosFiltrados = filtrarServicios(serviciosData, {
    categoria: categoriaSeleccionada,
    texto: busqueda,
  });

  return (
    <section className="catalogo-servicios-seccion mb-5">
      <div className="seccion-header text-center mb-4">
        <h2>Nuestros Servicios</h2>
        <p className="introduccion-servicios">
          Explora nuestros planes y consultas adaptados a cada etapa y necesidad nutricional.
        </p>
      </div>

      {/* Buscador por texto (nombre o descripción) */}
      <div className="row justify-content-center mb-3 px-3">
        <div className="col-12 col-md-8 col-lg-6">
          <label htmlFor="buscador-servicios" className="visually-hidden">
            Buscar servicio
          </label>
          <input
            id="buscador-servicios"
            type="search"
            className="form-control"
            placeholder="Buscar servicio (ej: teleconsulta, deportiva...)"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Botones de filtro de categorías */}
      <div className="filtros-categorias mb-4">
        {categorias.map((cat) => (
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

      <p className="text-center text-muted small" aria-live="polite">
        {serviciosFiltrados.length} servicio(s) encontrado(s)
      </p>

      {/* Grilla con los servicios filtrados */}
      {serviciosFiltrados.length > 0 ? (
        <div className="grilla-servicios">
          {serviciosFiltrados.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              id={servicio.id}
              titulo={servicio.nombre}
              descripcion={servicio.descripcion}
              precio={servicio.precio}
              categoria={servicio.categoria}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">No encontramos servicios con esos filtros.</p>
        </div>
      )}
    </section>
  );
};

export default ServicesCatalogSection;
