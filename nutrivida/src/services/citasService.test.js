import { describe, it, expect, beforeEach } from 'vitest';
import { crearCita, listarCitas } from './citasService';
import { listarServicios } from './catalogoService';
import { mockApi, iniciarSesionDePrueba } from '../mockApi';

describe('citasService y catalogoService (llamadas al backend)', () => {
  beforeEach(() => {
    iniciarSesionDePrueba();
  });

  it('crearCita envía al backend el cuerpo que espera CitaRequest, con el token', async () => {
    const fetchMock = mockApi({ 'POST /citas': (cuerpo) => ({ id: 7, estado: 'Pendiente', ...cuerpo }) });

    const cita = await crearCita({
      nombre: ' Camila Rojas ',
      rut: '12.345.678-5',
      email: 'Camila.Rojas@correo.cl',
      telefono: '+56 9 1234 5678',
      servicioId: '1',
      nutricionistaCodigo: 'NUT001',
      fecha: '2026-12-02',
      hora: '10:30',
      motivo: '',
    });

    const [, opciones] = fetchMock.mock.calls[0];
    expect(opciones.headers.Authorization).toBe('Bearer token-de-prueba');
    expect(JSON.parse(opciones.body)).toEqual({
      nombre: 'Camila Rojas',
      rut: '12.345.678-5',
      email: 'camila.rojas@correo.cl',
      telefono: '+56912345678',
      servicioId: 1,
      nutricionistaCodigo: 'NUT001',
      fecha: '2026-12-02',
      hora: '10:30',
      motivo: null,
    });
    expect(cita.estado).toBe('Pendiente');
  });

  it('si el horario está tomado, el 409 del backend llega como error con su mensaje', async () => {
    mockApi({ 'POST /citas': { status: 409, body: { estado: 409, mensaje: 'Ese horario ya está tomado.' } } });

    await expect(
      crearCita({ nombre: 'A', rut: '1-9', email: 'a@b.cl', servicioId: 1, nutricionistaCodigo: 'NUT001', fecha: '2026-12-02', hora: '10:30' })
    ).rejects.toMatchObject({ estado: 409, message: 'Ese horario ya está tomado.' });
  });

  it('listarCitas usa GET /citas con el token', async () => {
    const fetchMock = mockApi({ 'GET /citas': [] });
    await listarCitas();
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe('Bearer token-de-prueba');
  });

  it('el catálogo es público: GET /servicios no envía el token', async () => {
    const fetchMock = mockApi({ 'GET /servicios': [{ id: 1, nombre: 'Primera consulta nutricional' }] });
    const lista = await listarServicios();
    expect(lista).toHaveLength(1);
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBeUndefined();
  });
});
