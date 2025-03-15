/*  Redux Store - hold the posts state */
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postSlice";

// Create the store using configureStore() from Redux Toolkit
export const store = configureStore({
    reducer: {
        posts: postsReducer // Add postsReducer to the store
        /* The posts state is managed by postsReducer */
    }
})