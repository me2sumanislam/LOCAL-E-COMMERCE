 import React from 'react';

const ProductModal = ({ product, isOpen, onClose, onOpenCart }) => {
  if (!product) return null;

  return (
    <>
      <input type="checkbox" checked={isOpen} readOnly className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 bg-white relative">
          <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2 z-10">✕</button>
          
          <img src={product.image} className="w-full aspect-square object-cover" alt={product.title} />

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
              <button className="btn bg-orange-500 text-white border-none flex-1">Buy Now</button>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" onClick={onClose}>Close</label>
      </div>
    </>
  );
};

export default ProductModal;