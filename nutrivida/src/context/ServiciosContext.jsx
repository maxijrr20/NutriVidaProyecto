import { createContext, useState, useEffect } from 'react';
import serviciosIniciales from '../data/servicios.json';

export const ServiciosContext = createContext();

export const ServiciosProvider = ({ children }) => {
  const [servicios, setServicios] = useState(() => {
    const guardados = localStorage.getItem('nutrivida_servicios');
    return guardados ? JSON.parse(guardados) : serviciosIniciales;
  });

  useEffect(() => {
    localStorage.setItem('nutrivida_servicios', JSON.stringify(servicios));
  }, [servicios]);

  const agregarServicio = (nuevo) => {
    const servicioConId = { ...nuevo, id: Date.now() };
    setServicios((prev) => [...prev, servicioConId]);
  };

  const actualizarServicio = (id, actualizado) => {
    setServicios((prev) =>
      prev.map((s) => (s.id === Number(id) ? { ...s, ...actualizado } : s))
    );
  };

  const eliminarServicio = (id) => {
    setServicios((prev) => prev.filter((s) => s.id !== Number(id)));
  };

  return (
    <ServiciosContext.Provider
      value={{ servicios, agregarServicio, actualizarServicio, eliminarServicio }}
    >
      {children}
    </ServiciosContext.Provider>
  );
};