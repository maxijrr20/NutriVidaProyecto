import { BenefitCard } from '../molecules/BenefitCard';

export const BenefitsSection = () => {
  const benefits = [
    {
      title: 'Atención personalizada',
      description: 'Cada plan se diseña según tus objetivos, necesidades y hábitos alimentarios.'
    },
    {
      title: 'Equipo especializado',
      description: 'Contamos con profesionales especializados en nutrición deportiva, clínica, pediátrica y vegetariana.'
    },
    {
      title: 'Seguimiento continuo',
      description: 'Registramos tu progreso y ajustamos el plan nutricional durante cada control.'
    }
  ];

  return (
    <section className="sobre-nosotros">
      <h2>¿Por qué elegir NutriVida?</h2>
      <div className="grilla-beneficios">
        {benefits.map((b, i) => (
          <BenefitCard key={i} title={b.title} description={b.description} />
        ))}
      </div>
    </section>
  );
};