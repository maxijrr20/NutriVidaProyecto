import { useNavigate } from 'react-router-dom';
import homePlanNutricional from '../../assets/home-plan-nutricional.jpg';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        backgroundColor: '#eef8f2',
        padding: '60px 0 50px',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '55px',
          flexWrap: 'wrap',
        }}
      >
        {/* TEXTO */}
        <div
          style={{
            flex: '1 1 480px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#d8eee1',
              color: '#128b49',
              padding: '8px 16px',
              borderRadius: '30px',
              fontWeight: '700',
              marginBottom: '20px',
              fontSize: '0.9rem',
            }}
          >
            🌿 Clínica Nutricional NutriVida
          </span>

          <h1
            style={{
              color: '#173d33',
              fontSize: 'clamp(2.2rem, 4vw, 3.35rem)',
              lineHeight: '1.12',
              fontWeight: '600',
              letterSpacing: '-0.03em',
              marginBottom: '22px',
              maxWidth: '620px',
            }}
          >
            Alimentación saludable
            <br />
            para sentirte mejor
          </h1>

          <p
            style={{
              color: '#5d6965',
              fontSize: '1.08rem',
              lineHeight: '1.75',
              maxWidth: '600px',
              marginBottom: '28px',
            }}
          >
            En NutriVida te acompañamos con atención profesional,
            planes personalizados y seguimiento nutricional adaptado
            a tus objetivos y necesidades.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              marginBottom: '28px',
            }}
          >
            <button
              onClick={() => navigate('/contacto')}
              className="btn btn-success px-4 py-3 fw-semibold"
              style={{
                borderRadius: '12px',
              }}
            >
              Agendar una cita
            </button>

            <button
              onClick={() => navigate('/servicios')}
              className="btn btn-outline-success px-4 py-3 fw-semibold"
              style={{
                borderRadius: '12px',
                backgroundColor: '#ffffff',
              }}
            >
              Conocer servicios
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '22px',
              flexWrap: 'wrap',
              color: '#26734d',
              fontSize: '0.95rem',
            }}
          >
            <span>✓ Atención personalizada</span>
            <span>✓ Profesionales especializados</span>
            <span>✓ Seguimiento continuo</span>
          </div>
        </div>

        {/* IMAGEN */}
        <div
          style={{
            flex: '1 1 480px',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: '60px 24px 60px 24px',
              overflow: 'hidden',
              boxShadow: '0 18px 45px rgba(0,0,0,0.10)',
              backgroundColor: '#ffffff',
            }}
          >
            <img
              src={homePlanNutricional}
              alt="Planificación de alimentación saludable"
              style={{
                width: '100%',
                height: '430px',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '24px',
                bottom: '24px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.10)',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  color: '#128b49',
                  fontSize: '1.05rem',
                }}
              >
                Desde 2016
              </strong>

              <span
                style={{
                  color: '#5d6965',
                  fontSize: '0.95rem',
                }}
              >
                acompañando tu bienestar
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};