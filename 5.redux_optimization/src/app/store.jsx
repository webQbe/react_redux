/*  Redux Store - hold the posts state */
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postSlice";
import usersReducer from "../features/users/usersSlice";

// Create the store using configureStore() from Redux Toolkit
export const store = configureStore({
    reducer: {
        posts: postsReducer, // postsReducer manages the posts state
        users: usersReducer // Register usersReducer under users
    }
})