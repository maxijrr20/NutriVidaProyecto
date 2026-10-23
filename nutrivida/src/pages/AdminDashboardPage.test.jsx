import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../test-utils';
import AdminDashboardPage from './AdminDashboardPage';

describe('Vista de Administración - AdminDashboardPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe renderizar el menú de navegación del panel', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText(/Panel NutriVida/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dashboard \/ Resumen/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Catálogo \/ CRUD Servicios/i })).toBeInTheDocument();
  });

  it('debe cambiar a la pestaña de catálogo al hacer clic en el botón correspondiente', async () => {
    render(<AdminDashboardPage />);

    await userEvent.click(screen.getByRole('button', { name: /Catálogo \/ CRUD Servicios/i }));

    expect(screen.getByText(/Catálogo de Servicios/i)).toBeInTheDocument();
  });
});