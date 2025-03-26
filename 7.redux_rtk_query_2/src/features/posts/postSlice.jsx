/* Redux State Management */
import { 
        createSlice, 
        createAsyncThunk, 
        createSelector, 
        createEntityAdapter 
    } from "@reduxjs/toolkit";
import { sub } from 'date-fns'; 
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// Simplify CRUD operations by structuring state in an object format (entities and ids)
const postsAdapter = createEntityAdapter({
    // Store posts in descending order by date
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

// Provide an initial normalized state
const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null,
    count: 0 // Add count property to track the counter
})

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
        // return err.message;
        /* If an error occurs, returns initialPost instead of throwing an error. */
        return initialPost; 
        /* This is a temporary workaround to avoid breaking the Redux flow during testing. */
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
        /* Reducer for Adding Reactions */
        reactionAdded(state, action){

            // Extract postId & reaction from the payload
            const { postId, reaction } = action.payload

            // Retrieve a post from entities object in Redux state
            const existingPost = state.entities[postId] // postId is used to access a specific post

            // If the post is found
            if (existingPost){
                // Increment the selected reaction count.
                existingPost.reactions[reaction]++
            }
        },
        /* increaseCount reducer */
        increaseCount(state, action){
            // Update the count state by incrementing it when dispatched
            state.count = state.count + 1 
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

                // Use upsertMany() to update existing posts and add new ones
                postsAdapter.upsertMany(state, loadedPosts)
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

                // Use addOne() to insert a single new post
                postsAdapter.addOne(state, action.payload)
            })
            // When the update request is fulfilled
            .addCase(updatePost.fulfilled, (state, action) => { 
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                action.payload.date = new Date().toISOString();
                
                // Uses upsertOne() to update or insert a post
                postsAdapter.upsertOne(state, action.payload)    
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

                // Use removeOne() to delete a post
                postsAdapter.removeOne(state, id)
            })

    } 
})

/* Export Selectors */
export const {
    selectAll: selectAllPosts, // Retrieves all posts
    selectById: selectPostById, // Fetches a post by ID
    selectIds: selectPostIds // Retrieves an array of post IDs
} = postsAdapter.getSelectors(state => state.posts)

// Export current status of posts
export const getPostsStatus = (state) => state.posts.status;
// Export error message
export const getPostsError = (state) => state.posts.error;

// Export count state in getCount selector
export const getCount = (state) => state.posts.count;

// Define and Export Memoized Selector 
export const selectPostsByUser = createSelector(
    [   /* Input selectors */
        selectAllPosts, // Retrieves all posts from the Redux state 
        (state, userId) => userId // Extracts userId from the state
    ], 
    // Filter posts based on userId
    (posts, userId) => posts.filter(post => post.userId === userId)
)

// Export the increaseCount & reactionAdded actions
export const { increaseCount, reactionAdded } = postsSlice.actions
/* Enables components to dispatch the action */

// Export the Reducer, so that it can be used in the Redux store
export default postsSlice.reducer
