import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppointmentFormSection from './AppointmentFormSection';

describe('Componente AppointmentFormSection', () => {
  it('debe renderizar el título y los campos obligatorios del formulario', () => {
    render(<AppointmentFormSection />);
    
    expect(screen.getByRole('heading', { name: /Agendar Consulta Nutricional/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej. Maximiliano Valenzuela/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej. 12.345.678-9/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirmar Solicitud de Cita/i })).toBeInTheDocument();
  });

  it('debe mostrar errores de validación si el usuario intenta enviar el formulario vacío', async () => {
    render(<AppointmentFormSection />);
    
    const botonEnviar = screen.getByRole('button', { name: /Confirmar Solicitud de Cita/i });
    await userEvent.click(botonEnviar);

    expect(screen.getByText('El nombre completo es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El RUT es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El correo electrónico es obligatorio.')).toBeInTheDocument();
  });

  it('debe completar el flujo y mostrar la pantalla de éxito con datos válidos', async () => {
    render(<AppointmentFormSection />);

    await userEvent.type(screen.getByPlaceholderText(/Ej. Maximiliano Valenzuela/i), 'Maximiliano Valenzuela');
    await userEvent.type(screen.getByPlaceholderText(/Ej. 12.345.678-9/i), '12.345.678-5');
    await userEvent.type(screen.getByPlaceholderText(/ejemplo@correo.cl/i), 'maxi@correo.cl');
    await userEvent.type(screen.getByPlaceholderText(/\+56 9 1234 5678/i), '+56912345678');
    
    const inputFecha = document.querySelector('input[name="fecha"]');
    await userEvent.type(inputFecha, '2026-10-21');

    const selectHora = document.querySelector('select[name="hora"]');
    await userEvent.selectOptions(selectHora, '09:00');

    const botonEnviar = screen.getByRole('button', { name: /Confirmar Solicitud de Cita/i });
    await userEvent.click(botonEnviar);

    expect(screen.getByText(/¡Solicitud de Cita Registrada!/i)).toBeInTheDocument();
    expect(screen.getByText('12.345.678-5')).toBeInTheDocument();
  });
});