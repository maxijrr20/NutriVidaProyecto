import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  listarServicios,
  crearServicio,
  eliminarServicio,
  obtenerServicioPorId
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

  it('CREATE: agrega un servicio con id generado sin modificar la lista original', () => {
    vi.spyOn(Date, 'now').mockReturnValue(999); // mock para que el id sea predecible

    const nueva = crearServicio(lista, { nombre: 'Taller de colaciones', precio: 10000 });

    expect(nueva).toHaveLength(19);
    expect(nueva[18]).toEqual({ id: 999, nombre: 'Taller de colaciones', precio: 10000 });
    expect(lista).toHaveLength(18); // inmutabilidad
  });

  it('DELETE: elimina el servicio indicado', () => {
    const nueva = eliminarServicio(lista, 1);

    expect(nueva).toHaveLength(17);
    expect(obtenerServicioPorId(nueva, 1)).toBeUndefined();
  });
});
