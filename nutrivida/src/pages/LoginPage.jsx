import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/organisms/LoginForm';
import { iniciarSesion } from '../services/authService';

// Inicio de sesión contra el backend: POST /api/v1/auth/login.
// Si las credenciales son correctas, authService guarda el JWT y los datos
// del usuario en localStorage (ver utils/sesion.js).
export const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (data) => {
    setError('');
    setCargando(true);

    try {
      const usuario = await iniciarSesion({
        email: data.email || '',
        password: data.password || '',
      });
      navigate(usuario.rol === 'ADMIN' ? '/admin' : '/');
    } catch (err) {
      // 401: mensaje genérico del backend ("Correo o contraseña incorrectos.")
      // 400: faltan datos · 0: el backend no responde
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5} xl={4}>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <LoginForm onSubmit={handleLogin} cargando={cargando} />

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
