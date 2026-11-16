// Molécula: tarjeta de un beneficio (ícono + título + descripción).
// Solo muestra lo que recibe por props.
export const BenefitCard = ({ icono, titulo, descripcion }) => {
  return (
    <article
      style={{
        backgroundColor: '#f7fbf8',
        border: '1px solid #deeee5',
        borderRadius: '22px',
        padding: '32px',
        boxShadow: '0 8px 26px rgba(0, 0, 0, 0.05)',
        minHeight: '250px',
      }}
    >
      <div
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '18px',
          backgroundColor: '#d8eee1',
          color: '#118848',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          marginBottom: '22px',
          fontWeight: '700',
        }}
      >
        {icono}
      </div>

      <h3
        style={{
          color: '#173d33',
          fontSize: '1.35rem',
          fontWeight: '600',
          marginBottom: '12px',
        }}
      >
        {titulo}
      </h3>

      <p
        style={{
          color: '#66736e',
          lineHeight: '1.75',
          fontSize: '1rem',
          margin: 0,
        }}
      >
        {descripcion}
      </p>
    </article>
  );
};
