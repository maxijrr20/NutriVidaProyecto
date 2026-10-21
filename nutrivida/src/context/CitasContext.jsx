import { createContext, useContext, useState, useEffect } from 'react';

export const CLAVE_CITAS = 'nutrivida_citas';

const leerCitas = () => {
  try {
    const guardadas = localStorage.getItem(CLAVE_CITAS);
    return guardadas ? JSON.parse(guardadas) : [];
  } catch {
    return [];
  }
};

export const CitasContext = createContext(null);

// Solicitudes de cita (la "solicitud en curso" de NutriVida), guardadas en localStorage.
export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState(leerCitas);

  useEffect(() => {
    localStorage.setItem(CLAVE_CITAS, JSON.stringify(citas));
  }, [citas]);

  const agregarCita = (nuevaCita) => {
    const citaConId = {
      ...nuevaCita,
      id: Date.now(),
      estado: 'Pendiente',
      fechaCreacion: new Date().toLocaleDateString('es-CL')
    };
    setCitas((prev) => [...prev, citaConId]);
    return citaConId;
  };

  const actualizarCita = (id, datos) => {
    setCitas((prev) =>
      prev.map((c) => (String(c.id) === String(id) ? { ...c, ...datos } : c))
    );
  };

  const cancelarCita = (id) => actualizarCita(id, { estado: 'Cancelada' });

  return (
    <CitasContext.Provider value={{ citas, agregarCita, actualizarCita, cancelarCita }}>
      {children}
    </CitasContext.Provider>
  );
};

export const useCitas = () => {
  const contexto = useContext(CitasContext);
  if (!contexto) {
    throw new Error('useCitas debe usarse dentro de <CitasProvider>');
  }
  return contexto;
};
