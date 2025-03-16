/* Manage 'posts' State*/
import { createSlice } from "@reduxjs/toolkit";

// Initial state : an array of posts, each with an id, title, and content
const initialState = [
    { id: '1', title: 'Learning Redux Toolkit', content: "I've heard good things." },
    { id: '2', title: 'Slices...', content: "The more I say slice, the more I want pizza." }
]

// Create postsSlice with the name 'posts', using the 'initialState'
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: { 
        /* Add reducer to be dispatched by other components */
        postAdded(state, action){
            // Take new post object and add it to the state array
            state.push(action.payload) 
        }
    } 
})

// Allow components to retrieve all posts from the Redux store
export const selectAllPosts = (state) => state.posts;

// Export the postAdded action
export const { postAdded } = postsSlice.actions

// Export the Reducer, so that it can be used in the Redux store
export default postsSlice.reducer
/* The posts state is managed by postsReducer */
