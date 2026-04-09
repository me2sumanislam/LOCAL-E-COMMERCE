 import React from 'react';

const FinalCheckoutPage = ({ cartItems = [], onBack }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + 70;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 border-b">
        <button onClick={onBack} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Checkout</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="bg-white mb-2 p-8 text-center border-b">
          <button className="text-blue-600 font-bold text-sm">+ ADD ADDRESS</button>
        </div>

        <div className="bg-white mb-2 p-4">
          <div className="flex items-center gap-2 mb-4">🏪 <span className="font-bold">All In One Mall</span></div>
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-3 mb-4 border-b pb-4">
              <img src={item.image} className="w-20 h-20 rounded object-cover" alt="" />
              <div className="flex-1">
                <h3 className="text-sm line-clamp-2">{item.title}</h3>
                <div className="flex justify-between mt-2 font-bold text-orange-600">
                  <span>৳{item.price}</span>
                  <span className="text-gray-500 font-normal">Qty: {item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between text-sm py-2">
            <span>Standard Delivery</span>
            <span className="font-bold">৳70</span>
          </div>
        </div>

        <div className="bg-white p-4 space-y-3">
          <div className="flex justify-between text-gray-500"><span>Merchandise Subtotal</span><span>৳{subtotal}</span></div>
          <div className="flex justify-between text-gray-500"><span>Shipping Fee</span><span>৳70</span></div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <div>
          <p className="text-sm">Total: <span className="text-2xl font-bold text-orange-600">৳{total}</span></p>
        </div>
        <button className="bg-orange-600 text-white px-10 py-3 rounded-md font-bold hover:bg-orange-700 transition-all">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default FinalCheckoutPage;