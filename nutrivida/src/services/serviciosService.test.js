import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  listarServicios,
  guardarServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
  obtenerServicioPorId,
  CLAVE_SERVICIOS
} from './serviciosService';

describe('serviciosService (CRUD del catálogo)', () => {
  let lista;

  // Preparación: cada prueba parte con localStorage limpio y la lista inicial
  beforeEach(() => {
    localStorage.clear();
    lista = listarServicios();
  });

  // Limpieza: se restauran los mocks (Date.now)
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('READ: lista los 18 servicios iniciales cuando no hay nada guardado', () => {
    expect(lista).toHaveLength(18);
    expect(lista[0].nombre).toBe('Primera consulta nutricional');
  });

  it('READ: lee los servicios guardados en localStorage si existen', () => {
    guardarServicios([{ id: 1, nombre: 'Solo uno' }]);

    expect(listarServicios()).toEqual([{ id: 1, nombre: 'Solo uno' }]);
    expect(JSON.parse(localStorage.getItem(CLAVE_SERVICIOS))).toHaveLength(1);
  });

  it('CREATE: agrega un servicio con id generado sin modificar la lista original', () => {
    vi.spyOn(Date, 'now').mockReturnValue(999); // mock para que el id sea predecible

    const nueva = crearServicio(lista, { nombre: 'Taller de colaciones', precio: 10000 });

    expect(nueva).toHaveLength(19);
    expect(nueva[18]).toEqual({ id: 999, nombre: 'Taller de colaciones', precio: 10000 });
    expect(lista).toHaveLength(18); // inmutabilidad
  });

  it('UPDATE: actualiza solo el servicio indicado (acepta id como texto)', () => {
    const nueva = actualizarServicio(lista, '1', { precio: 40000 });

    expect(obtenerServicioPorId(nueva, 1).precio).toBe(40000);
    expect(obtenerServicioPorId(nueva, 1).nombre).toBe('Primera consulta nutricional');
    expect(obtenerServicioPorId(nueva, 2).precio).toBe(obtenerServicioPorId(lista, 2).precio);
  });

  it('DELETE: elimina el servicio indicado', () => {
    const nueva = eliminarServicio(lista, 1);

    expect(nueva).toHaveLength(17);
    expect(obtenerServicioPorId(nueva, 1)).toBeUndefined();
  });
});
