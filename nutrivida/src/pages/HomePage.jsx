import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/organisms/HeroSection';
import { BenefitsSection } from '../components/organisms/BenefitsSection';
import { FeaturedServicesSection } from '../components/organisms/FeaturedServicesSection';
import { ClinicInfoSection } from '../components/organisms/ClinicInfoSection';
import { useServicios } from '../context/ServiciosContext';
import { beneficios, datosClinica, CODIGOS_DESTACADOS } from '../data/inicio';

// Página de inicio: es la única que conoce el router y el contexto.
// Obtiene los datos y las acciones, y se los entrega por props a cada organismo.
export const HomePage = () => {
  const navigate = useNavigate();
  const { servicios } = useServicios();
  const destacados = servicios.filter((s) => CODIGOS_DESTACADOS.includes(s.codigo));

  return (
    <main className="inicio">
      <HeroSection
        onAgendar={() => navigate('/contacto')}
        onVerServicios={() => navigate('/servicios')}
      />
      <BenefitsSection beneficios={beneficios} />
      <FeaturedServicesSection
        servicios={destacados}
        onVerTodos={() => navigate('/servicios')}
      />
      <ClinicInfoSection datos={datosClinica} />
    </main>
  );
};

export default HomePage;
