 import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componant/Navbar/Header';
import Footer from '../Componant/Footer/Footer';
import MyCart from '../page/MyCart/MyCart';

const MainLayout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // সার্চ স্টেট

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} // হেডারে ফাংশন পাঠানো
      />
      
      <main className="flex-grow">
        <Outlet context={{ cartItems, setCartItems, setIsCartOpen, searchQuery }} />
      </main>

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