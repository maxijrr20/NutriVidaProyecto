// "Base de datos" simulada de servicios.
// Las funciones CRUD son puras: reciben la lista y devuelven una lista NUEVA
// (no modifican la original). Así son fáciles de probar y React detecta el cambio.
import serviciosIniciales from '../data/servicios.json';

export const CLAVE_SERVICIOS = 'nutrivida_servicios';

// READ: lee desde localStorage; si no hay nada (o está corrupto), usa los datos iniciales
export const listarServicios = () => {
  try {
    const guardados = localStorage.getItem(CLAVE_SERVICIOS);
    return guardados ? JSON.parse(guardados) : [...serviciosIniciales];
  } catch {
    return [...serviciosIniciales];
  }
};

export const guardarServicios = (lista) => {
  localStorage.setItem(CLAVE_SERVICIOS, JSON.stringify(lista));
};

export const obtenerServicioPorId = (lista, id) =>
  lista.find((servicio) => servicio.id === Number(id));

// CREATE
export const crearServicio = (lista, nuevoServicio) => [
  ...lista,
  { ...nuevoServicio, id: Date.now() }
];

// UPDATE
export const actualizarServicio = (lista, id, datosActualizados) =>
  lista.map((servicio) =>
    servicio.id === Number(id) ? { ...servicio, ...datosActualizados } : servicio
  );

// DELETE
export const eliminarServicio = (lista, id) =>
  lista.filter((servicio) => servicio.id !== Number(id));
