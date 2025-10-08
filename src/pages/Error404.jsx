import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/home" className="btn-home">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Error404;
