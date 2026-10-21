import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils';
import AppointmentFormSection from './AppointmentFormSection';

// Mock de useNavigate: así comprobamos a dónde redirige sin cambiar de página de verdad
const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return { ...original, useNavigate: () => navigateMock };
});

const renderFormulario = () =>
  render(
    <MemoryRouter>
      <AppointmentFormSection />
    </MemoryRouter>
  );

describe('Componente AppointmentFormSection', () => {
  beforeEach(() => {
    localStorage.clear();
    navigateMock.mockClear();
  });

  it('debe renderizar el título y los campos obligatorios del formulario', () => {
    renderFormulario();

    expect(screen.getByRole('heading', { name: /Agendar Consulta Nutricional/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej. Maximiliano Valenzuela/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej. 12.345.678-9/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirmar Solicitud de Cita/i })).toBeInTheDocument();
  });

  it('debe mostrar errores de validación y NO guardar si el formulario está vacío', async () => {
    renderFormulario();

    await userEvent.click(screen.getByRole('button', { name: /Confirmar Solicitud de Cita/i }));

    expect(screen.getByText('El nombre completo es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El RUT es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El correo electrónico es obligatorio.')).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('con datos válidos guarda la cita en localStorage y redirige a la confirmación', async () => {
    renderFormulario();

    await userEvent.type(screen.getByPlaceholderText(/Ej. Maximiliano Valenzuela/i), 'Maximiliano Valenzuela');
    await userEvent.type(screen.getByPlaceholderText(/Ej. 12.345.678-9/i), '12.345.678-5');
    await userEvent.type(screen.getByPlaceholderText(/ejemplo@correo.cl/i), 'maxi@correo.cl');
    await userEvent.type(screen.getByPlaceholderText(/\+56 9 1234 5678/i), '+56912345678');
    await userEvent.type(document.querySelector('input[name="fecha"]'), '2026-11-04');
    await userEvent.selectOptions(document.querySelector('select[name="hora"]'), '09:00');

    await userEvent.click(screen.getByRole('button', { name: /Confirmar Solicitud de Cita/i }));

    const guardadas = JSON.parse(localStorage.getItem('nutrivida_citas'));
    expect(guardadas).toHaveLength(1);
    expect(guardadas[0]).toMatchObject({
      nombre: 'Maximiliano Valenzuela',
      rut: '12.345.678-5',
      hora: '09:00',
      estado: 'Pendiente'
    });
    expect(navigateMock).toHaveBeenCalledWith(
      '/confirmacion-solicitud',
      expect.objectContaining({ state: expect.any(Object) })
    );
  });

  it('autocompleta nombre y correo si el usuario inició sesión', () => {
    localStorage.setItem(
      'nutrivida_session',
      JSON.stringify({ nombre: 'Ana Pérez', email: 'ana@correo.cl', rol: 'PACIENTE' })
    );

    renderFormulario();

    expect(screen.getByPlaceholderText(/Ej. Maximiliano Valenzuela/i)).toHaveValue('Ana Pérez');
    expect(screen.getByPlaceholderText(/ejemplo@correo.cl/i)).toHaveValue('ana@correo.cl');
  });
});
