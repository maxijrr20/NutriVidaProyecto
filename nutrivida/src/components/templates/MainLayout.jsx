import { NavbarNutriVida } from '../organisms/NavbarNutriVida';
import { FooterNutriVida } from '../organisms/FooterNutriVida';

export const MainLayout = ({ children }) => {
  return (
    <>
      <NavbarNutriVida />
      {children}
      <FooterNutriVida />
    </>
  );
};