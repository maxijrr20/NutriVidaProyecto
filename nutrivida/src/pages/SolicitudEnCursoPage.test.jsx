import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import SolicitudEnCursoPage from './SolicitudEnCursoPage';
import { mockApi, iniciarSesionDePrueba } from '../mockApi';

const citaDemo = {
  id: 101,
  pacienteId: 2,
  nombre: 'Paciente Demo',
  rut: '18795997-7',
  email: 'paciente@nutrivida.cl',
  servicio: 'Primera consulta nutricional',
  nutricionistaCodigo: 'NUT001',
  nutricionista: 'Nut. Carolina Fuentes M.',
  fecha: '2026-12-02',
  hora: '10:30',
  estado: 'Pendiente',
};

const renderPagina = () =>
  render(
    <BrowserRouter>
      <SolicitudEnCursoPage />
    </BrowserRouter>
  );

describe('SolicitudEnCursoPage (solicitudes desde el backend)', () => {
  beforeEach(() => {
    iniciarSesionDePrueba();
  });

  it('muestra mensaje cuando el backend no devuelve solicitudes', async () => {
    mockApi({ 'GET /citas': [] });
    renderPagina();

    expect(await screen.findByText(/No tienes solicitudes de cita registradas/i)).toBeInTheDocument();
  });

  it('despliega las solicitudes que entrega GET /citas, enviando el token', async () => {
    const fetchMock = mockApi({ 'GET /citas': [citaDemo] });
    renderPagina();

    expect(await screen.findByText(/Solicitud #101/i)).toBeInTheDocument();
    expect(screen.getByText(/Nut. Carolina Fuentes M./)).toBeInTheDocument();
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe('Bearer token-de-prueba');
  });

  it('al cancelar llama a PATCH /citas/{id}/cancelar y muestra el nuevo estado', async () => {
    const fetchMock = mockApi({
      'GET /citas': [citaDemo],
      'PATCH /citas/101/cancelar': { ...citaDemo, estado: 'Cancelada' },
    });
    renderPagina();

    await userEvent.click(await screen.findByRole('button', { name: 'Cancelar Cita' }));
    await userEvent.click(screen.getByRole('button', { name: 'Sí, Cancelar' }));

    expect(await screen.findByText('La cita #101 ha sido cancelada.')).toBeInTheDocument();
    expect(screen.getByText('Cancelada')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/\/citas\/101\/cancelar$/), expect.objectContaining({ method: 'PATCH' }));
  });
});
