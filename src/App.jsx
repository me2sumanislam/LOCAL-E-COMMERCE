 import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './page/Home/Home';

// Note: Home.jsx e bhetorei MyCart/Checkout modal thakle ekhane dorkar nei। 
// Kintu jodi ekhane rakhte chan, tobe props pass kortei hobe।

function App() {
  return (
    <div className="min-h-screen">
      {/* Apnar Home.jsx-er bhetorei cartItems ebong isCartOpen state gulo ache, 
         tai Home component eka-i shob handle korte parbe। 
      */}
      <Home />

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;