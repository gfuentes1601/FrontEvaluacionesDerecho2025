import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Root from '@pages/Root';
import Login from '@pages/Login';
import Home from '@pages/Home';
import Simulacion from '@pages/Simulacion';
import Resultado from '@pages/Resultado';
import Error404 from '@pages/Error404';
import MantenerPreguntas from '@pages/MantenedorPreguntas';
import PrivateRoute from '@components/PrivateRoute';
import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      { path: '/', element: <Login /> },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: '/preguntas',
        element: (
          <PrivateRoute requiredRole="PROFESOR">
            <MantenerPreguntas />
          </PrivateRoute>
        ),
      },
      {
        path: '/simulacion',
        element: (
          <PrivateRoute>
            <Simulacion />
          </PrivateRoute>
        ),
      },
      {
        path: '/resultado',
        element: (
          <PrivateRoute>
            <Resultado />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      limit={5}
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: '14px',
        },
      }}
    />
    <RouterProvider router={router} />
  </>
);
