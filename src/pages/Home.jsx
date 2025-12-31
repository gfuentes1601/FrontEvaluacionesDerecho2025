import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const InicioSimulacion = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Simulación de Práctica</h1>

      <p>
        Esta simulación tiene tiempo limitado.
        Puedes repetirla las veces que desees.
      </p>

      <button
        className="profile-button"
        onClick={() => navigate('/simulacion')}
      >
        Comenzar
      </button>
    </div>
  );
};

export default InicioSimulacion;