 import React, { useMemo, useCallback } from 'react';

const MyCard = ({ isOpen, onClose, cartItems, setCartItems }) => {
  if (!isOpen) return null;

  // ✅ Memoized total price (re-render optimize)
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // ✅ Optimized quantity update
  const updateQuantity = useCallback((id, amount) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  }, [setCartItems]);

  // ✅ Optimized remove
  const removeItem = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, [setCartItems]);

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col animate-in slide-in-from-bottom duration-300">

      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={onClose} className="text-2xl mr-4">←</button>
        <h1 className="text-lg font-bold">
          Shopping Cart ({cartItems.length})
        </h1>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"  // ✅ lazy loading added
                className="w-20 h-20 object-cover rounded border"
              />

              <div className="flex-1">
                <h2 className="text-sm font-medium line-clamp-1">
                  {item.title}
                </h2>

                <p className="text-orange-500 font-bold">
                  ৳{item.price}
                </p>

                <div className="flex items-center justify-between mt-2">
                  
                  {/* Quantity Control */}
                  <div className="flex border rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-100"
                    >
                      -
                    </button>

                    <span className="px-4 py-1">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            Cart is empty!
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">
              Total Amount
            </p>
            <p className="text-xl font-bold text-orange-600">
              ৳{totalPrice}
            </p>
          </div>

          <button className="btn bg-orange-600 text-white px-10">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCard;