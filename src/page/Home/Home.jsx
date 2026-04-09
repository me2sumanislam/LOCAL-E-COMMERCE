 import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import ProductModal from '../ProductModal/ProductModal';

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // কনটেক্সট থেকে সার্চ কুয়েরি নিয়ে আসা
  const { setCartItems, setIsCartOpen, searchQuery } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/Data.json')
      .then((res) => res.json())
      .then((data) => setShoes(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  // সার্চ ফিল্টার লজিক
  const filteredShoes = shoes.filter((shoe) =>
    shoe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    if (!product) return;
    const buyNowItem = { ...product, quantity: 1 };
    setCartItems([buyNowItem]);
    setSelectedProduct(null);
    navigate('/checkout', { state: { checkoutItems: [buyNowItem] } }); 
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {filteredShoes.length > 0 ? (
          filteredShoes.map((shoe) => (
            <div
              key={shoe.id}
              onClick={() => setSelectedProduct(shoe)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
            >
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img src={shoe.image} alt={shoe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{shoe.title}</h2>
                <p className="text-orange-600 font-bold text-lg mt-1">৳{shoe.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No products found matching "{searchQuery}"
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => {
          addToCart(selectedProduct);
          setSelectedProduct(null);
        }}
        onBuyNow={() => handleBuyNow(selectedProduct)} 
      />
    </div>
  );
};

export default Home;