import { useNavigate } from 'react-router-dom';
import { FeaturedServiceCard } from '../molecules/FeaturedServiceCard';
import serviciosData from '../../data/servicios.json';

export const FeaturedServicesSection = () => {
  const navigate = useNavigate();
  const codigosDestacados = ['CN001', 'CN002', 'PL003'];
  const destacados = serviciosData.filter(s => codigosDestacados.includes(s.codigo));

  return (
    <section className="servicios-destacados">
      <h2>Servicios destacados</h2>
      <p className="introduccion-servicios">
        Conoce algunas de las alternativas que NutriVida ofrece
        para acompañarte en el cuidado de tu alimentación.
      </p>

      <div className="grilla-destacados">
        {destacados.map((item) => (
          <FeaturedServiceCard
            key={item.codigo}
            title={item.nombre}
            description={item.descripcion}
            price={item.precio}
          />
        ))}
      </div>

      <button className="boton enlace-servicios mt-3" onClick={() => navigate('/servicios')}>
        Ver todos los servicios
      </button>
    </section>
  );
};