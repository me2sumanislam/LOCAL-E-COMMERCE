 import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Router import korun
import './index.css';

// Layouts & Pages
import MainLayout from '../src/MainLayout/MainLayout.jsx';
import Home from '../src/page/Home/Home.jsx'
import FinalCheckoutPage from '../src/page/Cart/FinalCheckOut.jsx';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ১. Router Setup (Outlet-er bhetore ki ki thakbe ta ekhane set kora)
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Frame (Header, Footer, Outlet)
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/checkout",
        element: <FinalCheckoutPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ২. App-er poriborte RouterProvider use korun */}
    <RouterProvider router={router} />

    <ToastContainer 
      position="top-right"
      autoClose={1500} 
      hideProgressBar={true} 
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  </StrictMode>
);