import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import servicios from '../data/servicios.json';

function CategoriaDetallePage() {
  const { categoria } = useParams();
  const nombreCategoria = decodeURIComponent(categoria);

  const serviciosCategoria = servicios.filter(
    (servicio) => servicio.categoria === nombreCategoria
  );

  return (
    <Container className="py-5">

      <div className="text-center mb-5">
        <h1>{nombreCategoria}</h1>
        <p className="text-muted">
          Servicios disponibles en esta categoría.
        </p>
      </div>

      <Row className="g-4">
        {serviciosCategoria.map((servicio) => (
          <Col xs={12} md={6} lg={4} key={servicio.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <Card.Title>{servicio.nombre}</Card.Title>

                <Card.Text className="text-muted">
                  {servicio.descripcion}
                </Card.Text>

                <p>
                  <strong>Modalidad:</strong> {servicio.modalidad}
                </p>

                <p>
                  <strong>Precio:</strong>{' '}
                  ${servicio.precio.toLocaleString('es-CL')}
                </p>

                <Button
                  as={Link}
                  to={`/servicios/${servicio.id}`}
                  variant="primary"
                  className="mt-auto"
                >
                  Ver detalle
                </Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <Button as={Link} to="/categorias" variant="secondary">
          Volver a categorías
        </Button>
      </div>

    </Container>
  );
}

export default CategoriaDetallePage;