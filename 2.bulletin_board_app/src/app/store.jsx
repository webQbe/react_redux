/*  Redux Store  */
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';

// Create the store using configureStore() from Redux Toolkit
export const store = configureStore({
    reducer: {
        
    }
})