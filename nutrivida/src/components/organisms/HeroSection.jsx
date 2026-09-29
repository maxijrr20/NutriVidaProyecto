import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bienvenida">
      <div className="bienvenida-texto">
        <p className="subtitulo">Asesoría nutricional personalizada</p>
        <h2>Alcanza tus objetivos con una alimentación saludable</h2>
        <p>
          En NutriVida te acompañamos con atención profesional,
          planes personalizados y seguimiento nutricional adaptado
          a tus necesidades.
        </p>
        <div className="botones-inicio">
          <button className="boton" onClick={() => navigate('/contacto')}>
            Agendar una cita
          </button>
          <button className="boton boton-secundario" onClick={() => navigate('/servicios')}>
            Conocer servicios
          </button>
        </div>
      </div>
    </section>
  );
};