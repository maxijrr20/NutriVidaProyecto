import { render, screen } from '../test-utils';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import SolicitudEnCursoPage from './SolicitudEnCursoPage';

describe('SolicitudEnCursoPage Tests', () => {
  beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
      'nutrivida_session',
      JSON.stringify({
        nombre: 'Paciente Demo',
        rut: '18.795.997-7',
        rol: 'PACIENTE',
        email: 'paciente@nutrivida.cl',
      })
    );
  });

  it('muestra mensaje cuando no hay solicitudes', () => {
    render(
      <BrowserRouter>
        <SolicitudEnCursoPage />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/No tienes solicitudes de cita registradas/i)
    ).toBeInTheDocument();
  });

  it('despliega la lista de solicitudes del usuario', () => {
    const mockCitas = [
      {
        id: '101',
        nombre: 'Paciente Demo',
        rut: '18.795.997-7',
        email: 'paciente@nutrivida.cl',
        fecha: '2026-11-01',
        estado: 'Pendiente',
      },
    ];

    localStorage.setItem(
      'nutrivida_citas',
      JSON.stringify(mockCitas)
    );

    render(
      <BrowserRouter>
        <SolicitudEnCursoPage />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Solicitud #101/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Paciente Demo/i)
    ).toBeInTheDocument();
  });
});