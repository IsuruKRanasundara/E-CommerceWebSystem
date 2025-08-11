import {ShoppingCart} from "lucide-react";
import React from "react";

export default function CartToggleButton  ({toggleCart,getTotalItems})  {
    return (
    <button
        onClick={toggleCart}
        className="fixed top-6 right-6 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-40"
    >
        <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {getTotalItems()}
          </span>
            )}
        </div>
    </button>
)}

