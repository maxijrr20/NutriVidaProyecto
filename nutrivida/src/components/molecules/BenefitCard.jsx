export const BenefitCard = ({ title, description }) => {
  return (
    <article className="tarjeta-beneficio">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};