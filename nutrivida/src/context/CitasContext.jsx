import { createContext, useCallback, useContext, useState } from 'react';
import * as api from '../services/citasService';
import { obtenerSesion } from '../utils/sesion';

export const CitasContext = createContext(null);

// Solicitudes de cita guardadas en el backend (tabla "cita" de PostgreSQL).
// Las páginas que las muestran llaman a recargar() al abrirse, porque dependen de quién inició sesión:
// el backend entrega al PACIENTE solo sus solicitudes y al ADMIN todas.
export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const recargar = useCallback(async () => {
    if (!obtenerSesion()) {
      setCitas([]);
      return;
    }
    setCargando(true);
    try {
      setCitas(await api.listarCitas());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  // Reemplaza en la lista la cita que devolvió el backend
  const reemplazar = (actualizada) => {
    setCitas((prev) => prev.map((c) => (c.id === actualizada.id ? actualizada : c)));
    return actualizada;
  };

  // Estas funciones devuelven promesas: si el backend responde con error
  // (400 datos inválidos, 403 cita ajena, 409 horario tomado), la página muestra el mensaje.
  const agregarCita = async (datos) => {
    const nueva = await api.crearCita(datos);
    setCitas((prev) => [...prev, nueva]);
    return nueva;
  };

  const cancelarCita = async (id) => reemplazar(await api.cancelarCita(id));
  const reprogramarCita = async (id, fecha, hora) => reemplazar(await api.reprogramarCita(id, fecha, hora));
  const cambiarEstadoCita = async (id, estado) => reemplazar(await api.cambiarEstadoCita(id, estado));

  return (
    <CitasContext.Provider
      value={{ citas, cargando, error, recargar, agregarCita, cancelarCita, reprogramarCita, cambiarEstadoCita }}
    >
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
