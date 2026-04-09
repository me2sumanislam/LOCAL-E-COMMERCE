 import React, { useState, useEffect } from 'react';

const MyCart = ({ isOpen, onClose, cartItems, setCartItems, onCheckout }) => {
  const [selectedIds, setSelectedIds] = useState([]);

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

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col slide-in-from-right">
      <div className="flex items-center p-4 border-b">
        <button onClick={onClose} className="text-2xl mr-4">←</button>
        <h1 className="font-bold">My Cart ({cartItems.length})</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-lg flex gap-3 shadow-sm">
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
                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 border rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 border rounded text-orange-600">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex justify-between items-center bg-white shadow-lg">
        <div>
          <p className="text-xs text-gray-400">Total Price</p>
          <p className="text-2xl font-bold text-orange-600">৳{totalPrice}</p>
        </div>
        <button 
          onClick={onCheckout}
          disabled={selectedIds.length === 0}
          className={`px-8 py-3 rounded-xl font-bold ${selectedIds.length > 0 ? 'bg-orange-600 text-white' : 'bg-gray-300'}`}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default MyCart;