// Molécula: un dato de la clínica (valor destacado + etiqueta).
export const ClinicStatItem = ({ valor, etiqueta }) => {
  return (
    <article>
      <strong>{valor}</strong>
      <span>{etiqueta}</span>
    </article>
  );
};