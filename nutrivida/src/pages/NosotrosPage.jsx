import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function NosotrosPage() {
  return (
    <main className="py-5">
      <Container>

        {/* Encabezado */}
        <div className="text-center mb-5">
          <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">
            Clínica Nutricional NutriVida
          </span>

          <h1
            className="fw-semibold mb-3"
            style={{ fontSize: '2.3rem' }}
          >
            Sobre NutriVida
          </h1>

          <p
            className="text-muted mx-auto"
            style={{
              maxWidth: '650px',
              fontSize: '1.05rem',
              lineHeight: '1.7',
            }}
          >
            Acompañamos a nuestros pacientes con una atención nutricional
            cercana, profesional y adaptada a sus necesidades.
          </p>
        </div>

        {/* Misión y enfoque */}
        <Row className="g-4 mb-4">

          <Col xs={12} md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div
                  className="mb-3 d-flex align-items-center justify-content-center rounded-circle bg-success-subtle text-success fw-semibold"
                  style={{
                    width: '48px',
                    height: '48px',
                    fontSize: '1.1rem',
                  }}
                >
                  01
                </div>

                <Card.Title className="fw-semibold mb-3">
                  Nuestra misión
                </Card.Title>

                <Card.Text
                  className="text-muted"
                  style={{ lineHeight: '1.7' }}
                >
                  Brindar atención nutricional personalizada, cercana y
                  profesional, acompañando a cada paciente en el desarrollo
                  de hábitos de alimentación saludables y sostenibles.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div
                  className="mb-3 d-flex align-items-center justify-content-center rounded-circle bg-success-subtle text-success fw-semibold"
                  style={{
                    width: '48px',
                    height: '48px',
                    fontSize: '1.1rem',
                  }}
                >
                  02
                </div>

                <Card.Title className="fw-semibold mb-3">
                  Nuestro enfoque
                </Card.Title>

                <Card.Text
                  className="text-muted"
                  style={{ lineHeight: '1.7' }}
                >
                  En NutriVida entendemos que cada persona tiene necesidades
                  diferentes. Por eso ofrecemos servicios y planes
                  nutricionales adaptados a los objetivos y características
                  de cada paciente.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

        </Row>

        {/* Atención profesional */}
        <Card className="border-0 shadow-sm mb-5">
          <Card.Body className="p-4 p-md-5">
            <Row className="align-items-center g-4">

              <Col xs={12} md={8}>
                <span className="text-success fw-semibold">
                  Acompañamiento NutriVida
                </span>

                <h2
                    className="fw-semibold mt-2 mb-3"
                    style={{ fontSize: '1.6rem' }}
>
                    Atención profesional y personalizada
                </h2>

                <p
                  className="text-muted mb-0"
                  style={{ lineHeight: '1.7' }}
                >
                  Nuestro equipo de nutricionistas acompaña a los pacientes
                  durante su proceso, desde la evaluación inicial hasta los
                  controles de seguimiento, entregando orientación y apoyo
                  continuo.
                </p>
              </Col>

              <Col xs={12} md={4}>
                <div className="d-grid gap-2">
                  <Link
                    to="/servicios"
                    className="btn btn-success"
                  >
                    Conocer servicios
                  </Link>

                  <Link
                    to="/contacto"
                    className="btn btn-outline-success"
                  >
                    Agendar una cita
                  </Link>
                </div>
              </Col>

            </Row>
          </Card.Body>
        </Card>

      </Container>
    </main>
  );
}

export default NosotrosPage;