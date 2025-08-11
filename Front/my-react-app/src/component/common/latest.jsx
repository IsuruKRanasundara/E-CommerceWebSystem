import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-full flex-shrink-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
              <div className="transform transition-all duration-700 ease-out">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                  {slide.name}
                </h2>
               
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default function CarouselDemo() {
  const slideData = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "Electronics",
      rating: 4.5,
      reviews: 128,
      description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Quick charge (5 min = 3 hours)",
        "Premium leather finish",
        "Bluetooth 5.0"
      ],
      inStock: true,
      stockCount: 25
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "Wearables",
      rating: 4.3,
      reviews: 89,
      description: "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life. Track your health and stay connected.",
      features: [
        "Heart rate monitoring",
        "GPS tracking",
        "7-day battery life",
        "Waterproof design",
        "50+ workout modes"
      ],
      inStock: true,
      stockCount: 15
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
      category: "Accessories",
      rating: 4.7,
      reviews: 245,
      description: "Ergonomic aluminum laptop stand with adjustable height and angle. Improve your posture and productivity with this premium stand.",
      features: [
        "Adjustable height & angle",
        "Premium aluminum build",
        "Heat dissipation design",
        "Fits 11-17 inch laptops",
        "Foldable & portable"
      ],
      inStock: true,
      stockCount: 42
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
      category: "Audio",
      rating: 4.4,
      reviews: 156,
      description: "Portable waterproof Bluetooth speaker with 360° sound, 24-hour battery, and rugged design. Perfect for outdoor adventures.",
      features: [
        "360° surround sound",
        "24-hour battery life",
        "IPX7 waterproof",
        "Wireless pairing",
        "Rugged design"
      ],
      inStock: false,
      stockCount: 0
    },
    {
      id: 5,
      name: "Gaming Mouse",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
      category: "Gaming",
      rating: 4.6,
      reviews: 312,
      description: "High-precision gaming mouse with RGB lighting, programmable buttons, and ergonomic design. Dominate your games with precision.",
      features: [
        "16000 DPI sensor",
        "RGB lighting",
        "8 programmable buttons",
        "Ergonomic design",
        "Gaming-grade switches"
      ],
      inStock: true,
      stockCount: 8
    },
    {
      id: 6,
      name: "Desk Lamp",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
      category: "Home",
      rating: 4.2,
      reviews: 67,
      description: "LED desk lamp with adjustable brightness, color temperature control, and USB charging port. Perfect for work and study.",
      features: [
        "Adjustable brightness",
        "Color temperature control",
        "USB charging port",
        "Touch controls",
        "Energy efficient LED"
      ],
      inStock: true,
      stockCount: 33
    }
  ];

  return (
      <div className="max-w-7xl mx-auto px-4 my-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Quick Deals!
          </h1>
          <p className="text-xl text-primary-dark max-w-2xl mx-auto">
           Explore our latest products and get the best deals on the market
          </p>
        </div>
        <div className="flex justify-center">
         
        </div>
        
        <Carousel slides={slideData} />
      </div>
  );
}