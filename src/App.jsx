
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './page-components/RootLayout'
import HomePage from './page-components/HomePage'
import ProductsPage from './page-components/ProductsPage'
import AuthPage from './page-components/AuthPage'
import ProductPage from './page-components/ProductPage'
import CartPage from './page-components/CartPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
