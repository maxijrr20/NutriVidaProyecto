import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rut: '',
    password: ''
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Guardar usuario de prueba en localStorage
    const usuariosPrevios = JSON.parse(localStorage.getItem('nutrivida_usuarios')) || [];
    usuariosPrevios.push(formData);
    localStorage.setItem('nutrivida_usuarios', JSON.stringify(usuariosPrevios));

    setMensaje('¡Registro exitoso! Redirigiendo al inicio de sesión...');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <main className="container my-5" style={{ maxWidth: '450px' }}>
      <div className="card p-4 shadow-sm border-0">
        <h3 className="text-center text-success mb-3">Crear Cuenta Paciente</h3>
        <p className="text-muted text-center small mb-4">
          Regístrate para gestionar tus citas en NutriVida.
        </p>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label font-weight-bold">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Ej: Juan Pérez"
              required
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label font-weight-bold">RUT</label>
            <input
              type="text"
              name="rut"
              className="form-control"
              placeholder="12.345.678-9"
              required
              value={formData.rut}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label font-weight-bold">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="correo@ejemplo.cl"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label font-weight-bold">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 font-weight-bold py-2 mt-2">
            Registrarse
          </button>
        </form>

        <div className="text-center mt-4 pt-2 border-top">
          <small className="text-muted">
            ¿Ya tienes una cuenta? <Link to="/login" className="text-success font-weight-bold">Inicia sesión aquí</Link>
          </small>
        </div>
      </div>
    </main>
  );
}