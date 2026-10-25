// Gestión de categorías del catálogo.
// Una categoría "existe" si algún servicio la usa, o si el admin la creó
// (las creadas sin servicios se guardan aparte en localStorage).

export const CLAVE_CATEGORIAS = 'nutrivida_categorias';

export const listarCategoriasGuardadas = () => {
  try {
    const guardadas = localStorage.getItem(CLAVE_CATEGORIAS);
    return guardadas ? JSON.parse(guardadas) : [];
  } catch {
    return [];
  }
};

export const guardarCategorias = (lista) => {
  localStorage.setItem(CLAVE_CATEGORIAS, JSON.stringify(lista));
};

// Une las categorías de los servicios con las creadas a mano, sin repetir
export const obtenerCategorias = (servicios = [], extras = []) => [
  ...new Set([...servicios.map((s) => s.categoria).filter(Boolean), ...extras]),
];

// Cuenta cuántos servicios hay en cada categoría
export const contarPorCategoria = (servicios = [], categorias = []) =>
  categorias.map((categoria) => ({
    categoria,
    total: servicios.filter((s) => s.categoria === categoria).length,
  }));

// Renombrar: devuelve la lista de servicios con la categoría cambiada
export const renombrarCategoriaEnServicios = (servicios, anterior, nueva) =>
  servicios.map((s) => (s.categoria === anterior ? { ...s, categoria: nueva } : s));
