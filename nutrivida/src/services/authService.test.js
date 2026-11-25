import { describe, it, expect, beforeEach } from 'vitest';
import { iniciarSesion, registrarPaciente, obtenerUsuarioActual } from './authService';
import { obtenerSesion, obtenerToken } from '../utils/sesion';
import { mockApi } from '../mockApi';

const usuarioDemo = {
  id: 2,
  rut: '12345678-5',
  nombre: 'Camila Rojas',
  email: 'camila.rojas@correo.cl',
  telefono: null,
  rol: 'PACIENTE',
  activo: true,
};

describe('authService (conexión con el backend usando Axios)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('login correcto guarda el token y los datos del usuario en la sesión', async () => {
    const llamadas = mockApi({
      'POST /auth/login': { accessToken: 'token-falso', tokenType: 'Bearer', expiresIn: 3600, usuario: usuarioDemo },
    });

    const usuario = await iniciarSesion({ email: ' Camila.Rojas@correo.cl ', password: 'Clave-segura-2026' });

    expect(usuario.rol).toBe('PACIENTE');
    expect(obtenerToken()).toBe('token-falso');
    expect(obtenerSesion().email).toBe('camila.rojas@correo.cl');

    const [url, opciones] = llamadas.mock.calls[0];
    expect(url).toMatch(/\/auth\/login$/);
    expect(opciones.method).toBe('POST');
    expect(JSON.parse(opciones.body).email).toBe('camila.rojas@correo.cl');
  });

  it('login con credenciales incorrectas lanza el mensaje del backend y no crea sesión', async () => {
    mockApi({ 'POST /auth/login': { status: 401, body: { estado: 401, mensaje: 'Correo o contraseña incorrectos.' } } });

    await expect(iniciarSesion({ email: 'x@correo.cl', password: 'mala-clave' })).rejects.toMatchObject({
      estado: 401,
      message: 'Correo o contraseña incorrectos.',
    });
    expect(obtenerSesion()).toBeNull();
  });

  it('registro con correo repetido devuelve el 409 del backend', async () => {
    mockApi({ 'POST /auth/register': { status: 409, body: { estado: 409, mensaje: 'Ya existe una cuenta con ese correo.' } } });

    await expect(
      registrarPaciente({ rut: '12345678-5', nombre: 'Camila Rojas', email: 'camila.rojas@correo.cl', password: '12345678' })
    ).rejects.toMatchObject({ estado: 409 });
  });

  it('el interceptor de Axios envía el token como Bearer en las rutas protegidas', async () => {
    localStorage.setItem(
      'nutrivida_session',
      JSON.stringify({ ...usuarioDemo, token: 'token-falso', expiraEn: Date.now() + 60000 })
    );
    const llamadas = mockApi({ 'GET /auth/me': usuarioDemo });

    await obtenerUsuarioActual();

    expect(llamadas.mock.calls[0][1].headers.Authorization).toBe('Bearer token-falso');
  });

  it('si el backend no responde, el error trae estado 0 y un mensaje claro', async () => {
    // setupTests deja Axios "sin backend" por defecto
    await expect(obtenerUsuarioActual()).rejects.toMatchObject({
      estado: 0,
      message: expect.stringMatching(/No se pudo conectar/),
    });
  });

  it('una sesión con el token vencido se descarta', () => {
    localStorage.setItem(
      'nutrivida_session',
      JSON.stringify({ ...usuarioDemo, token: 'viejo', expiraEn: Date.now() - 1000 })
    );

    expect(obtenerSesion()).toBeNull();
    expect(localStorage.getItem('nutrivida_session')).toBeNull();
  });
});
