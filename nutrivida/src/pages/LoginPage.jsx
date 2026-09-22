import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LoginForm } from '../components/organisms/LoginForm';

export const LoginPage = () => {
  const handleLogin = (data) => {
    console.log('Datos de acceso:', data);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        {/* xs=12 para móviles (375px), md=8 para tablets (768px), lg=4 para escritorios (1280px) */}
        <Col xs={12} sm={10} md={8} lg={5} xl={4}>
          <LoginForm onSubmit={handleLogin} />
        </Col>
      </Row>
    </Container>
  );
};