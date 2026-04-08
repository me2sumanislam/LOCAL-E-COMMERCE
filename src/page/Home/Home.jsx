 // Home.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ProductModal from '../ProductModal/ProductModal';
import MyCart from '../MyCart/MyCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    // LocalStorage theke cart load
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Load shoes data
  useEffect(() => {
    fetch('/Data.json')
      .then(res => res.json())
      .then(data => setShoes(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // Add to Cart
  const addToCart = (product) => {
    if (!product) return;

    setCartItems(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.title} কার্টে যোগ করা হয়েছে!`, {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
    });

    setIsCartOpen(true);
  };

  // Total price
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // Load More
  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 10, shoes.length));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-10">

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {shoes.slice(0, displayCount).map(shoe => (
          <div
            key={shoe.id}
            onClick={() => setSelectedProduct(shoe)}
            className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="aspect-square bg-gray-200 overflow-hidden">
              <img
                src={shoe.image}
                alt={shoe.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-2">
              <h2 className="text-[13px] line-clamp-2 h-9 font-medium text-gray-800">{shoe.title}</h2>
              <p className="text-orange-500 font-bold">৳{shoe.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {displayCount < shoes.length && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleLoadMore}
            className="btn bg-orange-500 text-white px-6"
          >
            Load More
          </button>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => {
          if (selectedProduct) addToCart(selectedProduct);
          setSelectedProduct(null);
        }}
      />

      {/* My Cart */}
      <MyCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        totalPrice={totalPrice}
      />

    </div>
  );
};

export default Home;