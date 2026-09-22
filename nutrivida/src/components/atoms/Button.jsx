
import { Button as BsButton } from 'react-bootstrap';

export const Button = ({ children, variant = 'primary', type = 'button', onClick, className = '' }) => {
  return (
    <BsButton variant={variant} type={type} onClick={onClick} className={className}>
      {children}
    </BsButton>
  );
};