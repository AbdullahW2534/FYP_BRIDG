import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/product/productsSlice';
import userReducer from '../features/product/user/userSlice';


export const store = configureStore({
    reducer: userReducer
});
