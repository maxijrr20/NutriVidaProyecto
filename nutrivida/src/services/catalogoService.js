// Catálogo contra el backend: servicios, categorías y nutricionistas.
// Leer es público (no necesita sesión). Crear, modificar y eliminar exige el JWT de un ADMIN:
// apiRequest lo agrega solo y el backend responde 401/403 si falta o no corresponde.
import { apiRequest } from './api';

// ---------- Servicios ----------
export const listarServicios = () => apiRequest('/servicios', { conToken: false });

const cuerpoServicio = ({ nombre, categoria, tipo, duracion, modalidad, precio, descripcion }) => ({
  nombre: nombre.trim(),
  categoria,
  tipo: tipo || null,
  duracion: duracion?.trim() || null,
  modalidad: modalidad || null,
  precio: Number(precio),
  descripcion: descripcion?.trim() || null,
});

export const crearServicio = (datos) =>
  apiRequest('/servicios', { metodo: 'POST', cuerpo: cuerpoServicio(datos) });

export const actualizarServicio = (id, datos) =>
  apiRequest(`/servicios/${id}`, { metodo: 'PUT', cuerpo: cuerpoServicio(datos) });

// Borrado lógico en el backend: deja de aparecer en el catálogo
export const eliminarServicio = (id) => apiRequest(`/servicios/${id}`, { metodo: 'DELETE' });

// ---------- Categorías ----------
export const listarCategorias = () => apiRequest('/categorias', { conToken: false });

export const crearCategoria = (nombre) =>
  apiRequest('/categorias', { metodo: 'POST', cuerpo: { nombre: nombre.trim() } });

export const renombrarCategoria = (id, nombre) =>
  apiRequest(`/categorias/${id}`, { metodo: 'PUT', cuerpo: { nombre: nombre.trim() } });

// ---------- Nutricionistas ----------
export const listarNutricionistas = () => apiRequest('/nutricionistas', { conToken: false });
