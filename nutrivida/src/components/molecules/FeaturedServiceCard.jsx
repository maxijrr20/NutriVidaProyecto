import { Price } from '../atoms/Price';

// Molécula: tarjeta de un servicio destacado.
export const FeaturedServiceCard = ({ titulo, descripcion, precio }) => {
  return (
    <article className="tarjeta-destacada">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <Price valor={precio} />
    </article>
  );
};