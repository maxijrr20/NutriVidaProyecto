// Algoritmo oficial Módulo 11 para RUT chileno
export const validarRutChileno = (rutCompleto) => {
  if (!rutCompleto) return false;
  const limpio = rutCompleto.replace(/\./g, '').replace(/-/g, '').trim().toUpperCase();
  if (limpio.length < 8 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado);
  return dv === dvCalculado;
};

// IMPORTANTE: Asegúrate de tener "export" aquí adelante
export const validarCampo = (name, value) => {
  let error = '';

  if (name === 'nombreCompleto') {
    if (!value || !value.trim()) error = 'El nombre completo es obligatorio.';
    else if (value.trim().length < 5) error = 'Ingresa nombre y apellido (mínimo 5 caracteres).';
  }

  if (name === 'rut') {
    if (!value || !value.trim()) error = 'El RUT es obligatorio.';
    else if (!validarRutChileno(value)) error = 'RUT inválido. Formato: 12.345.678-9';
  }

  if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !value.trim()) error = 'El correo electrónico es obligatorio.';
    else if (!emailRegex.test(value)) error = 'Ingresa un correo electrónico válido.';
  }

  if (name === 'telefono') {
    const telLimpio = (value || '').replace(/\s+/g, '');
    const telRegex = /^(\+?56)?(\s?)(9\d{8})$/;
    if (!value || !value.trim()) error = 'El teléfono es obligatorio.';
    else if (!telRegex.test(telLimpio)) error = 'Ingresa un número chileno de 9 dígitos (+56 9...).';
  }

  if (name === 'fecha') {
    if (!value) {
      error = 'Debes seleccionar una fecha.';
    } else {
      const diaSemana = new Date(value + 'T00:00:00').getDay();
      if (diaSemana === 0) {
        error = 'La clínica no atiende los domingos.';
      }
    }
  }

  if (name === 'hora' && !value) {
    error = 'Debes seleccionar un horario disponible.';
  }

  return error;
};