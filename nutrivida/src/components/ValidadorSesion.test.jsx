import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ValidadorSesion from './ValidadorSesion';
import { mockApi, iniciarSesionDePrueba } from '../mockApi';
import { obtenerSesion } from '../utils/sesion';

describe('ValidadorSesion', () => {
  it('sin sesión muestra la aplicación de inmediato', () => {
    render(<ValidadorSesion><p>Contenido de la app</p></ValidadorSesion>);
    expect(screen.getByText('Contenido de la app')).toBeInTheDocument();
  });

  it('con sesión espera la respuesta de /auth/me y, si el token fue rechazado, entra sin sesión', async () => {
    iniciarSesionDePrueba();
    mockApi({ 'GET /auth/me': { status: 401, body: { estado: 401, mensaje: 'Token vencido.' } } });

    render(<ValidadorSesion><p>Contenido de la app</p></ValidadorSesion>);

    expect(screen.getByText('Verificando sesión…')).toBeInTheDocument();
    expect(await screen.findByText('Contenido de la app')).toBeInTheDocument();
    expect(obtenerSesion()).toBeNull();
  });
});
