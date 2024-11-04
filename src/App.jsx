
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import './App.css'
import RootLayout from './page-components/RootLayout'
import HomePage from './page-components/HomePage'
import ProductsPage from './page-components/ProductsPage'
import AuthPage from './page-components/AuthPage'
import ProductPage from './page-components/ProductPage'
import CheckoutPage from './page-components/CheckoutPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartContextProvider } from './store/CartContext'
import { useState } from 'react'
import MainNavigation from './components/MainNavigation'
import Cart from './components/Cart'
import { ModalContextActionsProvider } from './store/ModalContextActions'
import ConfirmationPage from './page-components/ConfirmationPage'


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
        path: 'checkout',
        element:<CheckoutPage/>
      },
      {
        path: 'confirmation',
        element:<ConfirmationPage/>
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
    <ModalContextActionsProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </CartContextProvider>
    </ModalContextActionsProvider>
  )
}

export default App
