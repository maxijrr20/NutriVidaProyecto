import { useParams, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import servicios from '../data/servicios.json';

function DetalleServicioPage() {
  const { id } = useParams();

  const servicio = servicios.find(
    (item) => item.id === Number(id)
  );

  if (!servicio) {
    return (
      <Container className="py-5 text-center">
        <h2>Servicio no encontrado</h2>

        <Link to="/servicios">
          <Button variant="success" className="mt-3">
            Volver a servicios
          </Button>
        </Link>
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
            <strong>Tipo:</strong> {servicio.tipo}
          </p>

          <p>
            <strong>Duración:</strong> {servicio.duracion}
          </p>

          <p>
            <strong>Modalidad:</strong> {servicio.modalidad}
          </p>

          <p>
            <strong>Precio:</strong> {precioFormateado}
          </p>

          <Link to="/servicios">
            <Button variant="outline-success" className="mt-3">
              Volver a servicios
            </Button>
          </Link>

        </Card.Body>

      </Card>

    </Container>
  );
}

export default DetalleServicioPage;