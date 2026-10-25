import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '../test-utils';
import AdminDashboardPage from './AdminDashboardPage';
import { CLAVE_CITAS } from '../context/CitasContext';

const renderPanel = () =>
  render(
    <MemoryRouter>
      <AdminDashboardPage />
    </MemoryRouter>
  );

describe('Vista de Administración - AdminDashboardPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe renderizar el menú de navegación del panel', () => {
    renderPanel();
    expect(screen.getByText(/Panel NutriVida/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dashboard \/ Resumen/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Catálogo \/ CRUD Servicios/i })).toBeInTheDocument();
  });

  it('al confirmar una solicitud, el cambio pasa por CitasContext y queda guardado', async () => {
    localStorage.setItem(
      CLAVE_CITAS,
      JSON.stringify([{ id: 1, nombre: 'Ana Pérez', email: 'ana@correo.cl', fecha: '2026-11-02', estado: 'Pendiente' }])
    );
    renderPanel();

    await userEvent.click(screen.getByRole('button', { name: /Gestión de Solicitudes/i }));
    const fila = screen.getByText('Ana Pérez').closest('tr');
    await userEvent.click(within(fila).getByRole('button', { name: 'Confirmar' }));

    expect(within(fila).getByText('Confirmada')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CLAVE_CITAS))[0].estado).toBe('Confirmada');
  });
});
