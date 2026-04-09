 import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componant/Navbar/Header'; 
import Footer from '../Componant/Footer/Footer'; 
import MyCart from '../page/MyCart/MyCart'; // Cart sidebar/modal path check korun

const MainLayout = () => {
  // ১. Cart-er state eikhane thakbe jate Header-e count dekhano jay
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ২. Header-e cart data pathano hoyeche */}
      <Header 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      {/* ৩. Main Content Area (Outlet) */}
      <main className="flex-grow">
        {/* context use korle Home page-o cartItems access korte parbe */}
        <Outlet context={{ cartItems, setCartItems, setIsCartOpen }} />
      </main>

      {/* ৪. Shopping Toli (Cart Modal/Sidebar) */}
      <MyCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <Footer />
    </div>
  );
};

export default MainLayout;