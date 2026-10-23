import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '../test-utils';
import ContactoPage from './ContactoPage';

describe('ContactoPage', () => {
  it('muestra el formulario de agendamiento dentro de la página', () => {
    render(
      <MemoryRouter>
        <ContactoPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Agendar Consulta Nutricional/i })).toBeInTheDocument();
    // Los nutricionistas del select vienen de nutricionistas.json
    expect(screen.getByRole('option', { name: /Carolina Fuentes/i })).toBeInTheDocument();
  });
});
