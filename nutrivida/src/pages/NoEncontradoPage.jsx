import { Link } from 'react-router-dom';

// Se muestra cuando la URL no coincide con ninguna ruta (path="*")
export default function NoEncontradoPage() {
  return (
    <main className="container text-center my-5">
      <h2 className="fw-bold">Página no encontrada</h2>
      <p className="text-muted">La dirección que buscas no existe en NutriVida.</p>
      <Link to="/" className="btn btn-success">Volver al inicio</Link>
    </main>
  );
}
