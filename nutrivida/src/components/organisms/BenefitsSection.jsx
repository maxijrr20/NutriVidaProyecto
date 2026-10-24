const beneficios = [
  {
    icono: '♡',
    titulo: 'Atención personalizada',
    descripcion:
      'Cada plan se adapta a tus objetivos, necesidades, hábitos y estilo de vida.',
  },
  {
    icono: '✦',
    titulo: 'Equipo especializado',
    descripcion:
      'Contamos con profesionales preparados para acompañarte en distintas áreas de la nutrición.',
  },
  {
    icono: '↻',
    titulo: 'Seguimiento continuo',
    descripcion:
      'Evaluamos tu progreso y ajustamos el plan nutricional durante cada etapa del proceso.',
  },
];

export const BenefitsSection = () => {
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
            <article
              key={beneficio.titulo}
              style={{
                backgroundColor: '#f7fbf8',
                border: '1px solid #deeee5',
                borderRadius: '22px',
                padding: '32px',
                boxShadow: '0 8px 26px rgba(0, 0, 0, 0.05)',
                minHeight: '250px',
              }}
            >
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '18px',
                  backgroundColor: '#d8eee1',
                  color: '#118848',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '22px',
                  fontWeight: '700',
                }}
              >
                {beneficio.icono}
              </div>

              <h3
                style={{
                  color: '#173d33',
                  fontSize: '1.35rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                }}
              >
                {beneficio.titulo}
              </h3>

              <p
                style={{
                  color: '#66736e',
                  lineHeight: '1.75',
                  fontSize: '1rem',
                  margin: 0,
                }}
              >
                {beneficio.descripcion}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};