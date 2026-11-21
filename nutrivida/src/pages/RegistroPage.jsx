import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validarRutChileno } from '../utils/validaciones';
import { registrarPaciente } from '../services/authService';

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rut: '',
    telefono: '',
    password: '',
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrores({
      ...errores,
      [name]: '',
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    const nombreLimpio = formData.nombre.trim();
    const emailLimpio = formData.email.trim().toLowerCase();
    const rutLimpio = formData.rut.trim();

    if (nombreLimpio.length < 5) {
      nuevosErrores.nombre =
        'Ingresa tu nombre y apellido.';
    }

    if (!validarRutChileno(rutLimpio)) {
      nuevosErrores.rut =
        'Ingresa un RUT chileno válido.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailLimpio)) {
      nuevosErrores.email =
        'Ingresa un correo electrónico válido.';
    }

    if (formData.telefono.trim() && !/^\+?\d{8,15}$/.test(formData.telefono.trim())) {
      nuevosErrores.telefono =
        'El teléfono debe tener entre 8 y 15 dígitos (ej: +56912345678).';
    }

    // Mismo rango que exige el backend (BCrypt considera hasta 72 bytes)
    if (formData.password.length < 8 || formData.password.length > 72) {
      nuevosErrores.password =
        'La contraseña debe tener entre 8 y 72 caracteres.';
    }

    // Correo y RUT repetidos los detecta el backend (responde 409)

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  // Registro contra el backend: POST /api/v1/auth/register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setErrorGeneral('');

    if (!validarFormulario()) {
      return;
    }

    setCargando(true);

    try {
      await registrarPaciente(formData);

      setMensaje(
        '¡Registro exitoso! Redirigiendo al inicio de sesión...'
      );

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      if (err.estado === 409) {
        // "Ya existe una cuenta con ese correo." / "... con ese RUT."
        const campo = /RUT/i.test(err.message) ? 'rut' : 'email';
        setErrores((previos) => ({ ...previos, [campo]: err.message }));
      } else if (err.estado === 400 && Object.keys(err.errores).length) {
        // Errores por campo que devuelve la validación del backend
        setErrores((previos) => ({ ...previos, ...err.errores }));
      } else {
        setErrorGeneral(err.message);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main
      className="container my-5"
      style={{ maxWidth: '450px' }}
    >
      <div className="card p-4 shadow-sm border-0">
        <h3 className="text-center text-success mb-3">
          Crear Cuenta Paciente
        </h3>

        <p className="text-muted text-center small mb-4">
          Regístrate para gestionar tus citas en NutriVida.
        </p>

        {errorGeneral && (
          <div className="alert alert-danger" role="alert">
            {errorGeneral}
          </div>
        )}

        {mensaje && (
          <div className="alert alert-success">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-bold">
              Nombre Completo
            </label>

            <input
              type="text"
              name="nombre"
              className={`form-control ${
                errores.nombre ? 'is-invalid' : ''
              }`}
              placeholder="Ej: Juan Pérez"
              value={formData.nombre}
              onChange={handleChange}
            />

            {errores.nombre && (
              <div className="invalid-feedback">
                {errores.nombre}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              RUT
            </label>

            <input
              type="text"
              name="rut"
              className={`form-control ${
                errores.rut ? 'is-invalid' : ''
              }`}
              placeholder="12.345.678-9"
              value={formData.rut}
              onChange={handleChange}
            />

            {errores.rut && (
              <div className="invalid-feedback">
                {errores.rut}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Correo Electrónico
            </label>

            <input
              type="email"
              name="email"
              className={`form-control ${
                errores.email ? 'is-invalid' : ''
              }`}
              placeholder="correo@ejemplo.cl"
              value={formData.email}
              onChange={handleChange}
            />

            {errores.email && (
              <div className="invalid-feedback">
                {errores.email}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Teléfono <span className="text-muted fw-normal">(opcional)</span>
            </label>

            <input
              type="tel"
              name="telefono"
              className={`form-control ${
                errores.telefono ? 'is-invalid' : ''
              }`}
              placeholder="+56912345678"
              value={formData.telefono}
              onChange={handleChange}
            />

            {errores.telefono && (
              <div className="invalid-feedback">
                {errores.telefono}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Contraseña
            </label>

            <input
              type="password"
              name="password"
              className={`form-control ${
                errores.password ? 'is-invalid' : ''
              }`}
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={handleChange}
            />

            {errores.password && (
              <div className="invalid-feedback">
                {errores.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold py-2 mt-2"
            disabled={cargando}
          >
            {cargando ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="text-center mt-4 pt-2 border-top">
          <small className="text-muted">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="text-success fw-bold"
            >
              Inicia sesión aquí
            </Link>
          </small>
        </div>
      </div>
    </main>
  );
}