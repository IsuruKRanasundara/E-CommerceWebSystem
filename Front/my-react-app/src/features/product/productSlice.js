import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],         // List of all products
  selectedProduct: null, // Details of a single product
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addReview: (state, action) => {
      // action.payload: { productId, review }
      const { productId, review } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.reviews = product.reviews || [];
        product.reviews.push(review);
      }
    },
  },
});

export const { setProducts, setSelectedProduct, setLoading, setError, addReview } = productSlice.actions;
export default productSlice.reducer;
