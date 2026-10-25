import { render, screen } from '@testing-library/react';
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
    render(<ContactoPage />);

    expect(
      screen.getByText('Formulario de cita simulado')
    ).toBeInTheDocument();
  });
});