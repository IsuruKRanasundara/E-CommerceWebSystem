import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../service/productService.js";

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, thunkAPI) => {
    try {
        return await ProductService.getAll();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch products");
    }
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
