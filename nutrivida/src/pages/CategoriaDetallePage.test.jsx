import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import CategoriaDetallePage from './CategoriaDetallePage';

describe('CategoriaDetallePage', () => {
  it('muestra los cinco servicios de la categoría Consultas', () => {
    render(
      <MemoryRouter initialEntries={['/categorias/Consultas']}>
        <Routes>
          <Route
            path="/categorias/:categoria"
            element={<CategoriaDetallePage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText('Primera consulta nutricional')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Control nutricional (seguimiento)')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Control nutricional quincenal')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Teleconsulta nutricional')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Consulta de urgencia / reagendada')
    ).toBeInTheDocument();
  });
});