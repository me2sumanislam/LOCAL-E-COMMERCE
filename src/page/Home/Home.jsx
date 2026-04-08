 import React, { useEffect, useState, useCallback } from 'react';
import ProductModal from '../ProductModal/ProductModal';
import MyCart from '../MyCart/MyCard';
import { toast } from 'react-toastify'; // Toastify import kora hoyeche

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // ১. ডেটা ফেচিং
  useEffect(() => {
    let isMounted = true;
    fetch('/Data.json')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setShoes(data);
      })
      .catch((err) => console.error("Fetch error:", err));
    return () => { isMounted = false; };
  }, []);

  // ২. লোড মোর ফাংশন
  const loadMore = useCallback(() => {
    if (isScrolling || displayCount >= shoes.length) return;
    setIsScrolling(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 10);
      setIsScrolling(false);
    }, 500); // লোডিং টাইম আরও ফাস্ট করা হয়েছে
  }, [isScrolling, displayCount, shoes.length]);

  // ৩. স্ক্রল হ্যান্ডলার (Optimized)
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 300) { // একটু আগে থেকেই লোড শুরু হবে
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  // ৪. কার্ট লজিক + Toastify
  const addToCart = (product) => {
    if (!product) return;

    setCartItems((prev) => {
      const exist = prev.find((x) => x.id === product.id);
      if (exist) {
        return prev.map((x) => x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Toast Notification
    toast.success(`${product.title} কার্টে যোগ করা হয়েছে!`, {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
    });

    setIsCartOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-10">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {shoes.slice(0, displayCount).map((shoe) => (
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

      {/* Loading Spinner */}
      {isScrolling && (
        <div className="flex justify-center py-5">
          <span className="loading loading-spinner loading-md text-orange-500"></span>
        </div>
      )}

      {/* Components */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => {
            addToCart(selectedProduct);
            setSelectedProduct(null);
        }} 
      />

      <MyCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </div>
  );
};

export default Home;