 import React, { useEffect, useState, useCallback } from 'react';
import ProductModal from '../ProductModal/ProductModal';

const InfiniteShoesGallery = () => {
  const [shoes, setShoes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Data Fetch
  useEffect(() => {
    fetch('/Data.json')
      .then((res) => res.json())
      .then((data) => setShoes(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ Load More (optimized)
  const loadMore = useCallback(() => {
    if (isLoading || displayCount >= shoes.length) return;

    setIsLoading(true);

    // no delay → smooth UI
    setDisplayCount((prev) => Math.min(prev + 10, shoes.length));

    setIsLoading(false);
  }, [isLoading, displayCount, shoes.length]);

  // ✅ Optimized Scroll (requestAnimationFrame)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement;

          if (scrollTop + clientHeight >= scrollHeight - 150) {
            loadMore();
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-10">

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {shoes.slice(0, displayCount).map((shoe) => (
          <div
            key={shoe.id}
            onClick={() => setSelectedProduct(shoe)}
            className="bg-white rounded-md overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-all"
          >
            <div className="aspect-square bg-gray-200 overflow-hidden">
              <img
                src={shoe.image}
                alt={shoe.title}
                loading="lazy"   // ✅ Lazy load added
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-2">
              <h2 className="text-[13px] line-clamp-2 h-9 text-gray-800 font-medium">
                {shoe.title}
              </h2>

              <div className="flex items-center gap-1 mt-1">
                <p className="text-orange-500 font-bold">৳{shoe.price}</p>
                <p className="text-[10px] text-gray-400 line-through">
                  ৳{shoe.price + 200}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Loader */}
      {isLoading && (
        <div className="flex justify-center py-6">
          <span className="loading loading-spinner text-orange-500"></span>
        </div>
      )}

      {/* ✅ End Message */}
      {!isLoading && displayCount >= shoes.length && shoes.length > 0 && (
        <div className="text-center py-10 text-gray-400 text-sm">
          — আপনি সব প্রোডাক্ট দেখে ফেলেছেন —
        </div>
      )}

      {/* ✅ Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default InfiniteShoesGallery;