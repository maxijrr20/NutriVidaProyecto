import { describe, it, expect } from 'vitest';
import { validarRutChileno, validarCampo } from './validaciones';

describe('validaciones del formulario de cita', () => {
  it('acepta un RUT válido con o sin puntos y rechaza uno con dígito verificador incorrecto', () => {
    expect(validarRutChileno('12.345.678-5')).toBe(true);
    expect(validarRutChileno('12345678-5')).toBe(true);
    expect(validarRutChileno('12.345.678-9')).toBe(false);
    expect(validarRutChileno('')).toBe(false);
  });

  it('valida el correo electrónico', () => {
    expect(validarCampo('email', '')).toBe('El correo electrónico es obligatorio.');
    expect(validarCampo('email', 'correosinarroba')).toBe('Ingresa un correo electrónico válido.');
    expect(validarCampo('email', 'paciente@correo.cl')).toBe('');
  });
});
