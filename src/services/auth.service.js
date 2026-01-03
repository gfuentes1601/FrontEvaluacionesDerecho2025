import axios from './root.service.js';

export async function login(dataUser) {
    try {
        const { email, password } = dataUser;
        const response = await axios.post('/auth/login', {
            email,
            password
        });

        const { token, user } = response.data.data;
        localStorage.setItem('jwt-auth', token);
        localStorage.setItem('usuario', JSON.stringify(user));

        return response.data;
    } catch (error) {
        console.error("Error al obtener pregunta:", error);
        throw error;
    }
}

export async function logout() {
    localStorage.clear();
}
