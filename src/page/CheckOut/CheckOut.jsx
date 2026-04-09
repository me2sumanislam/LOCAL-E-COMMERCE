 import React, { useState } from 'react';

const CheckoutPage = ({ cartItems }) => {
  // 1. Surute sob product-ke select rakhar jonno state
  const [selectedItems, setSelectedItems] = useState(cartItems.map(item => item.id));

  // 2. Select/Unselect handle korar function
  const toggleSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 3. Sudhu selected product-gulor total price calculation
  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout ({selectedItems.length} items)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Product List */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-base-100 shadow-sm">
              {/* Checkbox for selection */}
              <input 
                type="checkbox" 
                className="checkbox checkbox-primary" 
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelection(item.id)}
              />
              
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.location}</p>
                <p className="font-bold text-primary">৳{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="p-6 border rounded-xl bg-base-200 h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Selected Items:</span>
            <span>{selectedItems.length}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span>৳{subtotal}</span>
          </div>
          
          <button 
            className="btn btn-primary w-full mt-6"
            disabled={selectedItems.length === 0}
            onClick={() => alert(`Proceeding to pay for ${selectedItems.length} items`)}
          >
            Confirm Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;