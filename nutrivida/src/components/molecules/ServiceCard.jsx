import React from 'react';
import { Price } from '../atoms/Price';

export const ServiceCard = ({ titulo, descripcion, precio, categoria }) => {
  return (
    <article className="tarjeta-servicio">
      <span className="badge-categoria">{categoria}</span>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <div className="servicio-footer">
        <Price valor={precio} />
        <a href="/contacto" className="boton boton-secundario boton-sm">
          Agendar
        </a>
      </div>
    </article>
  );
};