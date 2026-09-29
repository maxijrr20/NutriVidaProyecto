import React from 'react';

export const Price = ({ valor }) => {
  const formatearPrecio = (precio) => {
    // Si no viene precio o es null/undefined
    if (precio === undefined || precio === null) {
      return 'Consultar';
    }

    // Si ya viene formateado como texto (ej: "$35.000 CLP")
    if (typeof precio === 'string') {
      return precio;
    }

    // Si es un número válido
    if (typeof precio === 'number') {
      return `$${precio.toLocaleString('es-CL')} CLP`;
    }

    return String(precio);
  };

  return <span className="precio-etiqueta">{formatearPrecio(valor)}</span>;
};