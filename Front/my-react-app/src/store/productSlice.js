import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
    name: 'product',
    initialState: { items: [], status: 'idle' },
    reducers: {
        setProducts(state, action) {
            state.items = action.payload;
        },
    },
});
export const { setProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
