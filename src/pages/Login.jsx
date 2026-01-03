import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt-auth');

    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim().length === 0 || password.length === 0) {
      toast.error('Debe ingresar todos los campos.');
      return;
    }

    // Validar email con un pattern
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      toast.error('El email no tiene un formato válido.');
      return;
    }

    // Llamar endpoint de login y navegar al home
    try {
      await login({ email, password });
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Ha ocurrido un error al intentar iniciar sesión.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md transform transition-all hover:scale-105 border">
        <form className="space-y-6" noValidate onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center bg-clip-text text-gray-700">
            Iniciar sesión
          </h1>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full text-gray font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 border border-blue-400"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
