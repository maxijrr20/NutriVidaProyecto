import { createContext, useState, useEffect } from 'react';

export const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState(() => {
    const guardadas = localStorage.getItem('nutrivida_citas');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('nutrivida_citas', JSON.stringify(citas));
  }, [citas]);

  const agregarCita = (nuevaCita) => {
    const citaConId = {
      ...nuevaCita,
      id: Date.now(),
      estado: 'Pendiente', // Para la vista "Solicitud en curso"
      fechaCreacion: new Date().toLocaleDateString()
    };
    setCitas((prev) => [...prev, citaConId]);
    return citaConId;
  };

  const cancelarCita = (id) => {
    setCitas((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CitasContext.Provider value={{ citas, agregarCita, cancelarCita }}>
      {children}
    </CitasContext.Provider>
  );
};