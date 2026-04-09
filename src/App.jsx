 import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './page/Home/Home';
import FinalCheckoutPage from '../src/page/Cart/FinalCheckOut'; // Import path thik kora hoyeche

function App() {
  // ১. Checkout page-e jawar state
  const [isCheckout, setIsCheckout] = useState(false);
  
  // ২. Cart items state jeta duita page-ei share hobe
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ৩. Conditional Rendering: isCheckout true hole Checkout page dekhabe */}
      {isCheckout ? (
        <FinalCheckoutPage 
          cartItems={cartItems} 
          onBack={() => setIsCheckout(false)} 
        />
      ) : (
        <Home 
          cartItems={cartItems}
          setCartItems={setCartItems}
          onProceedToCheckout={() => setIsCheckout(true)} 
        />
      )}

      {/* Notifications */}
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