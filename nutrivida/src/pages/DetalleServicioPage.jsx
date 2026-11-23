import { useParams, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Button } from '../components/atoms/Button';

import { useServicios } from '../context/ServiciosContext';

function DetalleServicioPage() {
  const { servicios } = useServicios();
  const { id } = useParams();

  const servicio = servicios.find(
    (item) => item.id === Number(id)
  );

  if (!servicio) {
    return (
      <Container className="py-5 text-center">
        <h2>Servicio no encontrado</h2>

        <Button as={Link} to="/servicios" variant="success" className="mt-3">
          Volver a servicios
        </Button>
      </Container>
    );
  }

  const precioFormateado = servicio.precio.toLocaleString(
    'es-CL',
    {
      style: 'currency',
      currency: 'CLP'
    }
  );

  return (
    <Container className="py-5">

      <Card className="shadow-sm">

        <Card.Body className="p-4">

          <Badge bg="success" className="mb-3">
            {servicio.categoria}
          </Badge>

          <h1>{servicio.nombre}</h1>

          <p className="text-muted">
            Código: {servicio.codigo}
          </p>

          <hr />

          <p>
            {servicio.descripcion}
          </p>

          <p>
            <strong>Tipo:</strong> {servicio.tipo || servicio.categoria}
          </p>

          <p>
            <strong>Duración:</strong> {servicio.duracion || "Por confirmar"}
          </p>

          <p>
            <strong>Modalidad:</strong> {servicio.modalidad || "Por confirmar"}
          </p>

          <p>
            <strong>Precio:</strong> {precioFormateado}
          </p>

          <Button as={Link} to="/servicios" variant="outline-success" className="mt-3">
            Volver a servicios
          </Button>

        </Card.Body>

      </Card>

    </Container>
  );
}

export default DetalleServicioPage;