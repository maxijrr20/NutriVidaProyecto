import { Price } from '../atoms/Price';

export const FeaturedServiceCard = ({ title, description, price }) => {
  return (
    <article className="tarjeta-destacada">
      <h3>{title}</h3>
      <p>{description}</p>
      <Price value={price} />
    </article>
  );
};