import { useState } from "react";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Heart, Share2 } from "lucide-react";
import Description from "../../component/product/description.jsx";
import Features from "../../component/product/features.jsx";
import ReviewSection from "../../component/product/reviewSection.jsx";
import { AddToCart, ProductCard, ProductDetail } from "../../component/product/productCard.jsx";
import HeroSection from "../../component/common/heroSection.jsx";
import CarouselDemo from "../../component/common/latest.jsx";

export const existingItem = {items:[]};

const products = [
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

const reviewsData = {
    1: [
        { id: 1, name: "John D.", rating: 5, comment: "Amazing sound quality! The noise cancellation is incredible.", date: "2024-01-15" },
        { id: 2, name: "Sarah M.", rating: 4, comment: "Great headphones, very comfortable for long use.", date: "2024-01-10" },
        { id: 3, name: "Mike R.", rating: 5, comment: "Best purchase I've made this year. Highly recommend!", date: "2024-01-08" }
    ],
    2: [
        { id: 1, name: "Emily K.", rating: 4, comment: "Love the fitness tracking features. Battery life is great!", date: "2024-01-12" },
        { id: 2, name: "David L.", rating: 5, comment: "Perfect smartwatch for my daily workouts.", date: "2024-01-09" }
    ],
    3: [
        { id: 1, name: "Alex P.", rating: 5, comment: "Excellent build quality. My posture has improved significantly.", date: "2024-01-14" },
        { id: 2, name: "Lisa T.", rating: 4, comment: "Very sturdy and adjustable. Great value for money.", date: "2024-01-11" }
    ],
    4: [
        { id: 1, name: "Chris W.", rating: 4, comment: "Great sound quality, but could be louder for outdoor use.", date: "2024-01-13" }
    ],
    5: [
        { id: 1, name: "Gaming Pro", rating: 5, comment: "Perfect for competitive gaming. Very responsive!", date: "2024-01-16" },
        { id: 2, name: "Tech User", rating: 4, comment: "Good mouse, RGB lighting is a nice touch.", date: "2024-01-07" }
    ],
    6: [
        { id: 1, name: "Office Worker", rating: 4, comment: "Great for late night work. Love the adjustable brightness.", date: "2024-01-06" }
    ]
};

export default function EcommerceApp() {
    const [currentPage, setCurrentPage] = useState('products');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setCurrentPage('product-detail');
        setQuantity(1);
    };

    const handleAddToCart = () => {
        let existing = cart.find(item => item.id === selectedProduct.id);
        let updatedCart;
        if (existing) {
            updatedCart = cart.map(item =>
                item.id === selectedProduct.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            updatedCart = [...cart, {
                ...selectedProduct,
                quantity,
                imageUrl: selectedProduct.image // Add imageUrl for navbar compatibility
            }];
        }
        setCart(updatedCart);
        existingItem.items = updatedCart;
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const calculateTotal = () => {
        return (selectedProduct.price * quantity).toFixed(2);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
            />
        ));
    };

    if (currentPage === 'product-detail' && selectedProduct) {
        const productReviews = reviewsData[selectedProduct.id] || [];

        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <button
                                onClick={() => setCurrentPage('products')}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Products
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <ShoppingCart className="w-6 h-6 text-gray-700" />
                                    {existingItem.items && existingItem.items.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {existingItem.items.reduce((sum, item) => sum + item.quantity, 0)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Product Detail */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <span className="text-sm text-primary font-medium">{selectedProduct.category}</span>
                                <h1 className="text-3xl font-bold text-gray-900 mt-1">{selectedProduct.name}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1">
                                        {renderStars(selectedProduct.rating)}
                                    </div>
                                    <span className="text-sm text-gray-500">({selectedProduct.reviews} reviews)</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold text-gray-900">${selectedProduct.price}</span>
                                <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                                    Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                                </span>
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${selectedProduct.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className={`text-sm font-medium ${selectedProduct.inStock ? 'text-green-700' : 'text-red-700'}`}>
                                    {selectedProduct.inStock ? `${selectedProduct.stockCount} in stock` : 'Out of stock'}
                                </span>
                            </div>

                            {/* Quantity Control */}
                            {selectedProduct.inStock && (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(selectedProduct.stockCount, quantity + 1))}
                                            className="p-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Total Price */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-medium text-gray-700">Total:</span>
                                    <span className="text-2xl font-bold text-gray-900">${calculateTotal()}</span>
                                </div>
                            </div>

                            <AddToCart
                                handleAddToCart={handleAddToCart}
                                selectedProduct={selectedProduct}
                                toggleFavorite={toggleFavorite}
                                favorites={favorites}
                            />

                            <Description selectedProduct={selectedProduct} />
                            <Features selectedProduct={selectedProduct} />
                            <ReviewSection productReviews={productReviews} renderStars={renderStars} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <CarouselDemo />
            <HeroSection />
            <ProductCard
                products={products}
                handleProductClick={handleProductClick}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                renderStars={renderStars}
            />
        </div>
    );
}