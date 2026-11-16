import { Button as BsButton } from 'react-bootstrap';

// Átomo: botón base de la aplicación (envuelve el Button de React Bootstrap).
// Props propias: children, variant, type, onClick y className.
// El resto de las props (por ejemplo as={Link}, to o style) se reenvían tal cual
// con ...resto, para que el mismo átomo sirva como botón o como enlace.
export const Button = ({ children, variant = 'primary', type = 'button', onClick, className = '', ...resto }) => {
  return (
    <BsButton
      variant={variant}
      // Si se usa como enlace (as={Link}), no corresponde el atributo type
      type={resto.as ? undefined : type}
      onClick={onClick}
      className={className}
      {...resto}
    >
      {children}
    </BsButton>
  );
};
