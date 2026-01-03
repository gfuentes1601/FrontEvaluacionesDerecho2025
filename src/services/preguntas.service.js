import axios from './root.service.js';

// OBTENER TODAS LAS PREGUNTAS
export const getAllPreguntas = async () => {
  try {
    const response = await axios.get("/preguntas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    throw error;
  }
};

// OBTENER PREGUNTAS POR ID
export const getPreguntaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener pregunta:", error);
    throw error;
  }
};

// OBTENER PREGUNTAS POR UNIDAD
export const getPreguntasPorUnidad = async (unidadId) => {
  try {
    const response = await axios.get(`/preguntas/unidad/${unidadId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener preguntas de la unidad ${unidadId}:`, error);
    throw error;
  }
};

// CREAR NUEVA PREGUNTA
export const createPregunta = async (pregunta) => {
  try {
    const response = await axios.post("/preguntas", pregunta);
    return response.data;
  } catch (error) {
    console.error("Error al crear pregunta:", error);
    throw error;
  }
};

// ACTUALIZAR PREGUNTA
export const updatePregunta = async (id, pregunta) => {
  try {
    const response = await axios.put(`/preguntas/${id}`, pregunta);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar pregunta:", error);
    throw error;
  }
};

// ELIMINAR PREGUNTA
export const deletePregunta = async (id) => {
  try {
    const response = await axios.delete(`/preguntas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar pregunta:", error);
    throw error;
  }
};
