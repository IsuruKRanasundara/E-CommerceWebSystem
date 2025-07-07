export default function ProductDetail ({
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
  })  {
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
                <span className="text-sm text-blue-600 font-medium">{selectedProduct.category}</span>
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