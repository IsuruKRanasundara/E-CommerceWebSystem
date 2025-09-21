import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../service/productService';

// Async thunks for product operations
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            const response = await ProductService.getAll(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await ProductService.getById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch product');
        }
    }
);

export const fetchFeaturedProducts = createAsyncThunk(
    'products/fetchFeaturedProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ProductService.getFeatured();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch featured products');
        }
    }
);

const initialState = {
    items: [],
    currentProduct: null,
    featuredProducts: [],
    loading: false,
    error: null,
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
    filters: {
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        brand: '',
        sort: 'newest'
    }
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                search: '',
                category: '',
                minPrice: '',
                maxPrice: '',
                brand: '',
                sort: 'newest'
            };
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products || [];
                state.totalProducts = action.payload.totalProducts || 0;
                state.totalPages = action.payload.totalPages || 0;
                state.currentPage = action.payload.currentPage || 1;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload.product;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch featured products
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.featuredProducts = action.payload.products || [];
            });
    }
});

export const { clearError, setFilters, clearFilters, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
