 import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

    <ToastContainer 
      position="top-right"
      autoClose={1500}        // ✅ faster UX
      hideProgressBar={true}  // ✅ cleaner UI
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"         // ✅ better look
    />
  </StrictMode>
);