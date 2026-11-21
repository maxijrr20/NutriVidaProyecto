import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { iniciarSesion, registrarPaciente, obtenerUsuarioActual } from './authService';
import { obtenerSesion, obtenerToken } from '../utils/sesion';

// Simula una respuesta de fetch con el estado y el cuerpo JSON indicados
const respuesta = (status, cuerpo) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(cuerpo),
  });

const usuarioDemo = {
  id: 2,
  rut: '12345678-5',
  nombre: 'Camila Rojas',
  email: 'camila.rojas@correo.cl',
  telefono: null,
  rol: 'PACIENTE',
  activo: true,
};

describe('authService (conexión con el backend)', () => {
  beforeEach(() => {
    localStorage.clear();
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('login correcto guarda el token y los datos del usuario en la sesión', async () => {
    fetch.mockReturnValueOnce(
      respuesta(200, { accessToken: 'token-falso', tokenType: 'Bearer', expiresIn: 3600, usuario: usuarioDemo })
    );

    const usuario = await iniciarSesion({ email: ' Camila.Rojas@correo.cl ', password: 'Clave-segura-2026' });

    expect(usuario.rol).toBe('PACIENTE');
    expect(obtenerToken()).toBe('token-falso');
    expect(obtenerSesion().email).toBe('camila.rojas@correo.cl');

    const [url, opciones] = fetch.mock.calls[0];
    expect(url).toMatch(/\/auth\/login$/);
    expect(JSON.parse(opciones.body).email).toBe('camila.rojas@correo.cl');
  });

  it('login con credenciales incorrectas lanza el mensaje del backend y no crea sesión', async () => {
    fetch.mockReturnValueOnce(respuesta(401, { estado: 401, mensaje: 'Correo o contraseña incorrectos.' }));

    await expect(iniciarSesion({ email: 'x@correo.cl', password: 'mala-clave' })).rejects.toMatchObject({
      estado: 401,
      message: 'Correo o contraseña incorrectos.',
    });
    expect(obtenerSesion()).toBeNull();
  });

  it('registro con correo repetido devuelve el 409 del backend', async () => {
    fetch.mockReturnValueOnce(respuesta(409, { estado: 409, mensaje: 'Ya existe una cuenta con ese correo.' }));

    await expect(
      registrarPaciente({ rut: '12345678-5', nombre: 'Camila Rojas', email: 'camila.rojas@correo.cl', password: '12345678' })
    ).rejects.toMatchObject({ estado: 409 });
  });

  it('las rutas protegidas envían el token como Bearer', async () => {
    localStorage.setItem(
      'nutrivida_session',
      JSON.stringify({ ...usuarioDemo, token: 'token-falso', expiraEn: Date.now() + 60000 })
    );
    fetch.mockReturnValueOnce(respuesta(200, usuarioDemo));

    await obtenerUsuarioActual();

    expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer token-falso');
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
