import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Pregunta from '../components/Preguntas';
import '../styles/simulacion.css';
import Temporizador from "../components/Temporizador";
import { getAllPreguntas } from "../services/preguntas.service";

const Simulacion = () => {
  const navigate = useNavigate()
  const [enSimulacion, setEnSimulacion] = useState(false); 
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null); 

  // Función para iniciar la simulación
  const iniciarSimulacion = async () => {
    setLoading(true);
    try {
      const data = await getAllPreguntas();
      setPreguntas(data.data || data);
      setRespuestas({});
      setResultado(null);
      setEnSimulacion(true);
    } catch (error) {
      console.error("Error al cargar preguntas:", error);
      alert("No se pudieron cargar las preguntas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Función para finalizar la simulación
  const finalizarSimulacion = () => {
    navigate('/resultado', { state: { respuestas } })
  };

  if (loading) return <p>Cargando preguntas...</p>;

  return (
    <div className="simulacion-container">
      {!enSimulacion && !resultado && (
        <>
        <div className="home-container">
          <h1 className="simulacion-title">Simulación de Práctica</h1>
          <p>Esta simulación tiene tiempo limitado. Puedes repetirla las veces que desees.</p>
          <button className="profile-button" onClick={iniciarSimulacion}>
            Comenzar
          </button>
          </div>
        </>
      )}

      {enSimulacion && (
        <>
          <h1 className="simulacion-title">Simulación en curso</h1>
          <Temporizador
            tiempoInicial={1800}
            onFinalizar={finalizarSimulacion}
          />

          <div className="simulacion-preguntas">
            {preguntas.map((p) => (
              <Pregunta
                key={p.id}
                pregunta={p}
                respuesta={respuestas[p.id] || ''}
                onChange={(valor) =>
                  setRespuestas({ ...respuestas, [p.id]: valor })
                }
              />
            ))}
          </div>

          <div className="finalizar-container">
            <button className="finalizar-btn" onClick={finalizarSimulacion}>
              Finalizar simulación
            </button>
          </div>
        </>
      )}

    </div>
  );
};

export default Simulacion;
