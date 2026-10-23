import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validarRutChileno } from '../utils/validaciones';

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rut: '',
    password: '',
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

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

    if (formData.password.length < 6) {
      nuevosErrores.password =
        'La contraseña debe tener al menos 6 caracteres.';
    }

    const usuariosRegistrados =
      JSON.parse(
        localStorage.getItem('nutrivida_usuarios')
      ) || [];

    const correoExiste = usuariosRegistrados.some(
      (usuario) =>
        usuario.email?.toLowerCase().trim() === emailLimpio
    );

    if (correoExiste) {
      nuevosErrores.email =
        'Este correo ya se encuentra registrado.';
    }

    const rutExiste = usuariosRegistrados.some(
      (usuario) =>
        usuario.rut
          ?.replace(/\./g, '')
          .replace(/-/g, '')
          .toUpperCase() ===
        rutLimpio
          .replace(/\./g, '')
          .replace(/-/g, '')
          .toUpperCase()
    );

    if (rutExiste) {
      nuevosErrores.rut =
        'Este RUT ya se encuentra registrado.';
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('');

    if (!validarFormulario()) {
      return;
    }

    const usuariosPrevios =
      JSON.parse(
        localStorage.getItem('nutrivida_usuarios')
      ) || [];

    const nuevoUsuario = {
      nombre: formData.nombre.trim(),
      rut: formData.rut.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    localStorage.setItem(
      'nutrivida_usuarios',
      JSON.stringify([
        ...usuariosPrevios,
        nuevoUsuario,
      ])
    );

    setMensaje(
      '¡Registro exitoso! Redirigiendo al inicio de sesión...'
    );

    setTimeout(() => {
      navigate('/login');
    }, 1500);
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
              Contraseña
            </label>

            <input
              type="password"
              name="password"
              className={`form-control ${
                errores.password ? 'is-invalid' : ''
              }`}
              placeholder="Mínimo 6 caracteres"
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
          >
            Registrarse
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