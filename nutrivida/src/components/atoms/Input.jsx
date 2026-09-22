
import { Form } from 'react-bootstrap';

export const Input = ({ type = 'text', placeholder, value, onChange, required = false, name }) => {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      name={name}
    />
  );
};