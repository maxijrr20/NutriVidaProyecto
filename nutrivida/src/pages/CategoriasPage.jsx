import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { useServicios } from '../context/ServiciosContext';

const iconosCategorias = {
  Consultas: '🩺',
  'Planes Especializados': '🥗',
  Evaluaciones: '📋',
  Talleres: '🌱',
};

function CategoriasPage() {
  const { servicios } = useServicios();

  const categorias = [
    ...new Set(
      servicios.map((servicio) => servicio.categoria)
    ),
  ];

  return (
    <main
      style={{
        backgroundColor: '#eef8f2',
        minHeight: '100vh',
      }}
    >
      <section
        style={{
          padding: '65px 0 75px',
        }}
      >
        <Container>

          {/* ENCABEZADO */}
          <div
            className="text-center"
            style={{
              maxWidth: '720px',
              margin: '0 auto 50px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#d8eee1',
                color: '#128b49',
                padding: '8px 16px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '0.9rem',
                marginBottom: '16px',
              }}
            >
              🌿 Servicios NutriVida
            </span>

            <h1
              style={{
                color: '#173d33',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: '600',
                marginBottom: '14px',
              }}
            >
              Categorías de servicios
            </h1>

            <p
              style={{
                color: '#68756f',
                fontSize: '1.08rem',
                lineHeight: '1.7',
                margin: 0,
              }}
            >
              Encuentra el tipo de atención que mejor se adapte
              a tus necesidades y objetivos nutricionales.
            </p>
          </div>

          {/* TARJETAS */}
          <Row className="g-4">
            {categorias.map((categoria) => {
              const cantidad = servicios.filter(
                (servicio) =>
                  servicio.categoria === categoria
              ).length;

              const icono =
                iconosCategorias[categoria] || '🌿';

              return (
                <Col
                  xs={12}
                  sm={6}
                  lg={3}
                  key={categoria}
                >
                  <Card
                    className="h-100 border-0"
                    style={{
                      borderRadius: '22px',
                      backgroundColor: '#ffffff',
                      boxShadow:
                        '0 10px 28px rgba(0, 0, 0, 0.07)',
                    }}
                  >
                    <Card.Body
                      className="text-center d-flex flex-column align-items-center"
                      style={{
                        padding: '32px 24px',
                      }}
                    >
                      {/* ICONO */}
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '20px',
                          backgroundColor: '#d8eee1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.9rem',
                          marginBottom: '20px',
                        }}
                      >
                        {icono}
                      </div>

                      <Card.Title
                        style={{
                          color: '#173d33',
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '10px',
                        }}
                      >
                        {categoria}
                      </Card.Title>

                      <Card.Text
                        style={{
                          color: '#68756f',
                          fontSize: '0.98rem',
                          marginBottom: '24px',
                        }}
                      >
                        {cantidad} servicios disponibles
                      </Card.Text>

                      <Button
                        as={Link}
                        to={`/categorias/${encodeURIComponent(
                          categoria
                        )}`}
                        variant="success"
                        className="mt-auto px-4 py-2 fw-semibold"
                        style={{
                          borderRadius: '11px',
                        }}
                      >
                        Ver servicios →
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default CategoriasPage;