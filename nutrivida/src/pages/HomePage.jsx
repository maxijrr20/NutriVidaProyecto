import { HeroSection } from '../components/organisms/HeroSection';
import { BenefitsSection } from '../components/organisms/BenefitsSection';
import { FeaturedServicesSection } from '../components/organisms/FeaturedServicesSection';
import { ClinicInfoSection } from '../components/organisms/ClinicInfoSection';

export const HomePage = () => {
  return (
    <main className="inicio">
      <HeroSection />
      <BenefitsSection />
      <FeaturedServicesSection />
      <ClinicInfoSection />
    </main>
  );
};

export default HomePage;