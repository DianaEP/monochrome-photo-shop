
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './page-components/RootLayout'
import HomePage from './page-components/HomePage'
import ProductsPage from './page-components/ProductsPage'
import AuthPage from './page-components/AuthPage'
import ProductPage from './page-components/ProductPage'
import CartPage from './page-components/CartPage'

const router = createBrowserRouter([
  {
    path: '/',
    element:<RootLayout/>,
    children:[
      {
        index: true,
        element:<HomePage/>
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element:<ProductsPage/>
          },
          {
            path:':id',
            element: <ProductPage/>
          }
        ]
      },
      {
        path: 'cart',
        element:<CartPage/>
      },
      {
        path: 'login',
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
