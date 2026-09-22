
import { Form } from 'react-bootstrap';
import { Input } from '../atoms/Input';

export const FormField = ({ label, type, placeholder, value, onChange, required, name }) => {
  return (
    <Form.Group className="mb-3" controlId={`form-${name}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
      />
    </Form.Group>
  );
};