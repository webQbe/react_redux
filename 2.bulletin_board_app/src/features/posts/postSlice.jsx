/* Redux slice - manage the posts' initial state */
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
    reducers: {} // Currently, no reducers defined, posts cannot be added, edited, or deleted yet.
})

// Allow components to retrieve all posts from the Redux store
export const selectAllPosts = (state) => state.posts;

// Export the Reducer, so that it can be used in the Redux store
export default postsSlice.reducer
/* The posts state is managed by postsReducer */
