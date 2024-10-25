
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RouteLayout from './page-components/RouteLayout'
import HomePage from './page-components/HomePage'
import ProductsPage from './page-components/ProductsPage'
import AuthPage from './page-components/AuthPage'

const router = createBrowserRouter([
  {
    path: '/',
    element:<RouteLayout/>,
    children:[
      {
        path: '/',
        element:<HomePage/>
      },
      {
        path: '/products',
        element:<ProductsPage/>
      },
      {
        path: '/login',
        element:<AuthPage/>
      }
    ]
  }
])

function App() {
  

  return (
    <RouterProvider router={router} />
  )
}

export default App
