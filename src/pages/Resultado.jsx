import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/resultado.css'
import { getAllPreguntas } from "../services/preguntas.service";

const Resultado = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [preguntas, setPreguntas] = useState([])
  const [loading, setLoading] = useState(true)

  // seguridad por si entran directo a la ruta
  if (!state || !state.respuestas) {
    return <p>No hay resultados para mostrar</p>
  }

  // traer preguntas desde el backend
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const data = await getAllPreguntas()
        console.log("Preguntas recibidas:", data)
        setPreguntas(data.data)
      } catch (error) {
        console.error("Error al obtener preguntas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPreguntas()
  }, [])

  if (loading) {
    return <p>Cargando resultados...</p>
  }


  return (
    <div className="main-content">
      <h1 className="resultado-title">Simulación de Práctica</h1>

      {preguntas.map(p => (
        <div key={p.id} className="profile-data">
          <h3>{p.pregunta}</h3>

          <p>
            <strong>Tu respuesta:</strong><br />
            {state.respuestas[p.id] || 'No respondió'}
          </p>

          <p>
            <strong>Respuesta correcta:</strong><br />
            {p.respuesta}
          </p>
        </div>
      ))}

      <button
        className="profile-button"
        onClick={() => navigate('/home')}
      >
        Volver al inicio
      </button>
    </div>
  )
}

export default Resultado
