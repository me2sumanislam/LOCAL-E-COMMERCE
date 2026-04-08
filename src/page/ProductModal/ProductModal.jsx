 import React from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <>
      <input type="checkbox" checked={isOpen} readOnly className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
          
          {/* Close Button & Image Area */}
          <div className="relative">
            <button 
              onClick={onClose}
              className="btn btn-sm btn-circle absolute right-2 top-2 z-10 bg-black/20 border-none text-white hover:bg-black/40"
            >✕</button>
            <img 
              src={product.image} 
              className="w-full aspect-square object-cover" 
              alt={product.title} 
            />
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              1/15
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4">
            {/* Flash Sale Banner (Optional) */}
            <div className="bg-orange-500 text-white p-2 rounded-md flex justify-between items-center mb-3">
              <span className="font-bold text-sm">Flash Sale</span>
              <span className="text-xs">Ends in 12:41:10</span>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-orange-600">৳{product.price}</span>
              <span className="text-sm text-gray-400 line-through">৳{product.price + 200}</span>
              <span className="text-xs bg-orange-100 text-orange-600 px-1 rounded">-{product.discount}%</span>
            </div>

            <h2 className="text-md font-medium text-gray-800 leading-tight mb-2">
              {product.title}
            </h2>

            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <span>★★★★★</span>
              <span className="text-gray-500 text-xs ml-1">4.5 (238)</span>
            </div>

            <hr className="my-4 border-gray-100" />

            {/* Bottom Actions (Sticky) */}
            <div className="flex gap-2 sticky bottom-0 bg-white py-2">
              <button className="btn btn-outline border-gray-300 flex-1 h-12">
                <span className="text-xl">🛒</span> Add to Cart
              </button>
              <button className="btn bg-gradient-to-r from-cyan-500 to-blue-500 border-none text-white flex-1 h-12">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" onClick={onClose}>Close</label>
      </div>
    </>
  );
};

export default ProductModal;