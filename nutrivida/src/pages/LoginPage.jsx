import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
          <div className="bg-white p-4 rounded shadow-sm border">
            <LoginForm onSubmit={handleLogin} />
            
            <div className="text-center mt-3 pt-3 border-top">
              <small className="text-muted">
                ¿Aún no tienes una cuenta?{' '}
                <Link to="/registro" className="text-success font-weight-bold text-decoration-none">
                  Regístrate aquí
                </Link>
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};