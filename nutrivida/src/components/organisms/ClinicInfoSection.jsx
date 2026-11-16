import { ClinicStatItem } from '../molecules/ClinicStatItem';

// Organismo: datos de la clínica. Recibe la lista de datos por props.
export const ClinicInfoSection = ({ datos = [] }) => {
  return (
    <section className="datos-clinica">
      <div className="datos-clinica-texto">
        <p className="subtitulo">Conoce NutriVida</p>
        <h2>Atención nutricional profesional en Temuco</h2>
        <p>
          Desde 2016 acompañamos a pacientes con diferentes objetivos,
          entregando orientación personalizada y seguimiento periódico.
        </p>
      </div>

      <div className="resumen-clinica">
        {datos.map((dato) => (
          <ClinicStatItem key={dato.etiqueta} valor={dato.valor} etiqueta={dato.etiqueta} />
        ))}
      </div>
    </section>
  );
};