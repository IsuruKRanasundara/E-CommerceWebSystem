import React from "react";
import { useState, useEffect } from "react";

interface ProductCard {
  id: number;
  name: string;
  price: string;
  image: string;
  position: string;
  animation: string;
}

const products: ProductCard[] = [
  {
    id: 1,
    name: "Premium Watch",
    price: "$299",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    position: "top-20 left-12",
    animation: "animate-bounce"
  },
  {
    id: 2,
    name: "Sport Sneakers",
    price: "$159",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop",
    position: "bottom-32 left-8",
    animation: "animate-pulse"
  },
  {
    id: 3,
    name: "Gold Necklace",
    price: "$899",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
    position: "top-1/2 right-8",
    animation: "animate-bounce"
  }
];

export function FloatingProducts() {
  const [visibleProducts, setVisibleProducts] = useState<ProductCard[]>([]);

  useEffect(() => {
    // Stagger the appearance of products
    products.forEach((product, index) => {
      setTimeout(() => {
        setVisibleProducts(prev => [...prev, product]);
      }, index * 1000);
    });
  }, []);

  return (
    <>
      {visibleProducts.map((product) => (
        <div
          key={product.id}
          className={`absolute ${product.position} ${product.animation} transition-all duration-1000 z-10`}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-orange-200 hover:scale-105 transition-transform duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-800">{product.name}</p>
              <p className="text-xs text-orange-600 font-bold">{product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
