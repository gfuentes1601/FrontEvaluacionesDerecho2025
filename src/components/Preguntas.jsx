import '../styles/form.css';

const Pregunta = ({ pregunta, respuesta, onChange }) => {
  return (
    <div className="form-field">
      <label>{pregunta.pregunta}</label>
      <textarea
        value={respuesta}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
      />
    </div>
  );
};

export default Pregunta;
