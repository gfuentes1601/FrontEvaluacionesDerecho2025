import { useState, useEffect } from "react";
import { getAllPreguntas, createPregunta, deletePregunta, updatePregunta } from "../services/preguntas.service";
import "../styles/preguntas.css";

const MantenedorPreguntas = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("agregar"); // "agregar" o "editar"
    const [currentPregunta, setCurrentPregunta] = useState({ id: null, pregunta: "", respuesta: "" });

    const fetchPreguntas = async () => {
        try {
            const data = await getAllPreguntas();
            const preguntas = [...data.data.sort((a, b) => a.id - b.id)];
            setPreguntas(preguntas);
        } catch (error) {
            console.error("Error al obtener preguntas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPreguntas();
    }, []);

    const handleAgregar = async () => {
        if (!currentPregunta.pregunta || !currentPregunta.respuesta) {
            alert("Debes completar todos los campos");
            return;
        }
        try {
            await createPregunta({ pregunta: currentPregunta.pregunta, respuesta: currentPregunta.respuesta });
            setCurrentPregunta({ id: null, pregunta: "", respuesta: "" });
            setShowModal(false);
            fetchPreguntas();
        } catch (error) {
            console.error("Error al agregar pregunta:", error);
        }
    };

    const handleEditar = async () => {
        if (!currentPregunta.pregunta || !currentPregunta.respuesta) {
            alert("Debes completar todos los campos");
            return;
        }
        try {
            await updatePregunta(currentPregunta.id, { pregunta: currentPregunta.pregunta, respuesta: currentPregunta.respuesta });
            setCurrentPregunta({ id: null, pregunta: "", respuesta: "" });
            setShowModal(false);
            fetchPreguntas();
        } catch (error) {
            console.error("Error al actualizar pregunta:", error);
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Seguro quieres eliminar esta pregunta?")) return;
        try {
            await deletePregunta(id);
            fetchPreguntas();
        } catch (error) {
            console.error("Error al eliminar pregunta:", error);
        }
    };

    const abrirModalAgregar = () => {
        setModalMode("agregar");
        setCurrentPregunta({ id: null, pregunta: "", respuesta: "" });
        setShowModal(true);
    };

    const abrirModalEditar = (pregunta) => {
        setModalMode("editar");
        setCurrentPregunta({ ...pregunta });
        setShowModal(true);
    };

    if (loading) return <p>Cargando preguntas...</p>;

    return (
        <div className="preguntas-container">

            <button className="btn-agregar" onClick={abrirModalAgregar}>Agregar Pregunta</button>

            <table className="preguntas-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {preguntas.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.pregunta}</td>
                            <td>{p.respuesta}</td>
                            <td>
                                <button className="btn-editar" onClick={() => abrirModalEditar(p)}>Editar</button>
                                <button className="btn-eliminar" onClick={() => handleEliminar(p.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>{modalMode === "agregar" ? "Agregar Pregunta" : "Editar Pregunta"}</h2>
                        <label>
                            Pregunta:
                            <input
                                type="text"
                                value={currentPregunta.pregunta}
                                onChange={(e) => setCurrentPregunta({ ...currentPregunta, pregunta: e.target.value })}
                            />
                        </label>
                        <label>
                            Respuesta:
                            <textarea
                                className="modal-textarea"
                                value={currentPregunta.respuesta}
                                onChange={(e) => setCurrentPregunta({ ...currentPregunta, respuesta: e.target.value })}
                            />

                        </label>

                        <div className="modal-buttons">
                            <button className="btn-agregar" onClick={modalMode === "agregar" ? handleAgregar : handleEditar}>
                                {modalMode === "agregar" ? "Guardar" : "Actualizar"}
                            </button>
                            <button className="btn-cancelar" onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MantenedorPreguntas;
