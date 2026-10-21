import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import ServiciosDestacadosPage from './ServiciosDestacadosPage';

describe('ServiciosDestacadosPage', () => {
  it('muestra los servicios destacados de NutriVida', () => {
    render(
      <MemoryRouter>
        <ServiciosDestacadosPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Servicios destacados')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Primera consulta nutricional')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Control nutricional (seguimiento)')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Control nutricional quincenal')
    ).toBeInTheDocument();
  });
});