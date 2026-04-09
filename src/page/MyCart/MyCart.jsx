 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyCart = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedIds(cartItems.map((item) => item.id));
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [cartItems, isOpen]);

  if (!isOpen) return null;

  const totalPrice = cartItems
    .filter((item) => selectedIds.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateQuantity = (id, amount) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  };

  // CHECKOUT LOGIC: Selected items gulo state hishebe pathano
  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
    if (selectedItems.length === 0) return;

    onClose(); 
    navigate('/checkout', { 
      state: { checkoutItems: selectedItems } 
    }); 
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex items-center p-4 border-b">
        <button onClick={onClose} className="text-2xl mr-4">←</button>
        <h1 className="font-bold">My Cart ({cartItems.length})</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-lg flex gap-3 shadow-sm border border-gray-100">
            <input 
              type="checkbox" 
              checked={selectedIds.includes(item.id)} 
              onChange={() => setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])}
              className="accent-orange-600 w-5"
            />
            <img src={item.image} className="w-16 h-16 rounded object-cover" alt="" />
            <div className="flex-1">
              <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
              <p className="text-orange-600 font-bold">৳{item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center border rounded-full">-</button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center border text-orange-600 rounded-full">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex justify-between items-center bg-white shadow-lg">
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase">Total Price</p>
          <p className="text-2xl font-black text-orange-600">৳{totalPrice}</p>
        </div>
        <button 
          onClick={handleCheckout}
          disabled={selectedIds.length === 0}
          className={`px-10 py-3 rounded-xl font-bold transition-all ${selectedIds.length > 0 ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 active:scale-95' : 'bg-gray-200 text-gray-400'}`}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default MyCart;