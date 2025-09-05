// src/components/AddToCartButon.jsx
import { useCart } from '../hooks/useCart';

export function AddToCartButton({ product }) {
    const { addItem } = useCart();

    return (
        <button onClick={() => addItem(product)}>
            Add {product.name} to Cart
        </button>
    );
}