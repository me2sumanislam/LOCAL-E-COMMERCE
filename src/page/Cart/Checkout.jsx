 import React, { useState, useEffect, useMemo } from 'react';
import CartItem from './CartItem';

const Checkout = ({ isOpen, onClose, cartItems, setCartItems }) => {
  // Selection Logic
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    setSelectedIds(cartItems.map((item) => item.id));
  }, [cartItems]);

  if (!isOpen) return null;

  const isAllSelected = cartItems.length > 0 && selectedIds.length === cartItems.length;

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    isAllSelected ? setSelectedIds([]) : setSelectedIds(cartItems.map((i) => i.id));
  };

  const selectedItems = useMemo(() => cartItems.filter((i) => selectedIds.includes(i.id)), [cartItems, selectedIds]);
  const totalPrice = useMemo(() => selectedItems.reduce((acc, i) => acc + i.price * i.quantity, 0), [selectedItems]);

  const updateQuantity = (id, amount) => {
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + amount) } : i));
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedIds((prev) => prev.filter((sId) => sId !== id));
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-3xl leading-none text-gray-600">←</button>
          <h1 className="text-xl font-bold">My Cart ({cartItems.length})</h1>
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-2">
          <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} className="w-5 h-5 accent-orange-600" />
          <span className="font-medium">Select All</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.id} item={item} isSelected={selectedIds.includes(item.id)} onToggleSelect={toggleSelect} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
          ))
        ) : (
          <div className="text-center py-20 text-gray-400"><p className="text-6xl mb-3">🛒</p>Your cart is empty!</div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t bg-white">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Selected: {selectedItems.length} items</p>
              <p className="text-2xl font-bold text-orange-600">৳{totalPrice}</p>
            </div>
          </div>
          <button onClick={() => alert(`Total: ৳${totalPrice}`)} disabled={selectedItems.length === 0} className={`w-full py-4 rounded-xl text-lg font-medium transition-all ${selectedItems.length > 0 ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
            Checkout ({selectedItems.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;