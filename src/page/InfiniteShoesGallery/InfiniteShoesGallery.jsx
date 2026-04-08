 import React, { useEffect, useState } from 'react';
import ProductModal from '../ProductModal/ProductModal'; // নিশ্চিত হয়ে নিন পাথ ঠিক আছে

const InfiniteShoesGallery = () => {
  const [shoes, setShoes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); 
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // মোডাল ডেটার জন্য

  // ১. ডেটা লোড করা (public ফোল্ডারের জন্য শুধু /Data.json)
  useEffect(() => {
    fetch('/Data.json') 
      .then((res) => res.json())
      .then((data) => setShoes(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ২. স্ক্রল ডিটেক্ট করার ফাংশন
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 
        >= document.documentElement.offsetHeight
      ) {
        if (!isScrolling && displayCount < shoes.length) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling, displayCount, shoes.length]);

  const loadMore = () => {
    setIsScrolling(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 10);
      setIsScrolling(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-10">
      
      {/* প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {shoes.slice(0, displayCount).map((shoe) => (
          <div 
            key={shoe.id} 
            onClick={() => setSelectedProduct(shoe)} // কার্ডে ক্লিক করলে মোডাল ওপেন হবে
            className="bg-white rounded-md overflow-hidden shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow"
          >
             <div className="aspect-square bg-gray-200">
               <img src={shoe.image} alt={shoe.title} className="w-full h-full object-cover" />
             </div>
             <div className="p-2">
                <h2 className="text-[13px] line-clamp-2 h-9 text-gray-800 font-medium">{shoe.title}</h2>
                <div className="flex items-center gap-1 mt-1">
                  <p className="text-orange-500 font-bold">৳{shoe.price}</p>
                  <p className="text-[10px] text-gray-400 line-through">৳{shoe.price + 200}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* স্ক্রল লোডিং */}
      {isScrolling && (
        <div className="flex justify-center items-center py-10">
          <div className="flex flex-col items-center gap-2">
            <span className="loading loading-dots loading-lg text-orange-500"></span>
            <p className="text-sm text-gray-500 italic">নতুন প্রোডাক্ট খোঁজা হচ্ছে...</p>
          </div>
        </div>
      )}

      {/* সব ডেটা শেষ হয়ে গেলে */}
      {!isScrolling && displayCount >= shoes.length && shoes.length > 0 && (
        <div className="text-center py-10 text-gray-400 text-sm">
          — আপনি সব প্রোডাক্ট দেখে ফেলেছেন —
        </div>
      )}

      {/* মোডাল কানেকশন */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
        
    </div>
  );
};

export default InfiniteShoesGallery;