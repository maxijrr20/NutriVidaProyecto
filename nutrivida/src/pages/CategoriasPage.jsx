import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import servicios from '../data/servicios.json';

function CategoriasPage() {
  const categorias = [...new Set(servicios.map((servicio) => servicio.categoria))];

  return (
    <Container className="py-5">

      <div className="text-center mb-5">
        <h1>Categorías de servicios</h1>
        <p className="text-muted">
          Conoce las distintas áreas de atención disponibles en NutriVida.
        </p>
      </div>

      <Row className="g-4">

        {categorias.map((categoria) => {
          const cantidad = servicios.filter(
            (servicio) => servicio.categoria === categoria
          ).length;

          return (
            <Col xs={12} sm={6} lg={3} key={categoria}>

              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">

                  <Card.Title>
                    {categoria}
                  </Card.Title>

                  <Card.Text className="text-muted">
                    {cantidad} servicios disponibles
                  </Card.Text>

                </Card.Body>
              </Card>

            </Col>
          );
        })}

      </Row>

    </Container>
  );
}

export default CategoriasPage;