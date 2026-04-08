 import React, { useEffect, useState } from 'react';

const InfiniteShoesGallery = () => {
  const [shoes, setShoes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); // শুরুতে ১০টি দেখাবে
  const [isScrolling, setIsScrolling] = useState(false);

  // ১. শুরুতে JSON থেকে সব ডেটা লোড করা
  useEffect(() => {
    fetch('/public/Data.json')
      .then((res) => res.json())
      .then((data) => setShoes(data))
      .catch((err) => console.error(err));
  }, []);

  // ২. স্ক্রল ডিটেক্ট করার ফাংশন
  useEffect(() => {
    const handleScroll = () => {
      // যদি স্ক্রল করে একদম নিচে পৌঁছাই (নিচ থেকে ১০০px বাকি থাকতে)
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

  // ৩. নতুন ডেটা লোড করার ফেক ডিলে (যাতে লোডিং অ্যানিমেশন দেখা যায়)
  const loadMore = () => {
    setIsScrolling(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 10); // আরও ১০টি আইটেম বাড়ানো
      setIsScrolling(false);
    }, 1500); // ১.৫ সেকেন্ড ডিলে
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {shoes.slice(0, displayCount).map((shoe) => (
          <div key={shoe.id} className="bg-white rounded-md overflow-hidden shadow-sm flex flex-col">
             {/* আগের কার্ডের ভেতরের সব কোড এখানে হবে */}
             <div className="aspect-square bg-gray-200">
               <img src={shoe.image} alt="" className="w-full h-full object-cover" />
             </div>
             <div className="p-2">
                <h2 className="text-[13px] line-clamp-2 h-9">{shoe.title}</h2>
                <p className="text-orange-500 font-bold">৳{shoe.price}</p>
             </div>
          </div>
        ))}
      </div>

      {/* স্ক্রল করার সময় নিচে যে লোডিং দেখাবে */}
      {isScrolling && (
        <div className="flex justify-center items-center py-10">
          <div className="flex flex-col items-center gap-2">
            <span className="loading loading-dots loading-lg text-orange-500"></span>
            <p className="text-sm text-gray-500 italic">নতুন প্রোডাক্ট খোঁজা হচ্ছে...</p>
          </div>
        </div>
      )}

      {/* সব ডেটা শেষ হয়ে গেলে */}
      {!isScrolling && displayCount >= shoes.length && (
        <div className="text-center py-10 text-gray-400 text-sm">
          — আপনি সব প্রোডাক্ট দেখে ফেলেছেন —
        </div>
      )}
    </div>
  );
};

export default InfiniteShoesGallery;