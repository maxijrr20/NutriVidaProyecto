import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import SolicitudEnCursoPage from './SolicitudEnCursoPage';

describe('SolicitudEnCursoPage Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra mensaje cuando no hay solicitudes', () => {
    render(
      <BrowserRouter>
        <SolicitudEnCursoPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/No tienes solicitudes de cita registradas/i)).toBeInTheDocument();
  });

  it('despliega la lista de solicitudes desde localStorage', () => {
    const mockCitas = [{ id: '101', nombre: 'Juan Perez', rut: '12345678-9', fecha: '2026-11-01', estado: 'Pendiente' }];
    localStorage.setItem('nutrivida_citas', JSON.stringify(mockCitas));

    render(
      <BrowserRouter>
        <SolicitudEnCursoPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Solicitud #101/i)).toBeInTheDocument();
    expect(screen.getByText(/Juan Perez/i)).toBeInTheDocument();
  });

  it('abre la modal al hacer clic en Cancelar Cita', () => {
    const mockCitas = [{ id: '102', nombre: 'Maria G', rut: '12345678-9', fecha: '2026-11-01', estado: 'Pendiente' }];
    localStorage.setItem('nutrivida_citas', JSON.stringify(mockCitas));

    render(
      <BrowserRouter>
        <SolicitudEnCursoPage />
      </BrowserRouter>
    );

    const btnCancelar = screen.getByText(/Cancelar Cita/i);
    fireEvent.click(btnCancelar);

    expect(screen.getByText(/Confirmar Cancelación/i)).toBeInTheDocument();
  });
});