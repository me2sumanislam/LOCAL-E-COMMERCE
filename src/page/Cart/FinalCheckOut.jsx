 import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FinalCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedItems = location.state?.checkoutItems || [];

  const subtotal = selectedItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const shippingFee = 70;
  const total = subtotal + shippingFee;

  // 🚀 PAYMENT FUNCTION (NEW)
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          items: selectedItems,
        }),
      });

      const data = await res.json();

      // 👉 Redirect to payment gateway
      window.location.href = data.url;

    } catch (error) {
      console.log(error);
    }
  };

  if (selectedItems.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50">
        <p className="text-gray-500 mb-4">
          আপনার কার্টে কোনো প্রোডাক্ট সিলেক্ট করা নেই!
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          কেনাকাটা করতে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-32">

      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">অর্ডার কনফার্ম করুন/Order Confirm</h1>
      </div>

      {/* Product List */}
      <div className="bg-white mt-2 p-4">
        <h2 className="font-bold text-gray-800 mb-4 border-b pb-2">
          প্রোডাক্ট লিস্ট ({selectedItems.length})
        </h2>

        {selectedItems.map((item) => (
          <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
            <img src={item.image} className="w-20 h-20 object-cover rounded-lg" alt="" />
            <div className="flex-1">
              <h3 className="text-sm text-gray-700 line-clamp-2">
                {item.title}
              </h3>
              <div className="flex justify-between mt-2 font-bold items-center">
                <span className="text-orange-600 text-lg">
                  ৳{item.price}
                </span>
                <span className="text-gray-500 text-sm">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div className="bg-white mt-2 p-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>সাব-টোটাল/SubTotal</span>
          <span>৳{subtotal}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>ডেলিভারি চার্জ/Delivery Charge</span>
          <span>৳{shippingFee}</span>
        </div>

        <div className="flex justify-between font-bold text-lg pt-3 border-t">
          <span>সর্বমোট/Total</span>
          <span className="text-orange-600">৳{total}</span>
        </div>
      </div>

      {/* FINAL PAYMENT BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">

        <div>
          <p className="text-xs text-gray-400">Total Payable</p>
          <p className="text-2xl font-black text-orange-600">
            ৳{total}
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={selectedItems.length === 0}
          className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg active:scale-95 transition-all shadow-lg shadow-orange-100 disabled:bg-gray-300"
        >
       Confirm
        </button>
      </div>
    </div>
  );
};

export default FinalCheckoutPage;