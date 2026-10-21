import { AppointmentFormSection } from '../components/organisms/AppointmentFormSection';

// Vista "Agendar cita": solo arma el layout; la lógica vive en el organismo.
export const ContactoPage = () => {
  return (
    <main className="pagina-contacto py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11 col-xl-10">
            <AppointmentFormSection />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactoPage;
