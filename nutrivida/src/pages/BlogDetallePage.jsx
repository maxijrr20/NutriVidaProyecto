import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const entradas = [
  {
    id: 1,
    titulo: '5 consejos para mejorar tus hábitos alimentarios',
    categoria: 'Hábitos saludables',
    contenido: [
      'Mejorar la alimentación no significa cambiar todo de un día para otro. Los cambios pequeños y sostenidos suelen ser más fáciles de mantener en el tiempo.',
      'Una buena forma de comenzar es organizar tus horarios de comida, incluir alimentos variados, beber suficiente agua y prestar atención a las señales de hambre y saciedad.',
      'También es importante evitar comparaciones con otras personas. Cada cuerpo y cada proceso nutricional tienen necesidades diferentes.',
      'Si necesitas orientación personalizada, un profesional de la nutrición puede ayudarte a establecer objetivos adecuados a tu situación.',
    ],
  },
  {
    id: 2,
    titulo: '¿Por qué es importante una evaluación nutricional?',
    categoria: 'Nutrición',
    contenido: [
      'La evaluación nutricional permite conocer el estado actual de una persona y comprender mejor sus necesidades de alimentación.',
      'Durante este proceso pueden considerarse antecedentes personales, hábitos alimentarios, objetivos, actividad física y distintas mediciones corporales.',
      'Esta información permite desarrollar recomendaciones más personalizadas y realizar un seguimiento de los avances a lo largo del tiempo.',
      'Una evaluación profesional también ayuda a establecer objetivos realistas y evitar cambios de alimentación que no respondan a las necesidades individuales.',
    ],
  },
];

function BlogDetallePage() {
  const { id } = useParams();

  const entrada = entradas.find(
    (item) => item.id === Number(id)
  );

  if (!entrada) {
    return (
      <main className="py-5">
        <Container>
          <div className="alert alert-warning text-center">
            <h2>Entrada no encontrada</h2>
            <p>El artículo que buscas no está disponible.</p>

            <Link to="/blog" className="btn btn-success">
              Volver al Blog
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-5">
      <Container style={{ maxWidth: '900px' }}>
        <div className="mb-4">
          <Link
            to="/blog"
            className="text-success text-decoration-none"
          >
            ← Volver al Blog
          </Link>
        </div>

        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4 p-md-5">
            <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">
              {entrada.categoria}
            </span>

            <h1
              className="fw-semibold mb-4"
              style={{ fontSize: '2.2rem' }}
            >
              {entrada.titulo}
            </h1>

            {entrada.contenido.map((parrafo, index) => (
              <p
                key={index}
                className="text-muted"
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.05rem',
                }}
              >
                {parrafo}
              </p>
            ))}

            <hr className="my-4" />

            <div className="d-flex flex-column flex-sm-row gap-2">
              <Link
                to="/blog"
                className="btn btn-outline-success"
              >
                Ver más artículos
              </Link>

              <Link
                to="/contacto"
                className="btn btn-success"
              >
                Agendar una cita
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}

export default BlogDetallePage;