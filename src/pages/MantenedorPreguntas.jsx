import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllPreguntas, createPregunta, deletePregunta, updatePregunta } from "../services/preguntas.service";
import { getAllUnidades } from "../services/unidades.service";
import "../styles/preguntas.css";

const MantenedorPreguntas = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL PARA AGREGAR/EDITAR
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("agregar"); 
  const [currentPregunta, setCurrentPregunta] = useState({ id: null, pregunta: "", respuesta: "", unidad_id: null });

  // MODAL ELIMINAR
  const [preguntaAEliminar, setPreguntaAEliminar] = useState(null);

  // FILTROS
  const [filtroUnidad, setFiltroUnidad] = useState("");
  const [filtroPregunta, setFiltroPregunta] = useState("");
  const [filtroRespuesta, setFiltroRespuesta] = useState("");

  // MODAL MENSAJE
  const [modalMensaje, setModalMensaje] = useState("");
  const [showModalMensaje, setShowModalMensaje] = useState(false);

  // TIEMPO SIMULACION(EN MINUTOS)
  const [tiempoSimulacion, setTiempoSimulacion] = useState(
    Number(localStorage.getItem("tiempoSimulacion")) || 30
  );

  //  FETCH PREGUNTAS
  const fetchPreguntas = async () => {
    try {
      const data = await getAllPreguntas();
      const preguntasOrdenadas = [...data.data].sort((a, b) => a.id - b.id);
      setPreguntas(preguntasOrdenadas);
    } catch (error) {
      console.error("Error al obtener preguntas:", error);
    } finally {
      setLoading(false);
    }
  };

  // FETCH UNIDADES
  const fetchUnidades = async () => {
    try {
      const data = await getAllUnidades();
      const unidadesOrdenadas = [...data.data].sort((a, b) => a.id - b.id);
      setUnidades(unidadesOrdenadas);
    } catch (error) {
      console.error("Error al obtener unidades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreguntas();
    fetchUnidades();
  }, []);

  // AGREGAR PREGUNTA
  const handleAgregar = async () => {
    if (!currentPregunta.pregunta || !currentPregunta.respuesta || !currentPregunta.unidad_id) {
      toast.error("Debe completar todos los campos.");
      return;
    }

    try {
      await createPregunta({
        pregunta: currentPregunta.pregunta,
        respuesta: currentPregunta.respuesta,
        unidad_id: currentPregunta.unidad_id
      });

      setCurrentPregunta({ id: null, pregunta: "", respuesta: "", unidad_id: null });
      setShowModal(false);
      fetchPreguntas();
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Ha ocurrido un error al intentar crear la pregunta.');
    }
  };

  //  EDITAR PREGUNTA
  const handleEditar = async () => {
    if (!currentPregunta.pregunta || !currentPregunta.respuesta || !currentPregunta.unidad_id) {
      toast.error("Debe completar todos los campos.");
      return;
    }
    try {
      await updatePregunta(currentPregunta.id, {
        pregunta: currentPregunta.pregunta,
        respuesta: currentPregunta.respuesta,
        unidad_id: currentPregunta.unidad_id
      });

      setCurrentPregunta({ id: null, pregunta: "", respuesta: "", unidad_id: null });
      setShowModal(false);
      fetchPreguntas();
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Ha ocurrido un error al intentar actualizar la pregunta.');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await deletePregunta(id);
      fetchPreguntas();
    } catch (error) {
      console.error("Error al eliminar pregunta:", error);
    }
  };

  const abrirModalAgregar = () => {
    setModalMode("agregar");
    setCurrentPregunta({ id: null, pregunta: "", respuesta: "", unidad_id: null });
    setShowModal(true);
  };

  const abrirModalEditar = (pregunta) => {
    setModalMode("editar");
    setCurrentPregunta({ ...pregunta, unidad_id: pregunta.unidad?.id });
    setShowModal(true);
  };

  // FILTRADO POR UNIDAD, PREGUNTA Y RESPUESTA
  const preguntasFiltradas = preguntas.filter((item) => {
    const matchUnidad = filtroUnidad === "" || item.unidad?.id === Number(filtroUnidad);
    const matchPregunta = filtroPregunta.trim() === "" || item.pregunta.toLowerCase().includes(filtroPregunta.toLowerCase());
    const matchRespuesta = filtroRespuesta.trim() === "" || item.respuesta.toLowerCase().includes(filtroRespuesta.toLowerCase());

    return matchUnidad && matchPregunta && matchRespuesta;
  });

  //  GUARDAR TIEMPO SIMULACIÓN
  const guardarTiempo = () => {
    if (tiempoSimulacion <= 0) {
      setModalMensaje("El tiempo debe ser mayor a 0");
      setShowModalMensaje(true);
      return;
    }
    if (tiempoSimulacion > 180) {
      setModalMensaje("El tiempo máximo permitido es 180 minutos.");
      setShowModalMensaje(true);
      return;
    }

    localStorage.setItem("tiempoSimulacion", tiempoSimulacion);
    setModalMensaje("Tiempo de simulación guardado correctamente.");
    setShowModalMensaje(true);
  };

  if (loading) return <p>Cargando preguntas...</p>;

  return (
    <div className="preguntas-container p-6 max-w-5xl mx-auto">

      {/* BOTON VOLVER AL INICIO */}
      <div className="fixed top-5 right-5 z-50">
        <button
          className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          onClick={() => window.location.href = "/home"}
        >
          Volver al inicio
        </button>
      </div>

      {/* CONFIGURAR TIEMPO */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Configuración Tiempo de Simulación</h2>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            min="1"
            max="180"
            value={tiempoSimulacion}
            onChange={(e) => setTiempoSimulacion(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={guardarTiempo}
          >
            Guardar Tiempo
          </button>
        </div>
      </div>

      {/* BOTON AGREGAR */}
      <button
        className="mb-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        onClick={abrirModalAgregar}
      >
        Agregar Pregunta
      </button>

      {/*  FILTROS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={filtroUnidad}
          onChange={(e) => setFiltroUnidad(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Filtrar por unidad</option>
          {unidades.map((u) => (
            <option key={u.id} value={u.id}>{u.nombre}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filtrar por pregunta..."
          value={filtroPregunta}
          onChange={(e) => setFiltroPregunta(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Filtrar por respuesta..."
          value={filtroRespuesta}
          onChange={(e) => setFiltroRespuesta(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2 max-w-xs break-words">Unidad</th>
              <th className="border px-4 py-2 max-w-xs break-words">Pregunta</th>
              <th className="border px-4 py-2 max-w-xs break-words">Respuesta</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {preguntasFiltradas.map((p) => (
              <tr key={p.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{p.id}</td>
                <td className="border px-4 py-2 max-w-xs break-words">{p.unidad?.nombre || 'Sin Unidad Asignada'}</td>
                <td className="border px-4 py-2 max-w-xs break-words">{p.pregunta}</td>
                <td className="border px-4 py-2 max-w-xs break-words">{p.respuesta}</td>
                <td className="border px-4 py-2 flex gap-2 items-center">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => abrirModalEditar(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => setPreguntaAEliminar(p)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL AGREGAR/EDITAR */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{modalMode === "agregar" ? "Agregar Pregunta" : "Editar Pregunta"}</h2>

            {/* SELECT UNIDAD EN MODAL */}
            <label className="block mb-4">
              Unidad:
              <select
                value={currentPregunta.unidad_id || ""}
                onChange={(e) => setCurrentPregunta({ ...currentPregunta, unidad_id: Number(e.target.value) })}
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Selecciona una unidad</option>
                {unidades.map((u) => (
                  <option key={u.id} value={u.id}>{u.nombre}</option>
                ))}
              </select>
            </label>

            <label className="block mb-3">
              Pregunta:
              <input
                type="text"
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentPregunta.pregunta}
                onChange={(e) => setCurrentPregunta({ ...currentPregunta, pregunta: e.target.value })}
              />
            </label>

            <label className="block mb-4">
              Respuesta:
              <textarea
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentPregunta.respuesta}
                onChange={(e) => setCurrentPregunta({ ...currentPregunta, respuesta: e.target.value })}
              />
            </label>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={modalMode === "agregar" ? handleAgregar : handleEditar}
              >
                {modalMode === "agregar" ? "Guardar" : "Actualizar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MENSAJE TIEMPO */}
      {showModalMensaje && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <p className="mb-4">{modalMensaje}</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowModalMensaje(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR ELIMINAR */}
      {preguntaAEliminar && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirmar eliminación</h2>
            <p className="mb-6">¿Está seguro que desea eliminar esta pregunta?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setPreguntaAEliminar(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={async () => {
                  await handleEliminar(preguntaAEliminar.id);
                  setPreguntaAEliminar(null);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MantenedorPreguntas;
