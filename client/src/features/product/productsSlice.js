import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload;        
        },
        
    }
})

export const {addProducts} = productsSlice.actions;

export default productsSlice.reducer;