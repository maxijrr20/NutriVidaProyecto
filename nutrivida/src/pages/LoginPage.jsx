import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/organisms/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log('Datos recibidos del formulario:', data);

    const valorIngresado = (
      data.email ||
      data.rut ||
      data.usuario ||
      ''
    )
      .toLowerCase()
      .trim();

    const esAdmin = valorIngresado.includes('admin');

    const usuarioSesion = {
      nombre: esAdmin
        ? 'Administrador NutriVida'
        : (data.nombre || 'Paciente Demo'),

      rut: esAdmin
        ? '11.111.111-1'
        : (data.rut || '12.345.678-9'),

      rol: esAdmin ? 'ADMIN' : 'PACIENTE',

      email: esAdmin
        ? 'admin@nutrivida.cl'
        : (data.email || 'paciente@nutrivida.cl'),
    };

    localStorage.setItem(
      'nutrivida_session',
      JSON.stringify(usuarioSesion)
    );

    if (usuarioSesion.rol === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5} xl={4}>
          <LoginForm onSubmit={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;