import { FeaturedServiceCard } from '../molecules/FeaturedServiceCard';

// Organismo: servicios destacados del inicio.
// Recibe por props los servicios a mostrar y qué hacer al pedir "ver todos".
export const FeaturedServicesSection = ({ servicios = [], onVerTodos }) => {

  return (
    <section className="servicios-destacados">
      <h2>Servicios destacados</h2>
      <p className="introduccion-servicios">
        Conoce algunas de las alternativas que NutriVida ofrece
        para acompañarte en el cuidado de tu alimentación.
      </p>

      <div className="grilla-destacados">
        {servicios.map((servicio) => (
          <FeaturedServiceCard
            key={servicio.codigo}
            titulo={servicio.nombre}
            descripcion={servicio.descripcion}
            precio={servicio.precio}
          />
        ))}
      </div>

      <button className="boton enlace-servicios mt-3" onClick={onVerTodos}>
        Ver todos los servicios
      </button>
    </section>
  );
};