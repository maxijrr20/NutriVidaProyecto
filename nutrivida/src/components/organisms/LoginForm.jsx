import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';

export const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
      <h3 className="mb-4 text-center text-success">Iniciar Sesión</h3>
      <FormField
        label="Correo Electrónico"
        type="email"
        placeholder="ejemplo@nutrivida.cl"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormField
        label="Contraseña"
        type="password"
        placeholder="Ingrese su contraseña"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="success" className="w-100 mt-2">
        Ingresar
      </Button>
    </Form>
  );
};