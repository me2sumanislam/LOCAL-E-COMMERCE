 import React, { useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose, onOpenCart }) => {
  if (!isOpen || !product) return null;

  // Scroll block while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={onClose} 
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 z-10">
        <button 
          onClick={onClose} 
          className="btn btn-sm btn-circle absolute right-2 top-2 z-20"
        >
          ✕
        </button>

        <img 
          src={product.image} 
          alt={product.title} 
          loading="lazy" 
          className="w-full aspect-square object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-bold text-orange-600">৳{product.price}</h2>
          <h3 className="text-md mb-4 text-gray-700">{product.title}</h3>

          <div className="flex gap-2">
            <button 
              onClick={onOpenCart} 
              className="btn btn-outline border-orange-500 text-orange-500 flex-1"
            >
              Add to Cart
            </button>
            <button 
              className="btn bg-orange-500 text-white border-none flex-1"
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