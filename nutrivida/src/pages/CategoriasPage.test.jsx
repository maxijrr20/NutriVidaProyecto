import { render, screen } from '../test-utils';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import CategoriasPage from './CategoriasPage';

describe('CategoriasPage', () => {
  it('muestra la cantidad correcta de servicios por categoría', () => {
    render(
      <MemoryRouter>
        <CategoriasPage />
      </MemoryRouter>
    );

    expect(screen.getByText('5 servicios disponibles')).toBeInTheDocument();
    expect(screen.getByText('6 servicios disponibles')).toBeInTheDocument();
    expect(screen.getByText('4 servicios disponibles')).toBeInTheDocument();
    expect(screen.getByText('3 servicios disponibles')).toBeInTheDocument();
  });
});