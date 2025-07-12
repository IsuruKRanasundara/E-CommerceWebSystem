import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { Star, ArrowLeft, Minus, Plus } from "lucide-react";
import Description from './description';
import Features from './features';
import ReviewSection from './reviewSection';

export const AddToCart = ({handleAddToCart,selectedProduct,toggleFavorite,favorites}) => {
    return ( <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={!selectedProduct.inStock}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${
            selectedProduct.inStock
              ? 'bg-primary text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        <button
          onClick={() => toggleFavorite(selectedProduct.id)}
          className={`p-3 rounded-md border transition-colors ${
            favorites.includes(selectedProduct.id)
              ? 'bg-red-50 border-red-300 text-red-600'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-current' : ''}`} />
        </button>
        <button className="p-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
    </div>    
    )
}

export const ProductCard = ({ products, handleProductClick, toggleFavorite, favorites, renderStars }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(product.id);
                                }}
                                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                                    favorites.includes(product.id)
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-primary font-medium">{product.category}</span>
                                <div className="flex items-center gap-1">
                                    {renderStars(product.rating)}
                                    <span className="text-sm text-gray-500">({product.reviews})</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                                    Save ${(product.originalPrice - product.price).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className={`text-sm ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                                    {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ProductDetail = ({
    selectedProduct,
    quantity,
    setQuantity,
    favorites,
    toggleFavorite,
    handleAddToCart,
    renderStars,
    calculateTotal,
    productReviews,
    onBack
}) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Products
                </button>

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
};


  