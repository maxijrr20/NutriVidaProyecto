import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import AppointmentFormSection from './AppointmentFormSection';
import nutricionistas from '../../data/nutricionistas.json';

// El formulario recibe todo por props: no necesita router ni contextos para probarse.
const servicios = [
  { id: 1, nombre: 'Primera consulta nutricional', precio: 35000 },
  { id: 2, nombre: 'Control nutricional', precio: 25000 },
];

const renderFormulario = (onEnviar = vi.fn(), datosIniciales = {}) => {
  render(
    <AppointmentFormSection
      servicios={servicios}
      nutricionistas={nutricionistas}
      datosIniciales={datosIniciales}
      onEnviar={onEnviar}
    />
  );
  return onEnviar;
};

describe('Componente AppointmentFormSection', () => {
  it('debe mostrar errores de validación y NO llamar a onEnviar si el formulario está vacío', async () => {
    const onEnviar = renderFormulario();

    await userEvent.click(screen.getByRole('button', { name: /Confirmar Solicitud de Cita/i }));

    expect(screen.getByText('El nombre completo es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El RUT es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El correo electrónico es obligatorio.')).toBeInTheDocument();
    expect(onEnviar).not.toHaveBeenCalled();
  });

  it('con datos válidos llama a onEnviar con los datos de la solicitud', async () => {
    const onEnviar = renderFormulario();

    await userEvent.type(screen.getByPlaceholderText(/Ej. Maximiliano Valenzuela/i), 'Maximiliano Valenzuela');
    await userEvent.type(screen.getByPlaceholderText(/Ej. 12.345.678-9/i), '12.345.678-5');
    await userEvent.type(screen.getByPlaceholderText(/ejemplo@correo.cl/i), 'maxi@correo.cl');
    await userEvent.type(screen.getByPlaceholderText(/\+56 9 1234 5678/i), '+56912345678');
    await userEvent.type(document.querySelector('input[name="fecha"]'), '2026-11-04');
    await userEvent.selectOptions(document.querySelector('select[name="hora"]'), '09:00');

    await userEvent.click(screen.getByRole('button', { name: /Confirmar Solicitud de Cita/i }));

    expect(onEnviar).toHaveBeenCalledTimes(1);
    expect(onEnviar).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre: 'Maximiliano Valenzuela',
        rut: '12.345.678-5',
        servicio: 'Primera consulta nutricional',
        precio: 35000,
        hora: '09:00',
      })
    );
  });
});
