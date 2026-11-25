import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '../test-utils';
import AdminDashboardPage from './AdminDashboardPage';
import { mockApi, iniciarSesionDePrueba } from '../mockApi';

const citaDemo = {
  id: 1,
  nombre: 'Ana Pérez',
  email: 'ana@correo.cl',
  servicio: 'Primera consulta nutricional',
  nutricionistaCodigo: 'NUT001',
  nutricionista: 'Nut. Carolina Fuentes M.',
  fecha: '2026-12-02',
  hora: '10:30',
  estado: 'Pendiente',
};

const renderPanel = () =>
  render(
    <MemoryRouter>
      <AdminDashboardPage />
    </MemoryRouter>
  );

describe('Vista de Administración - AdminDashboardPage', () => {
  beforeEach(() => {
    iniciarSesionDePrueba({ id: 1, nombre: 'Administrador', rol: 'ADMIN', email: 'admin@nutrivida.cl' });
  });

  it('debe renderizar el menú de navegación del panel', () => {
    mockApi({ 'GET /usuarios': [], 'GET /citas': [] });
    renderPanel();
    expect(screen.getByText(/Panel NutriVida/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dashboard \/ Resumen/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Catálogo \/ CRUD Servicios/i })).toBeInTheDocument();
  });

  it('al confirmar una solicitud llama a PATCH /citas/{id}/estado y muestra el estado que devuelve el backend', async () => {
    const llamadas = mockApi({
      'GET /usuarios': [],
      'GET /citas': [citaDemo],
      'PATCH /citas/1/estado': (cuerpo) => ({ ...citaDemo, estado: cuerpo.estado }),
    });
    renderPanel();

    await userEvent.click(screen.getByRole('button', { name: /Gestión de Solicitudes/i }));
    const fila = (await screen.findByText('Ana Pérez')).closest('tr');
    await userEvent.click(within(fila).getByRole('button', { name: 'Confirmar' }));

    expect(await within(fila).findByText('Confirmada')).toBeInTheDocument();
    const llamada = llamadas.mock.calls.find(([url]) => /\/citas\/1\/estado$/.test(url));
    expect(JSON.parse(llamada[1].body)).toEqual({ estado: 'Confirmada' });
  });
});
