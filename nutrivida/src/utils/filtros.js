// Funciones puras para filtrar el catálogo. Se separan del componente
// para poder probarlas fácilmente con Vitest (sin renderizar nada).

// Quita tildes y mayúsculas: "Evaluación" -> "evaluacion"
export const normalizar = (texto = '') =>
  String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

/**
 * Filtra servicios por categoría y por texto de búsqueda.
 * @param {Array} servicios lista completa
 * @param {{ categoria?: string, texto?: string }} filtros
 * @returns {Array} lista nueva con los servicios que cumplen ambos filtros
 */
export const filtrarServicios = (servicios = [], { categoria = 'Todos', texto = '' } = {}) => {
  const textoBuscado = normalizar(texto);

  return servicios.filter((servicio) => {
    const coincideCategoria =
      categoria === 'Todos' || normalizar(servicio.categoria) === normalizar(categoria);

    const coincideTexto =
      textoBuscado === '' ||
      normalizar(servicio.nombre).includes(textoBuscado) ||
      normalizar(servicio.descripcion).includes(textoBuscado);

    return coincideCategoria && coincideTexto;
  });
};
