import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import ContactoPage from './ContactoPage';

describe('Pruebas del Formulario de Solicitud de Cita', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Prueba 5
  it('5. Formulario vacío muestra errores', () => {
    render(
      <MemoryRouter>
        <ContactoPage />
      </MemoryRouter>
    );

    const botonEnviar = screen.getByRole('button', { name: /enviar solicitud/i });
    fireEvent.click(botonEnviar);

    expect(screen.getByText(/debe completar los campos obligatorios/i)).toBeInTheDocument();
  });

  // Prueba 6
  it('6. Correo inválido muestra error', () => {
    render(
      <MemoryRouter>
        <ContactoPage />
      </MemoryRouter>
    );

    const inputEmail = screen.getByLabelText(/correo electrónico/i);
    fireEvent.change(inputEmail, { target: { value: 'correosinArroba' } });

    const botonEnviar = screen.getByRole('button', { name: /enviar solicitud/i });
    fireEvent.click(botonEnviar);

    expect(screen.getByText(/correo electrónico no válido/i)).toBeInTheDocument();
  });

  // Prueba 7
  it('7. RUT inválido muestra error', () => {
    render(
      <MemoryRouter>
        <ContactoPage />
      </MemoryRouter>
    );

    const inputRut = screen.getByLabelText(/rut/i);
    fireEvent.change(inputRut, { target: { value: '12345' } });

    const botonEnviar = screen.getByRole('button', { name: /enviar solicitud/i });
    fireEvent.click(botonEnviar);

    expect(screen.getByText(/rut inválido/i)).toBeInTheDocument();
  });

  // Prueba 8
  it('8. Solicitud correctamente completada se guarda/muestra', () => {
    render(
      <MemoryRouter>
        <ContactoPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Yoximar Prueba' } });
    fireEvent.change(screen.getByLabelText(/rut/i), { target: { value: '19011022-K' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'yoximar@test.com' } });
    fireEvent.change(screen.getByLabelText(/motivo de consulta/i), { target: { value: 'Evaluación general' } });
    fireEvent.change(screen.getByLabelText(/fecha preferida/i), { target: { value: '2026-11-01' } });

    const botonEnviar = screen.getByRole('button', { name: /enviar solicitud/i });
    fireEvent.click(botonEnviar);

    const guardados = JSON.parse(localStorage.getItem('nutrivida_citas'));
    expect(guardados).toHaveLength(1);
    expect(guardados[0].nombre).toBe('Yoximar Prueba');
  });
});