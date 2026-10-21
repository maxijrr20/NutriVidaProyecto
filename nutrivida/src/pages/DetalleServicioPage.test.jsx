import { render, screen } from '../test-utils';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import DetalleServicioPage from './DetalleServicioPage';

describe('DetalleServicioPage', () => {
  it('muestra correctamente los datos de la primera consulta nutricional', () => {
    render(
      <MemoryRouter initialEntries={['/servicios/1']}>
        <Routes>
          <Route
            path="/servicios/:id"
            element={<DetalleServicioPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText('Primera consulta nutricional')
    ).toBeInTheDocument();

    expect(screen.getByText(/CN001/)).toBeInTheDocument();
    expect(screen.getByText(/50 min/)).toBeInTheDocument();
    expect(screen.getByText(/\$35\.000/)).toBeInTheDocument();
  });
});