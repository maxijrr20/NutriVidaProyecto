import { describe, it, expect } from 'vitest';
import { listarServicios } from './serviciosService';

describe('serviciosService', () => {
  it('debe listar los 18 servicios iniciales', () => {
    const servicios = listarServicios();

    expect(servicios).toHaveLength(18);
  });
});