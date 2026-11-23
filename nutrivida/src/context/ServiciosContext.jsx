import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import serviciosLocales from '../data/servicios.json';
import nutricionistasLocales from '../data/nutricionistas.json';
import * as api from '../services/catalogoService';

export const ServiciosContext = createContext(null);

// Categorías calculadas a partir de una lista de servicios (solo para los datos locales de respaldo)
const categoriasDe = (servicios) =>
  [...new Set(servicios.map((s) => s.categoria))].map((nombre) => ({
    id: null,
    nombre,
    totalServicios: servicios.filter((s) => s.categoria === nombre).length,
  }));

// Única fuente de datos del catálogo: la usan las páginas públicas, el formulario de citas y el panel admin.
// Los datos vienen del backend (GET /servicios, /categorias y /nutricionistas, que son públicos).
// Mientras cargan, o si el backend no responde, se muestran los datos de respaldo de src/data
// para que el sitio siga navegable; en ese caso "origen" es 'local' y "error" explica qué pasó.
export const ServiciosProvider = ({ children }) => {
  const [servicios, setServicios] = useState(serviciosLocales);
  const [categorias, setCategorias] = useState(() => categoriasDe(serviciosLocales));
  const [nutricionistas, setNutricionistas] = useState(nutricionistasLocales);
  const [origen, setOrigen] = useState('local');
  const [error, setError] = useState('');

  const recargar = useCallback(async () => {
    try {
      const [listaServicios, listaCategorias, listaNutricionistas] = await Promise.all([
        api.listarServicios(),
        api.listarCategorias(),
        api.listarNutricionistas(),
      ]);
      setServicios(listaServicios);
      setCategorias(listaCategorias);
      setNutricionistas(listaNutricionistas);
      setOrigen('api');
      setError('');
    } catch (err) {
      setOrigen('local');
      setError(`No se pudo cargar el catálogo desde el servidor: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  // Cada cambio llama al backend y luego vuelve a pedir el catálogo,
  // así todas las vistas muestran lo que quedó guardado en la base de datos.
  // Si el backend responde con error (400, 403, 409...), la promesa falla y el panel muestra el mensaje.
  const conRecarga = (operacion) => async (...args) => {
    const resultado = await operacion(...args);
    await recargar();
    return resultado;
  };

  const agregarServicio = conRecarga((datos) => api.crearServicio(datos));
  const editarServicio = conRecarga((id, datos) => api.actualizarServicio(id, datos));
  const eliminarServicio = conRecarga((id) => api.eliminarServicio(id));
  const crearCategoria = conRecarga((nombre) => api.crearCategoria(nombre));
  const renombrarCategoria = conRecarga((anterior, nueva) => {
    const categoria = categorias.find((c) => c.nombre === anterior);
    if (!categoria?.id) throw new Error('No se encontró la categoría en el servidor.');
    return api.renombrarCategoria(categoria.id, nueva);
  });

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        categorias,
        nutricionistas,
        origen,
        error,
        recargar,
        agregarServicio,
        editarServicio,
        eliminarServicio,
        crearCategoria,
        renombrarCategoria,
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
};

export const useServicios = () => {
  const contexto = useContext(ServiciosContext);
  if (!contexto) {
    throw new Error('useServicios debe usarse dentro de <ServiciosProvider>');
  }
  return contexto;
};
