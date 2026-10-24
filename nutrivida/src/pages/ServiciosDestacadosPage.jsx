import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { useServicios } from '../context/ServiciosContext';

import imagenConsulta from '../assets/consulta-nutricion.png';
import imagenHabitos from '../assets/blog-habitos.avif';
import imagenPlan from '../assets/home-plan-nutricional.jpg';

const imagenesDestacadas = [
  imagenConsulta,
  imagenHabitos,
  imagenPlan,
];

function ServiciosDestacadosPage() {
  const { servicios } = useServicios();

  const serviciosDestacados = servicios.slice(0, 3);

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
              🌿 Recomendados NutriVida
            </span>

            <h1
              style={{
                color: '#173d33',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: '600',
                marginBottom: '14px',
              }}
            >
              Servicios destacados
            </h1>

            <p
              style={{
                color: '#68756f',
                fontSize: '1.08rem',
                lineHeight: '1.7',
                margin: 0,
              }}
            >
              Conoce algunas de nuestras atenciones más solicitadas
              y encuentra la alternativa que mejor se adapte a tus
              necesidades.
            </p>
          </div>

          {/* TARJETAS */}
          <Row className="g-4">
            {serviciosDestacados.map((servicio, index) => (
              <Col
                xs={12}
                md={6}
                lg={4}
                key={servicio.id}
              >
                <Card
                  className="h-100 border-0 overflow-hidden"
                  style={{
                    borderRadius: '22px',
                    boxShadow:
                      '0 10px 30px rgba(0, 0, 0, 0.08)',
                    backgroundColor: '#ffffff',
                  }}
                >
                  {/* IMAGEN */}
                  <div
                    style={{
                      height: '230px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={imagenesDestacadas[index]}
                      alt={servicio.nombre}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />

                    <span
                      style={{
                        position: 'absolute',
                        top: '18px',
                        left: '18px',
                        backgroundColor:
                          'rgba(255,255,255,0.92)',
                        color: '#128b49',
                        padding: '7px 13px',
                        borderRadius: '20px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                      }}
                    >
                      Destacado
                    </span>
                  </div>

                  {/* CONTENIDO */}
                  <Card.Body
                    className="d-flex flex-column"
                    style={{
                      padding: '26px',
                    }}
                  >
                    <Card.Title
                      style={{
                        color: '#173d33',
                        fontSize: '1.35rem',
                        fontWeight: '600',
                        lineHeight: '1.35',
                        marginBottom: '14px',
                      }}
                    >
                      {servicio.nombre}
                    </Card.Title>

                    <Card.Text
                      style={{
                        color: '#66736e',
                        lineHeight: '1.7',
                        fontSize: '1rem',
                        marginBottom: '20px',
                      }}
                    >
                      {servicio.descripcion}
                    </Card.Text>

                    <div
                      style={{
                        marginTop: 'auto',
                      }}
                    >
                      <div
                        style={{
                          borderTop:
                            '1px solid #e5eee8',
                          paddingTop: '18px',
                          marginBottom: '18px',
                        }}
                      >
                        <span
                          style={{
                            display: 'block',
                            color: '#7a8580',
                            fontSize: '0.85rem',
                            marginBottom: '3px',
                          }}
                        >
                          Valor
                        </span>

                        <strong
                          style={{
                            color: '#173d33',
                            fontSize: '1.3rem',
                          }}
                        >
                          $
                          {servicio.precio.toLocaleString(
                            'es-CL'
                          )}{' '}
                          CLP
                        </strong>
                      </div>

                      <Button
                        as={Link}
                        to={`/servicios/${servicio.id}`}
                        variant="success"
                        className="w-100 py-2 fw-semibold"
                        style={{
                          borderRadius: '11px',
                        }}
                      >
                        Ver detalle →
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* BOTÓN FINAL */}
          <div
            className="text-center"
            style={{
              marginTop: '45px',
            }}
          >
            <p
              style={{
                color: '#68756f',
                marginBottom: '15px',
              }}
            >
              ¿Quieres conocer todas las alternativas disponibles?
            </p>

            <Button
              as={Link}
              to="/servicios"
              variant="outline-success"
              className="px-4 py-2 fw-semibold"
              style={{
                borderRadius: '11px',
                backgroundColor: '#ffffff',
              }}
            >
              Ver todos los servicios
            </Button>
          </div>

        </Container>
      </section>
    </main>
  );
}

export default ServiciosDestacadosPage;