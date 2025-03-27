/*  Redux Store - hold the posts state */
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import usersReducer from "../features/users/usersSlice";

// Create the store using configureStore() from Redux Toolkit
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Register apiSlice.reducer
        users: usersReducer // Register usersReducer under users
    },
    // Add apiSlice.middleware for RTK Query to handle caching and data fetching
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})