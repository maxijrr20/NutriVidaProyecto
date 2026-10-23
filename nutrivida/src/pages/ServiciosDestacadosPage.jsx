import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { useServicios } from '../context/ServiciosContext';

function ServiciosDestacadosPage() {
  const { servicios } = useServicios();
  const serviciosDestacados = servicios.slice(0, 3);

  return (
    <Container className="py-5">

      <div className="text-center mb-5">
        <h1>Servicios destacados</h1>
        <p className="text-muted">
          Conoce algunos servicios destacados de NutriVida.
        </p>
      </div>

      <Row className="g-4">
        {serviciosDestacados.map((servicio) => (
          <Col xs={12} md={6} lg={4} key={servicio.id}>

            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <Card.Title>{servicio.nombre}</Card.Title>

                <Card.Text className="text-muted">
                  {servicio.descripcion}
                </Card.Text>

                <p>
                  <strong>Precio:</strong>{' '}
                  ${servicio.precio.toLocaleString('es-CL')}
                </p>

                <Button
                  as={Link}
                  to={`/servicios/${servicio.id}`}
                  variant="success"
                  className="mt-auto"
                >
                  Ver detalle
                </Button>

              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>

    </Container>
  );
}

export default ServiciosDestacadosPage;