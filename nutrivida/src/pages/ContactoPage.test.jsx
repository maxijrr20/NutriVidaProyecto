import { render, screen } from '../test-utils';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { ContactoPage } from './ContactoPage';

vi.mock(
  '../components/organisms/AppointmentFormSection',
  () => ({
    AppointmentFormSection: () => (
      <div>Formulario de cita simulado</div>
    ),
  })
);

describe('ContactoPage', () => {
  test('renderiza el formulario de agendamiento', () => {
    // La página ahora usa el router y los contextos, por eso se envuelve con ellos
    render(
      <MemoryRouter>
        <ContactoPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Formulario de cita simulado')
    ).toBeInTheDocument();
  });
});
