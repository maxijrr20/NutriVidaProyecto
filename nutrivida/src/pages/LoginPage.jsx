import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LoginForm } from '../components/organisms/LoginForm';

/**
 * Vista de Inicio de Sesión para la clínica NutriVida.
 * Procesa la autenticación y almacena la sesión en localStorage, redirigiendo al panel de administración.
 */
export const LoginPage = () => {
  const handleLogin = (data) => {
    console.log('Datos recibidos del formulario:', data);

    // Obtener el valor del campo ingresado (email, usuario o RUT)
    const valorIngresado = (data.email || data.rut || data.usuario || '').toLowerCase().trim();

    // Comprobar si el usuario intenta ingresar como Administrador
    const esAdmin = valorIngresado.includes('admin');

    const usuarioSesion = {
      nombre: esAdmin ? 'Administrador NutriVida' : (data.nombre || 'Paciente Demo'),
      rut: esAdmin ? '11.111.111-1' : (data.email || '12.345.678-9'),
      rol: esAdmin ? 'ADMIN' : 'PACIENTE',
      email: esAdmin ? 'admin@nutrivida.cl' : (data.email || 'paciente@nutrivida.cl')
    };

    // Guardar en localStorage para persistencia
    localStorage.setItem('nutrivida_session', JSON.stringify(usuarioSesion));

    // Redirección inmediata según el rol
    if (usuarioSesion.rol === 'ADMIN') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
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