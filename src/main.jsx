import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from '@pages/Root'
import Login from '@pages/Login'
import Home from '@pages/Home'
import Simulacion from '@pages/Simulacion'
import Resultado from '@pages/Resultado'
import Error404 from '@pages/Error404'

import '@styles/styles.css' //
import MantenerPreguntas from './pages/MantenedorPreguntas'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/preguntas',
        element: <MantenerPreguntas />
      },
      {
        path: '/simulacion',
        element: <Simulacion />
      },
      {
        path: '/resultado',
        element: <Resultado />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
