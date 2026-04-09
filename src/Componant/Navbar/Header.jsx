 import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount, onOpenCart }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl font-black text-orange-600 tracking-tighter">
            HERO<span className="text-gray-800">.IO</span>
          </h1>
        </Link>

        {/* Search Area */}
        <div className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search in Hero.Io"
            className="w-full bg-gray-100 border-none rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-orange-500 text-sm outline-none transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Shopping Toli Icon & Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            {/* Shopping Cart Icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="26" 
              height="26" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="text-gray-700 group-hover:text-orange-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            {/* Cart Count Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile (Optional) */}
          <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;