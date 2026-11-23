import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/organisms/LoginForm';
import { iniciarSesion } from '../services/authService';

// Inicio de sesión contra el backend: POST /api/v1/auth/login.
// Si las credenciales son correctas, authService guarda el JWT y los datos
// del usuario en localStorage (ver utils/sesion.js).
export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Página protegida que se intentó abrir sin sesión (la guarda RutaPrivada)
  const desde = location.state?.desde;
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
      // Vuelve a la página que se pidió; si no había, el ADMIN va al panel y el resto al inicio
      navigate(desde || (usuario.rol === 'ADMIN' ? '/admin' : '/'), { replace: true });
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

          {desde && !error && (
            <div className="alert alert-info text-center" role="status">
              Inicia sesión para continuar.
            </div>
          )}

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
