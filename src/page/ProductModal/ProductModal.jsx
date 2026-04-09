 import React, { useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose, onOpenCart, onBuyNow }) => {
  // Scroll Fix logic
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Background overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-xl relative animate-in slide-in-from-bottom duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-9 h-9 bg-white/80 backdrop-blur rounded-full shadow flex items-center justify-center text-xl z-10 hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        <img src={product.image} alt={product.title} className="w-full aspect-square object-cover" />

        <div className="p-5">
          <h2 className="text-3xl font-bold text-orange-600">৳{product.price}</h2>
          <h3 className="text-lg font-medium text-gray-800 mt-2">{product.title}</h3>
          
          <div className="flex gap-3 mt-8">
            <button 
              onClick={onOpenCart} 
              className="flex-1 py-4 border-2 border-orange-500 text-orange-600 font-semibold rounded-2xl hover:bg-orange-50 active:scale-95 transition-all"
            >
              Add to Cart
            </button>

            {/* Buy Now Button - onBuyNow call kora hoyeche */}
            <button 
              onClick={onBuyNow} 
              className="flex-1 py-4 bg-orange-600 text-white font-semibold rounded-2xl hover:bg-orange-700 shadow-lg active:scale-95 transition-all"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;