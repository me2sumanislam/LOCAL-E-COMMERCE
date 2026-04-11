 import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import MainLayout from './MainLayout/MainLayout.jsx';
import Home from './page/Home/Home.jsx';
import FinalCheckoutPage from './page/Cart/FinalCheckOut.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/checkout",
        element: <FinalCheckoutPage />,
      },
      {
        path: "/success",
        element: (
          <div className="h-screen flex items-center justify-center text-green-600 text-3xl font-bold">
            Payment Successful 🎉
          </div>
        ),
      },
      {
        path: "/fail",
        element: (
          <div className="h-screen flex items-center justify-center text-red-600 text-3xl font-bold">
            Payment Failed ❌
          </div>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar
      theme="colored"
    />
  </StrictMode>
);