 import React, { useState, useEffect } from 'react';

const MyCart = ({ isOpen, onClose, cartItems, setCartItems }) => {
  // ১. Selection State
  const [selectedIds, setSelectedIds] = useState([]);

  // Cart-e notun kichu ashle auto select kora
  useEffect(() => {
    setSelectedIds(cartItems.map((item) => item.id));
  }, [cartItems]);

  if (!isOpen) return null;

  // ২. Sudhu selected items-er dam calculate kora
  const totalPrice = cartItems
    .filter((item) => selectedIds.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={onClose} className="mr-4 text-2xl">←</button>
        <h1 className="text-lg font-bold">Cart ({cartItems.length})</h1>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              {/* Checkbox for Select */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="w-5 h-5 accent-orange-600 rounded"
                />
              </div>

              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded-md"
                alt={item.title}
              />
              
              <div className="flex-1">
                <h2 className="font-medium text-sm line-clamp-1">{item.title}</h2>
                <p className="text-orange-600 font-bold text-base">৳{item.price}</p>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex border rounded-lg overflow-hidden border-gray-200">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold text-xl"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 flex items-center bg-white font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-50 hover:bg-gray-100 font-bold text-xl text-orange-600"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
             <div className="text-4xl mb-2">🛒</div>
             <p>Cart is empty!</p>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="p-4 border-t bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 font-medium">Total ({selectedIds.length} items)</p>
          <p className="text-2xl font-black text-orange-600">৳{totalPrice}</p>
        </div>
        
        <button 
          className={`px-8 py-3 rounded-xl font-bold transition-all shadow-md ${
            selectedIds.length > 0 
            ? 'bg-orange-600 text-white active:scale-95' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={selectedIds.length === 0}
          onClick={() => alert(`Check out korchen ৳${totalPrice} takar product`)}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default MyCart;