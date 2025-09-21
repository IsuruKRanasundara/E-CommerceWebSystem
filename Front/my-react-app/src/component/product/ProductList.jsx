import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { fetchProducts } from '../../store/productSlice.js';
import { addToCart } from '../../store/cartSlice.js';

const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error, totalPages, currentPage } = useSelector((state) => state.products);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (productId) => {
        dispatch(addToCart({ productId, quantity: 1 }));
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < Math.floor(rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
            />
        ));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600 mb-4">Error loading products: {error}</p>
                <button
                    onClick={() => dispatch(fetchProducts())}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        {/* Product Image */}
                        <div className="relative">
                            <img
                                src={product.images?.[0]?.url || '/api/placeholder/300/200'}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            {product.discountPrice && (
                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                                    Save ${(product.price - product.discountPrice).toFixed(2)}
                                </div>
                            )}
                            <button
                                onClick={() => toggleFavorite(product._id)}
                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                            >
                                <Heart
                                    className={`w-5 h-5 ${
                                        favorites.includes(product._id)
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-gray-400'
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                            <div className="mb-2">
                                <span className="text-sm text-orange-600 font-medium">{product.brand}</span>
                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-2">
                                {renderStars(product.rating)}
                                <span className="text-sm text-gray-500 ml-1">({product.numReviews || 0})</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl font-bold text-gray-900">
                                    ${product.discountPrice || product.price}
                                </span>
                                {product.discountPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                        ${product.price}
                                    </span>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`w-2 h-2 rounded-full ${product.countInStock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className={`text-sm ${product.countInStock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
                                </span>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={() => handleAddToCart(product._id)}
                                disabled={product.countInStock === 0}
                                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => dispatch(fetchProducts({ page: i + 1 }))}
                                className={`px-4 py-2 rounded-lg ${
                                    currentPage === i + 1
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;