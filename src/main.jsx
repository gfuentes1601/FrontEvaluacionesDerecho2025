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

import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/home', element: <Home /> },
      { path: '/preguntas', element: <MantenerPreguntas /> },
      { path: '/simulacion', element: <Simulacion /> },
      { path: '/resultado', element: <Resultado /> }
    ]
  }
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
