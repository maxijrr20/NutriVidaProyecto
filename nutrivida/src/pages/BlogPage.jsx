import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import blogHero from '../assets/blog-hero.jpg';
import blogHabitos from '../assets/blog-habitos.avif';
import blogEvaluacion from '../assets/consulta-nutricion.png';

const entradas = [
  {
    id: 1,
    titulo: '5 consejos para mejorar tus hábitos alimentarios',
    resumen:
      'Pequeños cambios en tu rutina diaria pueden ayudarte a construir una alimentación más equilibrada y sostenible.',
    categoria: 'Hábitos saludables',
    imagen: blogHabitos,
  },
  {
    id: 2,
    titulo: '¿Por qué es importante una evaluación nutricional?',
    resumen:
      'Una evaluación nutricional permite conocer tus necesidades y establecer objetivos adecuados para cuidar tu salud.',
    categoria: 'Nutrición',
    imagen: blogEvaluacion,
  },
];

function BlogPage() {
  return (
    <main
      style={{
        backgroundColor: '#eef8f2',
        minHeight: '100vh',
      }}
    >
      {/* HERO */}
      <section
        style={{
          paddingTop: '60px',
          paddingBottom: '55px',
        }}
      >
        <Container>
          <Row className="align-items-center g-5">
            {/* TEXTO HERO */}
            <Col xs={12} lg={6}>
              <span
                className="badge px-3 py-2 mb-4"
                style={{
                  backgroundColor: '#d9eee2',
                  color: '#138a4a',
                  borderRadius: '20px',
                  fontSize: '0.95rem',
                }}
              >
                🌿 NutriVida Blog
              </span>

              <h1
                className="fw-semibold mb-4"
                style={{
                  fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                  lineHeight: '1.08',
                  color: '#173d33',
                  maxWidth: '600px',
                }}
              >
                Consejos para cuidar tu alimentación
              </h1>

              <p
                className="text-muted mb-4"
                style={{
                  fontSize: '1.15rem',
                  lineHeight: '1.8',
                  maxWidth: '580px',
                }}
              >
                Información sencilla para ayudarte a desarrollar
                hábitos saludables y comprender mejor tu alimentación.
              </p>

              <div
                className="d-flex flex-wrap gap-4 mt-4"
                style={{
                  color: '#26734d',
                  fontSize: '1rem',
                }}
              >
                <div>
                  <strong>🥗 Consejos prácticos</strong>
                </div>

                <div>
                  <strong>♡ Hábitos saludables</strong>
                </div>

                <div>
                  <strong>🌱 Vida equilibrada</strong>
                </div>
              </div>
            </Col>

            {/* IMAGEN HERO */}
            <Col xs={12} lg={6}>
              <div
                style={{
                  borderRadius: '80px 25px 80px 25px',
                  overflow: 'hidden',
                  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12)',
                  backgroundColor: '#ffffff',
                }}
              >
                <img
                  src={blogHero}
                  alt="Alimentación saludable NutriVida"
                  style={{
                    width: '100%',
                    height: '430px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ARTÍCULOS */}
      <section
        style={{
          paddingBottom: '70px',
        }}
      >
        <Container>
          <div className="mb-4">
            <h2
              className="fw-semibold mb-2"
              style={{
                color: '#173d33',
                fontSize: '2.2rem',
              }}
            >
              Artículos destacados
            </h2>

            <p
              className="text-muted"
              style={{
                fontSize: '1.05rem',
              }}
            >
              Información preparada para ayudarte a cuidar tu
              alimentación y bienestar.
            </p>
          </div>

          <Row className="g-4">
            {entradas.map((entrada) => (
              <Col xs={12} md={6} key={entrada.id}>
                <Card
                  className="h-100 border-0 overflow-hidden"
                  style={{
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div
                    style={{
                      height: '290px',
                      overflow: 'hidden',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={entrada.imagen}
                      alt={entrada.titulo}
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  <Card.Body
                    className="p-4 d-flex flex-column"
                    style={{
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <span
                      className="fw-semibold mb-2"
                      style={{
                        color: '#159447',
                        fontSize: '1rem',
                      }}
                    >
                      {entrada.categoria}
                    </span>

                    <Card.Title
                      className="fw-semibold mb-3"
                      style={{
                        fontSize: '1.45rem',
                        color: '#173d33',
                        lineHeight: '1.35',
                      }}
                    >
                      {entrada.titulo}
                    </Card.Title>

                    <Card.Text
                      className="text-muted flex-grow-1"
                      style={{
                        lineHeight: '1.75',
                        fontSize: '1.05rem',
                      }}
                    >
                      {entrada.resumen}
                    </Card.Text>

                    <Link
                      to={`/blog/${entrada.id}`}
                      className="btn btn-outline-success mt-3 py-2 fw-semibold"
                      style={{
                        borderRadius: '10px',
                      }}
                    >
                      Leer más →
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default BlogPage;