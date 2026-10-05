import { createContext, useContext, useState } from 'react';

import {
  listarServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} from '../services/serviciosService';

const ServiciosContext = createContext();

export function ServiciosProvider({ children }) {

  const [servicios, setServicios] = useState(() => listarServicios());

  const agregarServicio = (nuevoServicio) => {
    crearServicio(nuevoServicio);
    setServicios([...listarServicios()]);
  };

  const editarServicio = (id, datosActualizados) => {
    actualizarServicio(id, datosActualizados);
    setServicios([...listarServicios()]);
  };

  const borrarServicio = (id) => {
    eliminarServicio(id);
    setServicios([...listarServicios()]);
  };

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        agregarServicio,
        editarServicio,
        eliminarServicio: borrarServicio
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
}

export function useServicios() {
  return useContext(ServiciosContext);
}