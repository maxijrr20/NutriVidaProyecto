// render personalizado para las pruebas: envuelve el componente con los mismos
// Providers que usa la app (main.jsx), así los hooks useServicios/useCitas funcionan.
import { render } from '@testing-library/react';
import { ServiciosProvider } from './context/ServiciosContext';
import { CitasProvider } from './context/CitasContext';

const Providers = ({ children }) => (
  <ServiciosProvider>
    <CitasProvider>{children}</CitasProvider>
  </ServiciosProvider>
);

const renderConProviders = (ui, opciones) => render(ui, { wrapper: Providers, ...opciones });

export * from '@testing-library/react';
export { renderConProviders as render };
