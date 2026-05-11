import React from 'react';
import ListaProdutos from '../src/pages/ListaProdutos/ListaProdutos';
import FormProdutos from '../src/pages/FormProdutos/FormProdutos';
import ProductDetail from '../src/pages/ProductDetail/ProductDetail';
import AppLayout from '../src/components/AppLayout/AppLayout';
import LoginPages from './pages/LoginPages/LoginPages';
import Checkout from '../src/pages/Checkout/Checkout';
import Cadastro from './pages/Cadastro/Cadastro';
import {createHashRouter, RouterProvider} from 'react-router-dom'
const router = createHashRouter([
  {
    
    path: "/", 
    element: <LoginPages />,
  },
  {
   
    path: "/Cadastro",
    element: <Cadastro />,
  },
  {
    element: <AppLayout />, 
    children: [
      { path: "/Lista", element: <ListaProdutos /> },
      { path: "/Form", element: <FormProdutos /> },
      { path: "/Form/:id", element: <FormProdutos /> },
      { path: "/Detail/:id", element: <ProductDetail /> },
      { path: "/Checkout", element: <Checkout /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}