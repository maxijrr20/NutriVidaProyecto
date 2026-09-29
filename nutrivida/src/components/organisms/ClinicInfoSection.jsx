import { ClinicStatItem } from '../molecules/ClinicStatItem';

export const ClinicInfoSection = () => {
  const stats = [
    { value: '2016', label: 'Año de fundación' },
    { value: '4', label: 'Nutricionistas' },
    { value: '15 o 30 Días', label: 'Frecuencia de seguimiento' },
    { value: 'Temuco', label: 'Región de La Araucanía' }
  ];

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
        {stats.map((s, i) => (
          <ClinicStatItem key={i} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
};