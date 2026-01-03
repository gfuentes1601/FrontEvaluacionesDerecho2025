import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/resultado.css'
import { getPreguntasPorUnidad } from "../services/preguntas.service"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const Resultado = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [preguntas, setPreguntas] = useState([])
  const [loading, setLoading] = useState(true)

  if (!state || !state.respuestas) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center mt-6">
        No hay resultados para mostrar.

        <button
            onClick={() => navigate("/home")}
            className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
          >
            Volver al inicio
          </button>
      </div>
    );
  }

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const data = await getPreguntasPorUnidad(state.unidadId)
        const preguntasOrdenadas = [...(data.data || data)].sort((a, b) => a.id - b.id);
        setPreguntas(preguntasOrdenadas)
      } catch (error) {
        console.error("Error al obtener preguntas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPreguntas()
  }, [])

  // EXPORTAR PDF SOLO CONTENIDO DE PREGUNTAS
  const exportarPDF = async () => {
    const elemento = document.getElementById("contenido-pdf")
    if (!elemento) return

    const canvas = await html2canvas(elemento, { scale: 2, useCORS: true })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    let heightLeft = pdfHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
    heightLeft -= pdf.internal.pageSize.getHeight()

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
      heightLeft -= pdf.internal.pageSize.getHeight()
    }

    pdf.save("resultado-simulacion.pdf")
  }

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-700">Cargando resultados...</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* CONTENEDOR DEL PDF */}
      <div
        id="contenido-pdf"
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 box-border"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Simulación de Práctica
        </h1>

        {preguntas.map((p) => (
          <div
            key={p.id}
            className="mb-6 p-4 border border-gray-200 rounded-lg box-border"
          >
            <h3 className="font-semibold text-lg mb-2 text-gray-800 w-full break-words whitespace-normal">
              {p.pregunta}
            </h3>

            <p className="mb-2 w-full break-words whitespace-normal">
              <span className="font-medium block">Tu respuesta:</span>
              <span className="text-gray-700 block break-words whitespace-normal">
                {state.respuestas[p.id] || "No respondió"}
              </span>
            </p>


            <p className="w-full break-words whitespace-normal">
              <span className="font-medium block">Respuesta correcta:</span>
              <span className="text-green-600 block break-words whitespace-normal">
                {p.respuesta}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
        <button
          onClick={() => navigate('/home')}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
        >
          Volver al inicio
        </button>

        <button
          onClick={exportarPDF}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
        >
          Exportar a PDF
        </button>
      </div>

    </div>
  )
}

export default Resultado

