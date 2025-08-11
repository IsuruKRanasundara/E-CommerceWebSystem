import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem({ item, updateQuantity, removeItem }) {
    return (
        <>
        {item && (


<div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
        />

        <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>Color: {item.color}</span>
                <span>Size: {item.size}</span>
            </div>
            <p className="text-xl font-bold text-orange-600 mt-2">
                ${item.price.toFixed(2)}
            </p>
        </div>

        <div className="flex items-center space-x-3">
            <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
                <Minus className="h-4 w-4 text-gray-600" />
            </button>
            <span className="w-12 text-center font-medium">{item.quantity}</span>
            <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
                <Plus className="h-4 w-4 text-gray-600" />
            </button>
        </div>

        <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 mt-2 p-1 transition-colors duration-200"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    </div>
</div>
        )}
        </>
    );
}