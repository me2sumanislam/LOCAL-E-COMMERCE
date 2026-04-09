import React from 'react';

const CartItem = ({ 
  item, 
  isSelected, 
  onToggleSelect, 
  onUpdateQuantity, 
  onRemove 
}) => {
  return (
    <div 
      className={`flex gap-4 border rounded-xl p-4 transition-all ${
        isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(item.id)}
        className="w-5 h-5 mt-1 accent-orange-600 cursor-pointer"
      />

      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h2 className="font-medium text-gray-800 line-clamp-2 leading-tight">
          {item.title}
        </h2>
        <p className="text-orange-600 font-bold text-lg mt-1">৳{item.price}</p>

        {/* Quantity & Remove */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="px-4 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
            >
              −
            </button>
            <span className="px-6 py-1 font-medium bg-white">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="px-4 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-600 text-sm font-medium px-2 py-1"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;