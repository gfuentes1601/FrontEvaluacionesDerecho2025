
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Temporizador from "../components/Temporizador";
import { getPreguntasPorUnidad } from "../services/preguntas.service";
import { getAllUnidades } from "../services/unidades.service";

const Simulacion = () => {

  const navigate = useNavigate();
  const [enSimulacion, setEnSimulacion] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(false);
  const [unidades, setUnidades] = useState([]);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(1);

  //  LEER TIEMPO CONFIGURADO POR EL DOCENTE (EN MINUTOS)
  const tiempoGuardado =
    Number(localStorage.getItem("tiempoSimulacion")) || 30;

  const tiempoInicialSegundos = tiempoGuardado * 60;

  //  CARGAR TODAS LAS UNIDADES
  const fetchUnidades = async () => {
    try {
      const data = await getAllUnidades();
      const unidadesOrdenadas = [...data.data].sort((a, b) => a.id - b.id)
        .filter(unidad => unidad.cantidadPreguntas > 0);
      setUnidades(unidadesOrdenadas);
    } catch (error) {
      console.error("Error al cargar unidades:", error);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);


  // INICIAR SIMULACIÓN
  const iniciarSimulacion = async () => {
    setLoading(true);
    try {
      const data = await getPreguntasPorUnidad(unidadSeleccionada);

      // ORDENAR PREGUNTAS POR ID ASCENDENTE
      const preguntasOrdenadas = [...(data.data || data)].sort((a, b) => a.id - b.id);

      setPreguntas(preguntasOrdenadas);
      setRespuestas({});
      setEnSimulacion(true);
    } catch (error) {
      console.error("Error al cargar preguntas:", error);
      alert("No se pudieron cargar las preguntas");
    } finally {
      setLoading(false);
    }
  };


  const finalizarSimulacion = () => {
    navigate("/resultado", { state: { respuestas, unidadId: unidadSeleccionada } });
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg text-gray-700">
        Cargando preguntas...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">

        {/* PANTALLA INICIAL */}
        {!enSimulacion && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              Simulación de Práctica
            </h1>

            <p className="text-gray-600 mb-6 text-lg">
              Esta simulación tiene un tiempo límite de{" "}
              <strong>{tiempoGuardado} minutos</strong>.
            </p>
             {/*  SELECT UNIDAD */}
            <div className="mb-4">
              <label className="text-gray-700 mr-2 font-medium">Selecciona Unidad:</label>
              <select
                value={unidadSeleccionada}
                onChange={(e) => setUnidadSeleccionada(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {unidades.map((u) => (
                  <option key={u.id} value={u.id}>{u.nombre}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <button
                onClick={() => navigate("/home")}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
              >
                Volver al inicio
              </button>

              <button
                onClick={iniciarSimulacion}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Comenzar
              </button>
            </div>
          </div>
        )}

        {/* SIMULACIÓN EN CURSO */}
        {enSimulacion && (
          <>

            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4">
                <h1 className="text-xl font-bold text-gray-800">Simulación en curso</h1>

                <Temporizador
                  tiempoInicial={tiempoInicialSegundos}
                  onFinalizar={finalizarSimulacion}
                />
              </div>
            </div>

            {/* PREGUNTAS */}
            <div className="space-y-6">
              {preguntas.map((p) => (
                <div
                  key={p.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <p className="text-gray-800 text-lg font-medium mb-3 break-words">
                    {p.pregunta}
                  </p>

                  <textarea
                    value={respuestas[p.id] || ""}
                    onChange={(e) =>
                      setRespuestas({ ...respuestas, [p.id]: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* BOTON FINALIZAR SIMULACION */}
            <div className="flex justify-start mt-8">
              <button
                onClick={finalizarSimulacion}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Finalizar simulación
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Simulacion;
