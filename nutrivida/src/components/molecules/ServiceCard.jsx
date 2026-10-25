import React from 'react';
import { Link } from 'react-router-dom';
import { Price } from '../atoms/Price';

// Molécula: tarjeta de un servicio del catálogo.
// Recibe todo por props; no maneja estado propio (solo muestra datos).
export const ServiceCard = ({ id, titulo, descripcion, precio, categoria }) => {
  return (
    <article className="tarjeta-servicio">
      <span className="badge-categoria">{categoria}</span>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <div className="servicio-footer">
        <Price valor={precio} />
        <div className="d-flex gap-2 flex-wrap">
          {id !== undefined && (
            <Link to={`/servicios/${id}`} className="boton boton-sm">
              Ver detalle
            </Link>
          )}
          <Link to="/contacto" className="boton boton-secundario boton-sm">
            Agendar
          </Link>
        </div>
      </div>
    </article>
  );
};
