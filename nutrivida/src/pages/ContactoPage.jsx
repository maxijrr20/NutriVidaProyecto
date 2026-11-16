import { useNavigate } from 'react-router-dom';
import { AppointmentFormSection } from '../components/organisms/AppointmentFormSection';
import { useServicios } from '../context/ServiciosContext';
import { useCitas } from '../context/CitasContext';
import { obtenerSesion } from '../utils/sesion';
import nutricionistas from '../data/nutricionistas.json';

// Vista "Agendar cita": obtiene los datos (servicios, nutricionistas y sesión)
// y decide qué pasa cuando el formulario se envía correctamente.
// El formulario (organismo) solo recibe esos datos y la función onEnviar por props.
export const ContactoPage = () => {
  const navigate = useNavigate();
  const { servicios } = useServicios();
  const { agregarCita } = useCitas();

  // Si el usuario inició sesión, sus datos se completan solos en el formulario
  const sesion = obtenerSesion();
  const datosIniciales = {
    nombreCompleto: sesion?.nombre || '',
    rut: sesion?.rut && !sesion.rut.includes('@') ? sesion.rut : '',
    email: sesion?.email || '',
  };

  // Se guarda la solicitud (CitasContext -> localStorage) y se pasa a la confirmación
  const guardarSolicitud = (datosSolicitud) => {
    const cita = agregarCita(datosSolicitud);
    navigate('/confirmacion-solicitud', { state: { solicitud: cita } });
  };

  return (
    <main className="pagina-contacto py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11 col-xl-10">
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
