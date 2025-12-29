import axios from './root.service.js';


// Obtener todas las preguntas
export const getAllPreguntas = async () => {
  try {
    const response = await axios.get("/preguntas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    throw error;
  }
};

// Obtener pregunta por id
export const getPreguntaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener pregunta:", error);
    throw error;
  }
};

// Crear nueva pregunta
export const createPregunta = async (pregunta) => {
  try {
    const response = await axios.post("/preguntas", pregunta);
    return response.data;
  } catch (error) {
    console.error("Error al crear pregunta:", error);
    throw error;
  }
};

// Actualizar pregunta
export const updatePregunta = async (id, pregunta) => {
  try {
    const response = await axios.put(`/preguntas/${id}`, pregunta);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar pregunta:", error);
    throw error;
  }
};

// Eliminar pregunta
export const deletePregunta = async (id) => {
  try {
    const response = await axios.delete(`/preguntas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar pregunta:", error);
    throw error;
  }
};
