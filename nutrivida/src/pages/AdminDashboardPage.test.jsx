import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '../test-utils';
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

  it('crea un servicio nuevo y aparece en la tabla', async () => {
    render(<AdminDashboardPage />);
    await userEvent.click(screen.getByRole('button', { name: /Catálogo \/ CRUD Servicios/i }));

    await userEvent.type(screen.getByPlaceholderText('Nombre del servicio'), 'Taller de loncheras');
    await userEvent.type(screen.getByPlaceholderText('Precio CLP'), '12000');
    await userEvent.click(screen.getByRole('button', { name: /\+ Agregar/i }));

    expect(screen.getByText('Taller de loncheras')).toBeInTheDocument();
  });

  it('edita el precio de un servicio existente', async () => {
    render(<AdminDashboardPage />);
    await userEvent.click(screen.getByRole('button', { name: /Catálogo \/ CRUD Servicios/i }));

    const fila = screen.getByText('Primera consulta nutricional').closest('tr');
    await userEvent.click(within(fila).getByRole('button', { name: 'Editar' }));

    const inputPrecio = screen.getByPlaceholderText('Precio CLP');
    await userEvent.clear(inputPrecio);
    await userEvent.type(inputPrecio, '39000');
    await userEvent.click(screen.getByRole('button', { name: /Guardar cambios/i }));

    const filaEditada = screen.getByText('Primera consulta nutricional').closest('tr');
    expect(within(filaEditada).getByText(/39\.000/)).toBeInTheDocument();
  });
});
