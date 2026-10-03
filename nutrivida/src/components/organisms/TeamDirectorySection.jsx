import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { NutritionistRow } from '../molecules/NutritionistRow';
import nutricionistasData from '../../data/nutricionistas.json';

export const TeamDirectorySection = () => {
  const [busqueda, setBusqueda] = useState('');

  // Filtrado reactivo por nombre o especialidad
  const profesionalesFiltrados = nutricionistasData.filter((prof) => {
    const termino = busqueda.toLowerCase();
    const coincideNombre = prof.nombre?.toLowerCase().includes(termino);
    const coincideEspecialidad = prof.especialidad?.toLowerCase().includes(termino);
    const coincideCodigo = prof.codigo?.toLowerCase().includes(termino);
    return coincideNombre || coincideEspecialidad || coincideCodigo;
  });

  return (
    <section className="directorio-equipo-seccion mt-5">
      <div className="seccion-header text-center mb-4">
        <h2>Nuestro Equipo Profesional</h2>
        <p className="introduccion-equipo">
          Conoce a nuestros especialistas y sus horarios de atención.
        </p>
      </div>

      {/* Buscador de especialistas */}
      <div className="buscador-equipo-contenedor mb-4">
        <input
          type="text"
          className="form-control input-buscador"
          placeholder="Buscar por especialista, área o código (ej. NUT001)..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla responsiva institucional */}
      <div className="tabla-responsiva-contenedor">
        <Table responsive hover className="tabla-nutricionistas align-middle text-center">
          <thead>
            <tr>
              <th>Código</th>
              <th className="text-start">Profesional</th>
              <th className="text-start">Especialidad</th>
              <th>Días de Atención</th>
              <th>Horario</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {profesionalesFiltrados.length > 0 ? (
              profesionalesFiltrados.map((nutri) => (
                <NutritionistRow key={nutri.id || nutri.codigo} nutricionista={nutri} />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-muted">
                  No se encontraron nutricionistas para "{busqueda}".
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default TeamDirectorySection;