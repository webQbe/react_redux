/* Redux State Management */
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns'; 
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// Initialize posts with default reactions and timestamps
const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

// Define async thunk to fetch posts from an API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        // Call the API
        const response = await axios.get(POSTS_URL)
        // Return JSON data if successful
        return response.data;
    } catch(err) {
        // Otherwise return an error message
        return err.message; 
    }
})

// Handle adding new post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    // Send new post to API
    const response = await axios.post(POSTS_URL, initialPost)
    // Return response data (new post) when fulfilled
    return response.data
})

// Handle updating posts
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        return err.message;
    }
})

// Handle deleting posts
export const deletePost = createAsyncThunk('delete/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try{
        // Send DELETE request to remove the post from the API
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost; // Return the deleted post if successful 
        return `${response?.status}: ${response?.statusText}`; // Otherwise, return status
    } catch (err) {
        return err.message; // If unsuccessful, return an error message.
    }
 })

// Create postsSlice with the name 'posts', using the 'initialState'
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: { 
        postAdded: {
                // reducer() function only handles state updates
                reducer(state, action){
                        state.posts.push(action.payload) 
                    },
                // Use prepare() to keep the action preparation separate
                prepare(title, content, userId) {
                        return {
                            payload: {
                                id: nanoid(), 
                                title,
                                content,
                                date: new Date().toISOString(),
                                userId, // Store the user who created the post
                                // Each post has a reactions object for storing counts
                                reactions: { 
                                    thumbsUp: 0,
                                    wow: 0,
                                    heart: 0,
                                    rocket: 0,
                                    coffee: 0
                                }
                            } 
                            /* Formats the action payload before passing it to the reducer */
                        }
                    },
                
            },
        /* Reducer for Adding Reactions */
        reactionAdded(state, action){
            // Extract postId & reaction from the payload
            const { postId, reaction } = action.payload
            // Finds the post by postId in the Redux store.
            const existingPost = state.posts.find(post => post.id === postId)
            // If the post is found
            if (existingPost){
                // Increment the selected reaction count.
                existingPost.reactions[reaction]++
            }
        }
    },
    // Handle different fetching states (pending, fulfilled, rejected)
    extraReducers(builder){
        builder
            // Handling Pending state
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            // Handling Fulfilled state
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1;
                // Loop over fetched posts
                const loadedPosts = action.payload.map(post => {
                    // Add Date timestamps
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    // Add Reactions
                    post.reactions = { 
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                state.posts = loadedPosts; // Replace entire posts array with loadedPosts
            })  
            // Handling Rejected state 
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed' // Mark state.status as "failed"
                state.error = action.error.message // store the error
            })
            // When the post request is fulfilled
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Sort posts by id before adding a new post
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                // Generate a unique ID for the new post based on highest post id
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;

                /* Format new post data */
                action.payload.userId = Number(action.payload.userId) // Convert userId to a number
                action.payload.date = new Date().toISOString(); // Assign the current date
                action.payload.reactions = { // Init reactions as an empty object
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload) // Console log post data
                state.posts.push(action.payload) // Adds the new post to state.posts
            })
            // When the update request is fulfilled
            .addCase(updatePost.fulfilled, (state, action) => { 
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                // Filter out the old post by id
                const posts = state.posts.filter(post => post.id !== id);
                // Add the updated post to the list
                state.posts = [...posts, action.payload];
            })
            // When the delete request is fulfilled
            .addCase(deletePost.fulfilled, (state, action) => {
                // Check if the payload contains a valid id
                if(!action.payload?.id){ 
                    // Log an error message and exits
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                // Otherwise, filter out the deleted post from the state.posts array
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts;
            })

    } 
})

// Allow components to retrieve all posts from the Redux store
export const selectAllPosts = (state) => state.posts.posts;
// Export current status of posts
export const getPostsStatus = (state) => state.posts.status;
// Export error message
export const getPostsError = (state) => state.posts.error;

// Export selectPostById selector
export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId); 
/* Used by SinglePostPage.jsx to fetch a single post. */

// Export the postAdded & reactionAdded actions
export const { postAdded, reactionAdded } = postsSlice.actions

// Export the Reducer, so that it can be used in the Redux store
export default postsSlice.reducer
