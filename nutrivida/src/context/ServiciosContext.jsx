import { createContext, useContext, useState, useEffect } from 'react';
import {
  listarServicios,
  guardarServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} from '../services/serviciosService';
import { renombrarCategoriaEnServicios } from '../services/categoriasService';

export const ServiciosContext = createContext(null);

// Única fuente de datos del catálogo: lo usan las páginas públicas y el panel admin.
// Cuando el admin cambia algo, todas las vistas se vuelven a renderizar.
export const ServiciosProvider = ({ children }) => {
  const [servicios, setServicios] = useState(() => listarServicios());

  // Persistencia: cada vez que cambia la lista, se guarda en localStorage
  useEffect(() => {
    guardarServicios(servicios);
  }, [servicios]);

  const agregarServicio = (nuevo) => setServicios((prev) => crearServicio(prev, nuevo));
  const editarServicio = (id, datos) => setServicios((prev) => actualizarServicio(prev, id, datos));
  const borrarServicio = (id) => setServicios((prev) => eliminarServicio(prev, id));
  const renombrarCategoria = (anterior, nueva) =>
    setServicios((prev) => renombrarCategoriaEnServicios(prev, anterior, nueva));

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        agregarServicio,
        editarServicio,
        eliminarServicio: borrarServicio,
        renombrarCategoria
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
