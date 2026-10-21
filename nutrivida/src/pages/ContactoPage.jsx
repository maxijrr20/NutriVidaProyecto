import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ContactoPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    nutricionista: 'Dra. María Paz',
    motivo: '',
    fecha: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarRut = (rut) => {
    // Valida formato básico de RUT chileno (ej: 12345678-K o 12345678-9)
    return /^\d{7,8}-[kK\d]$/.test(rut.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let nuevosErrores = {};

    // 1. Validación de campos vacíos obligatorios
    if (!formData.nombre.trim() || !formData.motivo.trim() || !formData.fecha) {
      nuevosErrores.general = 'Debe completar los campos obligatorios';
    }

    // 2. Validación de Correo electrónico
    if (!formData.email || !formData.email.includes('@')) {
      nuevosErrores.email = 'Correo electrónico no válido';
    }

    // 3. Validación de RUT
    if (!validarRut(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});

    // Guardar solicitud en localStorage para el flujo de cita
    const nuevaSolicitud = {
      id: Date.now(),
      ...formData,
      estado: 'Pendiente'
    };

    const solicitudesPrevias = JSON.parse(localStorage.getItem('nutrivida_citas')) || [];
    localStorage.setItem('nutrivida_citas', JSON.stringify([...solicitudesPrevias, nuevaSolicitud]));

    // Redirigir a la vista de confirmación
    navigate('/confirmacion-solicitud', { state: { solicitud: nuevaSolicitud } });
  };

  return (
    <main className="container my-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Agendar Cita / Contacto</h2>

      {errores.general && (
        <div className="alert alert-danger" role="alert">
          {errores.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm" noValidate>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre Completo *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rut" className="form-label">RUT *</label>
          <input
            type="text"
            id="rut"
            name="rut"
            className="form-control"
            placeholder="12345678-K"
            value={formData.rut}
            onChange={handleChange}
          />
          {errores.rut && <small className="text-danger d-block">{errores.rut}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errores.email && <small className="text-danger d-block">{errores.email}</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            className="form-control"
            placeholder="+56 9 1234 5678"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nutricionista" className="form-label">Nutricionista Preferido</label>
          <select
            id="nutricionista"
            name="nutricionista"
            className="form-select"
            value={formData.nutricionista}
            onChange={handleChange}
          >
            <option value="Dra. María Paz">Dra. María Paz</option>
            <option value="Dr. Camilo Silva">Dr. Camilo Silva</option>
            <option value="Nutr. Andrea Rojas">Nutr. Andrea Rojas</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="motivo" className="form-label">Motivo de Consulta *</label>
          <textarea
            id="motivo"
            name="motivo"
            className="form-control"
            rows="3"
            value={formData.motivo}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha Preferida *</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            className="form-control"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Enviar Solicitud
        </button>
      </form>
    </main>
  );
};
export default ContactoPage;