import axios from './root.service.js';

// OBTENER TODAS LAS UNIDADES
export const getAllUnidades = async () => {
  try {
    const response = await axios.get("/unidades");
    return response.data;
  } catch (error) {
    console.error("Error al obtener unidades:", error);
    throw error;
  }
};
