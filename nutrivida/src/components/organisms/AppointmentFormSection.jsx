import React, { useState } from 'react';
import nutricionistasData from '../../data/nutricionistas.json';
import serviciosData from '../../data/servicios.json';

// Bloques cada 30 minutos según la jornada laboral de cada nutricionista en el Excel oficial:
const HORARIOS_POR_CODIGO = {
  // NUT001: Lunes, Miércoles, Viernes de 09:00 a 17:00
  NUT001: [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', 
    '16:00', '16:30'
  ],

  // NUT002: Martes, Jueves, Sábado de 09:00 a 14:00
  NUT002: [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', '13:30'
  ],

  // NUT003: Lunes a Viernes de 08:00 a 13:00
  NUT003: [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30'
  ],

  // NUT004: Martes a Viernes de 14:00 a 19:00
  NUT004: [
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', 
    '17:00', '17:30', '18:00', '18:30'
  ]
};

// Algoritmo oficial Módulo 11 para RUT chileno
const validarRutChileno = (rutCompleto) => {
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

export const AppointmentFormSection = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    rut: '',
    email: '',
    telefono: '',
    servicioId: serviciosData[0]?.id || '',
    nutricionistaCodigo: nutricionistasData[0]?.codigo || 'NUT001',
    fecha: '',
    hora: '',
    motivo: ''
  });

  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Fecha mínima: a partir de mañana
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  const fechaMinima = manana.toISOString().split('T')[0];

  const servicioSeleccionado = serviciosData.find(
    (s) => String(s.id) === String(formData.servicioId)
  );

  const nutricionistaSeleccionado = nutricionistasData.find(
    (n) => n.codigo === formData.nutricionistaCodigo
  );

  // Obtener los horarios válidos para el profesional seleccionado
  const horariosDisponibles =
    HORARIOS_POR_CODIGO[formData.nutricionistaCodigo] || ['09:00', '11:00', '15:00'];

  const validarCampo = (name, value) => {
    let error = '';

    if (name === 'nombreCompleto') {
      if (!value.trim()) error = 'El nombre completo es obligatorio.';
      else if (value.trim().length < 5) error = 'Ingresa nombre y apellido (mínimo 5 caracteres).';
    }

    if (name === 'rut') {
      if (!value.trim()) error = 'El RUT es obligatorio.';
      else if (!validarRutChileno(value)) error = 'RUT inválido. Formato: 12.345.678-9';
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = 'El correo electrónico es obligatorio.';
      else if (!emailRegex.test(value)) error = 'Ingresa un correo electrónico válido.';
    }

    if (name === 'telefono') {
      const telLimpio = value.replace(/\s+/g, '');
      const telRegex = /^(\+?56)?(\s?)(9\d{8})$/;
      if (!value.trim()) error = 'El teléfono es obligatorio.';
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si cambia de nutricionista, resetear la hora para evitar incompatibilidades
    if (name === 'nutricionistaCodigo') {
      setFormData((prev) => ({ ...prev, [name]: value, hora: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (tocado[name]) {
      const errorMsg = validarCampo(name, value);
      setErrores((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTocado((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validarCampo(name, value);
    setErrores((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    Object.keys(formData).forEach((campo) => {
      const error = validarCampo(campo, formData[campo]);
      if (error) nuevosErrores[campo] = error;
    });

    setErrores(nuevosErrores);
    setTocado({
      nombreCompleto: true,
      rut: true,
      email: true,
      telefono: true,
      fecha: true,
      hora: true
    });

    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true);
    }
  };

  return (
    <section className="formulario-agendamiento-contenedor">
      {enviado ? (
        <div className="mensaje-confirmacion text-center p-5">
          <div className="icono-exito mb-3">✓</div>
          <h3 className="text-success mb-2">¡Solicitud de Cita Registrada!</h3>
          <p className="lead mb-4">
            Hemos recibido tu solicitud para <strong>{formData.nombreCompleto}</strong>.
          </p>
          <div className="resumen-tarjeta text-start mx-auto p-4 mb-4">
            <p><strong>RUT:</strong> {formData.rut}</p>
            <p><strong>Servicio:</strong> {servicioSeleccionado?.nombre}</p>
            <p><strong>Modalidad:</strong> {servicioSeleccionado?.modalidad} ({servicioSeleccionado?.duracion})</p>
            <p><strong>Valor estimado:</strong> ${servicioSeleccionado?.precio?.toLocaleString('es-CL')} CLP</p>
            <p><strong>Especialista:</strong> {nutricionistaSeleccionado?.nombre}</p>
            <p><strong>Fecha preferente:</strong> {formData.fecha} a las {formData.hora} hrs</p>
            <p className="text-muted small mb-0">
              * Confirmaremos la hora vía WhatsApp al <strong>{formData.telefono}</strong> o correo <strong>{formData.email}</strong>.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              setEnviado(false);
              setFormData({
                nombreCompleto: '',
                rut: '',
                email: '',
                telefono: '',
                servicioId: serviciosData[0]?.id || '',
                nutricionistaCodigo: nutricionistasData[0]?.codigo || 'NUT001',
                fecha: '',
                hora: '',
                motivo: ''
              });
              setErrores({});
              setTocado({});
            }}
          >
            Agendar otra consulta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="formulario-cita p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="titulo-seccion">Agendar Consulta Nutricional</h2>
            <p className="text-muted">
              Completa el formulario para coordinar tu evaluación presencial o teleconsulta.
            </p>
          </div>

          <div className="row g-3">
            {/* Nombre Completo */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Nombre Completo *</label>
              <input
                type="text"
                name="nombreCompleto"
                className={`form-control ${tocado.nombreCompleto && (errores.nombreCompleto ? 'is-invalid' : 'is-valid')}`}
                placeholder="Ej. Maximiliano Valenzuela"
                value={formData.nombreCompleto}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {tocado.nombreCompleto && errores.nombreCompleto && (
                <div className="invalid-feedback">{errores.nombreCompleto}</div>
              )}
            </div>

            {/* RUT */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">RUT *</label>
              <input
                type="text"
                name="rut"
                className={`form-control ${tocado.rut && (errores.rut ? 'is-invalid' : 'is-valid')}`}
                placeholder="Ej. 12.345.678-9"
                value={formData.rut}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {tocado.rut && errores.rut && (
                <div className="invalid-feedback">{errores.rut}</div>
              )}
            </div>

            {/* Email */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                className={`form-control ${tocado.email && (errores.email ? 'is-invalid' : 'is-valid')}`}
                placeholder="ejemplo@correo.cl"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {tocado.email && errores.email && (
                <div className="invalid-feedback">{errores.email}</div>
              )}
            </div>

            {/* Teléfono */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Teléfono / WhatsApp *</label>
              <input
                type="tel"
                name="telefono"
                className={`form-control ${tocado.telefono && (errores.telefono ? 'is-invalid' : 'is-valid')}`}
                placeholder="+56 9 1234 5678"
                value={formData.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {tocado.telefono && errores.telefono && (
                <div className="invalid-feedback">{errores.telefono}</div>
              )}
            </div>

            {/* Servicio */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Servicio o Plan Requerido *</label>
              <select
                name="servicioId"
                className="form-select is-valid"
                value={formData.servicioId}
                onChange={handleChange}
              >
                {serviciosData.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre} (${s.precio?.toLocaleString('es-CL')} CLP) — {s.duracion}
                  </option>
                ))}
              </select>
            </div>

            {/* Nutricionista */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Nutricionista de Preferencia *</label>
              <select
                name="nutricionistaCodigo"
                className="form-select is-valid"
                value={formData.nutricionistaCodigo}
                onChange={handleChange}
              >
                {nutricionistasData.map((n) => (
                  <option key={n.codigo} value={n.codigo}>
                    {n.nombre} ({n.dias} | {n.horario})
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Fecha Preferente *</label>
              <input
                type="date"
                name="fecha"
                min={fechaMinima}
                className={`form-control ${tocado.fecha && (errores.fecha ? 'is-invalid' : 'is-valid')}`}
                value={formData.fecha}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {tocado.fecha && errores.fecha && (
                <div className="invalid-feedback">{errores.fecha}</div>
              )}
            </div>

            {/* Bloque Horario Dinámico */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">Bloque Horario Disponible *</label>
              <select
                name="hora"
                className={`form-select ${tocado.hora && (errores.hora ? 'is-invalid' : 'is-valid')}`}
                value={formData.hora}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Selecciona horario ({nutricionistaSeleccionado?.horario})...</option>
                {horariosDisponibles.map((h) => (
                  <option key={h} value={h}>
                    {h} hrs
                  </option>
                ))}
              </select>
              {tocado.hora && errores.hora && (
                <div className="invalid-feedback">{errores.hora}</div>
              )}
            </div>

            {/* Motivo */}
            <div className="col-12">
              <label className="form-label fw-semibold">Motivo de Consulta o Antecedentes (Opcional)</label>
              <textarea
                name="motivo"
                rows="3"
                className="form-control"
                placeholder="Indica tus objetivos (bajada de peso, masa muscular, exámenes alterados, etc.)..."
                value={formData.motivo}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 mt-4 text-center">
              <button type="submit" className="btn btn-success btn-lg px-5 shadow-sm">
                Confirmar Solicitud de Cita
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

export default AppointmentFormSection;