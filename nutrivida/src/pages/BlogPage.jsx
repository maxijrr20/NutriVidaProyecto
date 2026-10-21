import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const entradas = [
  {
    id: 1,
    titulo: '5 consejos para mejorar tus hábitos alimentarios',
    resumen:
      'Pequeños cambios en tu rutina diaria pueden ayudarte a construir una alimentación más equilibrada y sostenible.',
    categoria: 'Hábitos saludables',
  },
  {
    id: 2,
    titulo: '¿Por qué es importante una evaluación nutricional?',
    resumen:
      'Una evaluación nutricional permite conocer tus necesidades y establecer objetivos adecuados para cuidar tu salud.',
    categoria: 'Nutrición',
  },
];

function BlogPage() {
  return (
    <main className="py-5">
      <Container>
        <div className="text-center mb-5">
          <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">
            NutriVida Blog
          </span>

          <h1
            className="fw-semibold mb-3"
            style={{ fontSize: '2.3rem' }}
          >
            Consejos para cuidar tu alimentación
          </h1>

          <p
            className="text-muted mx-auto"
            style={{
              maxWidth: '650px',
              fontSize: '1.05rem',
              lineHeight: '1.7',
            }}
          >
            Información sencilla para ayudarte a desarrollar hábitos
            saludables y comprender mejor tu alimentación.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {entradas.map((entrada) => (
            <Col xs={12} md={6} key={entrada.id}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 d-flex flex-column">
                  <span className="text-success fw-semibold mb-2">
                    {entrada.categoria}
                  </span>

                  <Card.Title className="fw-semibold mb-3">
                    {entrada.titulo}
                  </Card.Title>

                  <Card.Text
                    className="text-muted flex-grow-1"
                    style={{ lineHeight: '1.7' }}
                  >
                    {entrada.resumen}
                  </Card.Text>

                  <Link
                    to={`/blog/${entrada.id}`}
                    className="btn btn-outline-success mt-3"
                  >
                    Leer más
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default BlogPage;