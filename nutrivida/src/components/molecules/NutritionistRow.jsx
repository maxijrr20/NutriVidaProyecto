

// Molécula: fila de la tabla de nutricionistas.
// Recibe cada dato por props y la acción del botón "Agendar" (onAgendar).
export const NutritionistRow = ({ codigo, nombre, especialidad, dias, horario, onAgendar }) => {
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
        <button type="button" className="boton boton-secundario boton-xs" onClick={onAgendar}>
          Agendar
        </button>
      </td>
    </tr>
  );
};

export default NutritionistRow;