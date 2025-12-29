/* import { useNavigate } from 'react-router-dom';
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

export default InicioSimulacion; */


import { useState } from 'react';
import '../styles/styles.css';
import Pregunta from '../components/Preguntas';
import Temporizador from '../components/Temporizador';
import { getAllPreguntas } from '../services/preguntas.service';

const InicioSimulacion = () => {
  const [enSimulacion, setEnSimulacion] = useState(false); // controla si mostrar inicio o simulación
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(false);

  // Función para iniciar la simulación
  const iniciarSimulacion = async () => {
    setLoading(true);
    try {
      const data = await getAllPreguntas();
      setPreguntas(data);
      setEnSimulacion(true); // cambia a vista de simulación
    } catch (error) {
      console.error("Error al cargar preguntas:", error);
      alert("No se pudieron cargar las preguntas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Función al finalizar simulación
  const finalizarSimulacion = () => {
    const correctas = preguntas.filter(p => {
      const respuestaUsuario = respuestas[p.id] || '';
      return respuestaUsuario.toLowerCase() === p.respuestaCorrecta.toLowerCase();
    }).length;
    alert(`Simulación finalizada. Respuestas correctas: ${correctas} de ${preguntas.length}`);
    // reinicia estado
    setEnSimulacion(false);
    setRespuestas({});
  };

  // Loading
  if (loading) return <p>Cargando preguntas...</p>;

  return (
    <div className="home-container">
      {!enSimulacion ? (
        <>
          <h1>Simulación de Práctica</h1>
          <p>Esta simulación tiene tiempo limitado. Puedes repetirla las veces que desees.</p>
          <button className="profile-button" onClick={iniciarSimulacion}>
            Comenzar
          </button>
        </>
      ) : (
        <>
          <h1>Simulación en curso</h1>
          <Temporizador tiempoInicial={800} onFinalizar={finalizarSimulacion} />
          <div className="simulacion-preguntas">
            {preguntas.map(p => (
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
          <button className="profile-button" onClick={finalizarSimulacion}>
            Finalizar simulación
          </button>
        </>
      )}
    </div>
  );
};

export default InicioSimulacion;
