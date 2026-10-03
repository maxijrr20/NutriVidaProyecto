

export const NutritionistRow = ({ nutricionista }) => {
  const { codigo, nombre, especialidad, dias, horario } = nutricionista;

  return (
    <tr className="fila-nutricionista">
      <td>
        <span className="badge-registro">{codigo}</span>
      </td>
      <td className="fw-semibold text-start">{nombre}</td>
      <td className="text-start">{especialidad}</td>
      <td>{dias}</td>
      <td>{horario}</td>
      <td>
        <a href="/contacto" className="boton boton-secundario boton-xs">
          Agendar
        </a>
      </td>
    </tr>
  );
};

export default NutritionistRow;