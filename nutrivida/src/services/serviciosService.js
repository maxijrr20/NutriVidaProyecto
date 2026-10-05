import serviciosIniciales from '../data/servicios.json';

let servicios = [...serviciosIniciales];

export const listarServicios = () => {
  return servicios;
};

export const crearServicio = (nuevoServicio) => {
  const servicio = {
    ...nuevoServicio,
    id: Date.now()
  };

  servicios.push(servicio);

  return servicio;
};

export const actualizarServicio = (id, datosActualizados) => {
  servicios = servicios.map((servicio) =>
    servicio.id === id
      ? { ...servicio, ...datosActualizados }
      : servicio
  );

  return servicios.find((servicio) => servicio.id === id);
};

export const eliminarServicio = (id) => {
  servicios = servicios.filter(
    (servicio) => servicio.id !== id
  );

  return servicios;
};