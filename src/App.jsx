
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import './App.css'
import RootLayout from './page-components/root-layout/RootLayout'
import HomePage from './page-components/home-page/HomePage'
import ProductsPage from './page-components/products-page/ProductsPage'
import AuthPage from './page-components/auth-page/AuthPage'
import ProductPage from './page-components/product-page/ProductPage'
import CheckoutPage from './page-components/checkout-page/CheckoutPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartContextProvider } from './store/CartContext'
import { ModalContextActionsProvider } from './store/ModalContextActions'
import ConfirmationPage from './page-components/confirmation-page/ConfirmationPage'
import { AuthContextProvider } from './store/AuthContext'
import ProtectedRoute from './util/ProtectedRoute'


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
            element:<ProtectedRoute><ProductsPage/></ProtectedRoute>
          },
          {
            path:':id',
            element: <ProtectedRoute><ProductPage/></ProtectedRoute> 
          }
        ]
      },
      {
        path: 'checkout',
        element: <ProtectedRoute><CheckoutPage/></ProtectedRoute>
      },
      {
        path: 'confirmation',
        element: <ProtectedRoute><ConfirmationPage/></ProtectedRoute>
      },
      {
        path: 'auth',
        element:<AuthPage/>
      },
     
    ]
  }
])

const queryClient = new QueryClient();



function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ModalContextActionsProvider>
          <CartContextProvider>
            <RouterProvider router={router}/>
          </CartContextProvider>
        </ModalContextActionsProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
