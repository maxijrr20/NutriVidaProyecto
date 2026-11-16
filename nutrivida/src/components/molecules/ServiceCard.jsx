import React from 'react';
import { Price } from '../atoms/Price';

// Molécula: tarjeta de un servicio del catálogo.
// Recibe todo por props: los datos del servicio y qué hacer al presionar cada botón.
// No conoce el router; la página decide a dónde navegar.
export const ServiceCard = ({ titulo, descripcion, precio, categoria, onVerDetalle, onAgendar }) => {
  return (
    <article className="tarjeta-servicio">
      <span className="badge-categoria">{categoria}</span>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <div className="servicio-footer">
        <Price valor={precio} />
        <div className="d-flex gap-2 flex-wrap">
          {onVerDetalle && (
            <button type="button" className="boton boton-sm" onClick={onVerDetalle}>
              Ver detalle
            </button>
          )}
          <button type="button" className="boton boton-secundario boton-sm" onClick={onAgendar}>
            Agendar
          </button>
        </div>
      </div>
    </article>
  );
};
