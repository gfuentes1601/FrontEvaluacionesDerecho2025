import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); 
  const [user, setUser] = useState(null);

  // OBTENER USUARIO DEL LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isProfesor = user?.rol === "PROFESOR" || user?.rol === "PROF";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* MENÚ HORIZONTAL EN LA ESQUINA IZQUIERDA */}
      <div className="fixed top-4 left-4 z-50">
        <div
          className="flex space-x-2 bg-white shadow-lg rounded-xl overflow-hidden"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          {/* SOLO PROFESOR PUEDE CREAR PREGUNTAS */}
          {isProfesor && (
            <button
              className={`px-4 py-2 rounded text-white transition
                          ${menuOpen ? "bg-green-500 hover:bg-green-700" : "bg-green-500 hover:bg-green-700"}`}
              onClick={() => navigate("/preguntas")}
            >
              {menuOpen ? "Crear Preguntas" : "CP"}
            </button>
          )}

          {/* TODOS PUEDEN INICIAR SIMULACION */}
          <button
            className={`px-4 py-2 rounded text-white transition
                        ${menuOpen ? "bg-yellow-500 hover:bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-700"}`}
            onClick={() => navigate("/simulacion")}
          >
            {menuOpen ? "Iniciar Simulación" : "IS"}
          </button>

          {/* TODOS PUEDEN CERRAR SESION */}
          <button
            className={`px-4 py-2 rounded text-white transition
                        ${menuOpen ? "bg-red-600 hover:bg-red-700" : "bg-red-600 hover:bg-red-700"}`}
            onClick={handleLogout}
          >
            {menuOpen ? "Cerrar Sesión" : "CS"}
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-5xl mx-auto mt-24 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Bienvenido {user?.nombre} {user?.apellido} al Panel de Simulación
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isProfesor && (
            <div
              className="p-6 bg-green-100 rounded-lg shadow hover:shadow-lg cursor-pointer transition duration-300"
              onClick={() => navigate("/preguntas")}
            >
              <h2 className="text-xl font-semibold mb-2">Crear Preguntas</h2>
              <p className="text-gray-700">
                Agrega, edita y elimina tus preguntas de práctica.
              </p>
            </div>
          )}

          <div
            className="p-6 bg-yellow-100 rounded-lg shadow hover:shadow-lg cursor-pointer transition duration-300"
            onClick={() => navigate("/simulacion")}
          >
            <h2 className="text-xl font-semibold mb-2">Iniciar Simulación</h2>
            <p className="text-gray-700">
              Comienza la simulación y responde las preguntas configuradas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
