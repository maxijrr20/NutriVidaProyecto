import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentFormSection } from '../components/organisms/AppointmentFormSection';
import { useServicios } from '../context/ServiciosContext';
import { useCitas } from '../context/CitasContext';
import { obtenerSesion } from '../utils/sesion';

// Vista "Agendar cita": obtiene los datos (servicios y nutricionistas del backend, y la sesión)
// y decide qué pasa cuando el formulario se envía correctamente.
// El formulario (organismo) solo recibe esos datos y la función onEnviar por props.
export const ContactoPage = () => {
  const navigate = useNavigate();
  const { servicios, nutricionistas } = useServicios();
  const { agregarCita } = useCitas();
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Si el usuario inició sesión, sus datos se completan solos en el formulario
  const sesion = obtenerSesion();
  const datosIniciales = {
    nombreCompleto: sesion?.nombre || '',
    rut: sesion?.rut && !sesion.rut.includes('@') ? sesion.rut : '',
    email: sesion?.email || '',
    telefono: sesion?.telefono || '',
  };

  // POST /api/v1/citas: la solicitud queda en la base de datos con estado "Pendiente".
  // Si el backend la rechaza (400 datos inválidos, 409 horario tomado), se muestra el motivo.
  const guardarSolicitud = async (datosSolicitud) => {
    setError('');
    setEnviando(true);
    try {
      const cita = await agregarCita(datosSolicitud);
      navigate('/confirmacion-solicitud', { state: { solicitud: cita } });
    } catch (err) {
      if (err.estado === 401) {
        navigate('/login', { state: { desde: '/contacto' } });
        return;
      }
      const detalle = Object.values(err.errores || {}).join(' ');
      setError(detalle ? `${err.message} ${detalle}` : err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="pagina-contacto py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11 col-xl-10">
            {error && (
              <div className="alert alert-danger" role="alert">
                No se pudo registrar la solicitud: {error}
              </div>
            )}
            {enviando && (
              <div className="alert alert-info" role="status">
                Enviando solicitud...
              </div>
            )}
            <AppointmentFormSection
              servicios={servicios}
              nutricionistas={nutricionistas}
              datosIniciales={datosIniciales}
              onEnviar={guardarSolicitud}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactoPage;
