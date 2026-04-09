 import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductModal from '../ProductModal/ProductModal';
import MyCart from '../MyCart/MyCart';

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/Data.json')
      .then((res) => res.json())
      .then((data) => setShoes(data))
      .catch((err) => console.error('Error loading data:', err));
  }, []);

  // Modal ba Cart open thakle pichoner scroll control kora
  useEffect(() => {
    if (isCartOpen || selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen, selectedProduct]);

  const addToCart = (product) => {
    if (!product || !product.id) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.title} কার্টে যোগ করা হয়েছে!`, {
      position: "top-center",
      autoClose: 1500,
    });

    setIsCartOpen(true);
  };

  return (
    // min-h-screen ar overflow logic change kora hoyeche jate scroll thik thake
    <div className="bg-gray-100 min-h-screen relative overflow-x-hidden">
      
      {/* Product Grid Wrapper */}
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shoes.map((shoe) => (
            <div
              key={shoe.id}
              onClick={() => setSelectedProduct(shoe)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
            >
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img
                  src={shoe.image}
                  alt={shoe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[42px]">
                  {shoe.title}
                </h2>
                <p className="text-orange-600 font-bold text-lg mt-1">৳{shoe.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals & Cart */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => {
          addToCart(selectedProduct);
          setSelectedProduct(null);
        }}
      />

      <MyCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <ToastContainer />
    </div>
  );
};

export default Home;