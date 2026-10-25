import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/organisms/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (data) => {
    setError('');

    const correoIngresado = (data.email || '')
      .toLowerCase()
      .trim();

    const passwordIngresada = data.password || '';

    // Credenciales simples para el administrador del demo
    const ADMIN_EMAIL = 'admin@nutrivida.cl';
    const ADMIN_PASSWORD = 'admin123';

    // LOGIN ADMIN
    if (
      correoIngresado === ADMIN_EMAIL &&
      passwordIngresada === ADMIN_PASSWORD
    ) {
      const usuarioSesion = {
        nombre: 'Administrador NutriVida',
        rut: '11.111.111-1',
        rol: 'ADMIN',
        email: ADMIN_EMAIL,
      };

      localStorage.setItem(
        'nutrivida_session',
        JSON.stringify(usuarioSesion)
      );

      navigate('/admin');
      return;
    }

    // LOGIN PACIENTE REGISTRADO
    const usuariosRegistrados =
      JSON.parse(localStorage.getItem('nutrivida_usuarios')) || [];

    const usuarioEncontrado = usuariosRegistrados.find(
      (usuario) =>
        usuario.email.toLowerCase().trim() === correoIngresado &&
        usuario.password === passwordIngresada
    );

    if (!usuarioEncontrado) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    const usuarioSesion = {
      nombre: usuarioEncontrado.nombre,
      rut: usuarioEncontrado.rut,
      rol: usuarioEncontrado.rol || 'PACIENTE',
      email: usuarioEncontrado.email,
    };

    localStorage.setItem(
      'nutrivida_session',
      JSON.stringify(usuarioSesion)
    );

    navigate('/');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5} xl={4}>

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          <LoginForm onSubmit={handleLogin} />

          <div className="text-center mt-3">
            <p className="mb-1">
              ¿No tienes una cuenta?
            </p>

            <Link
              to="/registro"
              className="text-success fw-semibold text-decoration-none"
            >
              Crear una cuenta
            </Link>
          </div>

        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;