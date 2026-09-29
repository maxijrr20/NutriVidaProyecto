export const ClinicStatItem = ({ value, label }) => {
  return (
    <article>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
};