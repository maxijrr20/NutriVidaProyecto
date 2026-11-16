import { BenefitCard } from '../molecules/BenefitCard';

// Organismo: sección de beneficios. Recibe la lista por props
// y dibuja una BenefitCard por cada beneficio.
export const BenefitsSection = ({ beneficios = [] }) => {
  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '75px 0',
      }}
    >
      <div className="container">
        {/* ENCABEZADO */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto 45px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#d8eee1',
              color: '#128b49',
              padding: '7px 15px',
              borderRadius: '30px',
              fontWeight: '700',
              fontSize: '0.9rem',
              marginBottom: '14px',
            }}
          >
            🌱 Acompañamiento NutriVida
          </span>

          <h2
            style={{
              color: '#173d33',
              fontSize: 'clamp(2rem, 4vw, 2.7rem)',
              fontWeight: '600',
              marginBottom: '14px',
            }}
          >
            ¿Por qué elegir NutriVida?
          </h2>

          <p
            style={{
              color: '#68756f',
              fontSize: '1.05rem',
              lineHeight: '1.7',
              margin: 0,
            }}
          >
            Te acompañamos con una atención cercana, profesional y
            adaptada a tus necesidades.
          </p>
        </div>

        {/* TARJETAS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {beneficios.map((beneficio) => (
            <BenefitCard
              key={beneficio.titulo}
              icono={beneficio.icono}
              titulo={beneficio.titulo}
              descripcion={beneficio.descripcion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};