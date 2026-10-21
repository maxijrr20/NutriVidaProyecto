import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminDashboardPage from './AdminDashboardPage';

describe('Vista de Administración - AdminDashboardPage', () => {
  it('debe renderizar el menú de navegación del panel', () => {
    render(<AdminDashboardPage />);
    expect(screen.getByText(/Panel NutriVida/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Dashboard \/ Resumen/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Catálogo \/ CRUD Servicios/i })).toBeInTheDocument();
  });

  it('debe cambiar a la pestaña de catálogo al hacer clic en el botón correspondiente', async () => {
    render(<AdminDashboardPage />);
    
    const botonCatalogo = screen.getByRole('button', { name: /Catálogo \/ CRUD Servicios/i });
    await userEvent.click(botonCatalogo);

    expect(screen.getByText(/Catálogo de Servicios/i)).toBeInTheDocument();
  });
});